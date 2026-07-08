"""Load LLM configs from OAI_CONFIG_LIST / dicts into AG2 1.0 ModelConfig objects."""

from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any

from ag2.config import (
    AnthropicConfig,
    GeminiConfig,
    OllamaConfig,
    OpenAIConfig,
)
from ag2.config.config import ModelConfig


def load_config_dicts(
    env_or_file: str = "OAI_CONFIG_LIST",
    file_location: str = ".",
) -> list[dict[str, Any]]:
    """Load raw config dicts from env var or JSON file (classic OAI_CONFIG_LIST shape)."""
    raw = os.environ.get(env_or_file)
    if raw:
        try:
            data = json.loads(raw)
            if isinstance(data, list):
                return [c for c in data if isinstance(c, dict)]
        except json.JSONDecodeError:
            pass

    path = Path(file_location) / env_or_file
    if path.is_file():
        with path.open(encoding="utf-8") as fh:
            data = json.load(fh)
        if isinstance(data, list):
            return [c for c in data if isinstance(c, dict)]
        if isinstance(data, dict) and "config_list" in data:
            return [c for c in data["config_list"] if isinstance(c, dict)]

    return []


def filter_configs_by_model(
    configs: list[dict[str, Any]],
    models: list[str] | None,
) -> list[dict[str, Any]]:
    """Filter config dicts by model name (replacement for autogen.filter_config)."""
    if not models:
        return configs
    model_set = {m for m in models if m}
    if not model_set:
        return configs
    return [c for c in configs if c.get("model") in model_set]


def model_config_from_dict(cfg: dict[str, Any]) -> ModelConfig:
    """Map a classic OAI_CONFIG_LIST entry to an AG2 1.0 ModelConfig."""
    model = cfg.get("model") or "gpt-4o"
    api_key = cfg.get("api_key")
    base_url = cfg.get("base_url") or cfg.get("api_base")
    temperature = cfg.get("temperature")
    max_tokens = cfg.get("max_tokens")
    timeout = cfg.get("timeout")

    kwargs: dict[str, Any] = {"model": model}
    if api_key is not None:
        kwargs["api_key"] = api_key
    if base_url is not None:
        kwargs["base_url"] = base_url
    if temperature is not None:
        kwargs["temperature"] = temperature
    if max_tokens is not None:
        kwargs["max_tokens"] = max_tokens
    if timeout is not None:
        kwargs["timeout"] = timeout

    api_type = (cfg.get("api_type") or cfg.get("provider") or "").lower()
    tags = {str(t).lower() for t in (cfg.get("tags") or [])}

    if api_type in {"anthropic", "claude"} or "anthropic" in tags or str(model).startswith(
        "claude"
    ):
        return AnthropicConfig(**kwargs)

    if api_type in {"google", "gemini"} or "gemini" in tags or str(model).startswith(
        "gemini"
    ):
        return GeminiConfig(**kwargs)

    if api_type == "ollama" or "ollama" in tags:
        return OllamaConfig(**kwargs)

    # DeepSeek and OpenAI-compatible endpoints use OpenAIConfig + base_url.
    return OpenAIConfig(**kwargs)


def load_model_configs(
    env_or_file: str = "OAI_CONFIG_LIST",
    file_location: str = ".",
    extra: list[dict[str, Any]] | None = None,
    model_filter: list[str] | None = None,
) -> list[ModelConfig]:
    """Load and convert configs, optionally merging ``extra`` and filtering by model."""
    configs = list(extra or []) + load_config_dicts(env_or_file, file_location)
    configs = filter_configs_by_model(configs, model_filter)
    return [model_config_from_dict(c) for c in configs]


def get_config(
    configs: list[ModelConfig],
    model_id: str | None = None,
) -> ModelConfig | None:
    """Pick a ModelConfig by model id, falling back to the first entry."""
    if not configs:
        return None
    if model_id:
        for cfg in configs:
            if getattr(cfg, "model", None) == model_id:
                return cfg
    return configs[0]
