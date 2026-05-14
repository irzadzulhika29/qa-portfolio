# Test Case Index

Dokumen ini adalah index utama test case. Detail test case dipisahkan per module agar lebih mudah dibaca, direview, dan dikembangkan saat eksekusi testing berjalan.

| Module | File | Total Planned Test Case | Notes |
|---|---|---:|---|
| Authentication and RBAC | `docs/test-cases/auth-test-case.md` | 10 | Login, session, redirect, access restriction |
| Student Dashboard and Courses | `docs/test-cases/student-dashboard-test-case.md` | 8 | Dashboard, course list, search, enroll |
| Learning Content and CBT Exam | `docs/test-cases/cbt-exam-test-case.md` | 14 | Material access, notes, quiz, CBT flow |
| Admin Course and Exam Management | `docs/test-cases/admin-management-test-case.md` | 9 | Course, topic, content, exam mutation |
| Participant and Notification Management | `docs/test-cases/participant-notification-test-case.md` | 6 | Participant CRUD/bulk and notification checks |

## Status Definition

| Status | Definition |
|---|---|
| Pass | Actual result matches expected result |
| Fail | Actual result does not match expected result |
| Blocked | Test cannot be executed due to blocker |
| Not Run | Test has not been executed |

## Current Baseline Notes

- Seluruh test case saat ini masih baseline dan belum dieksekusi.
- Expected result disusun dari eksplorasi frontend dan perlu dikonfirmasi terhadap backend/runtime.
- Test data final akan diperbarui setelah akun dan akses environment tersedia.
