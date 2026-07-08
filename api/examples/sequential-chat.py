"""AG2 1.0 sequential / multi-recipient style chat example."""

import asyncio
import json

import ag2
from ag2 import Agent
from ag2.knowledge import MemoryKnowledgeStore
from ag2.network import EV_CHANNEL_CLOSED, Hub, Passport, Resume, TransitionGraph

from agentok_api.ag2_compat.config_loader import load_model_configs

print("ag2", ag2.__version__)


async def main() -> None:
    configs = load_model_configs()
    if not configs:
        raise SystemExit("Provide OAI_CONFIG_LIST with at least one model config.")

    cfg = configs[0]
    planner = Agent("planner", prompt="You create concise plans.", config=cfg)
    writer = Agent("writer", prompt="You write short copy from plans.", config=cfg)
    user = Agent("user", config=None)

    hub = await Hub.open(MemoryKnowledgeStore())
    user_c = await hub.register(user, Passport(name="user"), Resume())
    planner_c = await hub.register(planner, Passport(name="planner"), Resume())
    writer_c = await hub.register(writer, Passport(name="writer"), Resume())

    results = []
    for recipient, message in [
        (planner_c, "Plan a three-bullet outline about renewable energy."),
        (writer_c, "Turn the previous plan into a one-paragraph summary."),
    ]:
        graph = TransitionGraph.round_robin(
            participants=[user_c.agent_id, recipient.agent_id],
            max_turns=2,
        )
        channel = await user_c.open(
            type="workflow",
            target=recipient.agent_id,
            knobs={"graph": graph.to_dict()},
        )
        await channel.send(message)
        await user_c.wait_for_channel_event(
            channel_id=channel.channel_id,
            predicate=lambda e: e.event_type == EV_CHANNEL_CLOSED,
            timeout=180.0,
        )
        wal = await hub.read_wal(channel.channel_id)
        texts = [
            e.event_data.get("text", "")
            for e in wal
            if getattr(e, "event_data", None) and e.event_data.get("text")
        ]
        results.append({"summary": texts[-1] if texts else "", "history": texts})

    print("__CHAT_RESULTS__", json.dumps(results))
    await hub.close()


if __name__ == "__main__":
    asyncio.run(main())
