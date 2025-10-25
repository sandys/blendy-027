# Tests

## Running Tests

```bash
# Run all tests (uses npx jest, not bun test)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `setup.ts` - Jest setup, mocks for Expo modules
- `test-utils.tsx` - Custom render with AppProvider
- `unit/` - Unit tests for data, utils, types
- `components/` - React Native component tests

## Current Tests

**Unit Tests (3):**
- `curriculum-data.test.ts` - Validates PHASES, LESSONS, PHONEME_CARDS
- `audio.test.ts` - Audio utility functions
- `types.test.ts` - TypeScript type validation

**Component Tests (3):**
- `rhyme-match.test.tsx` - Rhyme matching game rendering
- `word-tapper.test.tsx` - Word tapping game rendering
- `word-builder.test.tsx` - Word builder game rendering

## CI/CD

Tests run automatically on:
- Push to main
- All pull requests

**CI uses:**
- Bun for deps install (faster)
- Node + npx jest for testing (proper RN support)

See `.github/workflows/test.yml` for CI configuration.

## Writing Tests

**Unit Test:**
```ts
import { PHASES } from "@/constants/curriculum-data";

test("phases structure", () => {
  expect(PHASES).toHaveLength(4);
});
```

**Component Test:**
```tsx
import { render, fireEvent } from "../test-utils";
import MyScreen from "@/app/my-screen";

test("renders and responds to tap", () => {
  const { getByText } = render(<MyScreen />);
  const button = getByText("Tap Me");
  fireEvent.press(button);
  expect(getByText("Success")).toBeTruthy();
});
```
