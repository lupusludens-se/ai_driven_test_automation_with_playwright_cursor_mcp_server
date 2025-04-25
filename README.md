# Playwright Testing Framework

This project contains UI and API tests for the Zeigo Network Dashboard using Playwright for end-to-end (E2E) testing.

## What We're Using

Playwright enables reliable end-to-end testing for modern web apps with features like:

- Cross-browser testing support
- Cross-platform testing capability
- Multi-language support (TypeScript, JavaScript, Python, .NET, Java)
- Mobile web testing
- Parallel test execution
- Built-in debugging tools

## Documentation

- [Playwright Official Docs](https://playwright.dev/docs/intro)
- [Running Tests Guide](https://playwright.dev/docs/running-tests)

## Structure

- `.vscode/`: Workspace-specific settings.
- `ui-tests/specs/`: UI test specifications.
- `api-tests/specs/`: API test specifications.
- `pages/`: Page Object Model (POM) files.
- `utils/`: Utility functions or helpers.
- `.env`: Environment variables.
- `.gitignore`: Files to exclude from version control.

## Prerequisites

1. **Node.js**: Install Node.js v20 or higher
2. **Environment Setup**: Create a `.env` file with the following configuration:

   ```plaintext
   # Base URLs
   API_BASE_URL=https://your-api-url
   UI_BASE_URL=https://your-ui-url
   ```

## Getting Started

1. Install Playwright and dependencies:

   ```bash
   npm install
   npx playwright install
   npm install dotenv
   ```

2. Install VS Code Playwright extension:

   ```bash
   code --install-extension ms-playwright.playwright
   ```

3. Run tests:

## Test Execution Options

### Using VS Code Test Explorer

- Open VS Code
- Click on the Testing icon in the Activity Bar (beaker icon)
- Click the Play button to run all tests
- Or run individual tests by clicking the play button next to each test

### Using Command Line

#### Basic Test Commands

```bash
# Run all tests
npx playwright test

# Run tests in headed mode
npx playwright test --headed

# Run tests in specific browser
npx playwright test --project=chromium

# Debug mode
npx playwright test --debug

# Generate tests with Codegen
npx playwright codegen
```

#### Environment-Specific Test Execution

##### Windows PowerShell

```powershell
# Test environment
$env:CI="true"; $env:target_env="test"; npx playwright test --reporter=list

# PreProd environment
$env:CI="true"; $env:target_env="preprod"; npx playwright test --reporter=list
```

##### macOS/Linux

```bash
# Test environment
CI=1 target_env="test" npx playwright test --reporter=list

# PreProd environment
CI=1 target_env="preprod" npx playwright test --reporter=list
```

#### Running Specific Tests

```bash
# Run by test name
npx playwright test -g "name of my test" --project=chromium

# Run specific test file
npx playwright test tests/specific-test.spec.js

# Run tests with specific tag
npx playwright test --grep @tag_name
```

#### Browser-Specific Test Execution

```bash
# Chrome
npm run regression:chromium

# Safari
npm run regression:safari

# All browsers in headless mode
npm run regression

# All browsers in headed mode
npm run regression:headed
```

### Test Scheduler

To run tests in batches with delays:

```bash
.\run_tests_scheduler.bat
```

## Test Explorer Features

- 🔍 Browse tests in a tree view
- ▶️ Run/Debug individual tests or test files
- 🔄 Re-run failed tests
- 📊 View test results inline
- 🎯 Jump to test definitions
- 📋 Filter tests by status or tags
- 🎯 Debug tests with breakpoints

## You can use both MCP Servers (`context7` and `playwright`) for different purposes, but they cannot run simultaneously on the same terminal session. Here's how you can use them:

---

### **How to Use Each MCP Server**
1. **Context7 MCP Server**:
   - **Purpose**: Provides up-to-date, version-specific documentation and code examples.
   - **Usage**:
     - Start the server:
       ```powershell
       npx -y @upstash/context7-mcp@latest
       ```
     - Use it in your prompts by adding `use context7` to fetch accurate and context-aware responses.

2. **Playwright MCP Server**:
   - **Purpose**: Enhances Playwright capabilities for UI testing.
   - **Usage**:
     - Start the server:
       ```powershell
       npx playwright-mcp
       ```
     - Use it to interact with Playwright for advanced testing scenarios.

---

### **Can They Run at the Same Time?**
- **Same Terminal**: No, only one MCP Server can run in a single terminal session because each server takes control of the terminal's input/output.
- **Different Terminals**: Yes, you can run both servers simultaneously in separate terminal sessions.

---

### **How to Run Both Servers Simultaneously**
1. Open two terminal windows.
2. In the first terminal, start the Context7 MCP Server:
   ```powershell
   npx -y @upstash/context7-mcp@latest
   ```
3. In the second terminal, start the Playwright MCP Server:
   ```powershell
   npx playwright-mcp
   ```

---

### **How to Use Them Together**
- **Context7**:
  - Use it to fetch documentation or code examples for libraries and tools.
  - Example: Add `use context7` to your prompt to get accurate responses.

- **Playwright**:
  - Use it to execute advanced UI tests or interact with Playwright's MCP features.
  - Example: Run Playwright tests while the MCP Server is active.

