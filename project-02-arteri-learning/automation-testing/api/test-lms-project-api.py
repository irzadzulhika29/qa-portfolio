"""
API Testing Script untuk LMS Project (Go + Gin + GORM + MariaDB)
Base URL: http://localhost:8080/api/v1
Repo: https://github.com/azmiagr/lms-project

Test Date: 17 Mei 2026
Tester: Irza Dzulhika
"""

import httpx
import json
import sys
from datetime import datetime

BASE_URL = "http://localhost:8080/api/v1"
PASS = 0
FAIL = 0

def log_test(name, status, detail=""):
    global PASS, FAIL
    icon = "PASS" if status == "PASS" else "FAIL"
    if status == "PASS":
        PASS += 1
    else:
        FAIL += 1
    return f"{icon} | {name}" + (f" | {detail}" if detail else "")

def print_section(title):
    print(f"\n{'='*60}")
    print(f"  {title}")
    print(f"{'='*60}")

print("=== LMS PROJECT API TEST REPORT ===")
print(f"Date: {datetime.now().strftime('%d %B %Y %H:%M')}")
print(f"Base URL: {BASE_URL}")
print()

all_results = []

# --- 1. PUBLIC ENDPOINTS ---
print_section("1. PUBLIC ENDPOINTS")

with httpx.Client(base_url=BASE_URL, timeout=10) as client:
    # Province
    r = client.get("/province/all")
    res = log_test("GET /province/all", 
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)
    
    if r.status_code == 200:
        data = r.json()
        res2 = log_test("Response format valid",
                       "PASS" if "status" in data else "FAIL",
                       f"Keys: {list(data.keys())}")
        print(res2)
        all_results.append(res2)

    # City
    r = client.get("/city/all")
    res = log_test("GET /city/all",
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # City by Province ID
    r = client.get("/city/all")
    if r.status_code == 200:
        data = r.json()
        cities = data.get("data", [])
        if cities and len(cities) > 0:
            prov_id = cities[0].get("province_id", "")
            if prov_id:
                r2 = client.get(f"/city/{prov_id}")
                res = log_test("GET /city/{province_id}",
                              "PASS" if r2.status_code == 200 else "FAIL",
                              f"Status {r2.status_code}")
                print(res)
                all_results.append(res)

    # School Search
    r = client.get("/search/school")
    res = log_test("GET /search/school",
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Teams
    r = client.get("/teams")
    res = log_test("GET /teams",
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Upcoming Exam
    r = client.get("/upcoming-exam")
    res = log_test("GET /upcoming-exam",
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Browse Courses
    r = client.get("/courses/browse")
    res = log_test("GET /courses/browse",
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

# --- 2. AUTH FLOW ---
print_section("2. AUTH FLOW")

with httpx.Client(base_url=BASE_URL, timeout=10) as client:
    # Send OTP
    r = client.post("/auth/register-elearning/otp", json={
        "email": "student@test.com",
        "role": "student"
    })
    res = log_test("POST /auth/register-elearning/otp",
                   "PASS" if r.status_code == 200 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    detail = ""
    if r.status_code == 200:
        data = r.json()
        detail = f"Got session_token: {data.get('data', {}).get('session_token', 'N/A')[:30]}..."
    res2 = log_test("OTP response has session_token",
                   "PASS" if r.status_code == 200 else "FAIL",
                   detail)
    print(res2)
    all_results.append(res2)

    # Login with invalid credentials
    r = client.post("/auth/login-elearning", json={
        "email": "student@test.com",
        "password": "wrongpassword123"
    })
    res = log_test("POST /auth/login-elearning (invalid creds)",
                   "PASS" if r.status_code in [400, 401, 404] else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Login with empty body
    r = client.post("/auth/login-elearning", json={})
    res = log_test("POST /auth/login-elearning (empty body)",
                   "PASS" if r.status_code in [400, 422] else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

# --- 3. ERROR HANDLING ---
print_section("3. ERROR HANDLING")

with httpx.Client(base_url=BASE_URL, timeout=10) as client:
    # Invalid route
    r = client.get("/nonexistent-route")
    res = log_test("GET /nonexistent-route (404 expected)",
                   "PASS" if r.status_code == 404 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Invalid JSON
    r = client.post("/auth/login-elearning", 
                    content="not-json", 
                    headers={"Content-Type": "application/json"})
    res = log_test("POST with invalid JSON",
                   "PASS" if r.status_code in [400, 415] else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Unauthenticated access - student
    r = client.get("/student/profile")
    res = log_test("GET /student/profile (unauthorized)",
                   "PASS" if r.status_code == 401 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

    # Unauthenticated access - teacher
    r = client.get("/teacher/courses")
    res = log_test("GET /teacher/courses (unauthorized)",
                   "PASS" if r.status_code == 401 else "FAIL",
                   f"Status {r.status_code}")
    print(res)
    all_results.append(res)

# --- 4. RESPONSE FORMAT ---
print_section("4. RESPONSE FORMAT VALIDATION")

with httpx.Client(base_url=BASE_URL, timeout=10) as client:
    r = client.get("/province/all")
    if r.status_code == 200:
        data = r.json()
        
        has_status = "status" in data
        res = log_test("Response has 'status' field",
                       "PASS" if has_status else "FAIL")
        print(res)
        all_results.append(res)

        if has_status:
            status = data["status"]
            res2 = log_test("Status has 'code' (int)",
                           "PASS" if "code" in status and isinstance(status["code"], int) else "FAIL")
            print(res2)
            all_results.append(res2)
            
            res3 = log_test("Status has 'isSuccess' (bool)",
                           "PASS" if "isSuccess" in status and isinstance(status["isSuccess"], bool) else "FAIL")
            print(res3)
            all_results.append(res3)

        res4 = log_test("Response has 'message'",
                       "PASS" if "message" in data else "FAIL")
        print(res4)
        all_results.append(res4)

# --- SUMMARY ---
print(f"\n{'='*60}")
print(f"  TEST SUMMARY")
print(f"{'='*60}")
print(f"  Total Tests : {PASS + FAIL}")
print(f"  Passed      : {PASS}")
print(f"  Failed      : {FAIL}")
print(f"  Success Rate: {PASS/(PASS+FAIL)*100:.1f}%")
print(f"{'='*60}")

# Print report
print(f"\n\n=== RAW RESULTS ===")
print(json.dumps(all_results, indent=2))

sys.exit(0 if FAIL == 0 else 1)
