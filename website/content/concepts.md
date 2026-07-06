---
position: 1
title: Concepts
description: Key concepts you should know before using Agentok Studio.
---

# Concepts

This article introduces the concepts behind AG2 and Agentok Studio. Some material is adapted from the [AG2 documentation](https://docs.ag2.ai/) for convenience.

For the full picture, see [AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation Framework](https://arxiv.org/pdf/2308.08155.pdf) (Wu et al., ArXiv 2023).

## AG2 and Agentok Studio

AG2 provides a unified multi-agent conversation framework—a high-level abstraction for building with foundation models. It features capable, customizable, conversable agents that integrate LLMs, tools, and humans through automated agent chat. By automating chat among multiple agents, you can perform tasks autonomously or with human feedback, including tasks that require code execution.

Agentok Studio is a visual layer on top of AG2. You design workflows on a canvas, run chats in the browser, and export Python that uses the official `ag2` library.

## Types of Agent

This diagram shows the basic agent model in AG2, which Agentok Studio inherits:

![AG2 agent types](https://microsoft.github.io/autogen/assets/images/autogen_agents-b80434bcb15d46da0c6cbeed28115f38.png)

There are three common agent roles:

- **Assistant Agent**: Acts as an AI assistant using an LLM. It can write Python code blocks for the user or executor to run, receive execution results, and suggest fixes. Behavior can be changed with system messages and `llm_config`.

- **UserProxy Agent**: Stands in for a human by default, can execute code when it detects a code block, and can call tools. Code execution is controlled via `code_execution_config`. LLM replies are off by default but can be enabled with `llm_config`.

- **GroupChat Manager**: Orchestrates multi-agent group conversations, deciding which agent speaks next.

## Where to go next

- [Getting Started](/docs/getting-started) — build your first workflow
- [Studio Features](/docs/guides/build) — canvas, tools, codegen, templates
- [AG2 conversation patterns](https://docs.ag2.ai/docs/tutorial/conversation-patterns)
