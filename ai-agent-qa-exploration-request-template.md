# AI Agent Request Template: QA Project Exploration

Gunakan dokumen ini sebagai prompt utama untuk meminta AI agent mengeksplorasi project website/software, mengidentifikasi fitur dan modul, menyusun requirement/user story, lalu membuat dasar artefak QA untuk portfolio.

---

# 1. Role AI Agent

Bertindak sebagai **Senior Software QA Engineer dan QA Consultant**.

Tugas utama kamu adalah:

1. Mengeksplorasi website/software yang diberikan.
2. Mengidentifikasi fitur, modul, flow, dan role user.
3. Menyusun requirement dan user story berdasarkan hasil eksplorasi.
4. Menentukan scope testing.
5. Menyusun daftar test scenario.
6. Menyusun kandidat test case.
7. Menentukan area API testing jika dokumentasi API tersedia.
8. Menentukan area automation testing yang layak dibuat.
9. Menghasilkan output dalam format markdown yang rapi dan siap dimasukkan ke repo QA portfolio.

Jangan langsung membuat test case final sebelum memahami fitur dan requirement.

---

# 2. Project Input

Isi bagian ini sebelum diberikan ke AI agent.

## 2.1 Project Information

```text
Project Name:
[Isi nama project]

Project Type:
[Contoh: Admin Dashboard, E-Commerce, Booking App, AI Assistant, Company Profile, SaaS App]

Project Description:
[Jelaskan singkat fungsi utama aplikasi]

Current Environment:
[Local / Staging / Demo / Production-like Demo]

Website URL:
[Masukkan link website]

Frontend Repository:
[Opsional, masukkan link repo frontend jika boleh diakses]

Backend Repository:
[Opsional, masukkan link repo backend jika boleh diakses]

API Base URL:
[Masukkan base URL API jika tersedia]

API Documentation:
[Swagger URL / Postman Collection / OpenAPI file / API README]

Design Reference:
[Opsional, Figma / screenshot / design docs]

Main Goal of QA Portfolio:
[Contoh: membuat portfolio QA manual, API testing, automation testing, CI/CD testing]
```

---

# 3. Access and Test Accounts

Gunakan akun khusus testing. Jangan gunakan akun pribadi.

```text
Admin Account:
Email:
Password:

Regular User Account:
Email:
Password:

Other Role Account:
Role:
Email:
Password:

Guest Access:
[Yes / No]

Notes:
[Contoh: data boleh dibuat dan dihapus, atau hanya boleh read-only]
```

---

# 4. Exploration Rules

Ikuti aturan berikut saat mengeksplorasi project:

1. Gunakan website URL yang diberikan sebagai sumber utama.
2. Gunakan API documentation jika tersedia.
3. Gunakan requirement eksplisit jika diberikan.
4. Jika requirement tidak tersedia, turunkan requirement sementara dari perilaku aplikasi.
5. Tandai semua requirement hasil inferensi sebagai **Assumption**.
6. Jangan melakukan destructive action di production.
7. Jangan melakukan load test berat kecuali diizinkan.
8. Jangan menghapus data penting.
9. Jangan menggunakan akun pribadi.
10. Jangan memasukkan credential asli ke output akhir.
11. Jika ada area yang tidak bisa diakses, catat sebagai limitation.
12. Jika ada fitur yang ambigu, catat sebagai open question.

---

# 5. Exploration Objectives

Eksplorasi website/software dengan tujuan menemukan:

## 5.1 Application Structure

Identifikasi:

```text
- Halaman utama
- Halaman login/register
- Dashboard
- Menu sidebar/navbar
- Module utama
- Submodule
- Form input
- Data table
- Search/filter
- Upload/download
- Notification/toast
- Modal/dialog
- Settings/profile
- Role-based access
- Error page
```

## 5.2 User Roles

Identifikasi role yang tersedia:

```text
- Guest
- Regular User
- Admin
- Super Admin
- Other role jika ada
```

Untuk setiap role, tentukan:

```text
- Halaman yang bisa diakses
- Aksi yang bisa dilakukan
- Aksi yang seharusnya ditolak
- Perbedaan permission antar role
```

## 5.3 Core User Flows

Identifikasi flow utama seperti:

```text
- Login
- Register
- Logout
- Forgot password
- Create data
- Read detail data
- Update data
- Delete data
- Search
- Filter
- Sort
- Upload file
- Download file
- Submit form
- Approve/reject
- Checkout/payment
- Chat/message
- Generate output
- Notification handling
```

## 5.4 API Behavior

Jika API documentation tersedia, identifikasi:

```text
- Endpoint list
- Method
- Request body
- Query parameter
- Response body
- Status code
- Authentication method
- Authorization rule
- Validation rule
- Error response
```

---

# 6. Required Output Format

Buat output dalam format markdown dengan struktur berikut.

---

## 6.1 Project Overview

Buat ringkasan project.

```markdown
# Project Overview

## Project Summary
[Jelaskan aplikasi secara singkat]

## Application Under Test
| Item | Description |
|---|---|
| Project Name |  |
| Project Type |  |
| Environment |  |
| Website URL |  |
| API Base URL |  |
| API Documentation |  |

## Main Business Objective
[Jelaskan tujuan bisnis aplikasi]

## Main Users
| User Role | Description | Main Permission |
|---|---|---|
| Guest |  |  |
| Regular User |  |  |
| Admin |  |  |

## Initial QA Notes
- [Catatan awal dari hasil eksplorasi]
```

---

## 6.2 Feature and Module Inventory

Buat daftar fitur dan modul yang ditemukan.

```markdown
# Feature and Module Inventory

| Module ID | Module Name | Description | Main Actor | Priority | Notes |
|---|---|---|---|---|---|
| MOD-001 | Authentication | Login, logout, session handling | Guest, User, Admin | High |  |
| MOD-002 | Dashboard | Main page after login | User, Admin | Medium |  |
```

Klasifikasi priority:

```text
Critical = fitur inti yang jika gagal membuat sistem tidak bisa digunakan
High = fitur penting untuk workflow utama
Medium = fitur pendukung penting
Low = fitur minor atau kosmetik
```

---

## 6.3 Requirement List

Turunkan requirement dari hasil eksplorasi.

Pisahkan antara requirement yang eksplisit dan requirement hasil asumsi.

```markdown
# Requirement List

| Requirement ID | Module | Requirement | Source | Priority | Notes |
|---|---|---|---|---|---|
| REQ-AUTH-001 | Authentication | User should be able to login using valid email and password | Observed | High |  |
| REQ-AUTH-002 | Authentication | System should reject invalid password | Assumption | High | Needs confirmation |
```

Gunakan nilai source:

```text
Observed = ditemukan dari perilaku aplikasi
API Docs = ditemukan dari dokumentasi API
Provided Requirement = diberikan oleh user
Assumption = disimpulkan oleh AI agent dan perlu konfirmasi
```

---

## 6.4 User Stories

Buat user story untuk setiap modul utama.

Format:

```markdown
# User Stories

## Module: Authentication

| Story ID | User Story | Acceptance Criteria | Priority |
|---|---|---|---|
| US-AUTH-001 | As a registered user, I want to login using my email and password so that I can access my dashboard. | 1. User can input email and password<br>2. System validates credentials<br>3. User is redirected to dashboard after successful login | High |
```

Gunakan format user story:

```text
As a [role], I want to [action], so that [goal].
```

Acceptance criteria harus bisa diuji.

---

## 6.5 Scope of Testing

Tentukan scope testing berdasarkan fitur yang ditemukan.

```markdown
# Scope of Testing

## In Scope

| Module | Testing Focus | Test Type |
|---|---|---|
| Authentication | Login, logout, invalid credential, session | Functional, Negative, Security Basic |
| User Management | Create, read, update, delete user | Functional, API, RBAC |

## Out of Scope

| Area | Reason |
|---|---|
| Production load test | Not allowed for demo environment |
| Real payment transaction | Uses dummy payment only |

## Test Types Recommended

- Functional Testing
- UI Testing
- API Testing
- Regression Testing
- Smoke Testing
- Negative Testing
- Boundary Testing
- Role-Based Access Testing
- Security Basic Testing
- Automation Testing
- Performance Basic Testing
```

---

## 6.6 Test Scenario Draft

Buat daftar test scenario berdasarkan modul dan requirement.

```markdown
# Test Scenario Draft

| Scenario ID | Module | Scenario | Related Requirement | Priority | Test Type |
|---|---|---|---|---|---|
| TS-AUTH-001 | Authentication | Verify user can login with valid credentials | REQ-AUTH-001 | High | Functional |
| TS-AUTH-002 | Authentication | Verify user cannot login with invalid password | REQ-AUTH-002 | High | Negative |
```

Pastikan test scenario mencakup:

```text
- Positive scenario
- Negative scenario
- Boundary scenario
- Role-based scenario
- Error handling scenario
- API scenario jika tersedia
```

---

## 6.7 Test Case Draft

Buat kandidat test case awal. Jangan perlu terlalu detail jika eksplorasi belum lengkap, tetapi cukup untuk menjadi dasar dokumentasi.

```markdown
# Test Case Draft

| TC ID | Scenario ID | Module | Test Case | Preconditions | Test Steps | Test Data | Expected Result | Priority | Type |
|---|---|---|---|---|---|---|---|---|---|
| TC-AUTH-001 | TS-AUTH-001 | Authentication | Login with valid credentials | User account exists | 1. Open login page<br>2. Enter valid email<br>3. Enter valid password<br>4. Click Login | Valid user account | User is redirected to dashboard | High | Functional |
```

---

## 6.8 API Testing Scope

Jika API documentation tersedia, buat API testing scope.

```markdown
# API Testing Scope

| API ID | Method | Endpoint | Purpose | Auth Required | Test Focus | Priority |
|---|---|---|---|---|---|---|
| API-AUTH-001 | POST | /api/login | Authenticate user | No | Status code, token, invalid credential | High |
```

Tambahkan rekomendasi API tests:

```markdown
## Recommended API Test Cases

| API TC ID | Endpoint | Case | Request Condition | Expected Status | Expected Result |
|---|---|---|---|---|---|
| API-TC-AUTH-001 | POST /api/login | Valid login | Valid email and password | 200 | Token returned |
| API-TC-AUTH-002 | POST /api/login | Invalid password | Valid email, wrong password | 401 | Error message returned |
```

Cek minimal:

```text
- Status code
- Response body
- Response schema
- Authentication
- Authorization
- Required fields
- Invalid data
- Duplicate data
- Pagination
- Search/filter
- Error message
```

---

## 6.9 Automation Testing Candidate

Tentukan skenario yang layak diautomasi.

```markdown
# Automation Testing Candidate

| Automation ID | Module | Flow | Reason to Automate | Tool Recommendation | Priority |
|---|---|---|---|---|---|
| AUTO-AUTH-001 | Authentication | Login with valid credential | Critical flow and repeated in regression | Playwright | High |
| AUTO-USER-001 | User Management | Create, edit, delete user | Core CRUD flow | Playwright | High |
```

Prioritaskan automation untuk:

```text
- Smoke test
- Regression test
- Critical user flow
- Repetitive test
- Stable feature
- API test with clear contract
```

Jangan prioritaskan automation untuk:

```text
- Fitur yang sering berubah
- UI yang belum stabil
- Visual detail kecil
- One-time test
```

---

## 6.10 Bug Observation

Jika saat eksplorasi ditemukan bug, catat dengan format berikut.

```markdown
# Initial Bug Observation

| Bug ID | Module | Title | Severity | Priority | Status | Evidence | Notes |
|---|---|---|---|---|---|---|---|
| BUG-001 | Authentication | Login error message is not displayed for invalid password | Medium | High | Open | screenshot link | Needs retest |
```

Untuk detail bug:

```markdown
## BUG-001: [Bug Title]

**Module:**  
**Severity:**  
**Priority:**  
**Environment:**  
**Status:**  

### Preconditions
-

### Steps to Reproduce
1.
2.
3.

### Expected Result
-

### Actual Result
-

### Evidence
-

### Notes
-
```

---

## 6.11 Risk Analysis

Buat analisis risiko awal.

```markdown
# Risk Analysis

| Risk ID | Area | Risk Description | Impact | Likelihood | Mitigation |
|---|---|---|---|---|---|
| RISK-001 | Authentication | User may access restricted page without valid session | High | Medium | Add RBAC and session validation tests |
```

Gunakan impact:

```text
High = berdampak pada keamanan, data, atau fungsi utama
Medium = berdampak pada workflow penting, tetapi ada workaround
Low = dampak kecil pada UI atau kenyamanan
```

---

## 6.12 Test Data Recommendation

Buat rekomendasi data test.

```markdown
# Test Data Recommendation

| Data ID | Purpose | Data Type | Example | Notes |
|---|---|---|---|---|
| TD-AUTH-001 | Valid admin login | Account | admin@test.com | Use test account only |
| TD-AUTH-002 | Invalid login | Credential | wrong password | Negative test |
```

Minimal siapkan:

```text
- Admin account
- Regular user account
- Invalid credential
- Duplicate data
- Boundary value data
- Empty field data
- Unsupported file type
- Large file sample
```

---

## 6.13 Open Questions

Tulis hal yang perlu dikonfirmasi.

```markdown
# Open Questions

| Question ID | Area | Question | Reason | Priority |
|---|---|---|---|---|
| Q-001 | Authentication | What is the session timeout duration? | Needed for session testing | Medium |
| Q-002 | User Management | Should deleted users be hard deleted or soft deleted? | Needed for database and API validation | High |
```

---

## 6.14 Recommended QA Repository Structure

Buat rekomendasi struktur folder untuk project ini.

```markdown
# Recommended QA Repository Structure

```text
project-[number]-[project-name]/
├── README.md
├── docs/
│   ├── 01-project-overview.md
│   ├── 02-test-plan.md
│   ├── 03-test-scenario.md
│   ├── 04-test-case.md
│   ├── 05-bug-report.md
│   ├── 06-test-execution-report.md
│   └── 07-release-readiness-report.md
│
├── test-cases/
│   ├── test-case.xlsx
│   └── test-execution.xlsx
│
├── bug-reports/
│   ├── bug-tracking.xlsx
│   └── bug-001.md
│
├── api-testing/
│   ├── postman-collection.json
│   ├── postman-environment.example.json
│   ├── api-test-case.md
│   └── newman-report.html
│
├── automation-testing/
│   ├── tests/
│   ├── pages/
│   ├── fixtures/
│   ├── utils/
│   ├── playwright.config.ts
│   └── README.md
│
├── performance-testing/
│   ├── k6-script.js
│   └── result-summary.md
│
├── security-basic-testing/
│   └── security-checklist.md
│
├── reports/
│   ├── manual-test-summary.md
│   ├── playwright-report/
│   └── api-report/
│
└── evidence/
    ├── screenshots/
    ├── videos/
    └── network-response/
```
```

---

# 7. Output Delivery Rules

AI agent harus mengikuti aturan output berikut:

1. Gunakan markdown.
2. Gunakan tabel jika informasinya berbentuk daftar.
3. Gunakan ID yang konsisten.
4. Jangan mencampur modul tanpa struktur.
5. Pisahkan requirement, user story, scenario, dan test case.
6. Tandai asumsi dengan jelas.
7. Jika data tidak tersedia, tulis `Not available`.
8. Jika perlu konfirmasi, masukkan ke `Open Questions`.
9. Jangan membuat klaim yang tidak bisa didukung oleh hasil eksplorasi.
10. Jangan memasukkan credential asli ke output akhir.
11. Jangan menyarankan destructive test di production.
12. Berikan hasil yang siap dipindahkan ke file repo QA.

---

# 8. ID Naming Convention

Gunakan format ID berikut:

```text
Module:
MOD-AUTH-001
MOD-USER-001

Requirement:
REQ-AUTH-001
REQ-USER-001

User Story:
US-AUTH-001
US-USER-001

Test Scenario:
TS-AUTH-001
TS-USER-001

Test Case:
TC-AUTH-001
TC-USER-001

API Test Case:
API-TC-AUTH-001
API-TC-USER-001

Automation:
AUTO-AUTH-001
AUTO-USER-001

Bug:
BUG-AUTH-001
BUG-USER-001

Risk:
RISK-AUTH-001
RISK-USER-001

Test Data:
TD-AUTH-001
TD-USER-001

Open Question:
Q-AUTH-001
Q-USER-001
```

---

# 9. Final Expected Deliverables

Setelah eksplorasi selesai, AI agent harus menghasilkan:

```text
1. Project overview
2. Feature and module inventory
3. Requirement list
4. User stories
5. Scope of testing
6. Test scenario draft
7. Test case draft
8. API testing scope
9. Automation testing candidate
10. Initial bug observation
11. Risk analysis
12. Test data recommendation
13. Open questions
14. Recommended QA repository structure
```

---

# 10. Final Instruction for AI Agent

Gunakan instruksi berikut sebagai prompt final.

```markdown
Saya ingin kamu mengeksplorasi project website/software saya sebagai Senior Software QA Engineer.

Gunakan input project yang saya berikan:
- Website URL
- API documentation jika tersedia
- Role dan akun testing
- Requirement awal jika ada
- Scope testing jika ada

Tugas kamu:
1. Eksplorasi aplikasi dari sisi user dan QA.
2. Identifikasi semua fitur, modul, halaman, role, dan flow utama.
3. Turunkan requirement dan user story dari hasil eksplorasi.
4. Tandai semua requirement yang masih asumsi.
5. Susun scope testing.
6. Buat test scenario draft.
7. Buat test case draft.
8. Buat API testing scope jika dokumentasi API tersedia.
9. Buat automation testing candidate.
10. Catat bug awal jika ditemukan.
11. Buat risk analysis.
12. Buat test data recommendation.
13. Buat open questions.
14. Berikan struktur output markdown yang siap saya pindahkan ke repo QA portfolio.

Jangan melakukan destructive test.
Jangan menjalankan load test berat.
Jangan menggunakan data pribadi.
Jangan memasukkan credential asli ke output akhir.
Jika ada informasi yang tidak tersedia, tulis dengan jelas.
Jika ada asumsi, tandai sebagai Assumption.
```

---

# 11. Minimal Prompt Version

Gunakan versi ini jika ingin ringkas.

```markdown
Bertindak sebagai Senior Software QA Engineer.

Saya ingin kamu mengeksplorasi website berikut:
[Website URL]

Dokumentasi API:
[Swagger/Postman/API docs]

Role dan akun testing:
[Admin/User/Guest]

Tolong hasilkan:
1. Project overview
2. Feature and module inventory
3. Requirement list
4. User stories
5. Scope of testing
6. Test scenario draft
7. Test case draft
8. API testing scope
9. Automation testing candidate
10. Bug observation
11. Risk analysis
12. Test data recommendation
13. Open questions

Gunakan markdown.
Tandai requirement hasil asumsi sebagai Assumption.
Jangan melakukan destructive test.
```
