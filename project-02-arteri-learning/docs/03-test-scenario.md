# Test Scenario

## Summary

Dokumen ini berisi daftar skenario pengujian utama untuk Arteri Learning Platform. Status awal semua skenario adalah `Not Run` karena dokumen ini disusun sebagai baseline portfolio dari hasil eksplorasi awal.

## Scenario Table

| Scenario ID | Feature | Scenario | Priority | Test Type | Status |
|---|---|---|---|---|---|
| TS-AUTH-001 | Authentication | Verify guest can login with valid username or email and password | Critical | Functional | Not Run |
| TS-AUTH-002 | Authentication | Verify login is rejected when password is invalid | High | Negative | Not Run |
| TS-AUTH-003 | Authentication | Verify authenticated student is redirected away from login page | High | Functional | Not Run |
| TS-RBAC-001 | Role Access | Verify unauthenticated user accessing private student route is redirected to login | Critical | Security Basic | Not Run |
| TS-RBAC-002 | Role Access | Verify student cannot access admin routes | Critical | Security Basic | Not Run |
| TS-RBAC-003 | Role Access | Verify teacher or admin cannot access student-only routes | High | Security Basic | Not Run |
| TS-STUD-001 | Student Dashboard | Verify student dashboard loads greeting, upcoming exam, and active attempt summary | High | Functional | Not Run |
| TS-COURSE-001 | Student Courses | Verify student can view enrolled course list | High | Functional | Not Run |
| TS-COURSE-002 | Student Courses | Verify course search filters results correctly | Medium | Functional | Not Run |
| TS-COURSE-003 | Student Courses | Verify student can join course with valid enrollment code | High | Functional | Not Run |
| TS-CONTENT-001 | Learning Content | Verify student can open course topic and view material content | High | Functional | Not Run |
| TS-CONTENT-002 | Learning Content | Verify student can create, edit, and delete topic notes | Medium | Functional | Not Run |
| TS-QUIZ-001 | Course Quiz | Verify student can start, answer, and submit quiz | High | Functional | Not Run |
| TS-CBT-001 | CBT Exam Access | Verify exam code access returns exam eligibility status correctly | Critical | Functional | Not Run |
| TS-CBT-002 | CBT Exam Access | Verify student cannot start exam without passing camera and fullscreen checks | Critical | Negative | Not Run |
| TS-CBT-003 | CBT Exam Attempt | Verify answers are auto-saved during exam attempt | Critical | Functional | Not Run |
| TS-CBT-004 | CBT Exam Attempt | Verify tab switch or fullscreen violation is recorded and enforced | Critical | Security Basic | Not Run |
| TS-CBT-005 | CBT Exam Attempt | Verify student can submit completed exam successfully | Critical | Functional | Not Run |
| TS-ADMIN-001 | Admin Dashboard | Verify teacher/admin can access dashboard exam statistics | High | Functional | Not Run |
| TS-ADMIN-002 | Course Management | Verify teacher/admin can create new course with valid data | Critical | Functional | Not Run |
| TS-ADMIN-003 | Exam Management | Verify teacher/admin can create exam and add questions | Critical | Functional | Not Run |
| TS-PART-001 | Participant Management | Verify teacher/admin can add participant individually | High | Functional | Not Run |
| TS-PART-002 | Participant Management | Verify bulk participant upload validates file/template correctly | High | Negative | Not Run |
| TS-NOTIF-001 | Notifications | Verify student notification list and unread count are consistent | Medium | Functional | Not Run |
| TS-API-001 | API Auth | Verify protected endpoint rejects request without token | Critical | API Security | Not Run |
| TS-API-002 | API Role Access | Verify student token cannot use teacher/admin mutation endpoint | Critical | API Security | Not Run |
| TS-REG-001 | Regression | Verify login, course access, and exam access still work after key changes | High | Regression | Not Run |

## Priority Definition

| Priority | Definition |
|---|---|
| Critical | Flow utama, security control, atau exam integrity risk yang dapat menggagalkan release |
| High | Fitur penting yang sering digunakan oleh student atau teacher/admin |
| Medium | Fitur pendukung dengan dampak sedang |
| Low | Minor UI atau behavior berimpact rendah |
