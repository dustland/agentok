"""Illustrative AG2 1.0 flow-shaped script (hand-written mirror of Studio codegen)."""

import asyncio
import json
import os
import tempfile

import ag2
from ag2 import Agent
from ag2.knowledge import MemoryKnowledgeStore
from ag2.network import EV_CHANNEL_CLOSED, Hub, Passport, Resume

from agentok_api.ag2_compat.config_loader import load_model_configs
from agentok_api.ag2_compat.hitl import studio_hitl_hook
from agentok_api.ag2_compat.studio_observer import make_studio_observer
from ag2.tools import SandboxCodeTool
from ag2.tools.sandbox import LocalEnvironment

print("ag2", ag2.__version__)

temp_dir = tempfile.gettempdir()


async def main() -> None:
    message = os.environ.get("AGENTOK_MESSAGE", "Hello from flow2py.")
    configs = load_model_configs()
    if not configs:
        raise SystemExit("Configure OAI_CONFIG_LIST before running.")

    assistant = Agent(
        "Assistant",
        prompt="You are a helpful assistant.",
        config=configs[0],
        observers=make_studio_observer("Assistant", "User"),
    )
    user = Agent(
        "User",
        config=None,
        hitl_hook=studio_hitl_hook,
        tools=[SandboxCodeTool(LocalEnvironment(os.path.join(temp_dir, "user_code")))],
        observers=make_studio_observer("User", "Assistant"),
    )

    hub = await Hub.open(MemoryKnowledgeStore())
    user_c = await hub.register(user, Passport(name=user.name), Resume())
    asst_c = await hub.register(assistant, Passport(name=assistant.name), Resume())

    channel = await user_c.open(type="consulting", target=asst_c.agent_id)
    await channel.send(message)
    await user_c.wait_for_channel_event(
        channel_id=channel.channel_id,
        predicate=lambda e: e.event_type == EV_CHANNEL_CLOSED,
        timeout=120.0,
    )

    history = []
    for envelope in await hub.read_wal(channel.channel_id):
        text = (envelope.event_data or {}).get("text") or ""
        if text:
            history.append({"role": "assistant", "content": text})
    print(
        "__CHAT_RESULT__",
        json.dumps(
            {
                "chat_id": channel.channel_id,
                "chat_history": history,
                "summary": history[-1]["content"] if history else "",
                "cost": {},
                "human_input": [],
            }
        ),
    )
    await hub.close()


if __name__ == "__main__":
    asyncio.run(main())
