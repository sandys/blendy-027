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

### 3. Scrolling & Viewport
- If content doesn't fit on screen, it MUST be scrollable
- Use `ScrollView` or `FlatList` appropriately
- Always ensure entire content is within viewport
- Calculate available height: `screenHeight - headerHeight - tabBarHeight - safeAreaInsets`
- Never let content overflow off-screen without scroll capability

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

### 10. Navigation Structure
- Default/home screen: Lessons (curriculum overview)
- No separate "home" screen needed
- Tab bar screens: Lessons, Sound Wall, Progress
- Games are full-screen overlays (no tabs visible)

## Technical Implementation Checklist

### Before Submitting Any Screen:
- [ ] Tested in landscape mode on iPad size
- [ ] Tested in landscape mode on iPhone size
- [ ] All content is scrollable if it doesn't fit
- [ ] No hardcoded pixel dimensions for layout
- [ ] Tab bar text is fully visible
- [ ] Header height is accounted for in layout calculations
- [ ] All interactive elements are within viewport
- [ ] Audio/phoneme pronunciations are correct
- [ ] Visual feedback for all interactions
- [ ] Exercise lists show unique, descriptive content

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

## When in Doubt
- **Landscape first, always**
- **Make it scrollable**
- **Use percentages, not pixels**
- **Test on multiple screen sizes**
- **Provide clear visual feedback**
