# Tests

## Running Tests

```bash
# Run all tests
bun test

# Run tests in watch mode
bun test:watch

# Run tests with coverage
bun test:coverage
```

## Test Structure

- `setup.ts` - Jest setup, mocks for Expo modules
- `test-utils.tsx` - Custom render with providers (for future component tests)
- `unit/` - Unit tests for data, utils, types

## Current Tests

**Unit Tests (3):**
- `curriculum-data.test.ts` - Validates PHASES, LESSONS, PHONEME_CARDS structure
- `audio.test.ts` - Tests audio utility functions
- `types.test.ts` - TypeScript type validation

**Note:** Component tests skipped due to React Native/Jest compatibility issues. Focus on unit tests for CI.

## CI/CD

Tests run automatically on:
- Push to main
- All pull requests

See `.github/workflows/test.yml` for CI configuration.

## Writing Tests

```ts
// Unit test example
import { PHASES } from "@/constants/curriculum-data";

test("phases structure", () => {
  expect(PHASES).toHaveLength(4);
  expect(PHASES[0].phase).toBe(1);
});
```
