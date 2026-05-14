# Project Overview

## Summary
Stuudi frontend is a Next.js e-learning web application branded in the UI as Arteri. The application supports public landing pages, authentication, student learning flows, teacher/admin course management, participant management, and CBT-style online exams with camera/fullscreen checks and anti-cheating handling.

This exploration is based on repository inspection, route mapping, frontend service calls, middleware rules, and local environment configuration. No live login session, browser network trace, backend API documentation, or test credentials were provided.

## Application Information

| Item | Description |
|---|---|
| Project Name | Stuudi Frontend / Arteri Learning Platform |
| Project Type | E-learning platform with admin dashboard and CBT exam module |
| Environment | Local repository inspection; runtime API points to production-like backend via env |
| Website URL | `https://arterilearning.com/` |
| API Base URL | `https://backend.arterilearning.com/api/v1/` from `.env` |
| API Documentation | `https://documenter.getpostman.com/view/33317073/2sBXVhErfi#674f868a-1ecc-46d2-a27d-8b840f16f070` |

## Main Objective
Provide an online learning platform where students can access enrolled courses, read materials, take quizzes and CBT exams, while teachers/admins can manage courses, topics, materials, quizzes, exams, participants, and exam monitoring data.

## Main Users

| Role | Description |
|---|---|
| Guest | Public visitor who can access landing pages and login page |
| Student | Authenticated learner who can access dashboard, courses, team identity, and CBT exam flows |
| Teacher/Admin | Authenticated course owner or administrator who can access admin dashboard, course management, participant management, and exam reporting |

## Exploration Notes
- Source is frontend code observation, not live UI execution.
- Authentication uses JWT stored in `localStorage` and an `access_token` cookie.
- Middleware redirects users based on decoded JWT role values: `student`, `teacher`, or `admin`.
- The app name is inconsistent across files: `APP_NAME` is `Arteri`, while login metadata references `Stuudi`.
- API map is inferred from frontend endpoint constants and service calls because API documentation is not available.

# Application Map

| Page/Menu | URL/Route | Description | Accessible By | Notes |
|---|---|---|---|---|
| Landing Home | `/` | Public marketing homepage with hero, collaborators, how-it-works, trusted, and CTA sections | Guest, Student, Teacher/Admin | UI Observation |
| Product Page | `/produk` | Public product information page | Guest, Student, Teacher/Admin | Route observed |
| About Page | `/tentang-kami` | Public about page | Guest, Student, Teacher/Admin | Route observed |
| Login | `/login` | Login page for username/email and password | Guest | Authenticated users are redirected away based on role |
| Forgot Password | `/forgot-password` | Password recovery entry route | Guest | Public route in middleware, page implementation not observed |
| Reset Password | `/reset-password` | Password reset route | Guest | Public route in middleware, page implementation not observed |
| Student Dashboard | `/dashboard` | Student dashboard with greeting, upcoming exam countdown, active attempts, exam code input, and team table | Student | Teacher/admin redirected to `/dashboard-admin` |
| Student Courses | `/courses` | Enrolled courses list with search and join class modal | Student | Dynamic sidebar subitems are supported |
| Student Course Detail | `/courses/[courseId]` | Course detail and topic overview | Student | Route observed |
| Student Topic Detail | `/courses/[courseId]/topic/[topicId]` | Topic detail page | Student | Route observed |
| Student Material Detail | `/courses/[courseId]/topic/[topicId]/materi/[materiId]` | Material/quiz content detail | Student | Route observed |
| Team Identity | `/team` | Student team identity page | Student | Route observed |
| CBT Check | `/cbt/check` | Exam access and system readiness flow | Student | Requires camera and fullscreen before starting |
| CBT Exam | `/cbt/exam` | CBT exam attempt UI | Student | Includes timer, answer saving, flagging, fullscreen guard, and submit |
| Admin Dashboard | `/dashboard-admin` | Admin overview with exam selector, stats, exam performance, and leaderboard | Teacher/Admin | Student redirected to `/dashboard` |
| Admin Courses | `/dashboard-admin/courses` | Teacher/admin course list | Teacher/Admin | Route observed |
| Create Course | `/dashboard-admin/courses/create` | Course creation form | Teacher/Admin | Course photo upload is supported |
| Admin Course Detail | `/dashboard-admin/courses/[coursesId]` | Course detail, topics, and exams | Teacher/Admin | Route observed |
| Manage Course | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]` | Course topic/content management | Teacher/Admin | Route observed |
| Add Material | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]/material/new` | Create material content | Teacher/Admin | Route observed |
| Edit Material | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]/material/[materialId]` | Edit material content | Teacher/Admin | Route observed |
| Add Quiz | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]/quiz/new` | Create quiz content | Teacher/Admin | Route observed |
| Edit Quiz | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]/quiz/[quizId]` | Edit quiz content | Teacher/Admin | Route observed |
| Add Exam | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]/exam/new` | Create exam with metadata, settings, and questions | Teacher/Admin | Supports multipart image upload per question |
| Edit Exam | `/dashboard-admin/courses/[coursesId]/manage/[manageCoursesId]/exam/[examId]` | Edit exam metadata and questions | Teacher/Admin | Existing questions can be updated or deleted |
| Participants | `/dashboard-admin/participant` | Participant management list | Teacher/Admin | Route and API observed |
| Exam Participants | `/dashboard-admin/participant/[examId]` | Participant list for an exam | Teacher/Admin | Route observed |
| Disqualified Participants | `/dashboard-admin/disqualified-participants/[examId]` | Disqualified exam participants | Teacher/Admin | Route observed |
| Cheating Report | `/dashboard-admin/cheating-report/[examId]` | Exam cheating report | Teacher/Admin | Route observed |
| Error / Not Found | `error.tsx`, `not-found.tsx` | App-level error and not-found handling | All | Route implementation exists |

# Feature and Module Inventory

| Module ID | Module Name | Description | Main Actor | Priority | Source | Notes |
|---|---|---|---|---|---|---|
| MOD-PUBLIC-001 | Public Landing | Public pages for product introduction and CTA | Guest | Medium | UI Observation | Landing, product, about |
| MOD-AUTH-001 | Authentication | Login, logout, profile loading, token storage, auth redirects | Guest, Student, Teacher/Admin | Critical | UI Observation | Uses `/auth/login-elearning` |
| MOD-RBAC-001 | Role Access | Middleware and client guard route users by role | Student, Teacher/Admin | Critical | UI Observation | Roles inferred from JWT claims |
| MOD-STUD-DASH-001 | Student Dashboard | Shows greeting, upcoming exam, active attempts, exam code entry, team table | Student | High | UI Observation | Depends on student exam and team APIs |
| MOD-COURSE-001 | Student Courses | Browse enrolled courses, search courses, enroll with code, view course details | Student | High | UI Observation | Join class modal observed |
| MOD-CONTENT-001 | Learning Content | View topics, content blocks, media, text, quizzes, completion state, notes | Student | High | UI Observation | Notes CRUD and content completion APIs observed |
| MOD-QUIZ-001 | Course Quiz | Start quiz, save answer, submit, view result, resume attempt | Student | High | UI Observation | Separate from CBT exam |
| MOD-CBT-001 | CBT Exam Access | Validate exam code, check access window, attempts left, camera, fullscreen | Student | Critical | UI Observation | Requires browser camera permission |
| MOD-CBT-002 | CBT Exam Attempt | Load/resume exam, answer, clear answer, flag, auto-save, submit, timer, anti-cheating | Student | Critical | UI Observation | Tab switch records remaining lives |
| MOD-TEAM-001 | Team Identity | View team details and team list | Student | Medium | UI Observation | Endpoint names indicate team info |
| MOD-ADMIN-DASH-001 | Admin Dashboard | Select exam, view participant stats, cheating stats, performance, leaderboard | Teacher/Admin | High | UI Observation | Exam selector controls dashboard |
| MOD-ADMIN-COURSE-001 | Course Management | Create, update, delete courses and topics | Teacher/Admin | Critical | UI Observation | Course photo multipart upload |
| MOD-ADMIN-CONTENT-001 | Content Management | Add/edit/delete material, text blocks, media blocks, quiz blocks | Teacher/Admin | Critical | UI Observation | Topic content API observed |
| MOD-ADMIN-QUIZ-001 | Quiz Management | Create/configure quiz content and questions | Teacher/Admin | High | UI Observation | Supports choice and matching question types |
| MOD-ADMIN-EXAM-001 | Exam Management | Create/edit/delete exam metadata and questions | Teacher/Admin | Critical | UI Observation | Supports random order/selection and image questions |
| MOD-ADMIN-PART-001 | Participant Management | Add single/bulk participant, download template, delete participant | Teacher/Admin | High | UI Observation | CSV/template flow inferred from component names |
| MOD-NOTIF-001 | Notifications | List, unread count, mark read/all read, delete one/all notifications | Student | Medium | UI Observation | Student notification endpoints observed |
| MOD-SUPPORT-001 | Support Contact | Sidebar support modal with WhatsApp links | Student, Teacher/Admin | Low | UI Observation | Static support contact data |

# Role and Permission Matrix

| Feature/Module | Guest | Regular User | Admin | Notes |
|---|---|---|---|---|
| View landing page | Allowed | Allowed | Allowed | Public route |
| Login | Allowed | Not applicable | Not applicable | Authenticated users are redirected away |
| Forgot/reset password | Allowed | Not applicable | Not applicable | Route listed as public; implementation needs confirmation |
| View student dashboard | Not allowed | Allowed | Not allowed | Middleware blocks teacher/admin from student routes |
| View enrolled courses | Not allowed | Allowed | Not allowed | Student-only route |
| Join course by code | Not allowed | Allowed | Not allowed | Student flow |
| View material and quiz content | Not allowed | Allowed | Not allowed | Student flow |
| Create/update/delete notes | Not allowed | Allowed | Not allowed | Student notes endpoints |
| Enter CBT exam by code | Not allowed | Allowed | Not allowed | Student flow |
| Submit CBT exam | Not allowed | Allowed | Not allowed | Student flow |
| View team identity | Not allowed | Allowed | Not allowed | Student flow |
| View admin dashboard | Not allowed | Not allowed | Allowed | Admin includes teacher/admin per guard |
| Manage courses/topics/content | Not allowed | Not allowed | Allowed | Teacher/admin flow |
| Manage quiz and exam questions | Not allowed | Not allowed | Allowed | Teacher/admin flow |
| Manage participants | Not allowed | Not allowed | Allowed | Teacher/admin flow |
| View cheating reports | Not allowed | Not allowed | Allowed | Teacher/admin flow |
| Logout | Not applicable | Allowed | Allowed | Auth service clears token and user data |

# Core User Flows

## Flow: Login

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Guest | Opens `/login` | Login form is displayed | UI Observation |
| 2 | Guest | Inputs username/email and password | Form validates minimum length | UI Observation |
| 3 | Guest | Submits form | API call is sent to `/auth/login-elearning` | API inferred |
| 4 | System | Receives token and user type | Stores token in `localStorage` and cookie | UI Observation |
| 5 | System | Decodes JWT role | Redirects student to `/dashboard`, teacher/admin to `/dashboard-admin` | Assumption based on middleware/useLogin pattern |
| 6 | System | Receives 401, 429, or network error | Shows user-friendly error message | UI Observation |

## Flow: Student Joins Course

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Student | Opens `/courses` | Enrolled course list is shown | UI Observation |
| 2 | Student | Searches courses | Local course list is filtered after debounce | UI Observation |
| 3 | Student | Opens join class modal | Enrollment code form is displayed | UI Observation |
| 4 | Student | Submits enrollment code | API call is sent to `student/enroll` | API inferred |
| 5 | System | Enrollment succeeds | Modal closes and course data is refreshed | UI Observation |

## Flow: Student Views Course Material

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Student | Opens course detail | Course and topic data are fetched | UI Observation |
| 2 | Student | Opens a topic | Topic content list is shown | UI Observation |
| 3 | Student | Opens material | Content blocks are fetched from `student/content/{id}` | API inferred |
| 4 | Student | Marks content complete/incomplete | Completion endpoint is called | UI Observation |
| 5 | Student | Creates or edits notes | Notes API is called for the topic | UI Observation |

## Flow: Student Starts CBT Exam

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Student | Enters exam code on dashboard | API call is sent to `student/exams/access` | API inferred |
| 2 | System | Validates exam access | Shows exam title, duration, status, attempts left, and schedule | UI Observation |
| 3 | Student | Activates camera | Browser camera permission is requested | UI Observation |
| 4 | Student | Activates fullscreen | Fullscreen state is checked | UI Observation |
| 5 | Student | Clicks start exam | Exam attempt is loaded/resumed | UI Observation |
| 6 | System | Initializes CBT state | Questions, timer, lives, answers, and flags are loaded | UI Observation |

## Flow: Student Completes CBT Exam

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Student | Answers a question | Answer is saved to `/student/exams-attempt/{attemptId}/answers` | API inferred |
| 2 | Student | Clears an answer | API delete call removes answer for the question | API inferred |
| 3 | Student | Flags a question | Local exam state updates flagged questions | UI Observation |
| 4 | Student | Leaves fullscreen or switches tab | Warning/overlay is shown; tab switch may be recorded | UI Observation |
| 5 | System | Records tab switch | API call is sent to `/student/exams-attempt/{attemptId}/tab-switch` | API inferred |
| 6 | Student | Reviews summary and confirms submit | Pending saves flush, then submit endpoint is called | UI Observation |
| 7 | System | Submit succeeds | Local cache is cleared and finished screen is shown | UI Observation |

## Flow: Teacher/Admin Creates Course and Exam

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Teacher/Admin | Opens `/dashboard-admin/courses/create` | Course creation form is displayed | UI Observation |
| 2 | Teacher/Admin | Inputs course name, description, and photo | FormData is built | UI Observation |
| 3 | Teacher/Admin | Saves course | API call is sent to `teacher/add-course` | API inferred |
| 4 | Teacher/Admin | Opens course management | Topics, content, quizzes, and exams can be managed | UI Observation |
| 5 | Teacher/Admin | Creates exam metadata | API call is sent to `teacher/courses/{courseId}/exam` | API inferred |
| 6 | Teacher/Admin | Adds exam questions | Multipart question data is posted to `teacher/exams/{examId}/questions` | API inferred |
| 7 | System | Exam creation succeeds | Course detail and exam list query caches are invalidated/refetched | UI Observation |

## Flow: Teacher/Admin Reviews Exam Monitoring

| Step | Actor | Action | System Response | Notes |
|---|---|---|---|---|
| 1 | Teacher/Admin | Opens `/dashboard-admin` | Exam dropdown and stats layout are shown | UI Observation |
| 2 | Teacher/Admin | Selects exam | Dashboard and result APIs are fetched for selected exam | UI Observation |
| 3 | System | Loads stats | Total participants, disqualified participants, cheating reports, leaderboard, and performance data are shown | UI Observation |
| 4 | Teacher/Admin | Changes leaderboard limit | Dashboard request is refetched with the selected limit | UI Observation |

# Requirement List

| Requirement ID | Module | Requirement | Source | Priority | Notes |
|---|---|---|---|---|---|
| REQ-AUTH-001 | Authentication | User should be able to login using username/email and password | UI Observation | Critical | Identifier accepts username or email |
| REQ-AUTH-002 | Authentication | Identifier must be 3-50 characters | UI Observation | High | Zod validation |
| REQ-AUTH-003 | Authentication | Password must be at least 3 characters | UI Observation | High | Zod validation |
| REQ-AUTH-004 | Authentication | System should store authenticated token in local storage and cookie | UI Observation | Critical | Needed for API and middleware |
| REQ-AUTH-005 | Authentication | System should redirect authenticated users based on role | UI Observation | Critical | Student vs teacher/admin |
| REQ-RBAC-001 | Role Access | Unauthenticated private-route access should redirect to login with redirect query | UI Observation | Critical | Middleware behavior |
| REQ-RBAC-002 | Role Access | Students should not access admin routes | UI Observation | Critical | Middleware redirect |
| REQ-RBAC-003 | Role Access | Teacher/admin should not access student-only routes | UI Observation | High | Middleware redirect |
| REQ-COURSE-001 | Student Courses | Student should see enrolled course list | UI Observation | High | `/student/courses` |
| REQ-COURSE-002 | Student Courses | Student should be able to filter enrolled courses by search text | UI Observation | Medium | Client-side filter |
| REQ-COURSE-003 | Student Courses | Student should be able to join a course using enrollment code | UI Observation | High | `student/enroll` |
| REQ-CONTENT-001 | Learning Content | Student should view course topics and content details | UI Observation | High | Course detail flow |
| REQ-CONTENT-002 | Learning Content | Student should mark content complete or incomplete | UI Observation | Medium | Completion APIs |
| REQ-NOTES-001 | Notes | Student should create, update, delete, and view notes per topic | UI Observation | Medium | Notes service |
| REQ-QUIZ-001 | Course Quiz | Student should start, answer, submit, and view quiz result | UI Observation | High | Quiz service |
| REQ-CBT-001 | CBT Exam | Student should access exam using exam code | UI Observation | Critical | `student/exams/access` |
| REQ-CBT-002 | CBT Exam | System should check camera and fullscreen before exam start | UI Observation | Critical | System check page |
| REQ-CBT-003 | CBT Exam | System should load or resume exam attempt from backend | UI Observation | Critical | Resume API |
| REQ-CBT-004 | CBT Exam | Student answers should be auto-saved to backend | UI Observation | Critical | Save-answer endpoint |
| REQ-CBT-005 | CBT Exam | Student should be able to clear an answer | UI Observation | Medium | Delete answer endpoint |
| REQ-CBT-006 | CBT Exam | System should submit exam to backend and show success state | UI Observation | Critical | Submit endpoint |
| REQ-CBT-007 | CBT Exam | System should record tab-switch events and enforce lives/disqualification state | UI Observation | Critical | Anti-cheating flow |
| REQ-CBT-008 | CBT Exam | System should render math/LaTeX and question images in user exam view | UI Observation | High | Based on code and prior repo context |
| REQ-ADMIN-COURSE-001 | Course Management | Teacher/admin should create courses with name, description, and photo | UI Observation | Critical | Multipart upload |
| REQ-ADMIN-COURSE-002 | Course Management | Teacher/admin should update and delete courses | UI Observation | High | Endpoint constants |
| REQ-ADMIN-CONTENT-001 | Content Management | Teacher/admin should create topics and content blocks | UI Observation | High | Topic/content endpoints |
| REQ-ADMIN-QUIZ-001 | Quiz Management | Teacher/admin should create/configure quiz content and questions | UI Observation | High | Quiz endpoints |
| REQ-ADMIN-EXAM-001 | Exam Management | Teacher/admin should create exam metadata including duration, score, schedule, attempts, random settings, and questions to show | UI Observation | Critical | Exam form state |
| REQ-ADMIN-EXAM-002 | Exam Management | Teacher/admin should add single, multiple, and matching exam questions | UI Observation | Critical | Question transformer |
| REQ-ADMIN-EXAM-003 | Exam Management | Teacher/admin should upload image per exam question | UI Observation | High | Multipart `image` |
| REQ-ADMIN-PART-001 | Participant Management | Teacher/admin should add participants individually or in bulk | UI Observation | High | Participant endpoints |
| REQ-ADMIN-REPORT-001 | Exam Reporting | Teacher/admin should view exam dashboard, leaderboard, results, cheating report, disqualified participants, and participants | UI Observation | High | Admin dashboard/report routes |

# User Stories

## Module: Authentication

| Story ID | User Story | Initial Acceptance Criteria | Priority | Source |
|---|---|---|---|---|
| US-AUTH-001 | As a guest, I want to login using my username/email and password so that I can access my role-specific dashboard. | 1. User can input identifier and password<br>2. System validates form fields<br>3. System redirects by role after successful login | Critical | UI Observation |
| US-AUTH-002 | As an authenticated user, I want the system to maintain my session so that I do not need to login on every page load. | 1. Token is stored after login<br>2. Middleware can read auth cookie<br>3. API calls include bearer token | Critical | UI Observation |

## Module: Student Courses

| Story ID | User Story | Initial Acceptance Criteria | Priority | Source |
|---|---|---|---|---|
| US-COURSE-001 | As a student, I want to see my enrolled courses so that I can continue learning. | 1. Course list loads from API<br>2. Empty state appears when there are no courses<br>3. Course cards show title, description, image, and progress | High | UI Observation |
| US-COURSE-002 | As a student, I want to join a course using an enrollment code so that I can access new learning content. | 1. Join modal accepts a code<br>2. API receives enrollment code<br>3. Course list updates after success | High | UI Observation |
| US-CONTENT-001 | As a student, I want to open topics and material content so that I can study course material. | 1. Topic list is available<br>2. Material content loads by content ID<br>3. Content can be marked complete or incomplete | High | UI Observation |
| US-NOTES-001 | As a student, I want to maintain notes per topic so that I can keep learning references. | 1. Notes can be listed by topic<br>2. Notes can be created, updated, and deleted<br>3. Notes include title and content | Medium | UI Observation |

## Module: CBT Exam

| Story ID | User Story | Initial Acceptance Criteria | Priority | Source |
|---|---|---|---|---|
| US-CBT-001 | As a student, I want to enter an exam code so that I can access the correct CBT exam. | 1. Code is submitted to backend<br>2. System returns exam access information<br>3. Access status and attempts left are shown | Critical | UI Observation |
| US-CBT-002 | As a student, I want to complete device checks before starting an exam so that exam integrity rules are followed. | 1. Camera permission can be requested<br>2. Fullscreen can be activated<br>3. Start button is disabled until required checks pass | Critical | UI Observation |
| US-CBT-003 | As a student, I want my answers to be saved while taking the exam so that progress is not lost. | 1. Selecting an answer triggers save<br>2. Clearing answer is supported<br>3. Pending saves are flushed before submit | Critical | UI Observation |
| US-CBT-004 | As a student, I want to review my exam summary before submitting so that I can confirm my answers. | 1. Summary view is available<br>2. Student can return to exam<br>3. Confirm submit calls backend submit endpoint | High | UI Observation |
| US-CBT-005 | As a teacher/admin, I want tab switching to be recorded so that exam violations can be monitored. | 1. Tab switch endpoint is called<br>2. Remaining lives are updated<br>3. Exam is blocked/disqualified when lives reach zero | Critical | UI Observation |

## Module: Teacher/Admin Management

| Story ID | User Story | Initial Acceptance Criteria | Priority | Source |
|---|---|---|---|---|
| US-ADMIN-COURSE-001 | As a teacher/admin, I want to create and manage courses so that students can access structured learning content. | 1. Course can be created with name, description, and photo<br>2. Course list refreshes after creation<br>3. Course can be updated or deleted | Critical | UI Observation |
| US-ADMIN-CONTENT-001 | As a teacher/admin, I want to manage topics, materials, and quizzes so that course content stays organized. | 1. Topic can be added, updated, deleted<br>2. Material content can include text/media/quiz blocks<br>3. Quiz details and configuration can be managed | High | UI Observation |
| US-ADMIN-EXAM-001 | As a teacher/admin, I want to create exams with question settings so that students can take controlled assessments. | 1. Exam metadata can be saved<br>2. Questions can be added<br>3. Question types include single, multiple, and matching<br>4. Question images can be uploaded | Critical | UI Observation |
| US-ADMIN-PART-001 | As a teacher/admin, I want to add participants individually or in bulk so that learners can be assigned to exams/classes. | 1. Single participant API exists<br>2. Bulk participant upload API exists<br>3. Template download API exists | High | UI Observation |
| US-ADMIN-REPORT-001 | As a teacher/admin, I want to review exam results and violation reports so that I can monitor exam performance and integrity. | 1. Exam dashboard loads selected exam data<br>2. Leaderboard and performance stats are shown<br>3. Cheating and disqualified participant views exist | High | UI Observation |

# Business Rules and Validation Rules

| Rule ID | Module | Rule | Source | Notes |
|---|---|---|---|---|
| RULE-AUTH-001 | Authentication | Identifier is required and must be 3-50 characters | UI Observation | Zod schema |
| RULE-AUTH-002 | Authentication | Password is required and must be at least 3 characters | UI Observation | Zod schema |
| RULE-AUTH-003 | Authentication | Login 401 should show invalid username/password message | UI Observation | LoginForm error handling |
| RULE-AUTH-004 | Authentication | Login 429 should show rate limit message | UI Observation | LoginForm error handling |
| RULE-RBAC-001 | Role Access | Unauthenticated private pages redirect to `/login?redirect={pathname}` | UI Observation | Middleware |
| RULE-RBAC-002 | Role Access | JWT role `teacher` or `admin` is treated as teacher/admin access | UI Observation | Middleware and RoleGuard |
| RULE-RBAC-003 | Role Access | JWT role `student` is treated as student access | UI Observation | Middleware and RoleGuard |
| RULE-COURSE-001 | Student Courses | Enrolled course search filters by course name | UI Observation | Client-side filter |
| RULE-CONTENT-001 | Learning Content | API topic status is normalized to `completed`, `locked`, or `in-progress` | UI Observation | Course service transformer |
| RULE-CBT-001 | CBT Exam | Student must pass camera and fullscreen checks before starting exam | UI Observation | Start button gating |
| RULE-CBT-002 | CBT Exam | CBT timer decrements every second and auto-submits when time runs out | UI Observation | ExamContainer |
| RULE-CBT-003 | CBT Exam | Student loses exam access/disqualified state when lives reach zero | UI Observation | ExamContainer |
| RULE-CBT-004 | CBT Exam | Matching questions require left/right side normalization | UI Observation | Exam service transformer |
| RULE-CBT-005 | CBT Exam | Saved answers are restored on resume when available | UI Observation | Exam service transformer |
| RULE-ADMIN-EXAM-001 | Exam Management | Default new exam state includes duration 120, passing score 70, max attempts 2, questions to show 5 | UI Observation | Exam form state |
| RULE-ADMIN-EXAM-002 | Exam Management | Exam question image is sent as multipart field `image` | UI Observation | useCreateExam |
| RULE-ADMIN-EXAM-003 | Exam Management | Choice question options are sent as `options_json` | UI Observation | useCreateExam |
| RULE-ADMIN-EXAM-004 | Exam Management | Matching question pairs are sent as `matching_pairs_json` | UI Observation | useCreateExam |
| RULE-ADMIN-PART-001 | Participant Management | Bulk participant import uses multipart form data | UI Observation | ManageParticipantsModal reference |
| RULE-NOTIF-001 | Notifications | Student can mark one notification or all notifications as read | UI Observation | Notification service |

# API Map

API documentation is not available. The map below is inferred from frontend code and should be validated against backend documentation.

| API ID | Method | Endpoint | Related Module | Purpose | Auth Required | Source | Notes |
|---|---|---|---|---|---|---|---|
| API-AUTH-001 | POST | `/auth/login-elearning` | Authentication | Authenticate user | No | Frontend Code Observation | Request uses identifier and password |
| API-AUTH-002 | GET | `/student/profile` | Authentication/Profile | Fetch student profile | Yes | Frontend Code Observation | Used after local auth check |
| API-COURSE-001 | GET | `/courses/browse?page={page}&per_page={per_page}&search={search}` | Courses | Browse available courses | Unknown | Frontend Code Observation | Auth requirement needs confirmation |
| API-COURSE-002 | GET | `/student/courses` | Student Courses | Retrieve enrolled courses | Yes | Frontend Code Observation | |
| API-COURSE-003 | POST | `/student/enroll` | Student Courses | Enroll by code | Yes | Frontend Code Observation | Body includes `enrollment_code` |
| API-COURSE-004 | GET | `/student/courses/{id}` | Student Courses | Retrieve course details | Yes | Frontend Code Observation | |
| API-COURSE-005 | GET | `/student/courses/{id}/topics` | Student Courses | Retrieve course topics | Yes | Frontend Code Observation | |
| API-CONTENT-001 | GET | `/student/content/{id}` | Learning Content | Retrieve content details | Yes | Frontend Code Observation | |
| API-CONTENT-002 | POST | `/student/content/{id}/complete` | Learning Content | Mark content complete | Yes | Frontend Code Observation | |
| API-CONTENT-003 | POST | `/student/content/{id}/incomplete` | Learning Content | Mark content incomplete | Yes | Frontend Code Observation | |
| API-NOTE-001 | GET | `/student/topics/{topicId}/notes` | Notes | List notes by topic | Yes | Frontend Code Observation | |
| API-NOTE-002 | POST | `/student/topics/{topicId}/notes` | Notes | Create note | Yes | Frontend Code Observation | |
| API-NOTE-003 | PATCH | `/student/notes/{noteId}` | Notes | Update note | Yes | Frontend Code Observation | |
| API-NOTE-004 | DELETE | `/student/notes/{noteId}` | Notes | Delete note | Yes | Frontend Code Observation | |
| API-QUIZ-001 | POST | `/student/content/{contentId}/quiz/start` | Course Quiz | Start quiz attempt | Yes | Frontend Code Observation | |
| API-QUIZ-002 | POST | `/student/quiz-attempts/{attemptId}/answers` | Course Quiz | Save quiz answer | Yes | Frontend Code Observation | |
| API-QUIZ-003 | POST | `/student/quiz-attempts/{attemptId}/submit` | Course Quiz | Submit quiz | Yes | Frontend Code Observation | |
| API-QUIZ-004 | GET | `/student/quiz-attempts/{attemptId}/result` | Course Quiz | Get quiz result | Yes | Frontend Code Observation | |
| API-EXAM-001 | GET | `/upcoming-exam` | Student Dashboard | Get upcoming/ongoing exam | Yes | Frontend Code Observation | |
| API-EXAM-002 | POST | `/student/exams/access` | CBT Exam | Validate exam code/access | Yes | Frontend Code Observation | Body includes `exam_code` |
| API-EXAM-003 | POST | `/student/exams/{examId}/start` | CBT Exam | Start exam attempt | Yes | Frontend Code Observation | |
| API-EXAM-004 | GET | `/student/exams-attempts` | CBT Exam | Get exam attempts | Yes | Frontend Code Observation | |
| API-EXAM-005 | GET | `/student/exams/{examId}/resume` | CBT Exam | Resume exam attempt | Yes | Frontend Code Observation | |
| API-EXAM-006 | POST | `/student/exams-attempt/{attemptId}/answers` | CBT Exam | Save exam answer | Yes | Frontend Code Observation | Body includes `question_id`, `selected_option_id` |
| API-EXAM-007 | DELETE | `/student/exams-attempt/{attemptId}/questions/{questionId}` | CBT Exam | Clear exam answer | Yes | Frontend Code Observation | |
| API-EXAM-008 | POST | `/student/exams-attempt/{attemptId}/tab-switch` | CBT Exam | Record tab switch violation | Yes | Frontend Code Observation | Body includes timestamp |
| API-EXAM-009 | POST | `/student/exams-attempt/{attemptId}/submit` | CBT Exam | Submit CBT exam | Yes | Frontend Code Observation | |
| API-NOTIF-001 | GET | `/student/notifications?page={page}&per_page={per_page}` | Notifications | List notifications | Yes | Frontend Code Observation | |
| API-NOTIF-002 | GET | `/student/notifications/unread-count` | Notifications | Get unread count | Yes | Frontend Code Observation | |
| API-NOTIF-003 | PATCH | `/student/notifications/{id}/read` | Notifications | Mark one notification read | Yes | Frontend Code Observation | |
| API-NOTIF-004 | PATCH | `/student/notifications/read-all` | Notifications | Mark all notifications read | Yes | Frontend Code Observation | |
| API-NOTIF-005 | DELETE | `/student/notifications/{id}` | Notifications | Delete one notification | Yes | Frontend Code Observation | |
| API-NOTIF-006 | DELETE | `/student/notifications` | Notifications | Delete all notifications | Yes | Frontend Code Observation | |
| API-TEAM-001 | GET | `/elearning/team-details` | Team Identity | Retrieve team details | Yes | Frontend Code Observation | |
| API-TEAM-002 | GET | `/teams` | Team Identity | Retrieve team list | Yes | Frontend Code Observation | |
| API-TEACHER-COURSE-001 | GET | `/teacher/courses` | Course Management | List teaching courses | Yes | Frontend Code Observation | Teacher/admin |
| API-TEACHER-COURSE-002 | POST | `/teacher/add-course` | Course Management | Create course | Yes | Frontend Code Observation | Multipart form data |
| API-TEACHER-COURSE-003 | PATCH | `/teacher/courses/{id}` | Course Management | Update course | Yes | Frontend Code Observation | |
| API-TEACHER-COURSE-004 | DELETE | `/teacher/courses/{id}` | Course Management | Delete course | Yes | Frontend Code Observation | |
| API-TEACHER-TOPIC-001 | POST | `/teacher/courses/{courseId}/topics` | Topic Management | Add topic | Yes | Frontend Code Observation | |
| API-TEACHER-TOPIC-002 | PUT | `/teacher/topics/{topicId}` | Topic Management | Update topic | Yes | Frontend Code Observation | |
| API-TEACHER-TOPIC-003 | DELETE | `/teacher/topics/{topicId}` | Topic Management | Delete topic | Yes | Frontend Code Observation | |
| API-TEACHER-CONTENT-001 | POST | `/teacher/topics/{topicId}/content` | Content Management | Add content | Yes | Frontend Code Observation | |
| API-TEACHER-CONTENT-002 | GET | `/teacher/content/{contentId}` | Content Management | Get content details | Yes | Frontend Code Observation | |
| API-TEACHER-CONTENT-003 | PATCH | `/teacher/content/{contentId}` | Content Management | Update content | Yes | Frontend Code Observation | |
| API-TEACHER-CONTENT-004 | DELETE | `/teacher/content/{contentId}` | Content Management | Delete content | Yes | Frontend Code Observation | |
| API-TEACHER-BLOCK-001 | POST | `/teacher/content/{contentId}/blocks/text` | Content Blocks | Add text block | Yes | Frontend Code Observation | |
| API-TEACHER-BLOCK-002 | POST | `/teacher/content/{contentId}/blocks/media` | Content Blocks | Add media block | Yes | Frontend Code Observation | |
| API-TEACHER-BLOCK-003 | POST | `/teacher/content/{contentId}/blocks/quiz` | Content Blocks | Add quiz block | Yes | Frontend Code Observation | |
| API-TEACHER-BLOCK-004 | DELETE | `/teacher/blocks/{blockId}` | Content Blocks | Delete block | Yes | Frontend Code Observation | |
| API-TEACHER-QUIZ-001 | POST | `/teacher/content/{contentId}/quiz` | Quiz Management | Add quiz questions | Yes | Frontend Code Observation | |
| API-TEACHER-QUIZ-002 | GET | `/teacher/content/{contentId}/quiz/details` | Quiz Management | Get quiz details | Yes | Frontend Code Observation | |
| API-TEACHER-QUIZ-003 | POST | `/teacher/content/{contentId}/quiz/configure` | Quiz Management | Configure quiz | Yes | Frontend Code Observation | |
| API-TEACHER-EXAM-001 | GET | `/teacher/exams` | Exam Management | List all exams | Yes | Frontend Code Observation | |
| API-TEACHER-EXAM-002 | POST | `/teacher/courses/{courseId}/exam` | Exam Management | Create exam | Yes | Frontend Code Observation | |
| API-TEACHER-EXAM-003 | POST | `/teacher/exams/{examId}/questions` | Exam Management | Add exam question | Yes | Frontend Code Observation | Multipart form data |
| API-TEACHER-EXAM-004 | GET | `/teacher/course/{courseId}/exams` | Exam Management | List course exams | Yes | Frontend Code Observation | |
| API-TEACHER-EXAM-005 | GET | `/teacher/exam/{examId}/details` | Exam Management | Get exam details | Yes | Frontend Code Observation | |
| API-TEACHER-EXAM-006 | PATCH | `/teacher/exams/{examId}` | Exam Management | Update exam | Yes | Frontend Code Observation | |
| API-TEACHER-EXAM-007 | DELETE | `/teacher/exams/{examId}` | Exam Management | Delete exam | Yes | Frontend Code Observation | |
| API-TEACHER-QUESTION-001 | PATCH | `/teacher/questions/{questionId}` | Exam/Quiz Questions | Update question | Yes | Frontend Code Observation | |
| API-TEACHER-QUESTION-002 | DELETE | `/teacher/questions/{questionId}` | Exam/Quiz Questions | Delete question | Yes | Frontend Code Observation | |
| API-TEACHER-REPORT-001 | GET | `/teacher/exams/{examId}/dashboard` | Exam Reporting | Get exam dashboard | Yes | Frontend Code Observation | |
| API-TEACHER-REPORT-002 | GET | `/teacher/exams/{examId}/cheating` | Exam Reporting | Get cheating report | Yes | Frontend Code Observation | |
| API-TEACHER-REPORT-003 | GET | `/teacher/exams/{examId}/disqualified` | Exam Reporting | Get disqualified participants | Yes | Frontend Code Observation | |
| API-TEACHER-REPORT-004 | GET | `/teacher/exams/{examId}/participants` | Exam Reporting | Get exam participants | Yes | Frontend Code Observation | |
| API-TEACHER-REPORT-005 | GET | `/teacher/exams/{examId}/results` | Exam Reporting | Get exam results | Yes | Frontend Code Observation | |
| API-TEACHER-PART-001 | GET | `/teacher/participants` | Participant Management | List participants | Yes | Frontend Code Observation | |
| API-TEACHER-PART-002 | GET | `/teacher/participants/template` | Participant Management | Download participant template | Yes | Frontend Code Observation | |
| API-TEACHER-PART-003 | POST | `/teacher/add-participant` | Participant Management | Add participant | Yes | Frontend Code Observation | |
| API-TEACHER-PART-004 | POST | `/teacher/add-participant/bulk` | Participant Management | Bulk add participants | Yes | Frontend Code Observation | Multipart form data |
| API-TEACHER-PART-005 | DELETE | `/teacher/elearning-user/{participantId}` | Participant Management | Delete participant | Yes | Frontend Code Observation | |

# Data Entity Observation

| Entity | Fields Observed | Related Module | Notes |
|---|---|---|---|
| User | id, email, username, user_type, roleName, avatar, total_exp | Authentication/Profile | Stored in local storage and profile response |
| Course | course_id, name, description, image_url/photo, progress_percentage, is_completed, enrolled_at | Courses | Student and teacher course flows |
| Topic | topic_id, title, description, status, is_completed, contents | Course Content | Status normalized for UI |
| Content | content_id, title, type, sequence, topic_id, topic_name, is_completed, blocks, last_attempt_id | Learning Content | Supports material and quiz content |
| Content Block | block_id, type, sequence, text_content, media_url, media_type, caption, questions | Learning Content | Text, media, quiz blocks |
| Note | note_id, topic_id, title, content, created_at, updated_at | Notes | Student topic notes |
| Quiz Attempt | attemptId, answers, result, score fields | Course Quiz | Fields partially inferred from service naming |
| Exam | exam_id, title, description, duration, passing_score, start_time, end_time, max_attempts, questions_to_show, random flags | Exam Management/CBT | Teacher creates; student consumes |
| Exam Question | question_id, question_text, question_type, difficulty, points, options, matching_pairs, image_url/question_image, explanation | Exam Management/CBT | Supports single, multiple, matching |
| Question Option | option_id, option_text, is_correct, sequence, side, matching_pair | Quiz/Exam | Matching options normalized |
| Exam Attempt | attempt_id, exam_id, status, questions, saved_answer, time_remaining, lives_info | CBT Exam | Used for resume and active attempt cards |
| Participant | participantId/userId, participant data | Participant Management | Exact fields need API confirmation |
| Notification | id, read status, content fields | Notifications | Exact shape not fully inspected |
| Team | team details, team list fields | Team Identity | Exact fields need API confirmation |
| Cheating Report | examId, violation/report fields | Exam Reporting | Exact fields need API confirmation |
| Disqualified Participant | examId, participant fields, disqualification status | Exam Reporting | Exact fields need API confirmation |

# Integration and External Services

| Integration | Purpose | Visible Evidence | Notes |
|---|---|---|---|
| Backend API | Main data source for auth, courses, exams, participants, notifications | `NEXT_PUBLIC_BASE_API`, Axios API client | API docs not available |
| JWT Authentication | Role and session handling | JWT decode in middleware/auth service | Claims include `RoleName`, `UserType`, `UserID` |
| Browser Camera API | CBT proctoring readiness | Camera check component and permissions policy | Requires browser permission |
| Browser Fullscreen API | CBT integrity enforcement | System check and fullscreen guard | Needed before/during exam |
| Supabase Storage CDN | Remote image hosting | Next image remote pattern for `dllvucwgezsuhwktkwxd.supabase.co` | Backend/storage relationship needs confirmation |
| Unsplash / UI Avatars | Remote images/avatar rendering | Next image remote patterns | Used by UI imagery |
| WhatsApp | Support contact links | `wa.me` support contact constants | Static support links |

# Assumptions

| Assumption ID | Area | Assumption | Reason | Needs Confirmation |
|---|---|---|---|---|
| ASM-AUTH-001 | Authentication | Forgot/reset password routes are intended to be functional | Middleware lists them as public, but pages were not observed in route list | Yes |
| ASM-AUTH-002 | Authentication | Backend enforces credential validation and account status | Frontend only submits login data | Yes |
| ASM-RBAC-001 | Role Access | Teacher and admin have equivalent frontend permissions | RoleGuard treats admin as teacher/admin and middleware maps admin to teacher route behavior | Yes |
| ASM-COURSE-001 | Courses | Only enrolled students can access course detail and content | Endpoints are under `student/` namespace | Yes |
| ASM-COURSE-002 | Courses | Enrollment code must be valid and unique per course/class | Join course flow accepts code | Yes |
| ASM-CBT-001 | CBT Exam | Backend is source of truth for exam eligibility, attempts left, and schedule window | Access API returns status fields | Yes |
| ASM-CBT-002 | CBT Exam | Tab switching reduces lives and can disqualify the student | Tab-switch API returns lives and disqualification fields | Yes |
| ASM-CBT-003 | CBT Exam | Final exam score is calculated by backend after submit | Submit API returns generic success data in frontend | Yes |
| ASM-ADMIN-001 | Course Management | Only teacher/admin can create or mutate course content | Routes and endpoints are teacher/admin scoped | Yes |
| ASM-PART-001 | Participant Management | Bulk participant upload expects CSV or spreadsheet template | Template and CSV preview component names exist | Yes |
| ASM-REPORT-001 | Reporting | Cheating and disqualified reports are derived from CBT violations | Report routes and tab-switch logic are connected conceptually | Yes |
| ASM-BRAND-001 | Product Naming | Stuudi and Arteri refer to the same application/product in this repo | Constants and metadata use both names | Yes |

# Limitations

| Limitation ID | Area | Limitation | Impact |
|---|---|---|---|
| LIM-ACCESS-001 | Access | No testing credentials were provided | Role-specific UI behavior could not be verified by live login |
| LIM-RUNTIME-001 | Runtime | Application was not run in browser during this exploration | Findings are code-based, not confirmed with live rendering |
| LIM-API-001 | API | API documentation was not provided | API request/response details are incomplete |
| LIM-NETWORK-001 | API | Browser DevTools/network observation was not performed | API map is inferred from frontend code only |
| LIM-BE-001 | Backend | Backend repository was not inspected | Business rules enforced server-side are unknown |
| LIM-DATA-001 | Data | Real response payloads were not available | Some entity fields are partial/inferred |
| LIM-ROLE-001 | Role Access | Only frontend guards were inspected | Backend authorization enforcement needs confirmation |
| LIM-DESTRUCTIVE-001 | Admin Actions | No destructive actions were executed | Delete/update flows are mapped but not verified |
| LIM-DOC-001 | Requirement Source | No product requirement document was provided | Requirements are derived from observed implementation |

# Open Questions

| Question ID | Area | Question | Reason | Priority |
|---|---|---|---|---|
| Q-BRAND-001 | Product Identity | Should the official product name be Stuudi, Arteri, or Stuudi by Arteri? | UI/constants metadata are inconsistent | Medium |
| Q-AUTH-001 | Authentication | What are the supported login identifiers: username, email, or both? | Form label says both; backend contract unknown | High |
| Q-AUTH-002 | Authentication | What is the session timeout and token refresh behavior? | Only access token storage is visible | High |
| Q-AUTH-003 | Authentication | Are forgot/reset password routes implemented and connected to backend? | Public routes exist, pages not observed | Medium |
| Q-RBAC-001 | Role Access | Are `teacher` and `admin` supposed to have identical permissions? | Frontend treats both similarly | High |
| Q-RBAC-002 | Role Access | Does backend enforce the same role restrictions as frontend middleware? | Frontend guard alone is insufficient | High |
| Q-COURSE-001 | Courses | Can students browse all courses or only enrolled courses in production UI? | Browse endpoint exists but primary UI shows my courses | Medium |
| Q-COURSE-002 | Courses | What are valid enrollment code rules and error messages? | Needed for requirement confirmation | High |
| Q-CONTENT-001 | Learning Content | What content block types are officially supported? | Code shows text, media, and quiz block paths | Medium |
| Q-QUIZ-001 | Quiz | What scoring rules apply to course quizzes? | Frontend submits answers but calculation is backend-owned | High |
| Q-CBT-001 | CBT Exam | What exact conditions make an exam eligible or ineligible to start? | Access status is backend-driven | High |
| Q-CBT-002 | CBT Exam | How many tab switches are allowed before disqualification? | Frontend default max lives is 3, backend response may differ | High |
| Q-CBT-003 | CBT Exam | Is camera monitoring only a readiness check or is stream data used during exam? | Frontend shows camera preview; no upload observed | High |
| Q-CBT-004 | CBT Exam | Should exam remain valid if network connection drops during answer save? | Offline/reconnected UI exists, backend retry behavior needs confirmation | High |
| Q-CBT-005 | CBT Exam | Are question images mandatory to render in both start/resume paths? | Code normalizes `image_url` and `question_image` | Medium |
| Q-ADMIN-COURSE-001 | Course Management | What are required fields and constraints for course creation? | Frontend sends name, description, photo; validation not fully inspected | High |
| Q-ADMIN-EXAM-001 | Exam Management | What are valid ranges for duration, passing score, max attempts, and questions to show? | Defaults are visible, constraints need confirmation | High |
| Q-ADMIN-EXAM-002 | Exam Management | Can exam questions be deleted after students have attempted the exam? | Edit mode supports deleting existing question IDs | High |
| Q-PART-001 | Participant Management | What fields are required for participant import template? | Template endpoint exists but file not inspected | High |
| Q-REPORT-001 | Reporting | What formulas power leaderboard, cheating reports, and exam performance metrics? | Dashboard consumes backend aggregates | Medium |
| Q-API-001 | API | Is there a Swagger/OpenAPI/Postman collection for this backend? | Needed to finalize API QA documentation | High |

# Recommended Next QA Steps

1. Confirm the official product name, supported roles, and role permission boundaries with the project owner.
2. Obtain test credentials for guest, student, teacher, and admin where applicable.
3. Obtain backend API documentation or a Postman/OpenAPI collection.
4. Validate frontend-derived requirements against backend behavior and product expectations.
5. Run a read-only live exploration for public pages, login, student dashboard, course detail, and admin dashboard.
6. Validate high-risk assumptions around CBT eligibility, tab-switch violations, camera/fullscreen requirements, and submit behavior.
7. Finalize the requirement list after resolving open questions.
8. Convert confirmed requirements into QA scenarios in the separate QA portfolio repository.
9. Prepare API testing documentation after endpoint contracts and auth requirements are confirmed.
10. Define automation scope after stable role credentials and core flows are confirmed.
