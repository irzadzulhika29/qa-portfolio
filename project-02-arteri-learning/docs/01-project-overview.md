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

Arteri adalah platform e-learning yang menyediakan public landing pages, authentication, student dashboard, course access, topic and material consumption, quiz flow, CBT-style online exam, dan admin dashboard untuk pengelolaan course, content, exam, participant, serta reporting.

## 3. Business Context

Platform ini digunakan untuk mendukung aktivitas belajar online. Dari sisi student, kualitas akses course, materi, quiz, dan CBT exam sangat penting karena langsung memengaruhi proses belajar dan evaluasi. Dari sisi teacher/admin, kestabilan course management, participant management, dan exam reporting penting karena berkaitan dengan operasional kelas, integritas ujian, dan data hasil belajar.

## 4. User Roles

| Role | Description | Main Access |
|---|---|---|
| Guest | Pengunjung publik yang belum login | Landing page, product page, about page, login |
| Student | Peserta belajar yang telah login | Dashboard, courses, team identity, CBT exam |
| Teacher/Admin | Pengajar atau admin operasional | Admin dashboard, course management, exam management, participant management |

## 5. Main Features

| Feature | Description | Risk Level |
|---|---|---|
| Authentication | Login, token storage, session handling, redirect by role | Critical |
| Role-Based Access Control | Route restriction untuk student dan teacher/admin | Critical |
| Student Courses and Content | Enroll course, browse topic, read materials, manage notes | High |
| CBT Exam | Access exam, system check, answer save, submit, anti-cheating | Critical |
| Admin Course and Exam Management | CRUD course, topic, content, exam, question | Critical |
| Participant Management | Add/delete single or bulk participants | High |
| Notifications | Student notification lifecycle | Medium |

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

- Baseline saat ini berasal dari `qa-project-exploration_arteri-learning.md`
- Belum ada live login, credential valid, atau network capture
- Requirement saat ini masih perlu dikonfirmasi terhadap backend behavior dan product expectation
