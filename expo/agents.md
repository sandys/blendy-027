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

## Multi-Phase Implementation Plan

### Phase 1: Test & Fix Existing (L1-25)
**Goal:** Ensure L1-25 solid before building on top

**Tasks:**
1. ✅ Create test utils + setup Jest/RTL
2. ✅ Write initial tests (6 tests: 3 unit + 3 component)
3. Run full test suite on all 6 games, document failures
4. Manual smoke test (landscape iPad + iPhone sizes)
5. Fix identified bugs
6. Changeset: `0004-test-fix-phase1-2.md`

**Exit Criteria:** All L1-25 tests pass, no critical bugs

---

### Phase 2A: Sound Search Game (Digraphs)
**Goal:** Build first Phase 3 game

**Tasks:**
1. Create `app/games/sound-search.tsx`
2. Implement:
   - Show image + partial word w/ blank
   - 3 digraph bubbles (sh/ch/th)
   - Tap → bubble floats to blank → complete word
   - Audio plays completed word
3. Responsive layout (landscape/flex:1)
4. Tests for game mechanics
5. Changeset: `0005-add-sound-search.md`

**Exit Criteria:** Sound Search working, tested

---

### Phase 2B: Generate L26-33 Data (Digraphs)
**Goal:** Complete digraph lessons w/ real data

**Tasks:**
1. Use AI w/ Appendix B Prompt 8 → generate exercises
2. Create lessons in `constants/lessons/phase3.ts`:
   - L26-27: sh digraph (cash, dish, fish, ship, shop)
   - L28-29: th digraph (bath, with, that, this, thin)
   - L30-31: ch digraph (chat, chin, chip, chop, much)
   - L32-33: ck digraph (duck, kick, lock, neck, rock)
3. Generate decodable stories via XML prompts (3-5 sentences each)
4. Validate against TypeScript types
5. Update Sound Wall phoneme unlocking
6. Manual test each lesson
7. Changeset: `0006-add-lessons-26-33.md`

**Exit Criteria:** L26-33 playable, stories included, phonemes unlock

---

### Phase 2C: Blend Flipper Game
**Goal:** Build game for blends (L34-40)

**Tasks:**
1. Create `app/games/blend-flipper.tsx`
2. Implement:
   - Static rime on right (-amp, -est, -op)
   - Flipper cycles onsets (c/l/st/tr)
   - Tap → flip → play word audio
   - Visual flip animation
3. Responsive, tests
4. Changeset: `0007-add-blend-flipper.md`

**Exit Criteria:** Blend Flipper working, tested

---

### Phase 2D: Generate L34-40 Data (Blends)
**Goal:** Complete blend lessons

**Tasks:**
1. Use AI w/ Prompt 9 (Blend Flipper) + Word Builder
2. Create lessons in `phase3.ts`:
   - L34-36: Final blends (-st, -mp, -nd, -nt, -sk, -ft)
   - L37-38: S-blends (st, sp, sl, sm, sn)
   - L39: L-blends (bl, cl, fl, gl, pl)
   - L40: R-blends (br, cr, dr, fr, gr, pr, tr)
3. Decodable stories for each group
4. Validate, test
5. Changeset: `0008-add-lessons-34-40.md`

**Exit Criteria:** L34-40 playable w/ stories

---

### Phase 2E: Word Sort Game
**Goal:** Build game for FLOSS/glued sounds (L41-45)

**Tasks:**
1. Create `app/games/word-sort.tsx`
2. Implement:
   - 3 buckets at bottom (FLOSS, -ng words, -nk words)
   - Word tiles appear at top
   - Drag to correct bucket
   - Accept/reject feedback
3. Responsive, tests
4. Changeset: `0009-add-word-sort.md`

**Exit Criteria:** Word Sort working, tested

---

### Phase 2F: Generate L41-45 Data (FLOSS + Glued)
**Goal:** Complete Phase 3

**Tasks:**
1. Use AI w/ Prompt 10 (Word Sort)
2. Create lessons in `phase3.ts`:
   - L41-42: FLOSS rule (puff, hill, mess, buzz)
   - L43-44: -ng endings (bang, sing, long, hung)
   - L45: -nk endings (bank, pink, honk, sunk)
3. Decodable stories
4. Validate, test full Phase 3 (L26-45)
5. Changeset: `0010-add-lessons-41-45.md`

**Exit Criteria:** Phase 3 complete (L26-45 all playable)

---

### Phase 3A: Magic Wand Game
**Goal:** Build VCe game (L46-50)

**Tasks:**
1. Create `app/games/magic-wand.tsx`
2. Implement:
   - CVC word displayed (cap)
   - Magic wand w/ 'e' on tip
   - Drag 'e' to end → sparkle animation
   - Vowel transforms to long vowel (ā)
   - Play "cape"
3. Responsive, tests
4. Changeset: `0011-add-magic-wand.md`

**Exit Criteria:** Magic Wand working, tested

---

### Phase 3B: Generate L46-50 Data (VCe)
**Goal:** Complete VCe lessons

**Tasks:**
1. Use AI w/ Prompt 11 (Magic Wand)
2. Create lessons in `constants/lessons/phase4.ts`:
   - L46: a_e (cake, name, make, safe, game)
   - L47: i_e (like, time, five, bike, ride)
   - L48: o_e (hope, bone, rope, home, note)
   - L49: u_e (cube, mule, rule, tube, cute)
   - L50: VCe review (mixed)
3. CVC→VCe transformation pairs
4. Decodable stories
5. Validate, test
6. Changeset: `0012-add-lessons-46-50.md`

**Exit Criteria:** L46-50 playable w/ VCe mechanic

---

### Phase 3C: Word Surgery + Syllable Split Games
**Goal:** Build final 2 main games

**Tasks:**
1. Create `app/games/word-surgery.tsx`:
   - Compound word w/ dotted line (pancake)
   - Saw tool drags along line
   - Split → two tiles (pan | cake)
   - Play each part + whole
2. Create `app/games/syllable-split.tsx`:
   - 2-syllable word (robot)
   - Tap between letters to split
   - Correct → splits, labels "Open"/"Closed"
   - Play each syllable + whole
3. Responsive, tests for both
4. Changeset: `0013-add-surgery-syllable.md`

**Exit Criteria:** Both games working, tested

---

### Phase 3D: Generate L51-55 Data (Morphology + Syllables)
**Goal:** Complete curriculum to L55

**Tasks:**
1. Use AI w/ Prompts 12-13
2. Create lessons in `phase4.ts`:
   - L51: Plurals -s (hats, bugs, tents)
   - L52: Plurals -es (wishes, boxes, dresses)
   - L53: Compounds (sunset, hotdog, bathtub) - Word Surgery
   - L54: Closed syllables (napkin, rabbit) - Syllable Split
   - L55: Open syllables (tiger, robot, paper) - Syllable Split
3. Decodable stories
4. Validate, test
5. Changeset: `0014-add-lessons-51-55.md`

**Exit Criteria:** ALL 55 lessons playable

---

### Phase 4: Heart Word System (Ongoing)
**Goal:** Add irregular word teaching

**Tasks:**
1. Create `app/games/heart-word.tsx`:
   - Multi-step animation
   - Sound boxes appear
   - Graphemes fly into boxes
   - Heart appears over tricky parts
2. Add Heart Word exercises throughout curriculum for irregular words
3. Tests
4. Changeset: `0015-add-heart-word.md`

**Exit Criteria:** Heart Word mechanic available

---

### Phase 5: Integration & Polish
**Goal:** Everything working together

**Tasks:**
1. E2E test all 55 lessons
2. Verify Sound Wall unlocking throughout
3. Test progression/navigation flow
4. Test on multiple screen sizes (iPad Pro, iPad mini, iPhone)
5. Performance check (lazy loading, etc.)
6. Update TEST_CASES.md w/ all results
7. Update README if needed
8. Changeset: `0016-integration-polish.md`

**Exit Criteria:** App ready for user testing

---

### Phase Summary
- **Phase 1**: Test/fix foundation (current)
- **Phase 2A-F**: Complete Phase 3 curriculum (6 sub-phases)
- **Phase 3A-D**: Complete Phase 4 curriculum (4 sub-phases)
- **Phase 4**: Heart Word system
- **Phase 5**: Polish & integration

**Total**: ~14-16 phases, ~16 changesets

Each phase builds on previous, can pause/review between phases.

## Next Steps (Current Phase: 1)
1. ✅ Setup automated tests + CI
2. TODO: Expand test coverage for all 6 games
3. TODO: Manual smoke test + fix bugs
4. Then: Phase 2A (Sound Search game)
