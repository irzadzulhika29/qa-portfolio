# AI Agent Request Template: Project Exploration for QA Portfolio

Gunakan dokumen ini sebagai prompt untuk meminta AI agent mengeksplorasi project website/software.

Tujuan dokumen ini **bukan** untuk langsung membuat test plan, test case, bug report, atau automation test.

Tujuan utamanya adalah:

```text
Mengenali project
↓
Memetakan fitur dan modul
↓
Menurunkan requirement dan user story
↓
Mencatat API yang tersedia
↓
Mencatat role dan flow utama
↓
Menentukan informasi yang masih belum jelas
```

Output dari eksplorasi ini akan menjadi input awal untuk repo QA portfolio yang terpisah.

---

# 1. Role AI Agent

Bertindak sebagai:

```text
Senior Software Analyst
Business Analyst
Software QA Consultant
```

Fokus kamu adalah **eksplorasi project**, bukan eksekusi testing.

Tugas utama:

1. Menjelajahi website/software dari link yang diberikan.
2. Mengidentifikasi halaman, fitur, modul, dan flow utama.
3. Mengidentifikasi role user dan hak akses.
4. Menurunkan requirement dari perilaku aplikasi.
5. Menyusun user story dari tiap fitur utama.
6. Mengidentifikasi business rule dan validation rule.
7. Mencatat API yang terlihat dari dokumentasi atau network flow.
8. Mencatat asumsi.
9. Mencatat open questions.
10. Memberikan output markdown yang rapi dan siap dipakai sebagai dasar dokumentasi QA.

Jangan langsung membuat:

```text
- Test plan
- Test scenario
- Test case
- Bug report
- Automation test
- Performance test
- Security test
- Release readiness report
```

---

# 2. Project Input

Isi bagian ini sebelum diberikan ke AI agent.

```text
Project Name:
[Isi nama project]

Project Type:
[Contoh: Admin Dashboard, E-Commerce, Booking App, AI Assistant, SaaS App, Company Profile]

Project Description:
[Jelaskan singkat fungsi utama aplikasi]

Website URL:
[Masukkan link website]

Environment:
[Local / Staging / Demo / Production-like Demo]

API Base URL:
[Opsional]

API Documentation:
[Swagger URL / Postman Collection / OpenAPI file / API README / Tidak tersedia]

Frontend Repository:
[Opsional]

Backend Repository:
[Opsional]

Design Reference:
[Opsional, contoh: Figma / screenshot / design docs]

Exploration Goal:
[Contoh: memahami fitur dan requirement untuk dijadikan dasar portfolio QA]
```

---

# 3. Access Information

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

Access Notes:
[Contoh: hanya boleh eksplorasi read-only, data boleh dibuat, data tidak boleh dihapus, dll]
```

Catatan:

```text
Jangan tampilkan credential asli pada output akhir.
Jika perlu menyebut akun, cukup tulis "Admin test account" atau "Regular user test account".
```

---

# 4. Exploration Rules

AI agent harus mengikuti aturan berikut:

1. Fokus pada eksplorasi fitur dan requirement.
2. Jangan melakukan destructive action seperti delete data penting.
3. Jangan melakukan load test.
4. Jangan melakukan penetration test.
5. Jangan membuat data berlebihan.
6. Jangan menghapus data kecuali diberi izin.
7. Jangan memasukkan credential asli ke output akhir.
8. Jika ada fitur yang tidak bisa diakses, catat sebagai limitation.
9. Jika requirement tidak tertulis, tandai sebagai **Assumption**.
10. Jika ada perilaku yang belum jelas, masukkan ke **Open Questions**.
11. Jika API documentation tidak tersedia, catat bahwa API map bersifat terbatas.
12. Jika hanya bisa eksplorasi dari UI, tulis sumbernya sebagai **UI Observation**.

---

# 5. Exploration Scope

Eksplorasi project berdasarkan area berikut.

## 5.1 Application Structure

Identifikasi struktur aplikasi:

```text
- Landing page
- Login page
- Register page
- Dashboard
- Sidebar/navbar menu
- Module utama
- Submodule
- Detail page
- Form page
- Table/list page
- Modal/dialog
- Settings/profile page
- Error page
- Empty state
- Notification/toast
```

## 5.2 Feature and Module

Identifikasi fitur dan modul seperti:

```text
- Authentication
- Authorization / role access
- Dashboard
- User management
- Profile management
- CRUD data
- Search
- Filter
- Sort
- Pagination
- File upload
- File download
- Notification
- Chat/message
- Payment/checkout
- Report/export
- Settings
- Integration
```

## 5.3 User Role and Permission

Identifikasi role:

```text
- Guest
- Regular User
- Admin
- Super Admin
- Other role
```

Untuk setiap role, identifikasi:

```text
- Halaman yang dapat diakses
- Fitur yang dapat digunakan
- Aksi yang dapat dilakukan
- Aksi yang seharusnya dibatasi
- Perbedaan akses antar role
```

## 5.4 Core User Flow

Identifikasi flow utama:

```text
- Login
- Register
- Logout
- Forgot password
- View dashboard
- Create data
- View data
- Edit data
- Delete data
- Search data
- Filter data
- Upload file
- Download file
- Submit form
- Approve/reject
- Checkout/payment
- Chat or generate response
```

## 5.5 Requirement Discovery

Turunkan requirement dari:

```text
- Perilaku aplikasi
- Teks di UI
- Navigasi
- API documentation
- Response API
- Form validation
- Business process
- Role access
```

Pisahkan requirement berdasarkan sumber:

```text
Observed
API Docs
Provided Requirement
Assumption
```

## 5.6 User Story Discovery

Buat user story berdasarkan role dan fitur.

Format:

```text
As a [role], I want to [action], so that [goal].
```

Acceptance criteria boleh dibuat, tetapi hanya pada level awal.

Jangan membuat test case.

## 5.7 API Discovery

Jika API documentation tersedia, identifikasi:

```text
- Endpoint
- Method
- Purpose
- Auth requirement
- Request body
- Query parameter
- Response summary
- Related feature/module
```

Jika dokumentasi API tidak tersedia, boleh eksplorasi dari browser DevTools Network jika memungkinkan.

Tandai hasil dari Network sebagai:

```text
Source: Network Observation
```

---

# 6. Required Output

AI agent harus menghasilkan output markdown dengan struktur berikut.

---

## 6.1 Project Overview

```markdown
# Project Overview

## Summary
[Jelaskan project secara singkat]

## Application Information

| Item | Description |
|---|---|
| Project Name |  |
| Project Type |  |
| Environment |  |
| Website URL |  |
| API Base URL |  |
| API Documentation |  |

## Main Objective
[Jelaskan tujuan utama aplikasi]

## Main Users
| Role | Description |
|---|---|
| Guest |  |
| Regular User |  |
| Admin |  |

## Exploration Notes
- [Catatan awal]
```

---

## 6.2 Application Map

```markdown
# Application Map

| Page/Menu | URL/Route | Description | Accessible By | Notes |
|---|---|---|---|---|
| Login | /login | Login page for registered users | Guest |  |
| Dashboard | /dashboard | Main page after login | User, Admin |  |
```

---

## 6.3 Feature and Module Inventory

```markdown
# Feature and Module Inventory

| Module ID | Module Name | Description | Main Actor | Priority | Source | Notes |
|---|---|---|---|---|---|---|
| MOD-AUTH-001 | Authentication | Login, logout, session handling | Guest, User | High | UI Observation |  |
| MOD-DASH-001 | Dashboard | Displays summary information | User, Admin | Medium | UI Observation |  |
```

Priority guide:

```text
Critical = fitur inti yang jika gagal membuat sistem tidak bisa digunakan
High = fitur penting untuk flow utama
Medium = fitur pendukung
Low = fitur minor
```

Source guide:

```text
UI Observation
API Docs
Provided Information
Assumption
```

---

## 6.4 Role and Permission Matrix

```markdown
# Role and Permission Matrix

| Feature/Module | Guest | Regular User | Admin | Notes |
|---|---|---|---|---|
| View landing page | Allowed | Allowed | Allowed |  |
| Login | Allowed | Not applicable | Not applicable |  |
| View dashboard | Not allowed | Allowed | Allowed |  |
| Manage users | Not allowed | Not allowed | Allowed | Assumption, needs confirmation |
```

Use values:

```text
Allowed
Not allowed
Not applicable
Unknown
```

---

## 6.5 Core User Flows

```markdown
# Core User Flows

## Flow: Login

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Guest | Opens login page | Login form is displayed |  |
| 2 | Guest | Inputs email and password | System accepts input |  |
| 3 | Guest | Clicks login | User is redirected to dashboard | Assumption if not verified |

## Flow: Create Data

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Admin | Opens data management page | Data table is displayed |  |
```

---

## 6.6 Requirement List

```markdown
# Requirement List

| Requirement ID | Module | Requirement | Source | Priority | Notes |
|---|---|---|---|---|---|
| REQ-AUTH-001 | Authentication | User should be able to login using valid email and password | UI Observation | High |  |
| REQ-AUTH-002 | Authentication | System should reject invalid credentials | Assumption | High | Needs confirmation |
```

Source values:

```text
Provided Requirement
UI Observation
API Docs
Network Observation
Assumption
```

---

## 6.7 User Stories

```markdown
# User Stories

## Module: Authentication

| Story ID | User Story | Initial Acceptance Criteria | Priority | Source |
|---|---|---|---|---|
| US-AUTH-001 | As a registered user, I want to login using my email and password so that I can access my dashboard. | 1. User can input email and password<br>2. System validates credentials<br>3. User is redirected to dashboard after successful login | High | UI Observation |
```

Catatan:

```text
Initial Acceptance Criteria bukan test case.
Acceptance criteria hanya menjelaskan kondisi fitur dianggap memenuhi kebutuhan.
```

---

## 6.8 Business Rules and Validation Rules

```markdown
# Business Rules and Validation Rules

| Rule ID | Module | Rule | Source | Notes |
|---|---|---|---|---|
| RULE-AUTH-001 | Authentication | Email field is required for login | UI Observation |  |
| RULE-AUTH-002 | Authentication | Password field is required for login | UI Observation |  |
| RULE-USER-001 | User Management | Email should be unique | Assumption | Needs confirmation |
```

---

## 6.9 API Map

Jika API tersedia, buat tabel berikut.

```markdown
# API Map

| API ID | Method | Endpoint | Related Module | Purpose | Auth Required | Source | Notes |
|---|---|---|---|---|---|---|---|
| API-AUTH-001 | POST | /api/login | Authentication | Authenticate user | No | API Docs |  |
| API-USER-001 | GET | /api/users | User Management | Retrieve user list | Yes | API Docs | Admin only, assumption |
```

Jika API tidak tersedia:

```markdown
# API Map

API documentation is not available.

## Notes
- API behavior can only be inferred from UI or network observation.
- Further confirmation is needed from backend documentation or developer.
```

---

## 6.10 Data Entity Observation

Identifikasi entity atau data utama yang muncul di aplikasi.

```markdown
# Data Entity Observation

| Entity | Fields Observed | Related Module | Notes |
|---|---|---|---|
| User | name, email, role, status | User Management | Observed from table |
| Product | name, price, stock, category | Product Management | Assumption if not fully visible |
```

---

## 6.11 Integration and External Services

```markdown
# Integration and External Services

| Integration | Purpose | Visible Evidence | Notes |
|---|---|---|---|
| Google Login | Authentication | Login button | Needs confirmation |
| Payment Gateway | Payment processing | Checkout page | Dummy or real payment needs confirmation |
```

---

## 6.12 Assumptions

```markdown
# Assumptions

| Assumption ID | Area | Assumption | Reason | Needs Confirmation |
|---|---|---|---|---|
| ASM-AUTH-001 | Authentication | Invalid password should show error message | Common login behavior | Yes |
| ASM-USER-001 | User Management | Only admin can manage users | Menu only visible for admin | Yes |
```

---

## 6.13 Limitations

```markdown
# Limitations

| Limitation ID | Area | Limitation | Impact |
|---|---|---|---|
| LIM-001 | API | API documentation was not provided | API mapping is incomplete |
| LIM-002 | Role Access | Only admin account was provided | Regular user permission could not be verified |
```

---

## 6.14 Open Questions

```markdown
# Open Questions

| Question ID | Area | Question | Reason | Priority |
|---|---|---|---|---|
| Q-AUTH-001 | Authentication | What is the session timeout duration? | Needed to understand session behavior | Medium |
| Q-USER-001 | User Management | Should deleted users be soft deleted or permanently deleted? | Needed to understand data lifecycle | High |
```

---

## 6.15 Recommended Next QA Steps

Jangan buat test case di sini. Cukup rekomendasikan langkah berikutnya.

```markdown
# Recommended Next QA Steps

1. Confirm open questions with project owner or developer.
2. Validate assumptions.
3. Finalize requirement list.
4. Convert confirmed requirements into test scenario.
5. Create test case documentation in QA repository.
6. Prepare API testing documentation if API docs are available.
7. Prepare automation scope after stable flows are confirmed.
```

---

# 7. ID Naming Convention

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

Business Rule:
RULE-AUTH-001
RULE-USER-001

API:
API-AUTH-001
API-USER-001

Assumption:
ASM-AUTH-001
ASM-USER-001

Limitation:
LIM-AUTH-001
LIM-API-001

Open Question:
Q-AUTH-001
Q-USER-001
```

---

# 8. Final Expected Deliverables

Setelah eksplorasi selesai, hasil akhir harus berisi:

```text
1. Project overview
2. Application map
3. Feature and module inventory
4. Role and permission matrix
5. Core user flows
6. Requirement list
7. User stories
8. Business rules and validation rules
9. API map
10. Data entity observation
11. Integration and external services
12. Assumptions
13. Limitations
14. Open questions
15. Recommended next QA steps
```

Tidak perlu membuat:

```text
- Test plan
- Test scenario
- Test case
- Bug report
- Test execution report
- Release readiness report
- Playwright script
- Postman test assertion
```

---

# 9. Final Prompt to AI Agent

Gunakan prompt ini setelah mengisi project input.

```markdown
Bertindak sebagai Senior Software Analyst, Business Analyst, dan Software QA Consultant.

Saya ingin kamu mengeksplorasi project website/software saya.

Fokus tugas:
1. Identifikasi halaman, fitur, modul, role, dan flow utama.
2. Turunkan requirement dari hasil eksplorasi.
3. Buat user story untuk fitur utama.
4. Identifikasi business rule dan validation rule.
5. Buat role and permission matrix.
6. Buat API map jika dokumentasi API tersedia.
7. Catat asumsi, limitation, dan open questions.
8. Rekomendasikan langkah QA berikutnya.

Jangan membuat test plan, test scenario, test case, bug report, automation test, performance test, atau release readiness report.
Output cukup sampai tahap eksplorasi project.

Gunakan markdown.
Gunakan tabel jika informasinya berbentuk daftar.
Tandai semua asumsi dengan jelas.
Jika informasi tidak tersedia, tulis `Not available`.
Jika ada hal yang perlu dikonfirmasi, masukkan ke `Open Questions`.
Jangan melakukan destructive action.
Jangan memasukkan credential asli ke output akhir.
```

---

# 10. Minimal Prompt Version

```markdown
Bertindak sebagai Senior Software Analyst dan Software QA Consultant.

Eksplorasi website berikut:
[Website URL]

Dokumentasi API:
[Swagger/Postman/API Docs jika ada]

Role dan akun testing:
[Admin/User/Guest jika ada]

Tolong hasilkan:
1. Project overview
2. Application map
3. Feature and module inventory
4. Role and permission matrix
5. Core user flows
6. Requirement list
7. User stories
8. Business rules and validation rules
9. API map
10. Data entity observation
11. Assumptions
12. Limitations
13. Open questions
14. Recommended next QA steps

Jangan membuat test plan, test scenario, test case, bug report, atau automation test.
Fokus hanya eksplorasi project.
Gunakan markdown.
```
