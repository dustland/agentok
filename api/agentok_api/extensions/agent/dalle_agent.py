import os
import re
from typing import Literal, Optional

from openai import OpenAI
from termcolor import colored
from diskcache import Cache

from ag2.config.config import ModelConfig

from ..extended_agent import ExtendedAgent
from ...services.supabase import create_supabase_client
from ...utils.img_utils import get_image_data, _to_pil


def dalle_call(
    client: OpenAI,
    model: str,
    prompt: str,
    size: Literal["256x256", "512x512", "1024x1024", "1792x1024", "1024x1792"] | None,
    quality: Literal["standard", "hd"],
    n: int,
) -> Optional[bytes]:
    """Generate an image using OpenAI's DALL-E model and cache the result."""
    cache = Cache(".cache/")
    key = (model, prompt, size, quality, n)

    if key in cache:
        cached_data = cache[key]
        if isinstance(cached_data, bytes):
            return cached_data

    response = client.images.generate(
        model=model,
        prompt=prompt,
        size=size,
        quality=quality,
        n=n,
    )

    if len(response.data) == 0:
        return None
    image_url = response.data[0].url
    if image_url is None:
        return None

    img_data = get_image_data(image_url)
    cache[key] = img_data
    return img_data


def extract_img_from_content(content: str):
    """Extract a PIL image from an <img ...> tag in message content."""
    matches = re.findall(r"<img (.*)>", content)
    if not matches:
        return None
    return _to_pil(matches[0])


class DALLEAgent(ExtendedAgent):
    metadata = {
        "name": "DALLEAgent",
        "description": "An agent that uses OpenAI's DALL-E model to generate images.",
        "type": "custom_conversable",
        "label": "dalle",
        "class_name": "DALLEAgent",
    }

    def __init__(
        self,
        name: str,
        *,
        config: ModelConfig | None = None,
        api_key: str | None = None,
        **kwargs,
    ):
        prompt = kwargs.pop(
            "prompt",
            "You generate images with DALL-E. Use the generate_image tool for every user request.",
        )
        super().__init__(name, config=config, prompt=prompt, **kwargs)

        if api_key is None:
            api_key = os.getenv("OPENAI_API_KEY")
            if config is not None and getattr(config, "api_key", None):
                api_key = config.api_key
        self.client = OpenAI(api_key=api_key)
        self.tool(self.generate_image, name="generate_image")

    def generate_image(self, prompt: str) -> str:
        """Generate an image from a text prompt using DALL-E 3 and return a markdown image URL."""
        img_data = dalle_call(
            client=self.client,
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            n=1,
        )
        if img_data is None:
            return "Failed to generate image with DALL-E"

        filename = f"{prompt.replace(' ', '_')[:80]}.png"
        supabase = create_supabase_client()
        if supabase is None:
            return "Supabase client is not available"
        upload_response = supabase.upload_image(filename, img_data)
        if upload_response.status_code != 200:
            print(
                colored(
                    f"Failed to upload image to Supabase: {upload_response.reason_phrase}",
                    "red",
                )
            )
            return "Failed to upload image"

        upload_result = upload_response.json()
        return f"![img]({upload_result['Location']})"
