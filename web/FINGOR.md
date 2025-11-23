# Fingor - Interactive Phonics Reading Game

**"Drag to Read"**

Fingor is an interactive web-based game that simulates the tactile experience of reading by allowing children to drag their finger across a word. As they touch each letter (grapheme), the corresponding phoneme sound plays and loops, teaching the relationship between symbols and sounds.

## 1. Game Specification

### Core Mechanics
1.  **Visuals:** The word is displayed with each grapheme (letter or letter group like 'sh') in a distinct "Elkonin Box" style container.
    *   **Inactive:** Black text, grey dot.
    *   **Active (Touched):** Primary color text, scaled up, colored dot.
2.  **Interaction:**
    *   **Drag:** The user touches/clicks and drags horizontally across the word.
    *   **Hit Testing:** The system detects which grapheme is currently under the finger/cursor.
3.  **Audio:**
    *   **Looping:** While the finger is on a grapheme, its sound plays in a continuous loop (e.g., "Mmmmm...").
    *   **Transitions:** Moving to the next grapheme instantly cuts the previous sound and starts the new one.
    *   **Phonetics:** Sounds are generated using Neural TTS (Piper) with specific "speakable" IPA mappings to ensure natural isolation (e.g., "Mmm" not "Em", "Tuh" not "Tee").

## 2. Technical Architecture

### Backend (Audio Generation)
Instead of generating a single blended file, the backend now produces granular **Audio Segments**.

*   **Source:** `web/lib/audio/lesson_generator.ts`
*   **Logic:**
    1.  **G2P:** Breaks the word into graphemes (e.g., "chat" -> "ch", "a", "t").
    2.  **Phoneme Mapping:** Maps each grapheme to ACE/IPA phonemes.
    3.  **Neural Synthesis:** Calls Piper for *each segment*.
        *   **Continuants (m, s, f):** Generated as pure phonemes (e.g., `[[m]]`) to allow natural looping.
        *   **Stops (t, p, b):** Generated with a schwa (e.g., `[[tə]]` -> "Tuh") to make them audible in isolation.
    4.  **Trimming:** `trimSilence` (DSP) removes start/end silence to ensure seamless looping on the frontend.
*   **API Output:**
    ```json
    {
      "segments": [
        { "text": "m", "duration": 1000, "audio_url": "data:audio/wav;base64,..." },
        { "text": "a", "duration": 1500, "audio_url": "..." },
        { "text": "t", "duration": 800, "audio_url": "..." }
      ]
    }
    ```

### Frontend (Interaction)
*   **Component:** `web/app/games/fingor/page.tsx`
*   **State:** Tracks `activeIndex` (which segment is hovered).
*   **Audio Engine:**
    *   Uses `HTMLAudioElement` objects stored in `useRef`.
    *   **Preloading:** All segment audio clips are instantiated and loaded on game start.
    *   **Playback:** `audio.loop = true`. `audio.play()` on enter, `audio.pause()` + `currentTime=0` on leave.
*   **Input Handling:** Uses global `onPointerMove` on the container and `document.elementFromPoint(x, y)` to perform hit-testing against elements with `data-segment-index`. This supports both mouse and touch dragging robustly.

## 3. Design Decisions

### Why not Real-Time Time Stretching?
We considered using Web Audio API to "scrub" a single audio file (like a DJ scratching a record). However, this introduces pitch artifacts ("chipmunk effect") unless complex Phase Vocoder DSP is used, which is heavy for a web app. The **Segmented Looping** approach provides immediate feedback, is technically simpler, and pedagogically sound (isolating phonemes).

### Why Server-Side Generation?
Client-side `window.speechSynthesis` is unpredictable (platform dependent voices, inability to stretch sounds). Server-side Piper ensures:
1.  **Consistent Voice:** Every student hears the same "Amy" voice.
2.  **Precise Phonetics:** We control the IPA input (`[[m]]` vs `[[mə]]`) to fix "Em" vs "Mmm".
3.  **Quality:** Neural audio is far superior to standard concatenative TTS.

## 4. Code Inventory

### New Files
*   `web/app/games/fingor/page.tsx`: The main game component.
*   `web/FINGOR.md`: This spec.

### Modified Files
*   `web/lib/audio/lesson_generator.ts`: Updated `generateWordAudio` to produce `segments` array and use `getSpeakableIPA` for cleaner isolated sounds.
*   `web/lib/audio/g2p.ts`: Added `wordToGraphemes` to split words for the UI.
*   `web/app/api/audio/word/route.ts`: Wired up to return the new segment data.

## 5. Future Improvements
*   **Visual Trails:** Add a particle trail following the finger.
*   **Success Animation:** When the whole word is completed, play the "Smooth Blend" (`mmmaaaat`) and then the "Normal" word ("mat") automatically.
