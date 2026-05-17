# Stuudi E2E Testing — Playwright

## Project Structure

```
e2e-testing/
├── package.json              # Project config
├── playwright.config.js      # Playwright configuration (chromium only)
├── tests/
│   └── stuudi-e2e.spec.js    # 16 test cases across 6 categories
├── test-results/             # Screenshots & error context (if failed)
├── playwright-report/        # HTML report
└── README.md
```

## Prerequisites

- **Frontend:** `http://localhost:3001` (Next.js)
- **Backend:** `http://localhost:8080` (Go Gin API + MariaDB)
- **Playwright:** v1.60.0
- **Node.js:** v25.9.0

## Running Tests

```bash
cd ~/Dev/qa-portfolio/project-02-arteri-learning/e2e-testing
npx playwright test              # Run all tests
npx playwright show-report       # Open HTML report
```

## Test Categories

| Section | Tests | Scope |
|---|---|---|
| Auth Flow | 5 | Login, redirect, invalid credentials |
| Teacher Dashboard | 3 | Sidebar, content, topbar |
| Student Dashboard | 2 | Page load, sidebar |
| RBAC | 3 | Unauthenticated, role separation |
| Navigation | 2 | Courses, Participant links |
| Performance | 1 | Page load time |

## Test Credentials

- Teacher: `teacher_porto@test.com` / `password123`
- Student: `student_porto@test.com` / `password123`
