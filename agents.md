# Blendy - Phonics Reading App for Kids

## Project Overview
Interactive iPad app teaching kids to read via Science of Reading methodology. Systematic phonics curriculum w/ 55 lessons across 4 phases.

## Tech Stack
- React Native 0.79 + Expo 53
- TypeScript (strict, no any types)
- Expo Router (file-based routing)
- Zustand (state mgmt via AppContext)
- expo-speech (TTS audio)
- matter-js (physics for games)
- Jest + React Native Testing Library (tests)

## Architecture

### Curriculum Structure
4 phases, 55 lessons total:
- **Phase 1** (L1-5): Pre-reading phonemic awareness ✅
- **Phase 2** (L6-25): Letter-sounds + CVC words ✅
- **Phase 3** (L26-45): Digraphs, blends, patterns ❌
- **Phase 4** (L46-55): VCe, syllables, morphology ❌

Each lesson: multiple exercises, decodable story, unlocks phonemes on Sound Wall

### Data Model
Lessons split by phase for maintainability:
```
constants/
  curriculum-data.ts (main exports, 490 lines)
  lessons/
    phase1.ts (L1-5, 1689 lines)
    phase2.ts (L6-25, 1867 lines)
    phase3.ts (L26-45, empty - TODO)
    phase4.ts (L46-55, empty - TODO)
```

```typescript
Lesson {
  lesson_number, phase, title, description
  new_graphemes, new_irregular_words
  exercises: Exercise[]
  story: { title, text, images }
}

Exercise {
  exercise_id, lesson_number, exercise_type
  skill_focus, data, response_type
  assets: { audio, images }
  srs_data: { due_date, stability, difficulty, review_history }
}
```

### Game Types
**Implemented (6):**
- Rhyme Match, Word Tapper, Syllable Squish
- Sound Slide, Sound Detective, Word Builder

**Need to Build (7):**
- Sound Search, Blend Flipper, Word Sort
- Magic Wand, Word Surgery, Syllable Split, Heart Word

### File Structure
```
app/
  (tabs)/             - Main tabs: lessons, sound-wall, progress
  games/              - Game screens (one per type)
  lesson-detail.tsx
constants/
  curriculum-data.ts  - Main exports (PHASES, SAMPLE_LESSONS)
  lessons/            - Lesson data split by phase
    phase1.ts         - L1-5
    phase2.ts         - L6-25
    phase3.ts         - L26-45 (empty)
    phase4.ts         - L46-55 (empty)
  colors.ts
types/
  curriculum.ts       - TypeScript interfaces
contexts/
  AppContext.tsx      - Progress tracking, lesson mgmt
__tests__/
  setup.ts            - Jest config, mocks
  test-utils.tsx      - RTL helpers
  unit/               - Data/util tests (3)
  components/         - Component tests (3)
```

## Current State
✅ **Done:**
- Lessons 1-25 w/ 6 game types
- Sound Wall w/ phoneme unlocking
- Navigation, progress tracking
- Data restructured into phase files
- Automated tests + CI (6 tests passing)

❌ **TODO:**
- Lessons 26-55 (Phases 3 & 4)
- 7 new game types
- More comprehensive tests

## Testing

### Running Tests
```bash
npm test                # Run all tests (uses npx jest, NOT bun test)
npm run test:watch      # Watch mode
npm run test:coverage   # With coverage
```

### Test Structure
- **6 tests total:** 3 unit + 3 component
- **Unit tests:** curriculum data, audio utils, types
- **Component tests:** rhyme-match, word-tapper, word-builder
- **CI:** Bun install (fast) → npx jest (proper RN support)

**Important:** Use `npx jest` not `bun test`
- Bun's jest incomplete for React Native
- Real Jest handles RN via jest-expo preset properly

## Critical Design Guidelines (DESIGN_GUIDELINES.md)

### Layout Rules
- **PRIMARY: LANDSCAPE MODE** (iPad-first)
- **NO hardcoded pixels** - use percentages, flex, useWindowDimensions()
- **Game area pattern:**
  ```tsx
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  <View style={{ flex: 1 }}>
    <View style={styles.header}>Instructions</View>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* Game content - always centered, always visible */}
    </View>
  </View>
  ```

### Responsive Sizing
```tsx
const tileSize = isLandscape ? 80 : 120;
const fontSize = isLandscape ? 16 : 20;
const spacing = width * 0.15;
```

### Audio Rules
- Phonemes are SOUNDS not letter names
  - "c" = /k/ sound, NOT "see"
  - "a" = /ă/ sound, NOT "ay"
- Use expo-speech TTS for all audio
- Blended words play full word, not individual sounds

## Conventions
- All sizes responsive (isLandscape conditional)
- flex: 1 on game area containers
- Center content w/ justifyContent/alignItems
- Landscape-first testing
- Tab bar text must be visible on iPhone
- Exercise IDs: "L{lesson}-{Type}-{num}" (e.g., "L1-RhymeMatch-001")
- Use Bun for dev/install, npm/npx for tests

## Key References
- Full curriculum spec in SPEC.md (158 pages)
- Word lists in Appendix D of spec
- AI prompts in Appendix B of spec
- XML story prompts in Section 19
- Master scope/sequence in spec Appendix A
- Design guidelines in DESIGN_GUIDELINES.md
- Test docs in __tests__/README.md

## Changesets
Add to .changeset/ after each feature:
```md
---
patch|minor|major
---
User-facing description
```

Current changesets:
- 0000: agents.md context
- 0001: restructure lesson data
- 0002: automated tests + CI
- 0003: update lockfile (after bun install)

## Retrospective: Session Work Completed

### What Was Accomplished
1. **Data Restructuring** ✅
   - Split 4029-line curriculum-data.ts into phase files (88% reduction)
   - Created maintainable structure: phase1.ts, phase2.ts, phase3.ts (empty), phase4.ts (empty)
   - Main file reduced to 490 lines
   - All imports/exports working

2. **Automated Testing + CI** ✅
   - Added Jest + @testing-library/react-native setup
   - Created 6 tests: 3 unit (data/utils/types) + 3 component (game renders)
   - GitHub Actions workflow configured
   - **Critical lesson:** Use `npx jest` not `bun test` - Bun's jest incomplete for React Native
   - CI strategy: Bun install (fast) → npx jest (proper RN support)

3. **CI Configuration Iterations**
   - Initial: npm only (failed - no lockfile)
   - Second: Bun only (failed - bun test doesn't handle RN)
   - Final: Hybrid (Bun install + npx jest) ✅
   - Added Node.js + Bun to CI workflow

4. **Documentation** ✅
   - Created agents.md (project context)
   - Symlinked claude.md → agents.md
   - Updated __tests__/README.md with testing guide
   - Added babel.config.js for jest-expo preset

### Key Learnings

**Testing React Native Apps:**
- Bun's built-in jest runner incomplete for RN ecosystem
- Must use real Jest from node_modules via `npx jest`
- jest-expo preset requires proper Jest, not Bun
- Component tests need careful mocking (expo modules, router, context)

**CI/CD Best Practices:**
- Lockfile must be committed and synced
- Hybrid approach works: fast installer + proper test runner
- Both Node + Bun can coexist in CI
- `--frozen-lockfile` critical for reproducible builds

**Code Organization:**
- Large data files (4000+ lines) hurt maintainability
- Split by logical boundaries (phases)
- Keep main export files small (< 500 lines)
- Use barrel exports for clean imports

### Blockers Resolved
1. ❌ Missing lockfile → ✅ Noted need to run `bun install` locally
2. ❌ Bun test failures (RN Flow types) → ✅ Switched to npx jest
3. ❌ Component test failures → ✅ Simplified tests + proper mocks
4. ❌ CI using wrong test runner → ✅ Hybrid Bun/Node approach

### Remaining Work
- [ ] Run `bun install` locally to sync lockfile
- [ ] Verify tests pass in CI
- [ ] Build 7 new game types (Phase 3 & 4)
- [ ] Generate lesson data for L26-55 using AI
- [ ] Expand test coverage

### Files Changed (4 changesets)
- `0000-add-agents-context.md` - Added project docs
- `0001-restructure-lesson-data.md` - Split curriculum data
- `0002-add-automated-tests.md` - Jest/RTL + CI
- `0003-update-lockfile-needed.md` - Lockfile sync reminder

## Next Steps
1. ✅ Setup automated tests + CI
2. Run `bun install` to sync lockfile
3. Build Sound Search game (for digraphs L26-33)
4. Generate L26-33 data w/ AI
5. Continue through Phase 3 & 4
6. Add more comprehensive tests as games built
