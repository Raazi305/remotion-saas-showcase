# 📋 Scripting Guide for Showcase Videos

**[繁體中文](./scripting-guide.zh-TW.md)** | English

A practical guide for planning, scripting, and producing SaaS showcase videos with Remotion — distilled from real production experience.

---

## 1. Script Structure

Every showcase video follows a consistent arc. Plan your scenes around this framework:

| Phase           | Purpose                            | Duration Guide           |
| --------------- | ---------------------------------- | ------------------------ |
| **Hook**        | Grab attention, state the problem  | 5–10 seconds             |
| **Core Flow**   | Walk through the main user journey | 30–90 seconds            |
| **Edge Cases**  | Show flexibility and self-service  | 10–20 seconds (optional) |
| **CTA / Outro** | Summarize value, call to action    | 5–10 seconds             |

### Tips

- **Start with the pain point**, not the product. "Ordering lunch in a group chat is chaos" beats "Welcome to our app."
- **One scene = one idea.** If a scene tries to show two features, split it.
- **Give the viewer breathing room.** Add 1-2 seconds of "dead time" between major transitions — it feels more natural and helps voiceover pacing.

---

## 2. Chapter Design Patterns

### Pattern A: Dual-Role Dialogue

Assign two personas — a **guide** and a **newcomer**. This creates a natural teaching flow.

```text
Guide: "Watch — I just tap here and the order is done."
Newcomer: "Wait, what if I need to change it later?"
Guide: "No problem, just tap 'Edit' before the cutoff."
```

**When to use:** Tutorials, onboarding flows, user-facing demos.

### Pattern B: Narrator + Screen Recording

A single narrator explains while the animated screen does the talking.

**When to use:** Admin panels, dashboards, technical features.

### Pattern C: Problem → Solution Montage

Rapid-fire pain points (3–5 seconds each), then a clean transition to the product solving them all.

**When to use:** Marketing videos, landing page heroes.

---

## 3. Voiceover Production

### AI Voice Generation

For rapid prototyping, AI tools like **Google NotebookLM**, **ElevenLabs**, or **OpenAI TTS** can generate natural-sounding voiceover.

#### NotebookLM Prompt Template

```markdown
[System Prompt: Generate a "Deep Dive" podcast-style conversation]

**Role**: Two hosts — lively, insightful, professional yet approachable.
**Language**: [Your target language]
**Topic**: [Your product] — [one-line description]
**Goal**: Explain the VALUE and PHILOSOPHY, not the UI steps.

## Structure Guide
### Phase 1: The WHY (Vision)
- Pain point: [describe the problem]
- Core value: [why this product exists]

### Phase 2: The HOW (Method)
- Key differentiators: [2-3 bullet points]

### Phase 3: The WHAT (Features)
- Feature groups with real-world analogies

### Phase 4: Conclusion
- Tie it all together, call to action
```

### Voiceover ↔ Animation Sync

| fps | 1 second  | Typical sentence (3–4 sec) | Paragraph (8–10 sec) |
| --- | --------- | -------------------------- | -------------------- |
| 30  | 30 frames | 90–120 frames              | 240–300 frames       |
| 60  | 60 frames | 180–240 frames             | 480–600 frames       |

**Golden Rule:** Always record/generate voiceover FIRST, then build animations to match. Never try to fit voiceover into pre-timed animations.

#### Workflow

1. Write the script
2. Generate voiceover audio
3. Measure audio duration per section
4. Set `durationInFrames` for each `<Sequence>` to match
5. Build animations within those time constraints

---

## 4. Scene Timing & Pacing

### Cursor Animation Timing

| Action             | Recommended Duration | Notes                              |
| ------------------ | -------------------- | ---------------------------------- |
| Move to target     | 0.5–0.8s (15–24f)    | Use spring easing, not linear      |
| Click              | 0.2s (6f)            | Brief scale + opacity pulse        |
| Type a character   | 0.05–0.1s (2–3f)     | Vary slightly for realism          |
| Pause after action | 0.3–0.5s (9–15f)     | Let the viewer register the result |
| Scene transition   | 0.5–1.0s (15–30f)    | Fade, slide, or spring             |

### Scene Duration Guidelines

| Scene Type         | Duration Range |
| ------------------ | -------------- |
| Simple form fill   | 5–8 seconds    |
| Dashboard overview | 8–12 seconds   |
| Multi-step flow    | 15–30 seconds  |
| Full feature demo  | 30–60 seconds  |

---

## 5. Production Checklist

### Pre-Production

- [ ] Define target audience (end-user? admin? investor?)
- [ ] Write script outline with chapter breakdown
- [ ] Decide on voice style (dialogue / narrator / silent)
- [ ] List all screens and states needed
- [ ] Determine total video duration budget

### Production

- [ ] Build scenes in isolation — test each `<Composition>` independently
- [ ] Record/generate voiceover and measure timings
- [ ] Align `<Sequence>` durations to voiceover timestamps
- [ ] Add cursor animations last (they depend on layout being finalized)
- [ ] Add background music at low volume (-15 to -20 dB under voice)

### Post-Production

- [ ] Review full video at 1x speed — check pacing feels natural
- [ ] Verify all text is readable (min 2 seconds on screen)
- [ ] Check color contrast on both light and dark backgrounds
- [ ] Export at target resolution (1920×1080 for YouTube, 1080×1920 for mobile)
- [ ] Add captions/subtitles if targeting international audience

---

## 6. Common Pitfalls

| Pitfall                         | Fix                                                              |
| ------------------------------- | ---------------------------------------------------------------- |
| Animation too fast              | Slow down 30%. What feels right in dev feels rushed in playback. |
| Too many features in one video  | Pick 3–5 key features. Save the rest for Part 2.                 |
| Voiceover doesn't match visuals | Record voice first, animate second.                              |
| No visual hierarchy             | Use `Indicator` component to guide the eye.                      |
| Forgot mobile viewers           | Test readability at 50% zoom.                                    |
| Background music too loud       | Keep at -15dB or lower under voiceover.                          |
