# API Testing Documentation

## Overview

API testing untuk Arteri Learning Platform menggunakan Postman/Newman untuk validasi endpoint behavior, authentication, authorization, request/response contract, dan error handling.

## API Documentation

**Base URL:** `https://backend.arterilearning.com/api/v1/`  
**API Docs:** [Postman Documentation](https://documenter.getpostman.com/view/33317073/2sBXVhErfi)

## API Endpoints Coverage

### 1. Public Endpoints (No Auth Required)
- `GET /` - Landing page data
- `GET /about` - About page data

### 2. Authentication Endpoints
- `POST /auth/login` - Login elearning (returns JWT token)
- `POST /auth/logout` - Logout user
- `GET /auth/me` - Get current user profile

### 3. Elearning User Endpoints (Student Role)

#### Dashboard
- `GET /elearning/dashboard` - Get student dashboard data
- `GET /elearning/dashboard/upcoming-exams` - Get upcoming exams
- `GET /elearning/dashboard/active-attempts` - Get active exam attempts

#### Courses
- `GET /elearning/courses` - List enrolled courses
- `POST /elearning/courses/enroll` - Enroll course by code
- `GET /elearning/courses/{id}` - Get course detail
- `GET /elearning/courses/{id}/topics` - Get course topics

#### Content & Materials
- `GET /elearning/topics/{id}` - Get topic detail with materials
- `GET /elearning/materials/{id}` - Get material content
- `POST /elearning/materials/{id}/complete` - Mark material as complete

#### Notes
- `GET /elearning/notes` - List user notes
- `POST /elearning/notes` - Create note
- `PUT /elearning/notes/{id}` - Update note
- `DELETE /elearning/notes/{id}` - Delete note

#### Quiz
- `GET /elearning/quiz/{id}` - Get quiz detail
- `POST /elearning/quiz/{id}/start` - Start quiz attempt
- `POST /elearning/quiz/{id}/answer` - Save quiz answer
- `POST /elearning/quiz/{id}/submit` - Submit quiz
- `GET /elearning/quiz/{id}/result` - Get quiz result

#### CBT Exam
- `POST /elearning/exam/access` - Validate exam code and get eligibility
- `POST /elearning/exam/{id}/start` - Start exam attempt
- `GET /elearning/exam/{id}/attempt` - Get current attempt data
- `POST /elearning/exam/{id}/answer` - Save exam answer (auto-save)
- `POST /elearning/exam/{id}/flag` - Flag question
- `POST /elearning/exam/{id}/submit` - Submit exam
- `POST /elearning/exam/{id}/violation` - Record tab-switch/fullscreen violation

#### Team
- `GET /elearning/team` - Get user team detail
- `GET /elearning/teams` - List all teams

#### Notifications
- `GET /elearning/notifications` - List notifications
- `GET /elearning/notifications/unread-count` - Get unread count
- `PUT /elearning/notifications/{id}/read` - Mark as read
- `PUT /elearning/notifications/read-all` - Mark all as read
- `DELETE /elearning/notifications/{id}` - Delete notification
- `DELETE /elearning/notifications/delete-all` - Delete all notifications

### 4. Teacher/Admin Endpoints

#### Dashboard
- `GET /teacher/dashboard` - Get admin dashboard stats
- `GET /teacher/dashboard/exams` - List exams for selection
- `GET /teacher/dashboard/exam/{id}/stats` - Get exam statistics
- `GET /teacher/dashboard/exam/{id}/leaderboard` - Get exam leaderboard

#### Course Management
- `GET /teacher/courses` - List all courses
- `POST /teacher/courses` - Create course (multipart: photo upload)
- `GET /teacher/courses/{id}` - Get course detail
- `PUT /teacher/courses/{id}` - Update course (multipart: photo upload)
- `DELETE /teacher/courses/{id}` - Delete course

#### Topic Management
- `GET /teacher/courses/{courseId}/topics` - List topics
- `POST /teacher/courses/{courseId}/topics` - Create topic
- `PUT /teacher/topics/{id}` - Update topic
- `DELETE /teacher/topics/{id}` - Delete topic

#### Content Management (Materials)
- `GET /teacher/topics/{topicId}/materials` - List materials
- `POST /teacher/topics/{topicId}/materials` - Create material
- `PUT /teacher/materials/{id}` - Update material
- `DELETE /teacher/materials/{id}` - Delete material

#### Content Blocks (Text, Media, Quiz)
- `POST /teacher/materials/{materialId}/blocks/text` - Add text block
- `POST /teacher/materials/{materialId}/blocks/media` - Add media block
- `POST /teacher/materials/{materialId}/blocks/quiz` - Add quiz block
- `PUT /teacher/blocks/{id}` - Update block
- `DELETE /teacher/blocks/{id}` - Delete block

#### Quiz Management
- `GET /teacher/quiz` - List quizzes
- `POST /teacher/quiz` - Create quiz
- `PUT /teacher/quiz/{id}` - Update quiz
- `DELETE /teacher/quiz/{id}` - Delete quiz
- `POST /teacher/quiz/{id}/questions` - Add quiz question
- `PUT /teacher/quiz/questions/{id}` - Update quiz question
- `DELETE /teacher/quiz/questions/{id}` - Delete quiz question

#### Exam Management
- `GET /teacher/exams` - List exams
- `POST /teacher/exams` - Create exam
- `GET /teacher/exams/{id}` - Get exam detail
- `PUT /teacher/exams/{id}` - Update exam metadata
- `DELETE /teacher/exams/{id}` - Delete exam
- `POST /teacher/exams/{id}/questions` - Add exam question (multipart: image upload)
- `PUT /teacher/exams/questions/{id}` - Update exam question (multipart: image upload)
- `DELETE /teacher/exams/questions/{id}` - Delete exam question

#### Participant Management
- `GET /teacher/participants` - List participants
- `POST /teacher/participants` - Add single participant
- `POST /teacher/participants/bulk` - Bulk upload participants (CSV)
- `GET /teacher/participants/template` - Download CSV template
- `DELETE /teacher/participants/{id}` - Delete participant

## Test Strategy

### 1. Authentication Testing
- ✅ Valid login (student, teacher/admin)
- ✅ Invalid credentials
- ✅ Token validation
- ✅ Token expiration
- ✅ Logout behavior

### 2. Authorization Testing (RBAC)
- ✅ Protected endpoints reject requests without token (401)
- ✅ Student token cannot access teacher/admin endpoints (403)
- ✅ Teacher/admin token cannot access student-only endpoints (403)
- ✅ Role claims in JWT are enforced

### 3. Functional Testing
- ✅ Request validation (required fields, data types, formats)
- ✅ Response structure matches contract
- ✅ Status codes are correct (200, 201, 400, 401, 403, 404, 500)
- ✅ Error messages are clear and consistent
- ✅ Pagination works correctly
- ✅ Search/filter parameters work

### 4. Data Integrity Testing
- ✅ CRUD operations maintain data consistency
- ✅ Foreign key relationships are validated
- ✅ Duplicate prevention (enrollment codes, exam codes)
- ✅ Cascade delete behavior

### 5. Business Logic Testing
- ✅ Exam eligibility validation (access window, attempts left)
- ✅ Quiz/exam answer save and retrieval
- ✅ Completion status tracking
- ✅ Violation recording (tab-switch, fullscreen)
- ✅ Leaderboard calculation

### 6. File Upload Testing
- ✅ Course photo upload (valid formats, size limits)
- ✅ Exam question image upload
- ✅ Participant bulk upload (CSV validation)
- ✅ Invalid file rejection

### 7. Negative Testing
- ✅ Invalid IDs (404)
- ✅ Malformed JSON (400)
- ✅ Missing required fields (400)
- ✅ Invalid data types (400)
- ✅ SQL injection attempts
- ✅ XSS attempts in text fields

## Test Execution

### Prerequisites
1. Install Postman Desktop or use Postman Web
2. Install Newman for CLI execution (optional):
   ```bash
   npm install -g newman
   npm install -g newman-reporter-htmlextra
   ```

### Manual Execution (Postman)
1. Import collection: `collections/arteri-api-collection.json`
2. Import environment: `environments/arteri-production.json`
3. Set environment variables:
   - `base_url`: `https://backend.arterilearning.com/api/v1`
   - `student_username`: (TBD - requires test credential)
   - `student_password`: (TBD)
   - `admin_username`: (TBD)
   - `admin_password`: (TBD)
4. Run collection with environment

### CLI Execution (Newman)
```bash
# Run full collection
newman run collections/arteri-api-collection.json \
  -e environments/arteri-production.json \
  -r htmlextra \
  --reporter-htmlextra-export reports/api-test-report.html

# Run specific folder
newman run collections/arteri-api-collection.json \
  -e environments/arteri-production.json \
  --folder "Authentication" \
  -r cli,htmlextra
```

## Test Data Requirements

### Student Account
- Username/Email: TBD
- Password: TBD
- Enrolled courses: At least 1 course with topics and materials
- Active exam: At least 1 exam with valid access code

### Teacher/Admin Account
- Username/Email: TBD
- Password: TBD
- Permissions: Full CRUD access to courses, exams, participants

### Test Data
- Valid enrollment code
- Valid exam code
- Sample participant CSV file
- Sample course photo (JPG/PNG, <5MB)
- Sample exam question image (JPG/PNG, <2MB)

## Current Status

**Status:** ⚠️ Collection structure ready, awaiting test credentials

| Metric | Value |
|---|---:|
| Total Endpoints Identified | 72+ |
| Critical Endpoints | 15 |
| High Priority Endpoints | 25 |
| Medium Priority Endpoints | 20 |
| Low Priority Endpoints | 12+ |
| Test Cases Planned | 100+ |
| Test Cases Executed | 0 |

## Blockers

1. **Test Credentials Required:**
   - Student account with enrolled courses
   - Teacher/Admin account with full permissions
   - Valid enrollment and exam codes

2. **Test Data Required:**
   - Sample CSV for bulk participant upload
   - Sample images for course/exam photo upload

## Next Steps

1. ✅ Create Postman collection structure
2. ✅ Add authentication requests with token capture
3. ✅ Add student endpoint requests
4. ✅ Add teacher/admin endpoint requests
5. ✅ Add test scripts for assertions
6. ⏳ Obtain test credentials
7. ⏳ Execute collection and generate report
8. ⏳ Document bugs and update test execution report

## Evidence Location

- **Postman Collection:** `collections/arteri-api-collection.json`
- **Environment File:** `environments/arteri-production.json`
- **Test Reports:** `reports/`
- **Screenshots:** `../evidence/api-testing/`

---

**Prepared by:** Irza Dzulhika  
**Last Updated:** 2026-05-14
