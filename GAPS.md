# Gaps Against SPEC.md & claude.md

## 1. Sound Search audio flow missing
- Spec calls for each round to open with “What sound does ___ start with?”, per `SPEC.md:241-248`, and stresses multimodal cues (SPEC Part I, Multisensory Engagement).  
- `app/games/sound-search.tsx:93-152` only speaks the completed word after a correct tap—no opening prompt, no phoneme playback per bubble, no “try again” audio.

## 2. Correct digraph animation never reaches the blank
- Spec requires the correct bubble to float “up to fill the blank in the word” (`SPEC.md:243-247`).  
- Implementation animates every success by a fixed `-160` / `-120` px offset (`app/games/sound-search.tsx:19-20,107-125`), so on most screen sizes it overshoots or leaves the word area altogether.

## 3. Sound Search layout ignores responsive rules
- `DESIGN_GUIDELINES.md:12-42,121-140` prohibit hardcoded pixels and require layouts driven by `useWindowDimensions`.  
- The Sound Search styles block (`app/games/sound-search.tsx:272-379`) hardcodes widths, heights, radii, and font sizes (e.g., 180 px badge, 120 px bubbles, fixed padding), causing the UI to overflow or shrink illegibly on iPads/phones—matching the “UI going out of the window” issue.

## 4. Curriculum data lacks spec-required digraph assets
- Section 8 mandates full sh/th/ch/ck word sets with image/audio assets (e.g., six words per digraph per Prompt 8, `SPEC.md:229-248`).  
- `types/curriculum.ts:83-133` only models `label`/`isCorrect`, no audio/image metadata.  
- `constants/lessons/phase3.ts:3-44` adds just one placeholder lesson (“ship” emoji), so the rest of Phase 3 can’t render or meet the decodability requirements.

## 5. Sound Slide exposes debug toggles that break collisions
- Sound Slide header ships “Show grid/Show numbers/Flex layout” buttons (`app/games/sound-slide.tsx:413-559`), violating the “header contains instructions only” rule (`DESIGN_GUIDELINES.md:51-80`).  
- Toggling “Flex layout” disables the Matter bodies (`layoutBodies` skips `Bodies.rectangle` when `useFlexLayout` is true), so collision detection falls back to a coarse distance check, contradicting the spec’s requirement for the drag-to-collide mechanic (`SPEC.md:107,740`).  
- Because these controls are exposed to children, they can accidentally disable physics, which matches the reported “collision detection ... absolutely broken.”

