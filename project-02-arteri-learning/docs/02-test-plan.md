# Test Plan

## 1. Objective

Tujuan testing adalah memastikan Arteri Learning Platform berjalan sesuai requirement utama, menjaga separation akses antar role, mendukung student learning flow secara stabil, dan tidak memiliki defect kritis pada authentication, CBT exam, dan admin management flow.

## 2. Scope of Testing

### In Scope

| Area | Description |
|---|---|
| Authentication | Login, error handling, token/session storage, logout, redirect by role |
| Authorization | Student vs teacher/admin route restriction and protected API behavior |
| Student Dashboard | Greeting, upcoming exam, active attempts, exam code input, team summary |
| Student Courses | Course list, search, join course by code, course detail access |
| Learning Content | Topic detail, material access, notes CRUD, completion status |
| Quiz and CBT Exam | Access validation, camera/fullscreen readiness, answer save, submit, anti-cheating |
| Admin Management | Course/topic/content/exam CRUD, participant management, reporting pages |
| API Testing | Auth, course, content, exam, participant, notification endpoints |
| Regression Testing | Validasi ulang flow utama setelah perubahan penting |

### Out of Scope

| Area | Reason |
|---|---|
| Full penetration testing | Hanya basic security testing pada auth, RBAC, IDOR, XSS, session |
| Full performance/load testing | Hanya basic smoke/performance check |
| Backend code review | Repository backend tidak tersedia dalam scope saat ini |
| Production destructive testing | Delete/mutation hanya dilakukan bila aman dan dengan akun test |
| Mobile native testing | Aplikasi yang dievaluasi adalah web app |

## 3. Test Environment

| Item | Detail |
|---|---|
| Environment | Public web + local repo inspection baseline |
| Web URL | https://arterilearning.com/ |
| API Base URL | https://backend.arterilearning.com/api/v1/ |
| API Documentation | https://documenter.getpostman.com/view/33317073/2sBXVhErfi#674f868a-1ecc-46d2-a27d-8b840f16f070 |
| Browser | Planned: Chrome, Edge |
| OS | Windows 11 |
| Device | Desktop |
| Database | No direct access |
| Test Account Student | TBD |
| Test Account Teacher/Admin | TBD |

## 4. Test Types

| Test Type | Description | Tool |
|---|---|---|
| Functional Testing | Validasi fitur utama sesuai behavior yang diharapkan | Manual |
| Negative Testing | Validasi input dan state tidak valid | Manual / Postman |
| Regression Testing | Cek flow lama setelah perubahan | Manual / Playwright |
| API Testing | Status code, response body, auth, validation, role enforcement | Postman / Newman |
| UI Automation | Flow penting yang stabil dan berulang | Playwright |
| Performance Basic | Smoke check endpoint dan page response dasar | k6 |
| Security Basic | Access control, session, IDOR basic, XSS basic, upload validation | DevTools / Postman / OWASP ZAP |

## 5. Test Strategy

Testing dilakukan dengan pendekatan berikut:

1. Requirement-based testing berdasarkan hasil eksplorasi aplikasi dan kontrak API yang tersedia.
2. Risk-based testing dengan prioritas tertinggi pada authentication, RBAC, CBT exam integrity, dan admin mutation flow.
3. Positive testing untuk memastikan flow valid berjalan dengan baik.
4. Negative testing untuk memastikan input, access, dan state tidak valid ditolak dengan aman.
5. Boundary and state-based testing pada credential validation, exam eligibility, duration, attempts, dan upload constraints.
6. Exploratory testing untuk menemukan defect yang tidak langsung tercakup oleh test case formal.
7. Automation testing untuk flow yang stabil dan bernilai tinggi seperti login, route access, join course, dan basic CBT/admin path.

## 6. Entry Criteria

Testing dapat dimulai jika:

- URL aplikasi dapat diakses
- API endpoint dasar dapat diakses
- Test account student dan teacher/admin tersedia
- Requirement penting dan open questions prioritas tinggi sudah cukup jelas
- Test data dasar tersedia
- Fitur prioritas tinggi dapat dijalankan tanpa blocker mayor

## 7. Exit Criteria

Testing dianggap selesai jika:

- Semua test case priority critical dan high sudah dieksekusi
- Bug critical sudah diperbaiki atau memiliki keputusan yang terdokumentasi
- Bug high yang memblokir core flow sudah diperbaiki atau diterima dengan risiko jelas
- Regression test pada flow utama sudah selesai
- API testing critical endpoints telah dijalankan
- Test execution report dan release readiness report sudah diperbarui

## 8. Risk and Mitigation

| Risk | Impact | Mitigation |
|---|---|---|
| Tidak ada test credential | Banyak flow role-specific tidak bisa diverifikasi | Minta akun test student dan teacher/admin |
| API contract berbeda dengan inferensi frontend | Expected result bisa meleset | Verifikasi dengan docs API dan runtime response |
| CBT flow bergantung camera/fullscreen/browser state | Hasil test bisa flaky atau tergantung permission | Standarkan browser setup dan catat precondition dengan jelas |
| Backend authorization berbeda dari frontend middleware | Security gap tidak terlihat dari UI saja | Tambahkan API auth/RBAC verification |
| Bulk participant atau destructive actions berisiko mengubah data nyata | Mengganggu data environment | Gunakan akun/sandbox khusus dan jadwalkan test aman |
| Naming product tidak konsisten | Dokumen QA bisa ambigu | Pakai nama utama Arteri Learning Platform dan catat alias Stuudi |

## 9. Deliverables

| Deliverable | Location |
|---|---|
| Project Overview | docs/01-project-overview.md |
| Test Scenario | docs/03-test-scenario.md |
| Test Case Index | docs/04-test-case.md |
| Module Test Cases | docs/test-cases/ |
| Bug Report | docs/05-bug-report.md |
| Test Execution Report | docs/06-test-execution-report.md |
| Release Readiness Report | docs/07-release-readiness-report.md |
| API Testing Documentation | api-testing/README.md |
| Automation Testing Documentation | automation-testing/README.md |
| Performance Testing Note | performance-testing/README.md |
| Security Basic Testing Note | security-basic-testing/security-checklist.md |
| Evidence | evidence/ |
