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

- `jest.setup.ts` - Global Jest setup, Expo/AsyncStorage mocks
- `test-utils.tsx` - Helpers for rendering within `AppProvider`
- `audio.test.ts` - Expo audio utility coverage
- `app-context.test.tsx` - Progress + phoneme logic in context provider
- `curriculum-data.test.ts` - Curriculum integrity checks

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

**Provider-Aware Render:**
```tsx
import { renderWithProviders } from "../test-utils";
import { useApp } from "@/contexts/AppContext";
import { Text } from "react-native";

const ExampleConsumer = () => {
  const { progress } = useApp();
  return <Text>{progress.currentLesson}</Text>;
};

test("reads from app context", () => {
  const { getByText } = renderWithProviders(<ExampleConsumer />);
  expect(getByText("1")).toBeTruthy();
});
```
