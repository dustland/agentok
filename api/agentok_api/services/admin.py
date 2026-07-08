import secrets
from typing import Dict, List

from ..ag2_compat.config_loader import load_config_dicts
from ..models import ApiKey, ApiKeyCreate
from .supabase import SupabaseClient


class AdminService:
    def __init__(self, supabase: SupabaseClient):
        self.supabase = supabase

    def generate_api_key(self):
        return "atk_" + secrets.token_urlsafe(32)

    def issue_apikey(self, key_to_create: ApiKeyCreate) -> ApiKey:
        key_to_create.key = self.generate_api_key()
        return self.supabase.save_apikey(key_to_create)

    def get_apikeys(self) -> List[ApiKey]:
        return self.supabase.fetch_apikeys()

    def delete_apikey(self, apikey_id: str) -> Dict:
        return self.supabase.delete_apikey(apikey_id)

    def get_models(self) -> List[str]:
        config_list = []

        user_settings = self.supabase.fetch_general_settings()
        if (
            user_settings
            and "general" in user_settings
            and "models" in user_settings["general"]
        ):
            config_list.extend(
                [
                    model["model"]
                    for model in user_settings["general"]["models"]
                    if model["enabled"] is True
                ]
            )

        oai_configs = load_config_dicts(
            env_or_file="OAI_CONFIG_LIST",
            file_location=".",
        )
        config_list.extend([config["model"] for config in oai_configs if "model" in config])

        return config_list
