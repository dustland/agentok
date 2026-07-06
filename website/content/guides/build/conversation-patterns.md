# Conversation Patterns

In AG2, *who talks to whom* shapes the behavior of a multi-agent app. Agentok Studio models this with **edges** between nodes.

## Sequential chat

Connect two agents with a directed edge to create a one-to-one conversation path. The source agent can hand off messages to the target agent.

![Sequential chat with tool configuration on an edge](/images/screenshot/sequential-chat.png)

This pattern fits pipelines: a planner hands work to an executor, or an assistant passes code to a user proxy for execution.

## Group chat

Place multiple agents inside a **Group** node to run a GroupChat. One agent (often a manager) decides who speaks next.

![Group chat workflow](/images/screenshot/group-chat.png)

Group chat suits open-ended collaboration — brainstorming, debate, or multi-role problem solving.

## Tools on edges

To let an agent call a tool during a conversation, attach the tool to the **edge** between the speaking agent and the executor.

The LLM chooses which tool to invoke; the edge configuration tells the runtime which node runs it. This is why tool placement on connections matters — not just on individual agents.

Configure tools on an edge from the edge property panel after selecting the connection.

## AG2 patterns reference

Agentok Studio supports the conversation patterns documented in AG2:

- Two-agent chat (user proxy + assistant)
- Sequential chats with multiple assistants
- Group chat with a manager
- Nested chats via custom functions (see [Ask Planner](/docs/examples/ask-planner))

For the underlying theory, see [AG2 conversation patterns](https://docs.ag2.ai/docs/tutorial/conversation-patterns).

Next: [Tools](/docs/guides/build/tools)
