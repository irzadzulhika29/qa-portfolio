# Project Name: Arteri Learning Platform

## 1. Project Summary

Project ini adalah platform e-learning berbasis web yang pada kode frontend direferensikan sebagai Stuudi dan pada branding UI sebagai Arteri. Portfolio QA ini berfokus pada pengujian authentication, role-based access control, student learning flow, CBT exam flow, admin course management, participant management, dan integrasi API utama.

## 2. Application Under Test

| Item | Detail |
|---|---|
| Application Name | Arteri Learning Platform / Stuudi Frontend |
| Application Type | Web App / E-learning Platform |
| Demo URL | https://arterilearning.com/ |
| API Base URL | https://backend.arterilearning.com/api/v1/ |
| API Documentation | [Postman Docs](https://documenter.getpostman.com/view/33317073/2sBXVhErfi) |
| Frontend Tech | Next.js (React), TypeScript |
| Authentication | JWT (localStorage + cookie) |
| Repository App | Local frontend repository inspection |
| Repository QA | ~/Dev/qa-portfolio/project-02-arteri-learning |

## 3. QA Project Information

| Item | Detail |
|---|---|
| QA Role | Software QA / QA Portfolio Project |
| Client / Project Owner | Personal portfolio based on public product and repo exploration |
| Team | Solo QA |
| Testing Period | 2026-05-14 sampai ongoing |
| Testing Environment | Repository inspection, public web reference, API documentation reference |
| Browser | Planned: Chrome, Edge |
| Device | Desktop first, responsive observation as needed |

## 4. Scope of Testing

| Feature | Manual | API | Automation | Notes |
|---|---|---|---|---|
| Authentication | Yes | Yes | Yes | Login, redirect, session, logout |
| Role Access Control | Yes | Partial | Yes | Student vs teacher/admin route restriction |
| Student Dashboard | Yes | Partial | Yes | Upcoming exam, active attempt, team summary |
| Student Courses and Content | Yes | Yes | Yes | Enroll, browse courses, topic/material access |
| CBT Exam | Yes | Yes | Yes | Access code, camera, fullscreen, answer save, submit |
| Admin Course and Exam Management | Yes | Yes | Partial | Course/topic/content/exam CRUD |
| Participant Management | Yes | Yes | Partial | Add single/bulk participant, list, delete |
| Notifications | Yes | Yes | No | Student notification list and state change |

## 5. Testing Approach

- Requirement-based testing from exploration findings and observed implementation
- Risk-based prioritization on auth, RBAC, CBT integrity, and admin mutation flows
- Positive, negative, and boundary test design
- Exploratory testing for hidden UI and integration issues
- API testing on critical endpoints and validation rules
- E2E automation on stable, repeatable high-value flows

## 6. Tools Used

| Area | Tool |
|---|---|
| Test Documentation | Markdown |
| Requirement Mapping | Markdown table |
| API Testing | Postman, Newman |
| UI Automation | Playwright, TypeScript |
| CI/CD | GitHub Actions |
| Performance Testing | k6 |
| Security Basic Testing | Browser DevTools, Postman, OWASP ZAP |

## 7. Test Result Summary

| Metric | Value |
|---|---:|
| Total Planned Test Cases | 47 |
| Executed | 9 |
| Passed | 9 |
| Failed | 0 |
| Blocked | 38 |
| Pass Rate | 100% (of executed tests) |
| Execution Coverage | 19% |
| Critical Bugs | 0 |
| High Bugs | 0 |
| Medium Bugs | 0 |
| Low Bugs | 0 |

**Status:** Testing in progress. 9 test cases executed with 100% pass rate. 38 test cases blocked pending API access resolution and student account creation.

**Last Updated:** 2026-05-14

## 8. Key Findings

**From Exploration Phase:**
- Product naming inconsistency: Frontend codebase uses "Stuudi" while UI branding shows "Arteri" - needs product owner clarification
- CBT exam flow identified as highest risk area due to dependencies on camera permission, fullscreen API, tab-switch detection, auto-save mechanism, and timer synchronization
- Role separation (student vs teacher/admin) is strongly enforced in frontend middleware, but backend API authorization enforcement requires validation through API testing
- 72+ API endpoints identified and documented in Postman collection
- 30+ requirements mapped from frontend implementation
- JWT authentication with role claims stored in localStorage and cookie
- Anti-cheating mechanisms: camera check, fullscreen enforcement, tab-switch lives tracking (default: 3 lives)

**Risk Areas Identified:**
1. **Critical:** CBT exam integrity (camera, fullscreen, tab-switch, auto-save, timer)
2. **Critical:** Authentication and role-based access control
3. **High:** Admin mutation operations (course/exam/participant management)
4. **High:** Student learning flow (enrollment, content access, quiz submission)
5. **Medium:** Notification system and team identity features

**Assumptions Requiring Validation:**
- Backend enforces same role restrictions as frontend middleware
- Tab-switch violations correctly reduce lives and trigger disqualification
- Camera monitoring is readiness check only (no continuous stream upload)
- Enrollment codes are unique and validated per course/class
- Teacher and admin roles have equivalent permissions in backend

## 9. Release Decision

**Status:** Not Assessed Yet

**Reason:**  
Dokumentasi QA dasar sudah disusun, tetapi eksekusi manual, API testing, automation, dan validasi dengan kredensial nyata belum dilakukan.

## 10. Documentation Links

| Document | Link |
|---|---|
| Project Overview | docs/01-project-overview.md |
| Test Plan | docs/02-test-plan.md |
| Test Scenario | docs/03-test-scenario.md |
| Test Case Index | docs/04-test-case.md |
| Bug Report | docs/05-bug-report.md |
| Test Execution Report | docs/06-test-execution-report.md |
| Release Readiness Report | docs/07-release-readiness-report.md |
| API Testing | api-testing/README.md |
| Automation Testing | automation-testing/README.md |
