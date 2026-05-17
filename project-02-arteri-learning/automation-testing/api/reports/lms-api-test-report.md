# API Testing Report — LMS Project (Go Backend)

**Project:** LMS Project (https://github.com/azmiagr/lms-project)
**Tester:** Irza Dzulhika  
**Test Date:** 17 Mei 2026  
**Application URL:** http://localhost:8080  
**API Base URL:** http://localhost:8080/api/v1

---

## Test Summary

| Metric | Result |
|---|---|
| **Total Tests** | 19 |
| **Passed** | 19 ✅ |
| **Failed** | 0 ❌ |
| **Success Rate** | **100%** |

---

## Environment Setup

| Component | Detail |
|---|---|
| **Tech Stack** | Go 1.24.1, Gin, GORM, MariaDB, JWT |
| **Database** | MariaDB 10.11 (Docker container) |
| **Running Mode** | Local |localhost:8080 |
| **Seed Data** | Roles: student, teacher, organizer |

---

## Test Results

### 1. Public Endpoints (7/7 PASS)

| No | Endpoint | Method | Expected | Actual | Status |
|---|---|---|---|---|---|
| 1 | `/province/all` | GET | 200 | 200 | ✅ PASS |
| 2 | `/city/all` | GET | 200 | 200 | ✅ PASS |
| 3 | `/city/{province_id}` | GET | 200 | 200 | ✅ PASS |
| 4 | `/search/school` | GET | 200 | 200 | ✅ PASS |
| 5 | `/teams` | GET | 200 | 200 | ✅ PASS |
| 6 | `/upcoming-exam` | GET | 200 | 200 | ✅ PASS |
| 7 | `/courses/browse` | GET | 200 | 200 | ✅ PASS |

### 2. Auth Flow (4/4 PASS)

| No | Endpoint | Method | Expected | Actual | Status |
|---|---|---|---|---|---|
| 1 | `/auth/register-elearning/otp` | POST | 200 | 200 | ✅ PASS |
| 2 | Response has session_token | - | token JWT | token valid | ✅ PASS |
| 3 | `/auth/login-elearning` (invalid) | POST | 400 | 400 | ✅ PASS |
| 4 | `/auth/login-elearning` (empty) | POST | 400 | 400 | ✅ PASS |

### 3. Error Handling (4/4 PASS)

| No | Test Case | Expected | Actual | Status |
|---|---|---|---|---|
| 1 | GET `/nonexistent-route` | 404 | 404 | ✅ PASS |
| 2 | POST with invalid JSON body | 400 | 400 | ✅ PASS |
| 3 | GET `/student/profile` (unauthorized) | 401 | 401 | ✅ PASS |
| 4 | GET `/teacher/courses` (unauthorized) | 401 | 401 | ✅ PASS |

### 4. Response Format Validation (4/4 PASS)

| No | Validation | Status |
|---|---|---|
| 1 | Response has `status` field | ✅ PASS |
| 2 | Status has `code` (int) | ✅ PASS |
| 3 | Status has `isSuccess` (bool) | ✅ PASS |
| 4 | Response has `message` field | ✅ PASS |

---

## Response Format Confirmed

```json
{
  "status": {
    "code": 200,
    "isSuccess": true
  },
  "message": "success message",
  "data": {}
}
```

---

## Key Findings

1. **API response format konsisten** — seluruh endpoint menggunakan format `{status, message, data}` yang seragam.
2. **Error handling proper** — 404 untuk route tidak dikenal, 400 untuk input invalid, 401 untuk akses tanpa auth.
3. **Auth middleware berfungsi** — endpoint student & teacher terlindungi dengan baik.
4. **OTP flow berjalan** — register e-learning mengirim OTP dan mengembalikan session_token JWT.
5. **Tidak ditemukan bug** — seluruh endpoint berjalan sesuai spesifikasi.

---

## Test Script

Script test tersimpan di: `automation-testing/api/test-lms-project-api.py`

Jalankan ulang:
```bash
cd automation-testing/api
python3 -m venv .venv
source .venv/bin/activate
pip install httpx
python test-lms-project-api.py
```

---

## Catatan

- Database perlu di-seed dengan data role (`student`, `teacher`, `organizer`) sebelum register flow bisa bekerja.
- Test ini hanya mencakup endpoint publik, auth flow, error handling, dan response format.
- Testing untuk endpoint terautentikasi (CRUD course, topic, content, quiz, exam, dll) memerlukan valid user session.
