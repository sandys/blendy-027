# Gaps & Broken Features Report

## 1. Critical: Sound Slide Game (Broken Physics & Interaction)
- **Physics Loop**: Currently uses `setInterval` at 60fps. This is unreliable for React Native animation/physics. Should use `requestAnimationFrame`.
- **Dragging Mechanics**: Uses `Body.applyForce` which creates a "floaty", laggy feel. Should use kinematic control (directly setting velocity/position) for precise drag-and-drop.
- **Collision Detection**: User reports collisions are broken. Likely due to the floaty drag + poor tuning of collision radii vs tile sizes.
- **Layout**: Hardcoded `wallThickness = 50` might be disproportionate on smaller landscape screens, potentially trapping bodies or causing erratic behavior.
- **Debug**: Previous debug toggles (mentioned in legacy docs) are missing, making it hard to diagnose physics boundaries.

## 2. Sound Search Game (Missing Spec Requirements)
- **Audio Flow**: Violates SPEC.md. Missing the opening prompt "What sound does [word] start with?". It only plays audio *after* a correct guess.
- **Animation**: While `measureLayout` is used, the user reports "broken" behavior. On Android/some layouts, `measureLayout` can return (0,0) if called too early, causing the bubble to fly to the wrong spot.
- **Feedback**: No negative audio feedback for incorrect taps (just haptics).

## 3. Word Builder Game (Drop Zone Reliability)
- **Drop Detection**: Relies on `measureInWindow` inside `onPanResponderRelease`. This is brittle. If the user scrolls or if the layout shifts (e.g. keyboard), coordinates mismatch.
- **Touch Handling**: `PanResponder` can sometimes conflict with ScrollViews if not handled carefully (though current implementation seems to lock gestures to letters).

## 4. Landscape & Layout Issues (General)
- **Hardcoded Logic**: While `isLandscape` checks exist, many "responsive" values are just magic numbers toggled between two states (e.g., `width * 0.15` vs `140`). This doesn't guarantee safety on all aspect ratios (e.g., iPad 4:3 vs iPhone 19.5:9).
- **Text Scaling**: Font sizes are calculated via `Math.max/min` chains which can result in unreadable text on small split-screen views or unexpected large text on tablets.

## 5. Curriculum Data (Phase 3 & 4)
- **Missing Assets**: `constants/lessons/phase3.ts` and `phase4.ts` are effectively empty placeholders.
- **Incomplete Types**: `Exercise` types don't fully enforce the presence of audio/image assets required for games like Sound Search (needs `prompt` audio, `target` images).

## 6. Legacy/Ghost Code
- **GAPS.md**: The previous GAPS.md referenced "Show grid/flex layout" toggles in `sound-slide.tsx` which are no longer in the codebase. The documentation is out of sync with the code.

## Action Plan Priorities
1. **Fix Sound Slide Physics**: Rewrite to use `requestAnimationFrame` and kinematic dragging.
2. **Fix Sound Search Audio**: Add the "What sound..." prompt logic.
3. **Audit Layouts**: Test all games on actual iPad/iPhone simulators to verify landscape constraints.