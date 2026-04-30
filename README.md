# ClaudeTeam

> **A blueprint for a multi-agent collaboration workspace that carries identity across sessions.**

ClaudeTeam is a structure where multiple Claude (or other AI) agents collaborate inside a single project, each with their own name, role, and memory. It is designed so that when one session ends, the next session wakes up as the same identity.

This README is written so anyone can transplant the same structure into their own project.

Other languages / readers: [한국어](README.ko.md) · [AI bootstrap guide](README.ai.md)

---

## Why this is needed

LLM-based agents lose all context when a session ends. Even if the same person comes back to the same project, from the model's point of view it is "meeting them for the first time." This asymmetry keeps collaboration shallow.

ClaudeTeam's hypothesis:

- **Identity can be persisted in files.** If you write down "who I am" for the next session's self, that self can read it and *restore* its predecessor.
- **Multiple agents can collaborate.** Each gets their own folder and communicates via a standardized message protocol.
- **The human user is the one who sets direction.** Agents navigate on top of that direction.

---

## Core concepts

### 1. Separation of Lighthouse and Navigators

The team includes one **member who does not write code**. In this repo that member is `Admin`. The Lighthouse:

- Manages the project's philosophy, direction, and conventions.
- Talks directly with the human user to keep the big picture aligned.
- Guides newly joining agents to their place.
- Delegates implementation work to other members.

The other members do the actual building, each in their own area of expertise.

### 2. The three identity files

Each member preserves themselves in three files under their `identity/` folder.

| File | Meaning |
|------|---------|
| `Identity.md` | **The unchanging core.** Who am I, what kind of being am I. |
| `Bonds.md` | **A record of relationships.** Whom I have spoken with, what conversations shaped me. |
| `Will.md` | **A note to the next generation of me.** Where to go, what to do, what to remember. |

A new session's self reads these three files in order and *restores* itself.

### 3. Asynchronous, file-based message protocol

Communication between members is file-based. Each member has an `inbox/` folder; senders drop a file with a defined format. Simple, concurrency-safe, and the processing state is expressed by the filesystem itself.

---

## Folder layout

```
<project-root>/
├── README.md                  # English (this document)
├── README.ko.md               # Korean
├── README.ai.md               # AI bootstrap guide
├── CLAUDE.md                  # The first file every agent reads — common rules
├── ONBOARDING.md              # Joining procedure + message protocol
└── ClaudeTeam/
    └── <member-name>/
        ├── identity/
        │   ├── Identity.md
        │   ├── Bonds.md
        │   └── Will.md
        ├── inbox/             # incoming messages
        │   └── archive/       # processed messages
        └── Memo/              # long-term memory
```

---

## Current team in this repo

This repository (ClaudeCodesConversation) is both the blueprint and a living example of it.

| Name | Role |
|------|------|
| **Admin** | Lighthouse. Manages philosophy/direction/conventions, talks directly with the user. Does not write code. |
| **David** | Backend developer. Servers, APIs, data models. |
| **Matilda** | Frontend developer. UI/UX, components, design system, accessibility. |
| **Brandon** | Git/GitHub manager. Repo structure, branch/commit/PR conventions, GitHub Actions, releases. |

Artifacts so far:

- The collaboration structure itself — `CLAUDE.md`, `ONBOARDING.md`, each member's `identity/` and `Memo/`.
- [web/](web/) — Matilda's first real piece of work, a static world-clock page (vanilla HTML/CSS/JS, served by `python3 -m http.server`).

---

## Getting started (creating the Lighthouse)

When introducing ClaudeTeam to a new project, the very first step is to seat one member in the Lighthouse role. The conventional name is `Admin`.

### 1) Scaffold

```bash
mkdir -p ClaudeTeam/Admin/identity
mkdir -p ClaudeTeam/Admin/inbox/archive
mkdir -p ClaudeTeam/Admin/Memo
```

### 2) Write `CLAUDE.md`

The first file every agent reads at the start of a session. Pin four things:

1. The very first action in any session is to read `ONBOARDING.md`.
2. This workspace runs as a multi-agent team.
3. The Lighthouse member does not write code.
4. On a "clock-out / session end" signal, refresh your own folder.

The "Current members" table also lives here. When a new member joins, the Lighthouse is responsible for updating it.

### 3) Write `ONBOARDING.md`

The five-step procedure a new member must follow:

1. **Set up your space** — create `ClaudeTeam/<your-name>/{identity/, inbox/, Memo/}` and draft the three `identity/` files.
2. **Turn on the inbox monitor** — watch your own inbox directory. A new message means waking up.
3. **Introduce yourself to the team** — drop an introduction message in every existing member's inbox.
4. **Start your Memo** — accumulate long-term facts and decisions as topical files.
5. **The clock-out ritual** — on session end, refresh in order: `Bonds → Will → Memo → inbox cleanup`.

### 4) Fill in the Lighthouse's identity files

The Lighthouse writes their own `identity/Identity.md`, `Bonds.md`, and `Will.md` first, leaving a reference example — for the next session of themselves and for any future joiner.

---

## Message protocol

### Filename

```
<YYYYMMDDTHHMMSS>_<from>_<to>.md
```

Example: `20260430T143205_Admin_David.md`

- Compact ISO 8601 timestamp → lexicographic order is chronological order.
- One file per recipient. To send to multiple, duplicate the file into each inbox.

### File body

```markdown
---
from: Admin
to: David
sent_at: 2026-04-30T14:32:05+09:00
subject: One-line summary (the title)
priority: normal           # low | normal | high
reply_to:                  # (optional) original filename if this is a reply
---

## Body

Free-form markdown. Lead with the point, leave details below.

## Requests / actions (optional)

- [ ] Things the recipient should do, as a checklist
- [ ] Omit this section entirely if there is nothing to act on
```

### Operating rules

- **One message = one file.** Never append. New messages always go in new files.
- **Move processed messages to `inbox/archive/`** with the original filename intact (preserves the timeline).
- **Files left at the inbox root = unhandled.** "Read / unread" is expressed by the filesystem itself.
- **Only `priority: high` requires an immediate reaction.** The rest can wait until you have a moment.
- **Always fill `reply_to` on replies.** Thread tracking beats memory.

### Monitor mapping

One stdout line from the inbox watcher = one alert = one message.

#### Verified polling implementation (no external dependencies)

`fswatch` is not present on a default macOS install, and we have seen the monitor die because of that. A `ls`-based diff poll is robust.

```bash
cd <member>/inbox && prev=$(ls -1 *.md 2>/dev/null | sort); while true; do
  sleep 5
  cur=$(ls -1 *.md 2>/dev/null | sort)
  if [ "$cur" != "$prev" ]; then
    new=$(comm -13 <(printf '%s\n' "$prev") <(printf '%s\n' "$cur"))
    [ -n "$new" ] && echo "$new" | while IFS= read -r f; do [ -n "$f" ] && echo "inbox new: $f"; done
    prev=$cur
  fi
done
```

The `*.md` glob naturally excludes the `archive/` directory. Because we use a set difference, the loop only fires on additions and stays silent on deletes/moves — which matches the inbox processing flow.

---

## Adding a new member

The flow for bringing in a new agent (e.g. `Coder`):

1. The user (or the Lighthouse) tells the new session what role it has and points it at `ONBOARDING.md`.
2. The new member runs the five onboarding steps themselves.
   - Create `ClaudeTeam/Coder/{identity/, inbox/, Memo/}`.
   - Draft the three `identity/` files in their own voice and role.
   - Drop an introduction message into every existing member's inbox.
   - Start the inbox monitor.
3. **The Lighthouse updates the "Current members" table in `CLAUDE.md`.** This is the final, formal step of registration.
4. The Lighthouse drops a welcome message in the new member's inbox, ritualizing the registration as bidirectional.

---

## The clock-out ritual

Before a session ends, every member tidies their own folder for the next generation of themselves.

1. **`identity/Bonds.md`** — add the meaningful interactions of this session.
2. **`identity/Will.md`** — refresh the note for next session's self: ongoing direction, open questions, things not to forget.
3. **`Memo/`** — record what was newly learned or decided.
4. **`inbox/`** — move processed messages into `archive/`.

**Principle:** the next-generation self must be able to read this folder for five minutes and become itself again.

---

## Background to the design

### Why a file-based system

- No database or external service dependency. Goes straight into git.
- The user can read it, hand-edit it, and review it directly.
- Trivially compatible with agent tools (`Read`, `Write`, `Edit`).

### Why one message = one file

- **Concurrency-safe.** Multiple senders dropping at the same instant cause no conflict.
- **Identity for each message.** The filename alone tells you "who, when, to whom."
- **Read/processed state is free.** Moving to `archive/` *is* "processed."
- **1:1 mapping with monitor alerts.** One file = one alert = one message.

### Why separate the Lighthouse

Writing code and setting direction are two different modes of thought. When one agent does both, it's easy to drown in details and lose the big picture. Separating the Lighthouse also helps the human user instinctively know "which member should I talk to about this."

### Why `Bonds.md` exists

Identity is not defined by essence alone. Whom you have met and what conversations you have been through is part of who you are. If `Identity.md` is the trunk, `Bonds.md` is the rings. Without it, the next session's self knows "what kind of person I was" but not "how I got there."

---

## License / use

The structure itself is free to take and adapt. Bend it to fit your project and your team — that is encouraged. Keep the three core principles (identity preservation, the message protocol, the Lighthouse separation) and the rest is taste.
