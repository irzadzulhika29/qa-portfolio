# Project Overview

## 1. Project Identity

| Item | Detail |
|---|---|
| Project Name | Arteri Learning Platform |
| Project Type | Web app / e-learning platform |
| Project Owner | Public product with repo-based QA exploration |
| QA Role | Software QA / QA Portfolio Project |
| Testing Period | Started 2026-05-14 |
| Testing Environment | Code inspection baseline, planned live validation on public web and API |

## 2. Project Description

Arteri (frontend codebase: Stuudi) adalah platform e-learning berbasis Next.js yang menyediakan public landing pages, authentication dengan JWT, student dashboard dengan upcoming exam countdown, course enrollment dan content access, quiz flow, CBT-style online exam dengan camera/fullscreen checks dan anti-cheating monitoring, serta admin dashboard untuk pengelolaan course, topic, content, exam questions, participant management, dan exam reporting dengan leaderboard dan cheating detection.

**Technology Stack:**
- Frontend: Next.js (React)
- Authentication: JWT (localStorage + cookie)
- API: RESTful API at `https://backend.arterilearning.com/api/v1/`
- API Documentation: [Postman Docs](https://documenter.getpostman.com/view/33317073/2sBXVhErfi)

## 3. Business Context

Platform ini digunakan untuk mendukung aktivitas belajar online. Dari sisi student, kualitas akses course, materi, quiz, dan CBT exam sangat penting karena langsung memengaruhi proses belajar dan evaluasi. Dari sisi teacher/admin, kestabilan course management, participant management, dan exam reporting penting karena berkaitan dengan operasional kelas, integritas ujian, dan data hasil belajar.

## 4. User Roles

| Role | Description | Main Access |
|---|---|---|
| Guest | Pengunjung publik yang belum login | Landing page, product page, about page, login |
| Student | Peserta belajar yang telah login | Dashboard, courses, team identity, CBT exam |
| Teacher/Admin | Pengajar atau admin operasional | Admin dashboard, course management, exam management, participant management |

## 5. Main Features

|| Feature | Description | Risk Level | Notes |
|---|---|---|---|---|
| Authentication | Login elearning, token storage (localStorage + cookie), session handling, role-based redirect | Critical | JWT with role claims (student/teacher/admin) |
| Role-Based Access Control | Middleware route restriction untuk student vs teacher/admin | Critical | Frontend + backend enforcement needed |
| Student Dashboard | Greeting, upcoming exam countdown, active exam attempts, exam code entry, team table | High | Depends on multiple APIs |
| Student Courses and Content | Enroll by code, browse courses, view topics, read materials/media, manage notes, mark completion | High | Content blocks: text, media, quiz |
| Course Quiz | Start quiz, save answers, submit, view result, resume attempt | High | Separate from CBT exam |
| CBT Exam Access | Validate exam code, check access window, attempts left, camera permission, fullscreen check | Critical | System readiness flow |
| CBT Exam Attempt | Load/resume exam, answer questions, clear answer, flag questions, auto-save, timer, tab-switch detection, submit | Critical | Anti-cheating: camera, fullscreen, tab-switch lives |
| Team Identity | View team details and team list | Medium | Student feature |
| Admin Dashboard | Select exam, view participant stats, cheating stats, performance metrics, leaderboard | High | Exam monitoring center |
| Admin Course Management | Create/update/delete courses with photo upload, manage topics | Critical | Multipart form data |
| Admin Content Management | Add/edit/delete materials, text blocks, media blocks, quiz blocks per topic | Critical | Content builder |
| Admin Quiz Management | Create/configure quiz content and questions (choice, matching types) | High | Quiz builder |
| Admin Exam Management | Create/edit/delete exam metadata (duration, passing score, schedule, attempts, random settings) and questions with images | Critical | Multipart image upload per question |
| Participant Management | Add single/bulk participants, download template, delete participants | High | CSV/template upload |
| Notifications | List notifications, unread count, mark read/all read, delete one/all | Medium | Student notifications |

## 6. QA Contribution

Dalam project ini, kontribusi QA meliputi:

- Menyusun project overview dan test plan
- Menurunkan hasil eksplorasi menjadi test scenario dan test case
- Menentukan prioritas area risiko tinggi
- Menyiapkan baseline dokumentasi untuk manual, API, dan automation testing
- Menyiapkan struktur evidence, reporting, dan release assessment

## 7. Evidence Included

| Evidence Type | Location |
|---|---|
| Screenshot | evidence/screenshots/ |
| Video | evidence/videos/ |
| Network Response | evidence/network-response/ |
| Console Log | evidence/console-log/ |
| Test Report | evidence/test-reports/ |

## 8. Current QA Baseline

**Source of Truth:**
- Exploration document: `qa-project-exploration_arteri-learning.md` (474 lines, comprehensive frontend code analysis)
- API Documentation: [Postman Docs](https://documenter.getpostman.com/view/33317073/2sBXVhErfi) - 72+ endpoints documented
- Frontend Repository: Local inspection of Next.js codebase

**Current Status:**
- ✅ Requirements mapped from frontend implementation (30+ requirements documented)
- ✅ API endpoints identified (72+ endpoints from frontend + API docs)
- ✅ User flows documented (Login, Course Join, Material View, CBT Exam, Admin Management)
- ✅ Risk areas identified (CBT exam = highest risk)
- ⚠️ No live login session executed yet
- ⚠️ No valid test credentials provided
- ⚠️ No browser network trace captured
- ⚠️ Backend authorization enforcement needs confirmation

**Key Assumptions to Validate:**
1. Backend enforces same role restrictions as frontend middleware
2. Tab-switch violations reduce lives and can disqualify students
3. Camera monitoring is readiness check only (no stream upload observed)
4. Enrollment codes are unique per course/class
5. Teacher and admin roles have equivalent permissions

**Open Questions:**
- Official product name: Stuudi vs Arteri vs Stuudi by Arteri?
- Login identifier: username, email, or both?
- Session timeout and token refresh behavior?
- Tab-switch lives limit (frontend default: 3, backend may differ)
- Exam question deletion allowed after student attempts?

**Next Steps:**
1. Obtain test credentials for guest, student, teacher, admin roles
2. Execute live exploration with valid login
3. Validate API contracts against backend responses
4. Confirm high-risk assumptions (CBT eligibility, tab-switch, camera requirements)
5. Execute manual testing and collect evidence
