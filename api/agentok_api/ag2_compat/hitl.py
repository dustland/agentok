"""Human-in-the-loop hook compatible with Agentok Studio's status protocol."""

from __future__ import annotations

from typing import Any


def studio_hitl_hook(prompt: Any = None, *args: Any, **kwargs: Any) -> str:
    """Ask the human for input via stdin, emitting Studio status markers.

    Generated scripts run under ``chat_manager`` which pipes stdin and
    watches stdout for ``__STATUS_WAIT_FOR_HUMAN_INPUT__`` /
    ``__STATUS_RECEIVED_HUMAN_INPUT__``.
    """
    text = ""
    if prompt is not None:
        content = getattr(prompt, "content", None)
        text = content if content is not None else str(prompt)

    print("__STATUS_WAIT_FOR_HUMAN_INPUT__", text, flush=True)
    reply = input(text or "> ")
    print("__STATUS_RECEIVED_HUMAN_INPUT__", text, flush=True)
    return reply
