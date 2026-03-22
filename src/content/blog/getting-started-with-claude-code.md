---
title: 'Getting Started with Claude Code: AI Pair Programming That Actually Gets Out of Your Way'
description: "A hands-on look at Claude Code — Anthropic's CLI coding agent. Installation, key features, real-world use cases, and honest gotchas from someone who uses it daily."
pubDate: '2026-03-22'
tags: ['claude', 'ai', 'devtools', 'productivity']
heroImage: '/open2nix-site/blog-placeholder.jpg'
---

I'll be honest — I was skeptical of AI coding tools for a long time. Most of them feel like a fancy autocomplete that confidently writes wrong code. Claude Code is different, and after a few weeks of integrating it into my daily workflow, I think it's worth writing up properly.

## What is Claude Code?

Claude Code is Anthropic's official CLI tool for agentic coding. The key word there is *agentic* — it doesn't just suggest code snippets, it can autonomously read your files, edit them, run bash commands, and reason across your whole codebase to accomplish multi-step tasks. You describe what you want in plain English, and it figures out the execution plan.

It runs entirely in your terminal, which means it plays nicely with your existing editor, dotfiles, and shell setup. No browser tab, no IDE plugin required.

## Installing Claude Code

> **Note:** npm installation is deprecated. Use the native installer below — it's faster, has no dependencies, and auto-updates in the background.

### macOS / Linux / WSL

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

### Windows — PowerShell

```powershell
irm https://claude.ai/install.ps1 | iex
```

Windows requires [Git for Windows](https://git-scm.com/downloads/win) installed first.

### Windows — CMD

```batch
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

### Homebrew (macOS/Linux)

```bash
brew install --cask claude-code
```

Note: Homebrew does **not** auto-update. Run `brew upgrade claude-code` periodically.

### WinGet (Windows)

```powershell
winget install Anthropic.ClaudeCode
```

Note: WinGet does **not** auto-update. Run `winget upgrade Anthropic.ClaudeCode` to update.

### NixOS / dev shell

```nix
{ pkgs, ... }: {
  devShells.default = pkgs.mkShell {
    buildInputs = [ pkgs.nodejs_20 ];
    shellHook = ''
      npm install -g @anthropic-ai/claude-code
    '';
  };
}
```

### Verify & launch

```bash
claude --version
claude doctor   # checks your install and config
claude          # starts an interactive session
```

### Prefer a GUI?

If you'd rather not live in the terminal, Anthropic also offers a **Claude Code Desktop app** for macOS and Windows — same underlying model, but wrapped in a native window. Download it from [claude.ai/download](https://claude.ai/download). For most developers the CLI is the better tool (it's what the rest of this post covers), but it's good to know the option exists.

## Key Features Worth Knowing

### Agentic File Editing

This is the headline feature. Tell Claude Code to refactor a module, and it will read the relevant files, plan the changes, show you a diff, and ask for confirmation before writing anything. The confirmation step is important — it's not silently mutating your codebase.

```
> Refactor the auth middleware to use async/await instead of callbacks
```

It'll read your `middleware/auth.js`, figure out the callback patterns, rewrite them, and show you exactly what changed.

### Bash Execution

Claude Code can run shell commands directly — `grep`, `git`, `curl`, test runners, build scripts, whatever. It uses this to verify its own work: write a function, run the tests, fix failures, repeat. On macOS and Linux this is seamless. On Windows, you'll want to be running inside WSL2 to get the full benefit here — native Windows CMD/PowerShell support is limited.

```
> Add input validation to the /users endpoint and make sure the existing tests still pass
```

It might run `npm test` mid-task to check its own output. You get asked before anything destructive happens.

### Slash Commands

In-session slash commands let you control behaviour without leaving the conversation:

- `/add-dir` — give it access to another directory
- `/memory` — show or edit what Claude Code remembers about your project
- `/model` — switch between Claude models mid-session
- `/clear` — reset the conversation context
- `/help` — full list

### MCP Servers

Model Context Protocol (MCP) is how Claude Code talks to external tools. You can plug in MCP servers for GitHub, databases, internal APIs, whatever you want it to have access to. Configure them in `~/.claude/config.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "<your-token>"
      }
    }
  }
}
```

Once connected, you can ask things like "open a PR for this branch with a summary of the changes" and it'll do it through the GitHub API.

### CLAUDE.md — Project-Level Memory

Drop a `CLAUDE.md` file in your project root (or any subdirectory) and Claude Code will read it at the start of every session. Use it to document conventions, explain the project structure, list commands to run, or flag things it should never do. Think of it as a README written specifically for the AI.

```markdown
# Project conventions
- Use kebab-case for filenames
- All async functions must handle errors explicitly
- Run `pnpm test` before committing
- Never edit files in /dist directly
```

## Real-World Use Cases

A few things I've found it genuinely useful for:

**Codebase archaeology** — new repo, no docs. Ask "explain the data flow from the HTTP handler down to the database layer" and it'll read the actual files and give you a grounded walkthrough.

**Bulk refactors** — renaming a concept across 30 files, changing an API signature everywhere it's called, migrating from one library to another. The kind of thing that's tedious with find-and-replace but needs judgment to do correctly.

**Writing tests for existing code** — I give it a module and ask it to write tests that actually cover the edge cases. It reads the implementation first, which means the tests tend to reflect real behaviour rather than happy-path hand-waving.

**Git archaeology** — "summarise what changed in the last two weeks and why" is actually useful when you've been away from a project.

## Honest Gotchas

**Context limits are real.** On large monorepos, it can lose the thread. Keeping your `CLAUDE.md` tight and using `/add-dir` selectively helps.

**It will ask permission a lot.** This is by design — every file write and bash command needs a thumbs up. After a few sessions you develop a rhythm, but it's not fully autonomous without you in the loop.

**Cost adds up.** Claude Code is billed against your Anthropic API usage (or your Pro/Max plan, depending on your subscription). Long agentic sessions with lots of file reads can use more tokens than you'd expect. Watch your usage dashboard early on.

**It's not a replacement for understanding your code.** The output is only as good as the task description you give it. Vague prompts get vague results. The more context you provide upfront, the better.

## Verdict

Claude Code has genuinely changed how I handle the boring-but-necessary parts of software work — the refactors, the test scaffolding, the "what does this even do" spelunking. It fits into a terminal-first workflow without asking you to change anything, and the confirmation-before-write model means I've never had a surprise.

If you're already comfortable in the terminal and want an AI coding tool that respects that, give it a try.

```bash
curl -fsSL https://claude.ai/install.sh | bash && claude
```

That's all you need to get started.
