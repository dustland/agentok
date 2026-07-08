"""Base class for Agentok Studio custom AG2 1.0 agents."""

from __future__ import annotations

from typing import Any

from ag2 import Agent
from ag2.config.config import ModelConfig


class ExtendedAgent(Agent):
    """Thin Agent wrapper that stores Studio metadata for extension discovery."""

    metadata: dict[str, Any] = {}

    def __init__(
        self,
        name: str,
        *,
        config: ModelConfig | None = None,
        metadata: dict[str, Any] | None = None,
        prompt: Any = (),
        **kwargs: Any,
    ):
        super().__init__(name, prompt=prompt, config=config, **kwargs)
        self.studio_metadata = metadata or {}


# Backwards-compatible alias for imports that still expect the classic name.
ExtendedConversableAgent = ExtendedAgent
