# Automation Testing Documentation

## Overview

E2E automation testing untuk Arteri Learning Platform menggunakan Playwright untuk validasi critical user flows, regression testing, dan smoke testing.

## Technology Stack

- **Framework:** Playwright (TypeScript)
- **Test Runner:** Playwright Test
- **Browsers:** Chromium, Firefox, WebKit
- **Reporting:** HTML Report, Allure (optional)
- **CI/CD Ready:** GitHub Actions compatible

## Test Coverage Strategy

### Priority 1: Critical Flows (Must Automate)
1. **Authentication Flow**
   - Login as student → Redirect to `/dashboard`
   - Login as teacher/admin → Redirect to `/dashboard-admin`
   - Logout → Clear session → Redirect to login
   - Invalid credentials → Show error message

2. **Role-Based Access Control**
   - Guest access `/dashboard` → Redirect to `/login`
   - Student access `/dashboard-admin` → Denied/Redirect
   - Teacher/admin access `/dashboard` → Denied/Redirect

3. **Student Core Flow**
   - View dashboard → See upcoming exams
   - Browse courses → View course detail
   - Enroll course by code → Success confirmation
   - View topic → Read material content

4. **CBT Exam Critical Path**
   - Enter exam code → Validate eligibility
   - Camera permission check → Pass/Fail
   - Fullscreen check → Pass/Fail
   - Start exam → Load questions
   - Answer question → Auto-save confirmation
   - Submit exam → Success confirmation

5. **Admin Core Flow**
   - View dashboard → Select exam → See statistics
   - Create course → Upload photo → Success
   - Create exam → Add questions → Success
   - Add participant → Success confirmation

### Priority 2: High-Value Flows (Should Automate)
- Course search and filter
- Material completion tracking
- Quiz start, answer, submit flow
- Notification list and mark as read
- Participant bulk upload
- Exam leaderboard view

### Priority 3: Medium-Value Flows (Nice to Have)
- Team identity view
- Notes CRUD operations
- Content block management
- Quiz question management

## Project Structure

```
automation-testing/
├── README.md                    # This file
├── package.json                 # Dependencies
├── playwright.config.ts         # Playwright configuration
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
│
├── tests/
│   ├── auth/
│   │   ├── login.spec.ts        # Login tests
│   │   └── rbac.spec.ts         # Role-based access tests
│   │
│   ├── student/
│   │   ├── dashboard.spec.ts    # Student dashboard tests
│   │   ├── courses.spec.ts      # Course enrollment tests
│   │   ├── content.spec.ts      # Material viewing tests
│   │   └── exam.spec.ts         # CBT exam tests
│   │
│   ├── admin/
│   │   ├── dashboard.spec.ts    # Admin dashboard tests
│   │   ├── courses.spec.ts      # Course management tests
│   │   ├── exams.spec.ts        # Exam management tests
│   │   └── participants.spec.ts # Participant management tests
│   │
│   └── smoke/
│       └── critical-paths.spec.ts # Smoke test suite
│
├── pages/                       # Page Object Model
│   ├── LoginPage.ts
│   ├── StudentDashboardPage.ts
│   ├── CoursePage.ts
│   ├── ExamPage.ts
│   ├── AdminDashboardPage.ts
│   └── ...
│
├── fixtures/                    # Test fixtures and helpers
│   ├── auth.fixture.ts          # Authentication helpers
│   ├── test-data.ts             # Test data constants
│   └── custom-matchers.ts       # Custom assertions
│
├── utils/                       # Utility functions
│   ├── api-helpers.ts           # API call helpers
│   ├── storage-helpers.ts       # LocalStorage/Cookie helpers
│   └── screenshot-helpers.ts    # Screenshot utilities
│
└── reports/                     # Test reports (gitignored)
    ├── html-report/
    └── screenshots/
```

## Setup Instructions

### 1. Initialize Project

```bash
cd automation-testing

# Initialize npm project
npm init -y

# Install Playwright
npm install -D @playwright/test
npm install -D typescript @types/node

# Install Playwright browsers
npx playwright install
```

### 2. Create Configuration

Create `playwright.config.ts`:

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: 'reports/html-report' }],
    ['list']
  ],
  use: {
    baseURL: 'https://arterilearning.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

### 3. Create Environment Variables

Create `.env.example`:

```env
# Base URL
BASE_URL=https://arterilearning.com
API_BASE_URL=https://backend.arterilearning.com/api/v1

# Student Credentials
STUDENT_USERNAME=
STUDENT_PASSWORD=

# Teacher/Admin Credentials
ADMIN_USERNAME=
ADMIN_PASSWORD=

# Test Data
ENROLLMENT_CODE=
EXAM_CODE=
```

Copy to `.env` and fill in actual credentials (DO NOT commit `.env`).

### 4. Create Page Objects

Example `pages/LoginPage.ts`:

```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly identifierInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.identifierInput = page.locator('input[name="identifier"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.error-message');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(identifier: string, password: string) {
    await this.identifierInput.fill(identifier);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectErrorMessage() {
    await this.errorMessage.waitFor({ state: 'visible' });
  }
}
```

### 5. Create Test Files

Example `tests/auth/login.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

test.describe('Authentication - Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC-AUTH-001: Login with valid student credential', async ({ page }) => {
    await loginPage.login(
      process.env.STUDENT_USERNAME!,
      process.env.STUDENT_PASSWORD!
    );

    // Verify redirect to student dashboard
    await expect(page).toHaveURL('/dashboard');
    
    // Verify token is stored
    const token = await page.evaluate(() => localStorage.getItem('token'));
    expect(token).toBeTruthy();
  });

  test('TC-AUTH-003: Login fails with wrong password', async ({ page }) => {
    await loginPage.login(
      process.env.STUDENT_USERNAME!,
      'wrongpassword123'
    );

    // Verify error message is shown
    await loginPage.expectErrorMessage();
    
    // Verify still on login page
    await expect(page).toHaveURL('/login');
  });
});
```

## Test Execution

### Run All Tests
```bash
npx playwright test
```

### Run Specific Test File
```bash
npx playwright test tests/auth/login.spec.ts
```

### Run Tests in Headed Mode (See Browser)
```bash
npx playwright test --headed
```

### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

### Run Tests on Specific Browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Run Tests with UI Mode (Interactive)
```bash
npx playwright test --ui
```

### Generate HTML Report
```bash
npx playwright show-report reports/html-report
```

## Test Data Management

### Static Test Data
Store in `fixtures/test-data.ts`:

```typescript
export const TEST_DATA = {
  validStudent: {
    username: process.env.STUDENT_USERNAME,
    password: process.env.STUDENT_PASSWORD,
  },
  validAdmin: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  invalidCredentials: {
    username: 'invalid@example.com',
    password: 'wrongpassword',
  },
  enrollmentCode: process.env.ENROLLMENT_CODE,
  examCode: process.env.EXAM_CODE,
};
```

### Dynamic Test Data
Use API helpers to create/cleanup test data:

```typescript
// utils/api-helpers.ts
export async function createTestCourse(token: string) {
  const response = await fetch(`${API_BASE_URL}/teacher/courses`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Test Course',
      description: 'Automated test course',
    }),
  });
  return response.json();
}
```

## Authentication Helpers

Create `fixtures/auth.fixture.ts`:

```typescript
import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type AuthFixtures = {
  authenticatedStudentPage: Page;
  authenticatedAdminPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedStudentPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.STUDENT_USERNAME!,
      process.env.STUDENT_PASSWORD!
    );
    await page.waitForURL('/dashboard');
    await use(page);
  },

  authenticatedAdminPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(
      process.env.ADMIN_USERNAME!,
      process.env.ADMIN_PASSWORD!
    );
    await page.waitForURL('/dashboard-admin');
    await use(page);
  },
});
```

Usage:
```typescript
import { test } from '../../fixtures/auth.fixture';

test('Student can view courses', async ({ authenticatedStudentPage }) => {
  await authenticatedStudentPage.goto('/courses');
  // Test continues with authenticated session
});
```

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - uses: actions/setup-node@v3
      with:
        node-version: 18
    
    - name: Install dependencies
      run: |
        cd automation-testing
        npm ci
    
    - name: Install Playwright Browsers
      run: |
        cd automation-testing
        npx playwright install --with-deps
    
    - name: Run Playwright tests
      env:
        STUDENT_USERNAME: ${{ secrets.STUDENT_USERNAME }}
        STUDENT_PASSWORD: ${{ secrets.STUDENT_PASSWORD }}
        ADMIN_USERNAME: ${{ secrets.ADMIN_USERNAME }}
        ADMIN_PASSWORD: ${{ secrets.ADMIN_PASSWORD }}
      run: |
        cd automation-testing
        npx playwright test
    
    - uses: actions/upload-artifact@v3
      if: always()
      with:
        name: playwright-report
        path: automation-testing/reports/html-report/
        retention-days: 30
```

## Best Practices

### 1. Use Page Object Model
- Encapsulate page interactions in page classes
- Keep tests clean and readable
- Reuse page objects across tests

### 2. Use Fixtures for Authentication
- Avoid repeating login steps in every test
- Use authenticated fixtures for tests that require login

### 3. Use Explicit Waits
- Wait for elements to be visible/enabled before interacting
- Use `waitForURL`, `waitForSelector`, `waitForResponse`

### 4. Handle Flaky Tests
- Use retries for flaky tests
- Add proper waits instead of `setTimeout`
- Use `toHaveURL` instead of checking URL string

### 5. Organize Tests by Feature
- Group related tests in describe blocks
- Use clear test names that describe behavior
- Follow naming convention: `TC-XXX-NNN: Description`

### 6. Clean Up Test Data
- Use `afterEach` or `afterAll` to clean up
- Delete created resources via API
- Reset state between tests

### 7. Use Environment Variables
- Never hardcode credentials
- Use `.env` for local, secrets for CI/CD
- Keep `.env.example` updated

## Current Status

**Status:** ⚠️ Project structure defined, awaiting implementation

| Metric | Value |
|---|---:|
| Test Scenarios Planned | 25+ |
| Test Files Created | 0 |
| Page Objects Created | 0 |
| Tests Passing | 0 |
| Code Coverage | 0% |

## Blockers

1. **Test Credentials Required:**
   - Student account credentials
   - Teacher/Admin account credentials
   - Valid enrollment and exam codes

2. **Selector Mapping Required:**
   - Need to inspect actual DOM to create accurate locators
   - May need data-testid attributes for stable selectors

## Next Steps

1. ✅ Define project structure
2. ⏳ Initialize npm project and install Playwright
3. ⏳ Create playwright.config.ts
4. ⏳ Create page objects for critical pages
5. ⏳ Implement authentication tests
6. ⏳ Implement student flow tests
7. ⏳ Implement admin flow tests
8. ⏳ Setup CI/CD pipeline
9. ⏳ Execute tests and generate reports

## Evidence Location

- **Test Reports:** `reports/html-report/`
- **Screenshots:** `reports/screenshots/`
- **Videos:** `reports/videos/`
- **Trace Files:** `reports/traces/`

---

**Prepared by:** Irza Dzulhika  
**Last Updated:** 2026-05-14
