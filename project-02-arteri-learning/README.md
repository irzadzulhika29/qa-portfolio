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
| Repository App | Local frontend repository inspection |
| Repository QA | `C:\Dev\qa-portfolio\project-02-arteri-learning` |

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
| Executed | 0 |
| Passed | 0 |
| Failed | 0 |
| Blocked | 0 |
| Pass Rate | 0% |
| Critical Bugs | 0 |
| High Bugs | 0 |
| Medium Bugs | 0 |
| Low Bugs | 0 |

## 8. Key Findings

- Product naming masih inkonsisten antara Stuudi dan Arteri dan perlu konfirmasi product owner.
- Flow CBT exam adalah area dengan risiko tertinggi karena bergantung pada camera, fullscreen, tab-switch handling, dan autosave.
- Role separation student versus teacher/admin terlihat kuat di frontend middleware, tetapi enforcement backend masih perlu dibuktikan lewat API testing.

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
