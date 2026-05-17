# Automation Testing

Berisi automation testing untuk **Arteri Learning Platform / Stuudi Frontend**.

## Struktur

```
automation-testing/
├── api/        # API Testing — Python httpx (backend)
│   ├── test-lms-project-api.py     # 19 test cases
│   ├── reports/lms-api-test-report.md
│   └── README.md
├── e2e/        # E2E Testing — Playwright (frontend)
│   ├── tests/stuudi-e2e.spec.js    # 16 test cases
│   ├── playwright.config.js
│   └── README.md
└── README.md
```

## Test Summary

| Type | Tool | Scope | Tests | Status |
|---|---|---|---|---|
| **API Automation** | Python httpx | Backend endpoints (Go + Gin) | **19/19 PASS** | ✅ |
| **E2E Automation** | Playwright + Chromium | Frontend (Next.js 16) | **16/16 PASS** | ✅ |

## Coverage

### API Testing (19 tests)
- Public endpoints (provinces, cities, schools, teams, courses)
- Auth flow (OTP, login valid/invalid/empty)
- Error handling (404, 400, 401)
- Response format validation

### E2E Testing (16 tests)
- Auth Flow (login page, invalid login, redirect teacher/student)
- Teacher Dashboard (sidebar, content, topbar)
- Student Dashboard (load, sidebar menu)
- RBAC Validation (unauth access, role guard)
- Navigation (Courses, Participant links)
- Performance (page load < 5s)

## Quick Start

### API Tests
```bash
cd automation-testing/api
python3 -m venv .venv && source .venv/bin/activate
pip install httpx
python test-lms-project-api.py
```

### E2E Tests
```bash
cd automation-testing/e2e
npm install
npx playwright test
```
