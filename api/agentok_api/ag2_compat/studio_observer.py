"""Stdout observer that mimics classic AutoGen chat formatting for OutputParser."""

from __future__ import annotations

from typing import Any

from ag2.events import ModelResponse, ToolCallsEvent, ToolResultsEvent
from ag2.observers import observer

try:
    from ag2.events import HumanInputRequest
except ImportError:  # pragma: no cover
    HumanInputRequest = None  # type: ignore[misc, assignment]


SEPARATOR = "-" * 80


def _print_message(sender: str, receiver: str, content: str) -> None:
    print(f"{sender} (to {receiver}):", flush=True)
    if content:
        print(content, flush=True)
    print(SEPARATOR, flush=True)


class StudioObserver:
    """Formats AG2 events into the classic Autogen-style transcripts Studio parses."""

    def __init__(self, agent_name: str = "Agent", peer_name: str = "User") -> None:
        self.agent_name = agent_name
        self.peer_name = peer_name

    def on_model_response(self, event: ModelResponse, **_: Any) -> None:
        content = getattr(event, "content", None) or ""
        if content:
            _print_message(self.agent_name, self.peer_name, str(content))

    def on_tool_calls(self, event: ToolCallsEvent, **_: Any) -> None:
        calls = getattr(event, "tool_calls", None) or getattr(event, "calls", None) or []
        for call in calls:
            name = getattr(call, "name", None) or getattr(call, "tool", "tool")
            call_id = getattr(call, "id", None) or getattr(call, "call_id", "")
            args = getattr(call, "arguments", None) or getattr(call, "args", {})
            print(
                f"***** Suggested tool call ({call_id}): {name} *****",
                flush=True,
            )
            print(f"Arguments: {args}", flush=True)
            print(SEPARATOR, flush=True)

    def on_tool_results(self, event: ToolResultsEvent, **_: Any) -> None:
        results = (
            getattr(event, "tool_results", None)
            or getattr(event, "results", None)
            or []
        )
        if not results:
            content = getattr(event, "content", None)
            if content:
                print("***** Response from calling tool (tool) *****", flush=True)
                print(content, flush=True)
                print(SEPARATOR, flush=True)
            return
        for result in results:
            call_id = getattr(result, "id", None) or getattr(result, "call_id", "tool")
            content = getattr(result, "content", None) or getattr(result, "result", "")
            print(
                f"***** Response from calling tool ({call_id}) *****",
                flush=True,
            )
            print(content, flush=True)
            print(SEPARATOR, flush=True)

    def on_human_input_request(self, event: Any, **_: Any) -> None:
        """Emit Studio status markers when AG2 asks for human input via observers."""
        content = getattr(event, "content", None) or ""
        print("__STATUS_WAIT_FOR_HUMAN_INPUT__", content, flush=True)

    def as_observers(self) -> list[Any]:
        """Return AG2 observer callbacks suitable for ``Agent(..., observers=...)``."""
        obs: list[Any] = [
            observer(ModelResponse, self.on_model_response),
            observer(ToolCallsEvent, self.on_tool_calls),
            observer(ToolResultsEvent, self.on_tool_results),
        ]
        if HumanInputRequest is not None:
            obs.append(observer(HumanInputRequest, self.on_human_input_request))
        return obs


def make_studio_observer(
    agent_name: str = "Agent",
    peer_name: str = "User",
) -> list[Any]:
    return StudioObserver(agent_name, peer_name).as_observers()
