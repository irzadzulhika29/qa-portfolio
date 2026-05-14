# QA Software Portfolio Workflow Guide

Dokumen ini menjadi panduan kerja end-to-end untuk membuat portfolio QA Software pada beberapa project website atau software. Gunakan dokumen ini sebagai template utama untuk setiap project yang akan diuji.

Target portfolio:

- Menunjukkan cara berpikir QA yang sistematis
- Menunjukkan kemampuan manual testing, API testing, automation testing, CI/CD, reporting, dan evidence management
- Menunjukkan hasil kerja QA dalam bentuk dokumen, report, screenshot, video, dan source code automation
- Menjelaskan peran, scope, metode pengujian, tools, dan kontribusi teknis dalam setiap project

---

## 1. Konsep Portfolio QA

Portfolio QA tidak cukup hanya berisi profil dan daftar tools. Portfolio harus menunjukkan proses kerja QA dari awal sampai akhir.

Format ideal:

```text
Portfolio QA = Personal Branding + Project Context + QA Documentation + Test Execution + Automation + Report + Evidence
```

Untuk setiap project, siapkan:

1. Project overview
2. Scope of testing
3. Test plan
4. Test scenario
5. Test case
6. API testing documentation
7. Automation testing documentation
8. Bug report
9. Test execution report
10. Release readiness report
11. Evidence folder
12. README ringkas yang menjelaskan hasil project

---

## 2. Rekomendasi Struktur Repository

Gunakan satu repo khusus untuk portfolio QA.

Best practice untuk struktur dokumentasi QA per project:

- `02-test-plan.md` dibuat 1 file untuk seluruh project
- `03-test-scenario.md` berisi ringkasan skenario utama semua fitur atau module
- `04-test-case.md` dipakai sebagai index utama test case
- Detail test case sebaiknya dipisah ke folder `docs/test-cases/` per fitur atau module
- Jika project kecil sampai medium, 1 file scenario gabungan biasanya sudah cukup
- Jika project besar, scenario juga boleh dipecah per module

Untuk portfolio QA, format hybrid berikut paling direkomendasikan karena global documentation tetap ringkas, tetapi detail test case tetap rapi dan profesional.

```text
qa-software-portfolio/
├── README.md
├── qa-workflow-guide.md
│
├── project-01-admin-dashboard/
│   ├── README.md
│   ├── docs/
│   │   ├── 01-project-overview.md
│   │   ├── 02-test-plan.md
│   │   ├── 03-test-scenario.md
│   │   ├── 04-test-case.md
│   │   ├── 05-requirement-traceability-matrix.md
│   │   ├── 06-bug-report.md
│   │   ├── 07-test-execution-report.md
│   │   ├── 08-release-readiness-report.md
│   │   └── 09-lessons-learned.md
│   │
│   ├── api-testing/
│   │   ├── README.md
│   │   ├── postman-collection.json
│   │   ├── postman-environment.example.json
│   │   ├── api-test-case.md
│   │   └── newman-report.html
│   │
│   ├── automation-testing/
│   │   ├── README.md
│   │   ├── playwright.config.ts
│   │   ├── package.json
│   │   ├── tests/
│   │   │   ├── auth.spec.ts
│   │   │   ├── dashboard.spec.ts
│   │   │   ├── user-management.spec.ts
│   │   │   └── crud.spec.ts
│   │   ├── pages/
│   │   │   ├── LoginPage.ts
│   │   │   ├── DashboardPage.ts
│   │   │   └── UserManagementPage.ts
│   │   ├── fixtures/
│   │   │   └── test-data.ts
│   │   └── reports/
│   │       └── playwright-report/
│   │
│   ├── performance-testing/
│   │   ├── README.md
│   │   ├── k6-script.js
│   │   └── result-summary.md
│   │
│   ├── security-basic-testing/
│   │   ├── README.md
│   │   └── security-checklist.md
│   │
│   └── evidence/
│       ├── screenshots/
│       ├── videos/
│       ├── network-response/
│       ├── console-log/
│       └── test-reports/
│
├── project-02-ecommerce/
│   └── ...same structure...
│
├── project-03-ai-assistant/
│   └── ...same structure...
│
└── .github/
    └── workflows/
        ├── project-01-playwright.yml
        ├── project-01-api-test.yml
        ├── project-02-playwright.yml
        ├── project-02-api-test.yml
        ├── project-03-playwright.yml
        └── project-03-api-test.yml
```

Struktur yang direkomendasikan untuk setiap project:

```text
project-01-admin-dashboard/
├── README.md
├── docs/
│   ├── 01-project-overview.md
│   ├── 02-test-plan.md
│   ├── 03-test-scenario.md
│   ├── 04-test-case.md
│   ├── 05-bug-report.md
│   ├── 06-test-execution-report.md
│   ├── 07-release-readiness-report.md
│   └── test-cases/
│       ├── auth-test-case.md
│       ├── dashboard-test-case.md
│       ├── user-management-test-case.md
│       ├── crud-test-case.md
│       └── file-upload-test-case.md
├── api-testing/
├── automation-testing/
├── performance-testing/
├── security-basic-testing/
└── evidence/
```

Dokumen seperti `requirement-traceability-matrix.md`, `lessons-learned.md`, dan `test-data.md` tetap boleh ditambahkan bila memang diperlukan, tetapi posisinya sebagai dokumen pelengkap.

---

## 3. Root README Template

File: `README.md`

```markdown
# QA Software Portfolio

Portfolio ini berisi dokumentasi dan implementasi proses Software Quality Assurance untuk beberapa project website atau software.

## Profile

**Name:** Irza  
**Target Role:** Software QA Engineer / QA Automation Engineer  
**Background:** Information Systems, Web Development, REST API, CI/CD, AI/ML  
**Focus:** Manual Testing, API Testing, Automation Testing, CI/CD Testing, Test Reporting

## Portfolio Objective

Tujuan portfolio ini adalah menunjukkan kemampuan dalam merancang, menjalankan, mengotomatisasi, dan melaporkan proses pengujian software secara sistematis.

## Project List

| Project | Type | Testing Scope | Demo URL | QA Docs | Automation | Report |
|---|---|---|---|---|---|---|
| Admin Dashboard | Web App | UI, API, RBAC, CRUD | Link | Link | Link | Link |
| E-Commerce | Web App | Auth, Product, Cart, Checkout | Link | Link | Link | Link |
| AI Assistant | Web App | Chat, File Upload, API, History | Link | Link | Link | Link |

## QA Areas Covered

- Manual Testing
- Functional Testing
- Regression Testing
- API Testing
- Web Automation Testing
- CI/CD Testing
- Basic Performance Testing
- Basic Security Testing
- Test Reporting
- Bug Reporting
- Release Readiness Assessment

## Tools

| Category | Tools |
|---|---|
| Test Management | Markdown, Google Sheets, GitHub Issues |
| API Testing | Postman, Newman |
| Web Automation | Playwright, TypeScript |
| CI/CD | GitHub Actions |
| Performance Testing | k6 |
| Security Basic Testing | OWASP ZAP, Browser DevTools |
| Evidence | Screenshot, Video, Network Payload, Console Log |

## How to Use This Repository

1. Open a project folder
2. Read the project overview
3. Review the test plan and scope
4. Check test scenarios and test cases
5. Review API testing and automation testing files
6. Read bug reports and evidence
7. Check test execution report
8. Check release readiness decision
```

---

## 4. Workflow End-to-End Untuk Setiap Project

Gunakan alur ini untuk setiap website atau software yang kamu jadikan portfolio.

```text
1. Pilih application under test
2. Tentukan environment testing
3. Pahami requirement dan fitur utama
4. Buat project overview
5. Buat scope of testing
6. Buat test plan
7. Buat test scenario
8. Buat test case
9. Siapkan test data
10. Jalankan manual testing
11. Catat bug dan evidence
12. Lakukan API testing
13. Buat automation testing
14. Jalankan test via CI/CD
15. Lakukan basic performance testing
16. Lakukan basic security testing
17. Buat test execution report
18. Buat release readiness report
19. Tulis lessons learned
20. Update README project
```

---

## 5. Project README Template

File: `project-xx/README.md`

```markdown
# Project Name: [Nama Project]

## 1. Project Summary

Project ini adalah [jenis aplikasi] yang digunakan untuk [tujuan aplikasi]. Portfolio QA ini berfokus pada pengujian fitur utama, API, role access, validasi data, dan stabilitas workflow pengguna.

## 2. Application Under Test

| Item | Detail |
|---|---|
| Application Name | [Nama aplikasi] |
| Application Type | Web App / SaaS / Dashboard / E-Commerce |
| Demo URL | [URL staging/demo] |
| API Base URL | [API URL] |
| Repository App | [Link repo aplikasi jika publik] |
| Repository QA | [Link folder QA project ini] |

## 3. QA Project Information

| Item | Detail |
|---|---|
| QA Role | Software QA / QA Automation |
| Client / Project Owner | Personal Project / Dummy Client / Internal Project |
| Team | Solo QA / Developer + QA / Dummy Team |
| Testing Period | [Tanggal mulai] sampai [Tanggal selesai] |
| Testing Environment | Local / Staging / Demo |
| Browser | Chrome, Firefox, Safari jika relevan |
| Device | Desktop / Mobile Responsive |

## 4. Scope of Testing

| Feature | Manual | API | Automation | Notes |
|---|---|---|---|---|
| Authentication | Yes | Yes | Yes | Login, logout, session |
| User Management | Yes | Yes | Yes | CRUD user |
| Role Access | Yes | Yes | Yes | Admin vs regular user |
| Search and Filter | Yes | Partial | Yes | Data table |
| File Upload | Yes | Partial | Partial | Valid and invalid file |

## 5. Testing Approach

- Requirement-based testing
- Risk-based testing
- Positive testing
- Negative testing
- Boundary value testing
- Exploratory testing
- Regression testing
- API contract testing
- End-to-end automation testing

## 6. Tools Used

| Area | Tool |
|---|---|
| Test Case Documentation | Markdown / Spreadsheet |
| Bug Tracking | GitHub Issues / Markdown |
| API Testing | Postman, Newman |
| UI Automation | Playwright, TypeScript |
| CI/CD | GitHub Actions |
| Performance Testing | k6 |
| Security Basic Testing | OWASP ZAP / DevTools |

## 7. Test Result Summary

| Metric | Value |
|---|---:|
| Total Test Cases | [Number] |
| Passed | [Number] |
| Failed | [Number] |
| Blocked | [Number] |
| Pass Rate | [Percentage] |
| Critical Bugs | [Number] |
| High Bugs | [Number] |
| Medium Bugs | [Number] |
| Low Bugs | [Number] |

## 8. Key Findings

- [Finding 1]
- [Finding 2]
- [Finding 3]

## 9. Release Decision

**Status:** Recommended / Not Recommended / Recommended with Notes

**Reason:**  
[Tulis alasan berdasarkan bug, risk, dan test result]

## 10. Documentation Links

| Document | Link |
|---|---|
| Test Plan | docs/02-test-plan.md |
| Test Scenario | docs/03-test-scenario.md |
| Test Case | docs/04-test-case.md |
| Bug Report | docs/06-bug-report.md |
| Test Execution Report | docs/07-test-execution-report.md |
| Release Readiness Report | docs/08-release-readiness-report.md |
| API Testing | api-testing/README.md |
| Automation Testing | automation-testing/README.md |
```

---

## 6. Project Overview Template

File: `docs/01-project-overview.md`

```markdown
# Project Overview

## 1. Project Identity

| Item | Detail |
|---|---|
| Project Name | [Nama project] |
| Project Type | [Web app / dashboard / e-commerce / SaaS] |
| Project Owner | [Personal / dummy client / internal team] |
| QA Role | [Software QA / QA Automation] |
| Testing Period | [Date range] |
| Testing Environment | [Local / staging / demo] |

## 2. Project Description

[Tulis deskripsi singkat aplikasi. Jelaskan tujuan aplikasi, pengguna utama, dan masalah yang diselesaikan.]

## 3. Business Context

[Tulis konteks bisnis atau skenario penggunaan.]

Example:

Aplikasi ini digunakan oleh admin untuk mengelola data user, role, dan transaksi. Kualitas fitur authentication, role access, dan data management menjadi prioritas karena berdampak langsung pada keamanan dan akurasi data.

## 4. User Roles

| Role | Description | Main Access |
|---|---|---|
| Admin | Mengelola seluruh data | Dashboard, user management, settings |
| Regular User | Menggunakan fitur utama | Dashboard user, profile |
| Guest | Belum login | Login, register, landing page |

## 5. Main Features

| Feature | Description | Risk Level |
|---|---|---|
| Authentication | Login, logout, session | High |
| Role-Based Access | Pembatasan akses berdasarkan role | Critical |
| CRUD Data | Create, read, update, delete data | High |
| Search and Filter | Mencari dan memfilter data | Medium |
| File Upload | Upload dokumen atau gambar | High |

## 6. QA Contribution

Dalam project ini, kontribusi QA meliputi:

- Menyusun test plan
- Menentukan scope testing
- Membuat test scenario dan test case
- Menjalankan manual testing
- Membuat API test collection
- Membuat automation testing menggunakan Playwright
- Melaporkan bug dengan evidence
- Membuat test execution report
- Memberikan release readiness decision

## 7. Evidence Included

| Evidence Type | Location |
|---|---|
| Screenshot | evidence/screenshots/ |
| Video | evidence/videos/ |
| Network Response | evidence/network-response/ |
| Console Log | evidence/console-log/ |
| Test Report | evidence/test-reports/ |
```

---

## 7. Test Plan Template

File: `docs/02-test-plan.md`

```markdown
# Test Plan

## 1. Objective

Tujuan testing adalah memastikan aplikasi [nama aplikasi] berjalan sesuai requirement, stabil pada flow utama, memiliki validasi input yang benar, dan tidak memiliki bug kritis pada fitur utama.

## 2. Scope of Testing

### In Scope

| Area | Description |
|---|---|
| Authentication | Login, logout, session validation |
| Authorization | Role admin dan regular user |
| CRUD | Create, read, update, delete data |
| Form Validation | Required field, format, boundary value |
| API Testing | Status code, response body, auth, validation |
| Automation Testing | E2E flow untuk fitur utama |
| Regression Testing | Memastikan fitur lama tidak rusak |

### Out of Scope

| Area | Reason |
|---|---|
| Full penetration testing | Hanya dilakukan basic security testing |
| Full load testing | Hanya dilakukan basic performance smoke test |
| Payment real transaction | Menggunakan payment dummy atau sandbox |
| Production destructive testing | Testing dilakukan di staging/demo |

## 3. Test Environment

| Item | Detail |
|---|---|
| Environment | Staging / Demo / Local |
| Web URL | [URL] |
| API Base URL | [URL] |
| Browser | Chrome, Firefox |
| OS | Windows / macOS / Linux |
| Device | Desktop / Mobile Responsive |
| Database | [Jika ada akses] |
| Test Account Admin | [email dummy] |
| Test Account User | [email dummy] |

## 4. Test Types

| Test Type | Description | Tool |
|---|---|---|
| Functional Testing | Cek fitur sesuai requirement | Manual |
| Regression Testing | Cek fitur lama setelah perubahan | Manual / Playwright |
| API Testing | Cek endpoint, response, validation | Postman / Newman |
| UI Automation | Cek flow utama secara otomatis | Playwright |
| Performance Basic | Cek response time dasar | k6 |
| Security Basic | Cek auth, role access, XSS basic, IDOR basic | DevTools / Postman / OWASP ZAP |

## 5. Test Strategy

Testing dilakukan dengan pendekatan berikut:

1. Requirement-based testing untuk memastikan fitur sesuai kebutuhan
2. Risk-based testing untuk memprioritaskan area dengan dampak tinggi
3. Positive testing untuk memastikan flow valid berhasil
4. Negative testing untuk memastikan input tidak valid ditolak
5. Boundary value testing untuk validasi batas input
6. Exploratory testing untuk menemukan bug di luar test case formal
7. Automation testing untuk flow yang sering diulang

## 6. Entry Criteria

Testing dapat dimulai jika:

- URL aplikasi dapat diakses
- API endpoint tersedia
- Test account tersedia
- Requirement dasar tersedia
- Fitur utama sudah bisa digunakan
- Data test tersedia

## 7. Exit Criteria

Testing dianggap selesai jika:

- Semua test case prioritas tinggi sudah dieksekusi
- Bug critical sudah diperbaiki atau terdokumentasi
- Bug high sudah diperbaiki atau memiliki keputusan release
- Regression test selesai dijalankan
- Test execution report sudah dibuat
- Release readiness report sudah dibuat

## 8. Risk and Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Requirement tidak lengkap | Expected result tidak jelas | Buat assumption dan catat di report |
| Test data berubah | Test gagal tidak konsisten | Gunakan test data khusus |
| Staging down | Testing tertunda | Siapkan local environment jika memungkinkan |
| API berubah tanpa update docs | Test API gagal | Catat sebagai API contract issue |
| Automation flaky | Report kurang valid | Tambahkan retry terbatas dan stabilkan locator |

## 9. Deliverables

| Deliverable | Location |
|---|---|
| Test Scenario | docs/03-test-scenario.md |
| Test Case | docs/04-test-case.md |
| Bug Report | docs/06-bug-report.md |
| API Collection | api-testing/postman-collection.json |
| Automation Script | automation-testing/tests/ |
| Test Execution Report | docs/07-test-execution-report.md |
| Release Readiness Report | docs/08-release-readiness-report.md |
| Evidence | evidence/ |
```

---

## 8. Test Scenario Template

File: `docs/03-test-scenario.md`

```markdown
# Test Scenario

## Summary

Dokumen ini berisi daftar skenario pengujian untuk fitur utama aplikasi [nama aplikasi].

## Scenario Table

| Scenario ID | Feature | Scenario | Priority | Test Type | Status |
|---|---|---|---|---|---|
| SCN-001 | Authentication | User login dengan credential valid | High | Functional | Not Run |
| SCN-002 | Authentication | User gagal login dengan password salah | High | Negative | Not Run |
| SCN-003 | Authentication | User logout dari aplikasi | High | Functional | Not Run |
| SCN-004 | Authorization | Regular user tidak dapat mengakses halaman admin | Critical | Security Basic | Not Run |
| SCN-005 | User Management | Admin membuat user baru dengan data valid | High | Functional | Not Run |
| SCN-006 | User Management | Admin gagal membuat user dengan email duplikat | High | Negative | Not Run |
| SCN-007 | CRUD | Admin mengubah data existing | High | Functional | Not Run |
| SCN-008 | CRUD | Admin menghapus data existing | High | Functional | Not Run |
| SCN-009 | Search and Filter | User mencari data berdasarkan keyword valid | Medium | Functional | Not Run |
| SCN-010 | File Upload | User upload file dengan format valid | Medium | Functional | Not Run |
| SCN-011 | File Upload | User gagal upload file dengan format tidak valid | High | Negative | Not Run |
| SCN-012 | API Auth | Login API mengembalikan token valid | High | API | Not Run |
| SCN-013 | API Auth | Endpoint protected menolak request tanpa token | Critical | API Security | Not Run |
| SCN-014 | Regression | Flow utama tetap berjalan setelah update | High | Regression | Not Run |

## Priority Definition

| Priority | Definition |
|---|---|
| Critical | Flow utama atau security risk yang dapat menggagalkan release |
| High | Fitur penting yang sering digunakan user |
| Medium | Fitur pendukung yang berdampak sedang |
| Low | Minor UI atau low-impact behavior |
```

---

## 9. Test Case Template

File: `docs/04-test-case.md`

```markdown
# Test Case Documentation

## Test Case Format

| Field | Description |
|---|---|
| Test Case ID | ID unik test case |
| Scenario ID | Referensi ke scenario |
| Feature | Nama fitur |
| Test Case Title | Judul test case |
| Preconditions | Kondisi sebelum test dijalankan |
| Test Data | Data yang digunakan |
| Test Steps | Langkah eksekusi |
| Expected Result | Hasil yang diharapkan |
| Actual Result | Hasil aktual |
| Status | Pass / Fail / Blocked / Not Run |
| Priority | Critical / High / Medium / Low |
| Type | Positive / Negative / Boundary / Regression |
| Evidence | Link screenshot, video, atau log |
| Notes | Catatan tambahan |

## Test Case Table

| Test Case ID | Scenario ID | Feature | Title | Preconditions | Test Data | Steps | Expected Result | Actual Result | Status | Priority | Type | Evidence | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| TC-001 | SCN-001 | Authentication | Login with valid credential | User is registered | admin@test.com / valid password | 1. Open login page<br>2. Input valid email<br>3. Input valid password<br>4. Click Login | User redirected to dashboard | TBD | Not Run | High | Positive | TBD | - |
| TC-002 | SCN-002 | Authentication | Login with wrong password | User is registered | admin@test.com / wrong password | 1. Open login page<br>2. Input valid email<br>3. Input wrong password<br>4. Click Login | System shows invalid credential message | TBD | Not Run | High | Negative | TBD | - |
| TC-003 | SCN-004 | Authorization | Regular user access admin page | User logged in as regular user | user@test.com | 1. Login as regular user<br>2. Open /admin/users directly | System shows 403 Forbidden or redirects to allowed page | TBD | Not Run | Critical | Security Basic | TBD | - |

## Status Definition

| Status | Definition |
|---|---|
| Pass | Actual result matches expected result |
| Fail | Actual result does not match expected result |
| Blocked | Test cannot be executed due to blocker |
| Not Run | Test has not been executed |

## Test Data Example

| Role | Email | Password | Notes |
|---|---|---|---|
| Admin | admin@test.com | Use env variable | Valid admin account |
| User | user@test.com | Use env variable | Valid regular user account |
| Invalid | invalid@test.com | wrongpass | Negative test |
```

---

## 10. Requirement Traceability Matrix Template

File: `docs/05-requirement-traceability-matrix.md`

```markdown
# Requirement Traceability Matrix

## Purpose

Dokumen ini digunakan untuk memastikan setiap requirement memiliki test scenario dan test case yang sesuai.

| Requirement ID | Requirement | Feature | Scenario ID | Test Case ID | Test Type | Status | Notes |
|---|---|---|---|---|---|---|---|
| REQ-001 | User dapat login dengan credential valid | Authentication | SCN-001 | TC-001 | Functional | Not Run | - |
| REQ-002 | User tidak dapat login dengan password salah | Authentication | SCN-002 | TC-002 | Negative | Not Run | - |
| REQ-003 | Regular user tidak dapat mengakses halaman admin | Authorization | SCN-004 | TC-003 | Security Basic | Not Run | Critical risk |
| REQ-004 | Admin dapat membuat user baru | User Management | SCN-005 | TC-004 | Functional | Not Run | - |
| REQ-005 | Email user harus unik | User Management | SCN-006 | TC-005 | Negative | Not Run | - |

## Coverage Summary

| Metric | Value |
|---|---:|
| Total Requirements | [Number] |
| Requirements Covered | [Number] |
| Requirements Not Covered | [Number] |
| Coverage Percentage | [Percentage] |
```

---

## 11. Bug Report Template

File: `docs/06-bug-report.md`

```markdown
# Bug Report

## Bug Summary

| Metric | Value |
|---|---:|
| Total Bugs | [Number] |
| Critical | [Number] |
| High | [Number] |
| Medium | [Number] |
| Low | [Number] |
| Open | [Number] |
| Fixed | [Number] |
| Retested | [Number] |
| Closed | [Number] |

## Bug Report Format

### BUG-001: [Bug Title]

| Field | Detail |
|---|---|
| Bug ID | BUG-001 |
| Title | [Short clear title] |
| Feature | [Feature name] |
| Environment | [Browser, OS, URL, API URL] |
| Severity | Critical / High / Medium / Low |
| Priority | Critical / High / Medium / Low |
| Status | Open / In Progress / Fixed / Retest / Closed |
| Reported Date | [Date] |
| Reported By | [Name] |
| Assigned To | [Developer / Dummy] |

#### Preconditions

[Tulis kondisi sebelum bug muncul]

#### Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

#### Expected Result

[Tulis hasil yang seharusnya terjadi]

#### Actual Result

[Tulis hasil aktual yang terjadi]

#### Evidence

- Screenshot: [link]
- Video: [link]
- Network response: [link]
- Console log: [link]

#### Impact

[Jelaskan dampak bug terhadap user, data, security, atau bisnis]

#### Notes

[Tambahkan catatan jika ada]

---

## Example Bug Report

### BUG-001: Regular user can access admin user management page through direct URL

| Field | Detail |
|---|---|
| Bug ID | BUG-001 |
| Title | Regular user can access admin user management page through direct URL |
| Feature | Authorization |
| Environment | Chrome, Windows, Staging URL |
| Severity | Critical |
| Priority | High |
| Status | Open |
| Reported Date | 2026-05-14 |
| Reported By | Irza |
| Assigned To | Developer |

#### Preconditions

- Regular user account exists
- User is logged in as regular user

#### Steps to Reproduce

1. Login as regular user
2. Open `/admin/users` directly from browser address bar
3. Observe the displayed page

#### Expected Result

System blocks access and shows 403 Forbidden page or redirects user to allowed page.

#### Actual Result

Regular user can open admin user management page and view user data.

#### Evidence

- Screenshot: `evidence/screenshots/BUG-001-admin-access.png`
- Network response: `evidence/network-response/BUG-001-response.json`

#### Impact

This bug indicates broken access control. Regular users can access restricted admin data.

#### Notes

This issue should be fixed before release.
```

---

## 12. API Testing Documentation Template

File: `api-testing/README.md`

```markdown
# API Testing Documentation

## 1. Objective

API testing dilakukan untuk memastikan endpoint aplikasi berjalan sesuai API contract, requirement, dan business rule.

## 2. API Source

| Source | Detail |
|---|---|
| API Base URL | [URL] |
| Documentation | Swagger / Postman / README / Notion |
| Postman Collection | postman-collection.json |
| Environment File | postman-environment.example.json |
| Runner | Newman |

## 3. Scope

| Area | Included | Notes |
|---|---|---|
| Authentication | Yes | Login, token validation |
| Authorization | Yes | Admin vs regular user |
| CRUD | Yes | Create, read, update, delete |
| Validation | Yes | Required field, invalid format |
| Error Handling | Yes | Error code and error message |
| Pagination | Optional | If available |
| Search and Filter | Optional | If available |

## 4. API Test Cases

| API TC ID | Endpoint | Method | Scenario | Expected Status | Expected Result | Status |
|---|---|---|---|---|---|---|
| API-TC-001 | /auth/login | POST | Login with valid credential | 200 | Token returned | Not Run |
| API-TC-002 | /auth/login | POST | Login with wrong password | 401 | Error message returned | Not Run |
| API-TC-003 | /users | GET | Get users with admin token | 200 | User list returned | Not Run |
| API-TC-004 | /users | GET | Get users without token | 401 | Unauthorized | Not Run |
| API-TC-005 | /users | POST | Create user with invalid email | 422 | Validation error | Not Run |

## 5. Assertion Checklist

Each request should validate:

- Status code
- Response time
- Required response fields
- Data type
- Error message
- Auth behavior
- Role access behavior
- Response schema if possible

## 6. Example Postman Assertion

```javascript
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("Response has token", function () {
  const json = pm.response.json();
  pm.expect(json).to.have.property("token");
});
```

## 7. How to Run

```bash
newman run postman-collection.json -e postman-environment.example.json -r cli,html
```

## 8. API Test Result Summary

| Metric | Value |
|---|---:|
| Total Requests | [Number] |
| Passed | [Number] |
| Failed | [Number] |
| Average Response Time | [ms] |
| Report File | newman-report.html |
```

---

## 13. Automation Testing Documentation Template

File: `automation-testing/README.md`

```markdown
# Automation Testing Documentation

## 1. Objective

Automation testing dilakukan untuk menjalankan regression test dan end-to-end test pada flow utama aplikasi secara konsisten.

## 2. Tech Stack

| Area | Tool |
|---|---|
| Framework | Playwright |
| Language | TypeScript |
| Pattern | Page Object Model |
| Report | Playwright HTML Report |
| CI/CD | GitHub Actions |

## 3. Automation Scope

| Feature | Automated | Notes |
|---|---|---|
| Login | Yes | Valid and invalid login |
| Logout | Yes | Session cleanup |
| Dashboard | Yes | Page visibility |
| User Management | Yes | Admin CRUD |
| Role Access | Yes | Regular user restriction |
| Search and Filter | Yes | If stable data available |
| File Upload | Partial | If test file available |

## 4. Folder Structure

```text
automation-testing/
├── tests/
│   ├── auth.spec.ts
│   ├── dashboard.spec.ts
│   ├── user-management.spec.ts
│   └── crud.spec.ts
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   └── UserManagementPage.ts
├── fixtures/
│   └── test-data.ts
├── playwright.config.ts
└── package.json
```

## 5. Environment Variables

Create `.env` file locally. Do not commit real credentials.

```env
BASE_URL=
API_BASE_URL=
ADMIN_EMAIL=
ADMIN_PASSWORD=
USER_EMAIL=
USER_PASSWORD=
```

Create `.env.example` for repository.

```env
BASE_URL=https://example-staging-url.com
API_BASE_URL=https://api-example-staging-url.com
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-password
USER_EMAIL=user@example.com
USER_PASSWORD=your-password
```

## 6. How to Run

```bash
npm install
npx playwright install
npx playwright test
npx playwright show-report
```

## 7. Automation Best Practices

- Use stable locators
- Prefer role-based locators when possible
- Avoid hard-coded timeout
- Use test data that can be reset
- Separate page logic from test logic
- Use Page Object Model for reusable actions
- Capture screenshot and video on failure
- Run tests in CI/CD

## 8. Test Result Summary

| Metric | Value |
|---|---:|
| Total Automated Tests | [Number] |
| Passed | [Number] |
| Failed | [Number] |
| Flaky | [Number] |
| Report | reports/playwright-report |
```

---

## 14. Performance Testing Basic Template

File: `performance-testing/README.md`

```markdown
# Performance Testing Basic

## 1. Objective

Performance testing basic dilakukan untuk mengecek response time dan stabilitas endpoint utama pada beban ringan.

## 2. Scope

| Endpoint / Flow | Reason |
|---|---|
| GET /products | Endpoint sering diakses |
| POST /login | Flow utama authentication |
| GET /dashboard-data | Data utama dashboard |

## 3. Tool

| Tool | Purpose |
|---|---|
| k6 | Load test basic |

## 4. Scenario

| Scenario | Virtual Users | Duration | Expected Result |
|---|---:|---|---|
| API smoke load | 20 | 1 minute | Error rate below 1 percent |
| Login endpoint check | 10 | 1 minute | p95 below 1000ms |

## 5. Example k6 Script

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://example.com/api/products');

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time below 1000ms': (r) => r.timings.duration < 1000,
  });

  sleep(1);
}
```

## 6. Result Summary

| Metric | Value |
|---|---:|
| Average Response Time | [ms] |
| p95 Response Time | [ms] |
| Error Rate | [%] |
| Requests Per Second | [Number] |
| Status | Pass / Fail |

## 7. Notes

This is not full load testing. This test only validates basic performance behavior for portfolio purposes.
```

---

## 15. Security Basic Testing Template

File: `security-basic-testing/security-checklist.md`

```markdown
# Security Basic Testing Checklist

## Objective

Security basic testing dilakukan untuk mengecek risiko dasar pada authentication, authorization, input handling, dan data exposure.

## Checklist

| ID | Area | Test | Expected Result | Status | Evidence |
|---|---|---|---|---|---|
| SEC-001 | Authentication | Access protected page without login | User redirected to login | Not Run | TBD |
| SEC-002 | Authentication | Access API without token | API returns 401 Unauthorized | Not Run | TBD |
| SEC-003 | Authorization | Regular user access admin endpoint | API returns 403 Forbidden | Not Run | TBD |
| SEC-004 | IDOR | User access another user's data by changing ID | Access denied | Not Run | TBD |
| SEC-005 | XSS Basic | Input `<script>alert(1)</script>` in text field | Script not executed | Not Run | TBD |
| SEC-006 | SQL Injection Basic | Input `' OR 1=1 --` in login field | Login rejected | Not Run | TBD |
| SEC-007 | File Upload | Upload invalid file extension | File rejected | Not Run | TBD |
| SEC-008 | Sensitive Data | Check response body for password or token leakage | Sensitive data not exposed | Not Run | TBD |
| SEC-009 | Session | Access dashboard after logout using browser back | User remains logged out | Not Run | TBD |
| SEC-010 | Error Message | Trigger server error | Error message does not expose stack trace | Not Run | TBD |

## Severity Guide

| Severity | Definition |
|---|---|
| Critical | Unauthorized access to sensitive data or admin feature |
| High | Security control fails but impact is limited |
| Medium | Weak validation or information exposure with moderate impact |
| Low | Minor security issue with low impact |
```

---

## 16. Test Execution Report Template

File: `docs/07-test-execution-report.md`

```markdown
# Test Execution Report

## 1. Summary

Testing dilakukan pada aplikasi [nama aplikasi] di environment [staging/demo/local]. Pengujian mencakup manual testing, API testing, automation testing, dan basic non-functional testing.

## 2. Execution Period

| Item | Detail |
|---|---|
| Start Date | [Date] |
| End Date | [Date] |
| Tester | Irza |
| Environment | [Environment] |
| Build / Version | [Version if available] |

## 3. Test Execution Summary

| Metric | Value |
|---|---:|
| Total Test Cases | [Number] |
| Passed | [Number] |
| Failed | [Number] |
| Blocked | [Number] |
| Not Run | [Number] |
| Pass Rate | [Percentage] |

## 4. Test Result by Feature

| Feature | Total | Passed | Failed | Blocked | Notes |
|---|---:|---:|---:|---:|---|
| Authentication | [N] | [N] | [N] | [N] | - |
| Authorization | [N] | [N] | [N] | [N] | - |
| User Management | [N] | [N] | [N] | [N] | - |
| CRUD | [N] | [N] | [N] | [N] | - |
| API Testing | [N] | [N] | [N] | [N] | - |
| Automation Testing | [N] | [N] | [N] | [N] | - |

## 5. Bug Summary

| Severity | Count | Notes |
|---|---:|---|
| Critical | [N] | [Notes] |
| High | [N] | [Notes] |
| Medium | [N] | [Notes] |
| Low | [N] | [Notes] |

## 6. Failed Test Cases

| Test Case ID | Feature | Title | Bug ID | Status |
|---|---|---|---|---|
| TC-003 | Authorization | Regular user access admin page | BUG-001 | Failed |

## 7. Blocked Test Cases

| Test Case ID | Feature | Reason | Action Needed |
|---|---|---|---|
| TC-010 | File Upload | Upload endpoint unavailable | Need backend fix |

## 8. Evidence

| Evidence | Link |
|---|---|
| Screenshot | evidence/screenshots/ |
| Video | evidence/videos/ |
| API Report | api-testing/newman-report.html |
| Automation Report | automation-testing/reports/playwright-report/ |

## 9. Conclusion

[Tulis kesimpulan singkat hasil testing.]

Example:

Testing menunjukkan bahwa fitur utama authentication dan CRUD berjalan cukup baik, tetapi ditemukan bug critical pada authorization. Release belum direkomendasikan sampai bug critical diperbaiki dan regression test selesai dijalankan.
```

---

## 17. Release Readiness Report Template

File: `docs/08-release-readiness-report.md`

```markdown
# Release Readiness Report

## 1. Release Assessment

| Item | Status |
|---|---|
| Test Execution Completed | Yes / No |
| Critical Bugs Open | Yes / No |
| High Bugs Open | Yes / No |
| Regression Completed | Yes / No |
| API Testing Completed | Yes / No |
| Automation Testing Completed | Yes / No |
| Evidence Completed | Yes / No |

## 2. Release Decision

**Decision:** Recommended / Not Recommended / Recommended with Notes

## 3. Decision Reason

[Tulis alasan keputusan release berdasarkan hasil testing.]

Example:

Release is not recommended because one critical bug still allows regular users to access admin data. This creates a high security risk and must be fixed before release.

## 4. Risk Summary

| Risk | Severity | Impact | Recommendation |
|---|---|---|---|
| Broken access control | Critical | Regular user can access admin data | Fix before release |
| Validation inconsistency | Medium | Invalid data may be saved | Fix in next sprint |

## 5. Open Bugs Before Release

| Bug ID | Title | Severity | Priority | Status |
|---|---|---|---|---|
| BUG-001 | Regular user can access admin page | Critical | High | Open |

## 6. Recommended Action

- Fix all critical bugs
- Retest affected features
- Run regression testing
- Re-run automation test suite
- Update release readiness status

## 7. Final Notes

[Tulis catatan akhir untuk project portfolio.]
```

---

## 18. Lessons Learned Template

File: `docs/09-lessons-learned.md`

```markdown
# Lessons Learned

## 1. What Went Well

- [Point 1]
- [Point 2]
- [Point 3]

## 2. What Could Be Improved

- [Point 1]
- [Point 2]
- [Point 3]

## 3. QA Skills Practiced

| Skill | Description |
|---|---|
| Test Planning | Membuat scope dan strategi testing |
| Test Case Design | Membuat positive, negative, dan edge case |
| API Testing | Menguji endpoint dan response |
| Automation Testing | Membuat test Playwright |
| CI/CD Testing | Menjalankan test otomatis melalui GitHub Actions |
| Reporting | Membuat bug report dan execution report |

## 4. Technical Challenges

| Challenge | Solution |
|---|---|
| [Challenge] | [Solution] |

## 5. Next Improvement

- Tambah test coverage
- Tambah API schema validation
- Tambah visual regression jika relevan
- Tambah database validation jika tersedia
```

---

## 19. Evidence Management Guide

Gunakan standar penamaan evidence agar mudah dibaca.

```text
evidence/
├── screenshots/
│   ├── BUG-001-admin-access.png
│   ├── BUG-002-invalid-form-validation.png
│   └── TC-001-login-success.png
├── videos/
│   ├── BUG-001-admin-access.mp4
│   └── TC-005-create-user-flow.mp4
├── network-response/
│   ├── BUG-001-admin-access-response.json
│   └── API-TC-004-unauthorized-response.json
├── console-log/
│   └── BUG-003-console-error.txt
└── test-reports/
    ├── newman-report.html
    └── playwright-report.zip
```

Naming convention:

```text
[BUG-ID]-[short-description].[extension]
[TC-ID]-[short-description].[extension]
[API-TC-ID]-[short-description].[extension]
```

Example:

```text
BUG-001-admin-access.png
TC-001-login-success.png
API-TC-004-unauthorized-response.json
```

---

## 20. GitHub Issues Template for Bug

File: `.github/ISSUE_TEMPLATE/bug_report.md`

```markdown
---
name: Bug Report
about: Report a defect found during QA testing
title: "[BUG]: "
labels: bug
assignees: ''
---

## Bug ID

BUG-XXX

## Title

[Short clear title]

## Environment

- URL:
- Browser:
- OS:
- Device:
- Build/Version:

## Severity

Critical / High / Medium / Low

## Priority

Critical / High / Medium / Low

## Preconditions

- [Precondition 1]
- [Precondition 2]

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3]

## Expected Result

[Expected result]

## Actual Result

[Actual result]

## Evidence

- Screenshot:
- Video:
- Network response:
- Console log:

## Impact

[Describe user, business, data, or security impact]

## Notes

[Additional notes]
```

---

## 21. Pull Request Checklist Template

File: `.github/pull_request_template.md`

```markdown
# Pull Request Checklist

## Change Summary

[Describe the changes]

## QA Checklist

- [ ] Test plan updated if needed
- [ ] Test scenario updated if needed
- [ ] Test case updated if needed
- [ ] Manual testing completed
- [ ] API testing completed if relevant
- [ ] Automation testing completed if relevant
- [ ] Regression testing completed
- [ ] Bug evidence attached if any
- [ ] Test execution report updated

## Test Evidence

| Evidence | Link |
|---|---|
| Screenshot | [Link] |
| Video | [Link] |
| API Report | [Link] |
| Automation Report | [Link] |

## Risk Notes

[Write known risks or limitations]
```

---

## 22. GitHub Actions Template for Playwright

File: `.github/workflows/project-xx-playwright.yml`

```yaml
name: Project XX Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  e2e-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        working-directory: project-xx/automation-testing
        run: npm ci

      - name: Install Playwright browsers
        working-directory: project-xx/automation-testing
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        working-directory: project-xx/automation-testing
        env:
          BASE_URL: ${{ secrets.PROJECT_XX_BASE_URL }}
          ADMIN_EMAIL: ${{ secrets.PROJECT_XX_ADMIN_EMAIL }}
          ADMIN_PASSWORD: ${{ secrets.PROJECT_XX_ADMIN_PASSWORD }}
          USER_EMAIL: ${{ secrets.PROJECT_XX_USER_EMAIL }}
          USER_PASSWORD: ${{ secrets.PROJECT_XX_USER_PASSWORD }}
        run: npx playwright test

      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report-project-xx
          path: project-xx/automation-testing/playwright-report/
```

---

## 23. GitHub Actions Template for API Testing

File: `.github/workflows/project-xx-api-test.yml`

```yaml
name: Project XX API Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  api-test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Newman
        run: npm install -g newman newman-reporter-htmlextra

      - name: Run API tests
        working-directory: project-xx/api-testing
        run: |
          newman run postman-collection.json \
            -e postman-environment.example.json \
            -r cli,htmlextra \
            --reporter-htmlextra-export newman-report.html

      - name: Upload Newman report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: newman-report-project-xx
          path: project-xx/api-testing/newman-report.html
```

---

## 24. Test Data Management Template

File: `docs/test-data.md`

```markdown
# Test Data

## 1. Test Account

| Role | Email | Password Source | Notes |
|---|---|---|---|
| Admin | admin@test.com | Environment variable | Used for admin flow |
| User | user@test.com | Environment variable | Used for regular user flow |
| Invalid User | invalid@test.com | Dummy | Used for negative testing |

## 2. Test Data Set

| Data ID | Type | Value | Used For |
|---|---|---|---|
| DATA-001 | Valid email | valid.user@test.com | Create user |
| DATA-002 | Invalid email | invalid-email | Form validation |
| DATA-003 | Duplicate email | existing@test.com | Duplicate validation |
| DATA-004 | Valid file | sample.pdf | File upload |
| DATA-005 | Invalid file | sample.exe | File upload negative |

## 3. Data Reset Strategy

- Use dedicated test accounts
- Avoid personal accounts
- Avoid production data
- Clean created test data after execution if possible
- Use unique timestamp for generated data

Example:

```text
test.user+20260514@example.com
```
```

---

## 25. Definition of Severity and Priority

Gunakan standar ini agar bug report konsisten.

### Severity

| Severity | Definition | Example |
|---|---|---|
| Critical | Bug menghentikan flow utama atau membuka risiko keamanan besar | Regular user bisa akses admin page |
| High | Fitur utama gagal tetapi masih ada workaround | User tidak bisa checkout |
| Medium | Fitur pendukung bermasalah dengan dampak sedang | Filter tidak akurat |
| Low | Minor UI atau typo yang tidak menghambat penggunaan | Spacing tidak konsisten |

### Priority

| Priority | Definition | Example |
|---|---|---|
| Critical | Harus diperbaiki sebelum release | Data user bocor |
| High | Perlu diperbaiki segera | Login gagal untuk sebagian user |
| Medium | Bisa diperbaiki pada sprint berjalan atau berikutnya | Sorting salah |
| Low | Bisa diperbaiki saat ada waktu | Typo label |

---

## 26. Checklist Portfolio Final

Sebelum project dimasukkan ke portfolio, pastikan semua item ini tersedia.

| Item | Status |
|---|---|
| Project README completed | Not Done |
| Project overview completed | Not Done |
| Test plan completed | Not Done |
| Test scenario completed | Not Done |
| Test case completed | Not Done |
| Requirement traceability matrix completed | Not Done |
| Manual testing executed | Not Done |
| API testing documented | Not Done |
| Postman collection added | Not Done |
| Newman report added | Not Done |
| Playwright automation added | Not Done |
| GitHub Actions workflow added | Not Done |
| Bug report completed | Not Done |
| Evidence attached | Not Done |
| Test execution report completed | Not Done |
| Release readiness report completed | Not Done |
| Lessons learned completed | Not Done |
| Root README linked to project | Not Done |

---

## 27. Recommended Execution Order for Three Projects

Agar tidak terlalu berat, kerjakan bertahap.

### Phase 1: Foundation

```text
1. Buat repo qa-software-portfolio
2. Buat root README
3. Buat struktur folder untuk 3 project
4. Isi project overview untuk masing-masing project
5. Isi test plan untuk masing-masing project
```

### Phase 2: Manual QA Documentation

```text
1. Buat test scenario
2. Buat test case
3. Jalankan manual testing
4. Catat bug
5. Simpan evidence
6. Buat test execution report
```

### Phase 3: API Testing

```text
1. Buat atau export Postman Collection
2. Tambahkan environment variable
3. Tambahkan assertion
4. Tambahkan positive and negative case
5. Jalankan Newman
6. Simpan report
```

### Phase 4: Automation Testing

```text
1. Setup Playwright
2. Buat test untuk login
3. Buat test untuk role access
4. Buat test untuk satu flow CRUD utama
5. Tambahkan Page Object Model
6. Generate HTML report
```

### Phase 5: CI/CD and Final Report

```text
1. Tambahkan GitHub Actions
2. Jalankan automation test di pipeline
3. Upload report sebagai artifact
4. Buat release readiness report
5. Rapikan README dan link antar dokumen
```

---

## 28. Portfolio Quality Standard

Project portfolio dianggap kuat jika memenuhi standar ini:

```text
1. Ada konteks project yang jelas
2. Ada scope testing yang spesifik
3. Ada test case yang tidak hanya happy path
4. Ada bug report dengan evidence
5. Ada API testing dengan assertion
6. Ada automation testing yang bisa dijalankan
7. Ada CI/CD workflow
8. Ada test execution report
9. Ada release readiness decision
10. Ada README yang mudah dibaca recruiter
```

---

## 29. Final Notes

Untuk tiga project portfolio, jangan mengejar jumlah test case terlalu banyak di awal. Fokus pada kualitas dan cakupan yang terlihat profesional.

Rekomendasi minimum per project:

| Artifact | Minimum Target |
|---|---:|
| Test Scenario | 10 sampai 15 |
| Test Case | 30 sampai 50 |
| Bug Report | 5 sampai 10 |
| API Test Case | 10 sampai 20 |
| Automation Test | 5 sampai 10 |
| Performance Script | 1 sampai 2 |
| Security Checklist | 8 sampai 12 checks |

Target akhir:

```text
Setiap project punya dokumentasi QA lengkap, test evidence, automation script, dan report yang bisa dibaca tanpa perlu penjelasan tambahan.
```
