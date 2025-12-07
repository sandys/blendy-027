# Continuous Phonation & Phoneme Synthesis Architecture

**Status:** Implemented (v1.0)
**Date:** Nov 24, 2025

This document outlines the architectural decisions, algorithms, and trade-offs used to build the high-fidelity phoneme synthesis engine for the Blendy web app.

## 1. The Core Challenge: Natural Phonics Audio

We needed an audio system that could:
1.  **Play individual phonemes** (`p`, `a`, `t`) clearly.
2.  **Sustain sounds infinitely** while a child holds their finger (e.g., "mmmmm").
3.  **Blend sounds naturally** without robotic gaps or "machine-gun" stuttering.
4.  **Avoid artifacts** like letter names ("eff" instead of "ffff").

## 2. Solution: The "Baked Loop" Synth

Instead of relying on real-time TTS (too slow) or simple file playback (no infinite sustain), we built a custom **Phoneme Synth** based on the Web Audio API.

### A. Asset Generation (`build-phonemes.ts`)
We use **Piper (Neural TTS)** in a Docker build step to generate "raw materials", which we then surgically process into "instruments".

*   **Plosives (p, b, t, k):** Generated as short bursts (`lengthScale=1.2`). We keep the first ~180ms.
*   **Continuants (m, n, s, f) & Vowels:** Generated as sustained sounds (`lengthScale=5.0`).
    *   **Contextual Generation:** To prevent artifacts like "eff" or "uh-n", we generate fricatives in a CV context (e.g., "fa" -> `[[f æ]]`) and extract the initial consonant segment (10%-45%).
    *   **Seamless Looping:** We use a **Crossfade Loop** algorithm during the build. We take a stable middle section of the generated audio and blend the end into the start (30-50ms crossfade). This "bakes" the loop into the PCM data, guaranteeing click-free infinite looping in the browser.

### B. The Engine (`PhonemeSynth.ts`)
A lightweight TypeScript class that loads the `phonemes.bin` (raw PCM) and `phonemes.json` (manifest).

*   **Zero Latency:** All assets are decoded on load.
*   **Dual Mode Playback:**
    *   **One-Shot:** For plosives. Plays once, then stops.
    *   **Seamless Loop:** For continuants. Uses Web Audio `loop=true` on the pre-processed seamless buffers.
*   **Envelope Control:** Uses an ADSR gain envelope to smooth attacks and releases (50ms fade-out), preventing clicks when the user lifts their finger.

## 3. Pedagogical Logic: Connected Phonation

We implemented **Connected Phonation** (Coarticulation) to model how real speech blends stops into vowels.

### The Rule
> *A plosive cannot be sustained. It only exists as a release into the next sound.*

### The Algorithm (in `FingorGame`)
When the user triggers a phoneme:

1.  **If Plosive (e.g., `p` in "pin"):**
    *   Play `p` as a **One-Shot**.
    *   **Immediately** (with ~20ms overlap) trigger the *next* phoneme (e.g., `i`) in **Continuous Mode**.
    *   **Visuals:** Highlight *both* the plosive and the next grapheme to show the connection.
    *   *Result:* "p...iii..." (The `p` burst flows directly into the sustained `i`).

2.  **If Continuant/Vowel (e.g., `i` or `n`):**
    *   Play as a **Continuous Loop** for as long as the user holds.
    *   *Result:* "iiiiii" or "nnnnnn".

## 4. Technical Trade-offs & Fixes

| Problem | Cause | Fix |
| :--- | :--- | :--- |
| **"Chipmunk" Sound** | `build-phonemes.ts` used 22kHz default, but Piper model was 16kHz. | Set `SAMPLE_RATE = 16000` to match model. |
| **"Machine Gun" Stutter** | Naively looping a short speech sample without crossfading. | Implemented **Baked Crossfade Loops** in build step. |
| **"Weird" Hallucinations** | Stretching TTS too far (`lengthScale=20`) causes model collapse. | Reduced `lengthScale` to `5.0` (approx 1s), which is stable. |
| **"Eff" / "In" Artifacts** | Generating isolated `[[f]]` makes model say letter name or add schwa. | **Contextual Generation:** Generate `[[f æ]]`, extract `f`. |
| **Stale Audio in Browser** | Browser cached `phonemes.json`/API responses aggressively. | Added `Cache-Control: no-store` to API and timestamp query params to asset fetchers. |

## 5. Future Improvements

*   **Cluster Timing:** Implement specific timing rules for onset/coda clusters (e.g., shorten the `s` in `st`).
*   **Dynamic Pitch:** Use `detune` to slightly vary pitch for repeated notes to avoid "robot" effect.
*   **Mobile Optimization:** Ensure `AudioContext.resume()` handles all mobile touch scenarios (currently handled in `pointerDown`).
