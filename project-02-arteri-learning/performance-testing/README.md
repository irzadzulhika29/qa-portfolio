# Performance Testing Documentation

## Overview

Basic performance testing untuk Arteri Learning Platform menggunakan k6 untuk smoke testing, load testing, dan stress testing pada critical API endpoints dan user flows.

## Technology Stack

- **Tool:** k6 (Grafana k6)
- **Language:** JavaScript (k6 scripting)
- **Reporting:** HTML Report, JSON, InfluxDB (optional)
- **Metrics:** Response time, throughput, error rate, resource utilization

## Test Types

### 1. Smoke Test
- **Purpose:** Verify system can handle minimal load
- **VUs:** 1-5 users
- **Duration:** 1-2 minutes
- **Goal:** No errors, baseline performance metrics

### 2. Load Test
- **Purpose:** Verify system performance under expected load
- **VUs:** 10-50 users (concurrent)
- **Duration:** 5-10 minutes
- **Goal:** Response time < 2s, error rate < 1%

### 3. Stress Test
- **Purpose:** Find system breaking point
- **VUs:** Ramp up from 10 to 200+ users
- **Duration:** 10-15 minutes
- **Goal:** Identify max capacity, graceful degradation

### 4. Spike Test
- **Purpose:** Verify system handles sudden traffic spikes
- **VUs:** Sudden jump from 10 to 100 users
- **Duration:** 5 minutes
- **Goal:** System recovers without crashes

## Test Scenarios

### Priority 1: Critical API Endpoints

#### Authentication
- `POST /auth/login` - Login performance
- `GET /auth/me` - Token validation performance

#### Student Dashboard
- `GET /elearning/dashboard` - Dashboard load time
- `GET /elearning/dashboard/upcoming-exams` - Upcoming exams query

#### Courses
- `GET /elearning/courses` - Course list performance
- `GET /elearning/courses/{id}` - Course detail load time

#### CBT Exam (High Risk)
- `POST /elearning/exam/access` - Exam code validation
- `POST /elearning/exam/{id}/start` - Exam start performance
- `POST /elearning/exam/{id}/answer` - Auto-save performance (critical!)
- `POST /elearning/exam/{id}/submit` - Exam submission

#### Admin Dashboard
- `GET /teacher/dashboard/exam/{id}/stats` - Statistics query
- `GET /teacher/dashboard/exam/{id}/leaderboard` - Leaderboard query

### Priority 2: User Flow Performance

#### Student Exam Flow
1. Login
2. Access dashboard
3. Enter exam code
4. Start exam
5. Answer 10 questions (auto-save each)
6. Submit exam

**Target:** Complete flow < 30s (excluding thinking time)

#### Admin Monitoring Flow
1. Login
2. Access admin dashboard
3. Select exam
4. View statistics
5. View leaderboard

**Target:** Complete flow < 10s

## Performance Thresholds

### Response Time Targets

| Endpoint Type | p95 Response Time | p99 Response Time |
|---|---|---|
| Authentication | < 500ms | < 1s |
| Read Operations (GET) | < 1s | < 2s |
| Write Operations (POST/PUT) | < 2s | < 3s |
| File Upload | < 5s | < 10s |
| Complex Queries (Stats, Leaderboard) | < 3s | < 5s |

### Error Rate Targets

| Test Type | Max Error Rate |
|---|---|
| Smoke Test | 0% |
| Load Test | < 1% |
| Stress Test | < 5% (at peak load) |

### Throughput Targets

| Endpoint | Min Requests/sec |
|---|---|
| Login | 10 req/s |
| Dashboard | 20 req/s |
| Course List | 30 req/s |
| Exam Auto-save | 50 req/s (critical!) |

## Project Structure

```
performance-testing/
├── README.md                    # This file
├── package.json                 # Dependencies (k6, reporters)
│
├── scripts/
│   ├── smoke-test.js            # Smoke test script
│   ├── load-test.js             # Load test script
│   ├── stress-test.js           # Stress test script
│   ├── spike-test.js            # Spike test script
│   │
│   ├── scenarios/
│   │   ├── auth-flow.js         # Authentication flow
│   │   ├── student-exam-flow.js # Student exam flow
│   │   └── admin-dashboard-flow.js # Admin dashboard flow
│   │
│   └── utils/
│       ├── config.js            # Configuration
│       ├── auth.js              # Authentication helpers
│       └── thresholds.js        # Performance thresholds
│
└── reports/                     # Test reports (gitignored)
    ├── smoke-test-report.html
    ├── load-test-report.html
    └── stress-test-report.html
```

## Setup Instructions

### 1. Install k6

**Linux:**
```bash
sudo gpg -k
sudo gpg --no-default-keyring --keyring /usr/share/keyrings/k6-archive-keyring.gpg --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys C5AD17C747E3415A3642D57D77C6C491D6AC1D69
echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | sudo tee /etc/apt/sources.list.d/k6.list
sudo apt-get update
sudo apt-get install k6
```

**macOS:**
```bash
brew install k6
```

**Windows:**
```powershell
choco install k6
```

### 2. Verify Installation
```bash
k6 version
```

### 3. Install HTML Reporter (Optional)
```bash
npm install -g k6-reporter
```

## Example Scripts

### Smoke Test Script

Create `scripts/smoke-test.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 5,
  duration: '2m',
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% of requests < 2s
    http_req_failed: ['rate<0.01'],    // Error rate < 1%
  },
};

const BASE_URL = 'https://backend.arterilearning.com/api/v1';

export default function () {
  // Test public endpoint
  const landingRes = http.get(`${BASE_URL}/`);
  check(landingRes, {
    'landing page status is 200': (r) => r.status === 200,
    'landing page response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(1);

  // Test about endpoint
  const aboutRes = http.get(`${BASE_URL}/about`);
  check(aboutRes, {
    'about page status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
```

### Load Test Script

Create `scripts/load-test.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 10 },  // Ramp up to 10 users
    { duration: '5m', target: 10 },  // Stay at 10 users
    { duration: '2m', target: 30 },  // Ramp up to 30 users
    { duration: '5m', target: 30 },  // Stay at 30 users
    { duration: '2m', target: 0 },   // Ramp down to 0
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000', 'p(99)<3000'],
    http_req_failed: ['rate<0.01'],
  },
};

const BASE_URL = 'https://backend.arterilearning.com/api/v1';

export function setup() {
  // Login and get token
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    identifier: __ENV.STUDENT_USERNAME,
    password: __ENV.STUDENT_PASSWORD,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  const token = loginRes.json('token');
  return { token };
}

export default function (data) {
  const headers = {
    'Authorization': `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };

  // Test dashboard
  const dashboardRes = http.get(`${BASE_URL}/elearning/dashboard`, { headers });
  check(dashboardRes, {
    'dashboard status is 200': (r) => r.status === 200,
    'dashboard response time < 2s': (r) => r.timings.duration < 2000,
  });

  sleep(2);

  // Test courses
  const coursesRes = http.get(`${BASE_URL}/elearning/courses`, { headers });
  check(coursesRes, {
    'courses status is 200': (r) => r.status === 200,
    'courses response time < 1s': (r) => r.timings.duration < 1000,
  });

  sleep(3);
}
```

### Stress Test Script

Create `scripts/stress-test.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2m', target: 10 },   // Warm up
    { duration: '5m', target: 50 },   // Ramp to 50
    { duration: '5m', target: 100 },  // Ramp to 100
    { duration: '5m', target: 200 },  // Ramp to 200 (stress)
    { duration: '5m', target: 300 },  // Ramp to 300 (breaking point)
    { duration: '5m', target: 0 },    // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<5000'], // Relaxed threshold for stress
    http_req_failed: ['rate<0.05'],    // Allow 5% error at peak
  },
};

const BASE_URL = 'https://backend.arterilearning.com/api/v1';

export default function () {
  const res = http.get(`${BASE_URL}/`);
  check(res, {
    'status is 200': (r) => r.status === 200,
  });
  sleep(1);
}
```

### Exam Auto-Save Performance Test

Create `scripts/scenarios/exam-autosave-test.js`:

```javascript
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50, // 50 concurrent students taking exam
  duration: '5m',
  thresholds: {
    'http_req_duration{endpoint:autosave}': ['p(95)<1000'], // Auto-save < 1s
    'http_req_failed{endpoint:autosave}': ['rate<0.001'],   // < 0.1% error
  },
};

const BASE_URL = 'https://backend.arterilearning.com/api/v1';

export function setup() {
  // Login and start exam
  const loginRes = http.post(`${BASE_URL}/auth/login`, JSON.stringify({
    identifier: __ENV.STUDENT_USERNAME,
    password: __ENV.STUDENT_PASSWORD,
  }), {
    headers: { 'Content-Type': 'application/json' },
  });

  const token = loginRes.json('token');

  // Start exam
  const examRes = http.post(`${BASE_URL}/elearning/exam/1/start`, null, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  return { token, examId: 1 };
}

export default function (data) {
  const headers = {
    'Authorization': `Bearer ${data.token}`,
    'Content-Type': 'application/json',
  };

  // Simulate answering questions with auto-save
  for (let i = 1; i <= 10; i++) {
    const answerRes = http.post(
      `${BASE_URL}/elearning/exam/${data.examId}/answer`,
      JSON.stringify({
        question_id: i,
        answer: 'A',
      }),
      {
        headers,
        tags: { endpoint: 'autosave' },
      }
    );

    check(answerRes, {
      'auto-save status is 200': (r) => r.status === 200,
      'auto-save response time < 1s': (r) => r.timings.duration < 1000,
    });

    sleep(5); // Simulate thinking time between questions
  }
}
```

## Test Execution

### Run Smoke Test
```bash
cd performance-testing
k6 run scripts/smoke-test.js
```

### Run Load Test with Environment Variables
```bash
k6 run \
  -e STUDENT_USERNAME=student@example.com \
  -e STUDENT_PASSWORD=password123 \
  scripts/load-test.js
```

### Run with HTML Report
```bash
k6 run scripts/load-test.js --out json=reports/load-test.json
k6-reporter reports/load-test.json --output reports/load-test-report.html
```

### Run with InfluxDB + Grafana (Advanced)
```bash
k6 run --out influxdb=http://localhost:8086/k6 scripts/load-test.js
```

## Metrics to Monitor

### k6 Built-in Metrics

| Metric | Description |
|---|---|
| `http_req_duration` | Total request time |
| `http_req_waiting` | Time waiting for response (TTFB) |
| `http_req_connecting` | Time establishing TCP connection |
| `http_req_tls_handshaking` | Time for TLS handshake |
| `http_req_sending` | Time sending data |
| `http_req_receiving` | Time receiving data |
| `http_req_blocked` | Time blocked before request |
| `http_req_failed` | Rate of failed requests |
| `http_reqs` | Total HTTP requests |
| `vus` | Number of active virtual users |
| `vus_max` | Max virtual users |
| `iterations` | Total iterations completed |

### Custom Metrics

```javascript
import { Counter, Trend, Rate } from 'k6/metrics';

const examStartErrors = new Counter('exam_start_errors');
const autosaveTime = new Trend('autosave_duration');
const autosaveFailRate = new Rate('autosave_failures');

// Usage in test
autosaveTime.add(answerRes.timings.duration);
if (answerRes.status !== 200) {
  autosaveFailRate.add(1);
} else {
  autosaveFailRate.add(0);
}
```

## Performance Baseline

### Expected Results (Baseline)

| Endpoint | p50 | p95 | p99 | Error Rate |
|---|---|---|---|---|
| `GET /` | 200ms | 500ms | 800ms | 0% |
| `POST /auth/login` | 300ms | 800ms | 1.2s | 0% |
| `GET /elearning/dashboard` | 400ms | 1s | 1.5s | 0% |
| `GET /elearning/courses` | 300ms | 800ms | 1.2s | 0% |
| `POST /elearning/exam/{id}/answer` | 200ms | 600ms | 1s | < 0.1% |
| `GET /teacher/dashboard/exam/{id}/stats` | 800ms | 2s | 3s | 0% |

**Note:** Baseline will be established after first test execution.

## Current Status

**Status:** ⚠️ Scripts defined, awaiting execution

| Metric | Value |
|---|---:|
| Test Scripts Created | 0 |
| Smoke Tests Executed | 0 |
| Load Tests Executed | 0 |
| Stress Tests Executed | 0 |
| Performance Baseline | Not established |

## Blockers

1. **Test Credentials Required:**
   - Student account for authenticated endpoint testing
   - Admin account for admin endpoint testing

2. **Test Data Required:**
   - Valid exam ID for exam flow testing
   - Valid course ID for course flow testing

## Next Steps

1. ✅ Define test strategy and scripts
2. ⏳ Install k6
3. ⏳ Create smoke test script
4. ⏳ Create load test script
5. ⏳ Create stress test script
6. ⏳ Create exam auto-save performance test
7. ⏳ Execute tests and establish baseline
8. ⏳ Generate reports and document findings

## Evidence Location

- **Test Scripts:** `scripts/`
- **Test Reports:** `reports/`
- **Performance Baseline:** `reports/baseline.md`

---

**Prepared by:** Irza Dzulhika  
**Last Updated:** 2026-05-14
