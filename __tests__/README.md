# Tests

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Structure

- `setup.ts` - Jest setup, mocks for Expo modules
- `test-utils.tsx` - Custom render with providers
- `games/` - Tests for each game type

## CI/CD

Tests run automatically on:
- Push to main
- All pull requests

See `.github/workflows/test.yml` for CI configuration.

## Writing Tests

Use test utils for rendering with context:

```tsx
import { render, fireEvent } from "../test-utils";

test("my test", () => {
  const { getByText } = render(<MyComponent />);
  fireEvent.press(getByText("Button"));
  expect(getByText("Success")).toBeTruthy();
});
```
