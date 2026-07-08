"""Minimal AG2 1.0 example: user asks an assistant about stock charts."""

import asyncio
import os

import ag2
from ag2 import Agent
from ag2.knowledge import MemoryKnowledgeStore
from ag2.network import EV_CHANNEL_CLOSED, Hub, Passport, Resume
from ag2.tools import SandboxCodeTool
from ag2.tools.sandbox import LocalEnvironment

from agentok_api.ag2_compat.config_loader import load_model_configs

print("ag2", ag2.__version__)


async def main() -> None:
    configs = load_model_configs()
    if not configs:
        raise SystemExit("Provide OAI_CONFIG_LIST or set OPENAI_API_KEY-backed models.")

    assistant = Agent(
        "assistant",
        prompt="You are a helpful data analyst that can write and run Python.",
        config=configs[0],
        tools=[SandboxCodeTool(LocalEnvironment("coding"))],
    )
    user = Agent(
        "user_proxy",
        config=None,
        tools=[SandboxCodeTool(LocalEnvironment("coding"))],
    )

    hub = await Hub.open(MemoryKnowledgeStore())
    user_client = await hub.register(user, Passport(name=user.name), Resume())
    asst_client = await hub.register(assistant, Passport(name=assistant.name), Resume())

    channel = await user_client.open(type="consulting", target=asst_client.agent_id)
    await channel.send("Plot a chart of NVDA and TESLA stock price change YTD.")
    await user_client.wait_for_channel_event(
        channel_id=channel.channel_id,
        predicate=lambda e: e.event_type == EV_CHANNEL_CLOSED,
        timeout=300.0,
    )
    await hub.close()


if __name__ == "__main__":
    asyncio.run(main())
