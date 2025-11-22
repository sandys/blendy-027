# Blendy Web - Next-Gen Phonics Learning Platform

**High-fidelity, neural-audio powered reading application for the web.**

Blendy Web replicates the tactile, responsive experience of a native mobile app while leveraging the power of server-side neural text-to-speech (TTS) to deliver pedagogically accurate phonics instruction. Unlike standard web apps that rely on robotic system voices, Blendy generates high-quality, continuous blending audio on demand.

## Key Features

- **Neural Phonics Audio:** Uses **Piper TTS (ONNX)** running server-side to generate natural-sounding speech.
- **Continuous Blending:** Proprietary pipeline generates "stretched" audio (e.g., "mmmaaaaat") to teach smooth blending, avoiding the "choppy" sound of traditional apps.
- **ACE Phoneme System:** Built on the **ACE (Audio-Visual Connection for English)** standard, ensuring 100% mapping accuracy between graphemes (letters) and phonemes (sounds).
- **Lazy-Loading Architecture:** Audio is generated on-demand per word and cached heavily, ensuring instant load times after the first interaction.
- **Mobile-First UX:** Locked landscape layout, touch-optimized interactions (drag-and-drop), and "app-like" feel using Tailwind CSS and Framer Motion.

## Technology Stack

### Frontend
- **Framework:** Next.js 16 (App Router)
- **State Management:** Redux Toolkit + React Query (TanStack Query v5)
- **Persistence:** `localStorage` via `createSyncStoragePersister` for offline-ready progress.
- **Styling:** Tailwind CSS v4.
- **Animations:** Framer Motion (Physics-based dragging).

### Backend & Audio
- **Runtime:** Node.js (Next.js API Routes).
- **TTS Engine:** **Piper** (Neural VITS model), running as a local binary via Docker.
- **DSP:** Custom PCM manipulation for audio stitching and formatting (WAV).
- **Phonetics:** Custom G2P (Grapheme-to-Phoneme) engine mapping text -> ACE -> IPA.

### Infrastructure
- **Docker:** Fully containerized environment.
- **Self-Contained:** Includes Piper binary and Voice Models within the image. No external API dependencies (works offline/intranet).

## Architecture Overview

### The Audio Pipeline
1.  **Lesson Data:** Words are defined with explicit **ACE Phonemes** (e.g., `mat` -> `['m', 'ae', 't']`).
2.  **Normalization:** ACE phonemes are converted to **IPA** (International Phonetic Alphabet) using the embedded mapping table.
3.  **Neural Synthesis:** The backend spawns the **Piper** process with the IPA sequence (e.g., `[[mæt]]`).
4.  **Time Stretching:** For "Continuous Blending" exercises, the engine generates audio at extreme length scales (5x-10x slower) without pitch distortion, creating a smooth "singing" effect.
5.  **Delivery:** Audio is returned as optimized WAV blobs and cached by the browser and CDN.

### Lazy Loading Strategy
To minimize bandwidth and startup time:
1.  The app loads the **Lesson Structure** (metadata only) instantly.
2.  When a specific word is needed (e.g., user starts "mat"), the app fetches audio for *just* that word.
3.  React Query manages the caching and "stale-while-revalidate" lifecycle.

## Development & Setup

### Prerequisites
- Docker & Docker Compose

### Running the App
The entire application, including the Neural TTS engine and models, is encapsulated in Docker.

```bash
# 1. Start the environment
docker compose up --build
```

*   **Build Process:** The Dockerfile automatically downloads the Piper binary and the high-quality `en_US-amy-medium` voice model during the build.
*   **Access:** Open `http://localhost:3000`.

### Managing Phonemes
- **Mapping Source:** `lib/data/ace/phoneme_mapping.md` (Official ACE spec).
- **Converter:** `scripts/convert-phonemes.js` converts the Markdown spec into a fast JSON lookup table (`phoneme_map.json`) used at runtime.
- **Update Process:** To update mappings, edit the `.md` file and run `node scripts/convert-phonemes.js`.

## Directory Structure

```
web/
├── app/
│   ├── api/               # Backend API Routes (TTS, Lessons)
│   └── games/             # Game Screens (Sound Slide, etc.)
├── components/            # Reusable UI (GameLayout)
├── lib/
│   ├── audio/             # Core Audio Logic
│   │   ├── piper.ts       # Piper Process Wrapper
│   │   ├── dsp.ts         # Audio Processing (WAV/PCM)
│   │   └── lesson_generator.ts # The "Brain" (Phonics Logic)
│   ├── data/              # Curriculum & Mappings
│   └── utils/             # Helpers
├── scripts/               # Build-time scripts
└── Dockerfile             # Self-contained build definition
```

---
*Proprietary Technology - Do Not Distribute*
