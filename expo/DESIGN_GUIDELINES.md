# Design & Development Guidelines

## Critical Rules - Must Follow Always

### 1. Orientation & Layout
- **PRIMARY ORIENTATION: LANDSCAPE** - This is an iPad-first app
- All screens MUST be designed for landscape mode first
- Portrait mode is secondary (phone support)
- Use iPad UI best practices as reference (see Apple HIG, popular iPad apps)
- Never use vertical lists when horizontal grids/layouts make more sense

### 2. Responsive Design
- **NEVER use hardcoded pixel values for layout**
- Always use percentage-based or flex-based layouts
- Account for different screen sizes dynamically
- Use `useWindowDimensions()` or `Dimensions.get('window')` for dynamic sizing
- Always account for safe areas and header heights
- Test on both iPad and iPhone sizes

#### Critical Layout Pattern for Game Screens:
```tsx
// ✅ CORRECT: Responsive layout that works in all orientations
const { width, height } = useWindowDimensions();
const insets = useSafeAreaInsets();
const isLandscape = width > height;

// Calculate responsive sizes based on orientation
const tileSize = isLandscape ? 80 : 120;
const fontSize = isLandscape ? 16 : 20;
const spacing = isLandscape ? width * 0.15 : width * 0.1;

// Use flex: 1 for main game area to fill available space
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  {/* Game content centered in available space */}
</View>
```

#### Common Responsive Design Mistakes:
1. ❌ Using fixed pixel values: `width: 120` → ✅ Use: `width: isLandscape ? 80 : 120`
2. ❌ Not using flex: 1 for game area → ✅ Use: `gameArea: { flex: 1 }`
3. ❌ Hardcoded spacing: `marginTop: 100` → ✅ Use: `marginTop: height * 0.1`
4. ❌ Same size for all orientations → ✅ Adjust based on `isLandscape`

### 3. Scrolling & Viewport
- If content doesn't fit on screen, it MUST be scrollable
- Use `ScrollView` or `FlatList` appropriately
- Always ensure entire content is within viewport
- Calculate available height: `screenHeight - headerHeight - tabBarHeight - safeAreaInsets`
- Never let content overflow off-screen without scroll capability

#### Game Screen Layout Strategy:
**For interactive games (dragging, tapping, etc.):**
- Use `flex: 1` on the main game area container
- Center content using `justifyContent: 'center'` and `alignItems: 'center'`
- This ensures content is always visible and centered regardless of screen size
- Avoid absolute positioning unless necessary for game mechanics

**Structure:**
```tsx
<View style={{ flex: 1 }}>
  {/* Fixed header with instructions */}
  <View style={styles.header}>
    <Text>Instructions</Text>
  </View>
  
  {/* Flexible game area that fills remaining space */}
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* Game elements centered here */}
  </View>
  
  {/* Optional fixed footer */}
</View>
```

**Why this works:**
- Header takes only the space it needs
- Game area (`flex: 1`) fills all remaining space
- Content is centered within that space
- No risk of content being cut off or requiring scroll
- Works in both portrait and landscape

### 4. Bottom Tab Bar
- Text labels must be fully visible on all devices
- Test on iPhone (smallest screen) to ensure no text cutoff
- Use appropriate font sizes that scale properly
- Consider icon-only mode for very small screens if needed
- Ensure touch targets are at least 44x44 points

### 5. Sound Wall Specific Rules
- Must use V-shaped layout as shown in reference materials
- If V-shape doesn't fit, make it scrollable (horizontal + vertical)
- Follow the exact structure from provided screenshots
- Consonants and vowels must be properly organized
- Reference the curriculum data structure for correct layout

### 6. Phonics & Audio Rules
- **Phonemes are NOT letter names** - they are sounds
  - "c" = /k/ sound (like "kuh"), NOT "see"
  - "a" = /æ/ sound (like "ah"), NOT "ay"
- Maintain a phoneme mapping table (letter → sound)
- Use proper pronunciation for all phonetic exercises

### 7. Blending & Dragging Exercises
- When items are dragged together successfully:
  1. Highlight the combined result (e.g., green border/background)
  2. Play the BLENDED sound (full word), not individual phonemes
  3. Stop repeating individual sounds once blended
- Visual feedback is critical:
  - Show drag target zones clearly
  - Indicate successful drops with color/animation
  - Show what's currently being dragged

### 8. Exercise Lists
- Each exercise item must show:
  - Exercise type (e.g., "Rhyme Match", "Sound Slide")
  - Target word/content (e.g., "Word: cat")
  - Any other relevant preview info
- Never show generic repeated labels
- Make it clear what the user will practice

### 9. Game Screen Requirements
- All interactive elements must be visible and accessible
- Buttons must be within viewport
- Use responsive positioning for all game elements
- Test in landscape mode thoroughly
- Account for header space in calculations
- Use `KeyboardAvoidingView` if keyboard is involved

#### Layout Architecture for Games:
**The Three-Zone Pattern:**
1. **Header Zone** (fixed height): Instructions, progress, title
2. **Game Zone** (`flex: 1`): All interactive elements, centered
3. **Feedback Zone** (absolute/overlay): Success messages, hints

**Critical Rules:**
- Never put large margins/padding in the game zone that push content off-screen
- Use `flex: 1` on game zone so it automatically fills available space
- Center game elements within the game zone using flexbox
- Make all sizes relative to screen dimensions or orientation
- Test by resizing browser window in landscape mode

**Example of proper game zone:**
```tsx
const gameArea: {
  flex: 1,  // ← CRITICAL: Fills remaining space after header
  justifyContent: 'center',  // ← Centers vertically
  alignItems: 'center',  // ← Centers horizontally
}
```

**What NOT to do:**
```tsx
// ❌ WRONG: Fixed heights create blank space
const gameArea: {
  height: 400,  // ← Will cause issues on different screens
  marginTop: 100,  // ← Creates unnecessary blank space
}

// ❌ WRONG: No centering means content might be off-screen
const gameArea: {
  flex: 1,
  // Missing justifyContent and alignItems
}
```

### 10. Navigation Structure
- Default/home screen: Lessons (curriculum overview)
- No separate "home" screen needed
- Tab bar screens: Lessons, Sound Wall, Progress
- Games are full-screen overlays (no tabs visible)

## Technical Implementation Checklist

### Before Submitting Any Screen:
- [ ] Tested in landscape mode on iPad size
- [ ] Tested in landscape mode on iPhone size
- [ ] All content is scrollable if it doesn't fit (or uses flex: 1 for games)
- [ ] No hardcoded pixel dimensions for layout
- [ ] Tab bar text is fully visible
- [ ] Header height is accounted for in layout calculations
- [ ] All interactive elements are within viewport
- [ ] Audio/phoneme pronunciations are correct
- [ ] Visual feedback for all interactions
- [ ] Exercise lists show unique, descriptive content

### Game Screen Specific Checklist:
- [ ] Main game area uses `flex: 1` to fill available space
- [ ] Game elements are centered using `justifyContent: 'center'` and `alignItems: 'center'`
- [ ] All sizes are responsive (use `isLandscape` conditional or percentage-based)
- [ ] No large blank spaces between header and game content
- [ ] Tested by resizing browser window in landscape mode
- [ ] All interactive elements visible without scrolling
- [ ] Font sizes adjust based on orientation (smaller in landscape)
- [ ] Spacing adjusts based on screen width (e.g., `width * 0.15`)

### For Dragging/Blending Exercises:
- [ ] Drag zones are clearly visible
- [ ] Drop targets are highlighted
- [ ] Successful drops show visual confirmation (green highlight)
- [ ] Blended sound plays after successful combination
- [ ] Individual sounds stop repeating after blend
- [ ] Works in landscape mode

### For Sound Wall:
- [ ] V-shaped layout implemented
- [ ] Scrollable if doesn't fit screen
- [ ] Follows reference materials exactly
- [ ] Consonants and vowels properly organized
- [ ] Responsive to different screen sizes

## Reference Materials
- See provided screenshots for Sound Wall layout
- See curriculum data structure in `types/curriculum.ts` and `constants/curriculum-data.ts`
- Follow Apple Human Interface Guidelines for iPad apps
- Study popular iPad educational apps (e.g., Khan Academy Kids, Epic!)

## Common Mistakes to Avoid
1. ❌ Designing for portrait first
2. ❌ Using hardcoded pixel values
3. ❌ Not testing in landscape mode
4. ❌ Forgetting to make content scrollable
5. ❌ Using letter names instead of phoneme sounds
6. ❌ Not providing visual feedback for interactions
7. ❌ Letting content overflow viewport
8. ❌ Not accounting for header/tab bar heights
9. ❌ Generic/repeated labels in lists
10. ❌ Not testing on smallest target device (iPhone)
11. ❌ Not using `flex: 1` on game area containers
12. ❌ Creating large blank spaces with excessive margins/padding
13. ❌ Not centering game content within available space
14. ❌ Using same sizes for portrait and landscape orientations
15. ❌ Forgetting to test by resizing browser window in landscape

## When in Doubt
- **Landscape first, always**
- **Make it scrollable** (for content) **OR use flex: 1** (for games)
- **Use percentages, not pixels**
- **Test on multiple screen sizes**
- **Provide clear visual feedback**
- **Center game content** with flexbox
- **Adjust sizes based on orientation** (isLandscape conditional)

## Retrospective: Sound Slide Game Fixes

### Problem:
The Sound Slide game had massive blank space between the header and game content in landscape mode. Content was pushed to the bottom of the screen and partially cut off.

### Root Causes:
1. **No flex: 1 on game area**: The game area didn't fill available space
2. **Not centered**: Content wasn't centered within the available space
3. **Fixed sizes**: Tile sizes and spacing didn't adjust for landscape
4. **Poor testing**: Didn't test by resizing browser in landscape mode

### Solution Applied:
1. Added `flex: 1` to the game area container
2. Added `justifyContent: 'center'` and `alignItems: 'center'` to center content
3. Made all sizes responsive based on `isLandscape` boolean
4. Reduced font sizes and tile sizes in landscape mode
5. Made spacing relative to screen width (e.g., `width * 0.15`)

### Key Learnings:
- **Always use flex: 1 for the main game area** - this is the most critical fix
- **Always center game content** - prevents content from being pushed to edges
- **Always make sizes orientation-aware** - landscape needs smaller elements
- **Test in landscape by resizing browser** - catches layout issues immediately
- **Avoid fixed margins/padding** - they create blank space on different screens

### Pattern to Follow:
```tsx
const { width, height } = useWindowDimensions();
const isLandscape = width > height;

// Responsive sizing
const tileSize = isLandscape ? 80 : 120;
const fontSize = isLandscape ? 16 : 20;

// Layout structure
<View style={{ flex: 1 }}>
  <View style={styles.header}>{/* Fixed header */}</View>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    {/* Game content - always centered, always visible */}
  </View>
</View>
```

This pattern ensures:
- ✅ No blank space
- ✅ Content always visible
- ✅ Works in all orientations
- ✅ Works on all screen sizes
- ✅ No scrolling needed for games
