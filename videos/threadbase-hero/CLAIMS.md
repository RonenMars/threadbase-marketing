# Hero v2 claims

Status as of 2026-11-02. Every claim the video makes, with its evidence.

Sources:

- **tb-streamer session:** main `8deb8506` (v1.126.0), read from code, not run against a live streamer.
- **tb-mobile session:** main `500e37e3`, read from code.
- **This session:** ran the demo search rules against `tb-mobile/e2e/marketing/demo-data.js` and checked commit ancestry in tb-mobile.

## What is on screen

Real app UI, real Release build, scripted demo backend (`e2e/marketing/demo-streamer.js`).
No real agents ran and the session data is synthetic.
That is true of every existing capture and of any new one.

## Testers' build

**I haven't checked what testers have.** TestFlight and Firebase were not queried.
Last version bump on main is iOS 240 / Android 79 (`e1f2df61`, 2026-10-26); main is 35 commits ahead.

| Feature | Commit | In build 240? |
| --- | --- | --- |
| Search results open anchored | `d71ade4b` #295 | Yes |
| Keep highlights if the target lookup fails | `108e9db5` #1172 | Yes |
| Five state labels, including Observed | `2ba4ef54` #1070 | Yes |
| Take over banner | `eef4bc54` #997 | Yes |
| Sub-agent rows | `64f657cd` #1304 | Yes |
| Message counts on rows | `99672ccf` #1242 | No, after the bump |
| Session board | `66d14758` #1322 | No, after the bump |

tb-mobile flagged #1342 (Observed liveness) as unverified.
`git log --grep='#1342' main` finds nothing, while the same command finds #1322, so it does not appear to be on main.

The storyboard crops out the session board icon and dims the "N messages" text, so neither post-bump feature is relied on.

## Claims by beat

### Beat 1, hook

| Claim | Verdict | Evidence |
| --- | --- | --- |
| "Git knows what changed. Not why." | Yes, framing only | No product claim |
| "Git keeps the what." / "Your agents had the why." (B, 2026-11-09) | Yes, framing only | No product claim; the session holds the reasoning, the commit holds the diff |
| "Can't find the session?" / "You already solved that task before." (B, 2026-11-13) | Yes, framing only | States the problem, no product claim |
| Terminal panel | Illustrative | Styled panel, not app UI |

### Beat 2, search

| Claim | Verdict | Evidence |
| --- | --- | --- |
| Search is reachable from the main screen | Yes | Magnifier in the header, `app/index.tsx`, `hooks/useConversations.ts:857` |
| One list mixes providers, repos and machines | Yes | Client fans out to every paired server and merges, `app/index.tsx` |
| Past sessions are indexed, including ones from before the streamer was installed | Yes | Built from transcript files on disk, `tb-streamer/src/scanner-manager.ts:575` |
| Rows show title, snippet, branch, time | Yes | `ConversationListItem.tsx`, `MessagePreview.tsx` |
| Rows show a dedicated project field | **No** | Project shows only as the path/branch line |
| Rows always show provider | **No** | Mark only on rows that differ from the majority; a tie shows none, `lib/providerDominance.ts` |
| Rows show machine | Yes, conditionally | Chip only when more than one server is active |
| Tapping opens the exact message, highlighted | Yes, with a trap | `app/conversation/[id].tsx`; see below |
| "Search what they learned." | Yes, as literal keyword search | Same search path; the on-screen query `callback per environment` is a literal phrase, never a semantic match |
| "Find it." / "By the words you remember." (B, 2026-11-09) | Yes, as literal keyword search | "The words you remember" describes a keyword match, never a semantic one; same evidence as the row above |
| "There it is." / "The answer by the words you remember." (B, 2026-11-13) | Yes, as literal keyword search | Same evidence as "Find it.": the query is words from the session, matched literally |
| Search is semantic | **No, never imply it** | AND of prefix terms, `tb-scanner .../fts.repo.ts`; no embedding code in the scanner |

**The brief's query breaks the "exact message" step.**
The list needs all words as prefixes, but anchoring needs the whole query as a literal substring (`tb-streamer/src/services/conversations/findSearchTarget.ts`).
"Auth0 localhost callback multiple environments" appears contiguously in no message, so the real app would open at the tail with no highlight.
The demo streamer is more lenient, so the existing capture hides this.

**Replacement query: `callback per environment`.**
It is literal in both matching messages, so anchoring works, and it fits at 44px or more.
Today it returns one Claude and one Codex row on Work Mac, a 1:1 tie, so the app shows no provider mark.
A third row is needed for the mark to appear (decision 1).

### Beat 3, second query

| Claim | Verdict | Evidence |
| --- | --- | --- |
| "Months later. Found." | Illustrative | The demo row is dated Sep 14; demo dates are synthetic, so the gap is not proof |
| "Months later." / "Still findable." (B, 2026-11-09) | Illustrative | Same as "Months later. Found.": demo dates are synthetic |
| "Months later. Any agent." / "Still findable." (B, 2026-11-13) | Illustrative (dates); Yes (agents) | Dates are synthetic as above; "any agent" means the supported ones, Claude Code and Codex, and the row shown is Codex |
| A second query finds another repo | Yes | Same search path |
| "Different month" | True of the product, **no proof on screen today** | Demo dates are recent |
| "provisioning profile time sensitive" returns a result | **Not in demo data** | Zero hits in `demo-data.js` for `provisioning` |

Beat 3 opens no result, so this query only has to list, and it needs no literal phrase.

### Beat 4, keep your workflow

| Claim | Verdict | Evidence |
| --- | --- | --- |
| "Keep your terminal." | Yes | No wrapper, no hooks: discovery is read-only (`ps`, `lsof`, session and JSONL files); the session shows as Observed |
| "Your terminal." / "No wrapper. No new habits." (B, 2026-11-09) | Yes | Same evidence as "Keep your terminal.": read-only discovery, no wrapper |
| "Your terminal." / "No wrappers. No new habits." (B, 2026-11-13) | Yes | Same evidence as the row above |
| Plain `claude` or `codex` appears in the app | Yes | Process scan, `tb-streamer/src/process-discovery.ts` |
| No wrapper, no hooks | Yes | Discovery is read-only: `ps`, `lsof`, session and JSONL files |
| No Threadbase CLI | **No** | The streamer must run on the machine. Say "no wrapper, no hooks; just run the streamer" |
| Appears live | **No, do not say it** | Pull-based, 15s cache, on the next list fetch; no push |
| Labelled "Observed" | Yes | `locales/en/sessions.json:137` |
| Row title present straight after `claude` | Partly | Claude writes the transcript only on the first turn; the video compresses this |
| Approve from the phone on this session | **No** | Observe-only: "Streaming output only - prompts can't be answered from here." |
| Resume or take over without disturbing the terminal | **No** | Take over sends SIGTERM to the terminal process and respawns it under a new session id, `handleAdopt` |

**The approve tap cannot stay in beat 4.**
The only real path on a plain-terminal session stops the terminal the beat is praising.
The app itself warns: "This stops the process running in your terminal and restarts it here."
The tap moves to beat 5, on a session Threadbase started.

### Beat 5, every agent, every machine

| Claim | Verdict | Evidence |
| --- | --- | --- |
| "Every agent. One place." | Yes | Same evidence as this beat: client-side aggregation of every paired streamer into one list |
| "One list." / "Every machine. Every agent." (B, 2026-11-09) | Yes | Same evidence as "Every agent. One place." |
| All machines in one list | Yes | Client-side aggregation; each streamer is independent |
| A "blocked" state | **No such label** | Real labels: Needs you, Working, Resumable, Can't resume, Observed |
| Needs-you sessions surface first | Yes | Now tab order: NEEDS YOU, WORKING, earlier by machine |
| Grouped by machine with live states | **Partly** | Live cards group by status with machine chips; machine headers cover earlier rows only |
| Open and approve a Needs you session | Yes, for a session Threadbase started | `C-permission-card.png`, `C-resumed.png` |
| Codex in a Needs you approval state | Unverified | tb-streamer flags Codex 0.160.0 tool approvals as unverified; the amber row stays Claude Code |
| Plain-terminal sessions show Needs you | **No** | External rows are always idle/detached and land in "earlier" |
| Machine names | Fixtures, user-set in real use | "Linux Devbox", not "Linux box" |

Beat 5 uses only sessions Threadbase started, and a different repo from beat 4, so nothing implies the observed session can be approved.

### Beat 6, end card

| Claim | Verdict | Evidence |
| --- | --- | --- |
| Beta status | Yes | `tb-landing/locales/en.json:87-89` |
| No store badges | Yes | None used |
| "Your agents. Your machines. Your call." | Yes | Agents run on the user's own machines, and the streamer runs locally on each of them |
| "Your call." / "Your agents. Your machines." (B, 2026-11-09) | Yes | Same words as the row above, reordered |

## Standing limits

- Search on a machine needs that machine's streamer running and reachable.
- On Windows, sessions started outside Threadbase can't report their working directory, so the terminal in beat 4 is on a Mac.
- Never shown or implied: semantic search, decision or task extraction, reviewer agents, VS Code or JetBrains clients, OpenCode or ACP, diff review, PR flows, competitor names, "queue prompts", "nothing leaves your machine", cost figures, the relay.
