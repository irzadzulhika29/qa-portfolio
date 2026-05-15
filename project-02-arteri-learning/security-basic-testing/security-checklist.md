# Security Basic Testing Documentation

## Overview

Basic security testing untuk Arteri Learning Platform mencakup authentication security, authorization (RBAC), input validation, session management, dan common web vulnerabilities (OWASP Top 10 subset).

**Scope:** Basic security checks only, NOT full penetration testing.

## Security Testing Areas

### 1. Authentication Security ⚠️ CRITICAL

#### Test Cases
- ✅ Password complexity requirements
- ✅ Brute force protection (rate limiting)
- ✅ Account lockout after failed attempts
- ✅ Credential stuffing protection
- ✅ Password reset flow security
- ✅ Session token generation (randomness, length)
- ✅ Token expiration and refresh
- ✅ Logout invalidates token
- ✅ Concurrent session handling

#### Tools
- Burp Suite Community
- Postman
- Browser DevTools

---

### 2. Authorization (RBAC) ⚠️ CRITICAL

#### Test Cases
- ✅ Student cannot access teacher/admin endpoints (API)
- ✅ Student cannot access teacher/admin routes (Frontend)
- ✅ Teacher/admin cannot access student-only endpoints
- ✅ Unauthenticated user cannot access protected resources
- ✅ Token tampering detection (modify role claim)
- ✅ Horizontal privilege escalation (access other user's data)
- ✅ Vertical privilege escalation (elevate to admin)
- ✅ Direct object reference (IDOR) on courses, exams, notes

#### Tools
- Postman (manual API testing)
- Burp Suite (intercept and modify requests)
- Browser DevTools (modify localStorage token)

---

### 3. Input Validation ⚠️ HIGH

#### Test Cases
- ✅ SQL Injection on login, search, filters
- ✅ XSS (Cross-Site Scripting) on text inputs (course name, notes, materials)
- ✅ Command Injection on file upload
- ✅ Path Traversal on file download
- ✅ LDAP Injection (if applicable)
- ✅ XML Injection (if applicable)
- ✅ JSON Injection on API requests
- ✅ Integer overflow on numeric inputs (duration, attempts, score)
- ✅ Negative values on positive-only fields
- ✅ Special characters handling

#### Payloads
```
SQL Injection:
' OR '1'='1
'; DROP TABLE users--
1' UNION SELECT NULL--

XSS:
<script>alert('XSS')</script>
<img src=x onerror=alert('XSS')>
<svg onload=alert('XSS')>

Path Traversal:
../../etc/passwd
..\..\windows\system32\config\sam

Command Injection:
; ls -la
| whoami
& ping -c 10 127.0.0.1
```

#### Tools
- Burp Suite (Intruder, Repeater)
- OWASP ZAP
- Manual testing with Postman

---

### 4. Session Management ⚠️ HIGH

#### Test Cases
- ✅ Session token stored securely (HttpOnly, Secure flags)
- ✅ Session timeout after inactivity
- ✅ Session fixation protection
- ✅ Token regeneration after login
- ✅ Token invalidation after logout
- ✅ Token not exposed in URL
- ✅ Token not logged in console/network tab
- ✅ CSRF protection on state-changing operations

#### Tools
- Browser DevTools (Application tab → Cookies/Storage)
- Burp Suite (Session handling rules)

---

### 5. File Upload Security ⚠️ HIGH

#### Test Cases
- ✅ File type validation (whitelist, not blacklist)
- ✅ File size limits enforced
- ✅ Malicious file upload (PHP, JSP, executable)
- ✅ Double extension bypass (image.php.jpg)
- ✅ MIME type validation
- ✅ File content validation (magic bytes)
- ✅ Uploaded files not executable
- ✅ Path traversal in filename
- ✅ Overwrite existing files

#### Payloads
```
Malicious Files:
- shell.php
- webshell.jsp
- malware.exe
- image.php.jpg
- ../../../../etc/passwd.jpg

Large Files:
- 100MB+ file (test size limit)
- Zip bomb (small zip, huge uncompressed)
```

#### Tools
- Burp Suite (modify Content-Type, filename)
- Manual file upload testing

---

### 6. Business Logic Security ⚠️ HIGH

#### Test Cases
- ✅ Exam eligibility bypass (access without code)
- ✅ Exam attempt limit bypass (take exam > max attempts)
- ✅ Exam time limit bypass (submit after duration)
- ✅ Enrollment code reuse (use same code multiple times)
- ✅ Negative score manipulation
- ✅ Answer tampering (modify answer after submit)
- ✅ Leaderboard manipulation
- ✅ Bulk participant upload validation bypass
- ✅ Course deletion with active students
- ✅ Exam deletion with active attempts

#### Tools
- Postman (API manipulation)
- Burp Suite (intercept and modify requests)

---

### 7. API Security ⚠️ HIGH

#### Test Cases
- ✅ API rate limiting (prevent abuse)
- ✅ API authentication required
- ✅ API authorization enforced
- ✅ API error messages don't leak sensitive info
- ✅ API versioning security
- ✅ Mass assignment vulnerability
- ✅ Excessive data exposure
- ✅ Lack of resources & rate limiting
- ✅ Security misconfiguration

#### Tools
- Postman
- Burp Suite
- OWASP ZAP

---

### 8. Client-Side Security ⚠️ MEDIUM

#### Test Cases
- ✅ Sensitive data in localStorage/sessionStorage
- ✅ Sensitive data in console logs
- ✅ Sensitive data in network responses
- ✅ Client-side validation bypass
- ✅ JavaScript obfuscation (if any)
- ✅ Source map exposure
- ✅ API keys in frontend code
- ✅ CORS misconfiguration

#### Tools
- Browser DevTools (Console, Network, Application)
- View Page Source

---

### 9. Information Disclosure ⚠️ MEDIUM

#### Test Cases
- ✅ Verbose error messages (stack traces, DB errors)
- ✅ Directory listing enabled
- ✅ Backup files accessible (.bak, .old, .zip)
- ✅ Git repository exposed (/.git/)
- ✅ Environment files exposed (/.env)
- ✅ API documentation publicly accessible
- ✅ Server version disclosure (headers)
- ✅ Technology stack disclosure

#### Tools
- Browser DevTools (Network tab)
- curl (check response headers)
- Manual URL testing

---

### 10. HTTPS & Transport Security ⚠️ MEDIUM

#### Test Cases
- ✅ HTTPS enforced (no HTTP access)
- ✅ Valid SSL/TLS certificate
- ✅ Strong cipher suites
- ✅ HSTS header present
- ✅ Secure cookie flags (Secure, HttpOnly, SameSite)
- ✅ Mixed content warnings
- ✅ Certificate pinning (mobile apps)

#### Tools
- SSL Labs (https://www.ssllabs.com/ssltest/)
- Browser DevTools (Security tab)
- curl (check headers)

---

## Security Checklist

### Authentication & Authorization
- [ ] Login requires valid credentials
- [ ] Invalid credentials rejected with generic error
- [ ] Brute force protection active (rate limiting)
- [ ] Session token is JWT with role claims
- [ ] Token stored in localStorage and cookie
- [ ] Token expires after inactivity
- [ ] Logout invalidates token
- [ ] Protected routes redirect to login
- [ ] Student cannot access admin routes (frontend)
- [ ] Student cannot access admin endpoints (API)
- [ ] Admin cannot access student-only routes
- [ ] Token tampering detected and rejected
- [ ] IDOR protection on courses, exams, notes

### Input Validation
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized/escaped
- [ ] Command injection blocked
- [ ] Path traversal blocked
- [ ] Special characters handled safely
- [ ] Numeric inputs validated (no negative, no overflow)
- [ ] Required fields enforced
- [ ] Data type validation enforced
- [ ] Length limits enforced

### File Upload
- [ ] File type whitelist enforced
- [ ] File size limits enforced
- [ ] Malicious files rejected
- [ ] Double extension bypass prevented
- [ ] MIME type validated
- [ ] File content validated (magic bytes)
- [ ] Uploaded files not executable
- [ ] Path traversal in filename blocked

### Session Management
- [ ] Session token has HttpOnly flag
- [ ] Session token has Secure flag
- [ ] Session token has SameSite flag
- [ ] Session timeout configured
- [ ] Token regenerated after login
- [ ] Token invalidated after logout
- [ ] Token not exposed in URL
- [ ] CSRF protection on mutations

### API Security
- [ ] API requires authentication
- [ ] API enforces authorization
- [ ] API rate limiting active
- [ ] API error messages don't leak info
- [ ] API validates all inputs
- [ ] API prevents mass assignment
- [ ] API prevents excessive data exposure

### Business Logic
- [ ] Exam eligibility validated
- [ ] Exam attempt limit enforced
- [ ] Exam time limit enforced
- [ ] Enrollment code validated
- [ ] Score manipulation prevented
- [ ] Answer tampering prevented
- [ ] Leaderboard integrity maintained

### Information Disclosure
- [ ] Error messages are generic
- [ ] Stack traces not exposed
- [ ] Directory listing disabled
- [ ] Backup files not accessible
- [ ] .git/ not accessible
- [ ] .env not accessible
- [ ] Server version not disclosed
- [ ] API docs require authentication (if sensitive)

### HTTPS & Transport
- [ ] HTTPS enforced (HTTP redirects to HTTPS)
- [ ] Valid SSL/TLS certificate
- [ ] Strong cipher suites only
- [ ] HSTS header present
- [ ] Secure cookie flags set
- [ ] No mixed content warnings

---

## Test Execution Workflow

### Phase 1: Reconnaissance
1. Identify all endpoints (API docs, frontend routes)
2. Map user roles and permissions
3. Identify input fields and file uploads
4. Identify session management mechanism
5. Check HTTPS configuration

### Phase 2: Authentication & Authorization Testing
1. Test login with valid/invalid credentials
2. Test brute force protection
3. Test token expiration and refresh
4. Test logout behavior
5. Test RBAC on frontend routes
6. Test RBAC on API endpoints
7. Test IDOR on resources
8. Test token tampering

### Phase 3: Input Validation Testing
1. Test SQL injection on all inputs
2. Test XSS on all text inputs
3. Test command injection on file uploads
4. Test path traversal on file operations
5. Test numeric input validation
6. Test special characters handling

### Phase 4: File Upload Testing
1. Test file type validation
2. Test file size limits
3. Test malicious file upload
4. Test double extension bypass
5. Test MIME type validation
6. Test path traversal in filename

### Phase 5: Business Logic Testing
1. Test exam eligibility bypass
2. Test exam attempt limit bypass
3. Test exam time limit bypass
4. Test enrollment code reuse
5. Test score manipulation
6. Test answer tampering

### Phase 6: Session & API Testing
1. Test session token security
2. Test session timeout
3. Test CSRF protection
4. Test API rate limiting
5. Test API error handling
6. Test API mass assignment

### Phase 7: Information Disclosure Testing
1. Test error messages
2. Test directory listing
3. Test backup file access
4. Test .git/ access
5. Test .env access
6. Test server version disclosure

### Phase 8: HTTPS & Transport Testing
1. Test HTTPS enforcement
2. Test SSL/TLS configuration
3. Test HSTS header
4. Test secure cookie flags
5. Test mixed content

---

## Tools Setup

### 1. Burp Suite Community
```bash
# Download from: https://portswigger.net/burp/communitydownload
# Install and configure browser proxy
```

### 2. OWASP ZAP
```bash
# Download from: https://www.zaproxy.org/download/
# Or install via package manager
sudo apt install zaproxy  # Linux
brew install --cask owasp-zap  # macOS
```

### 3. Postman
```bash
# Download from: https://www.postman.com/downloads/
# Or use web version
```

### 4. Browser DevTools
- Chrome DevTools (F12)
- Firefox Developer Tools (F12)

---

## Reporting Template

### Security Finding Template

```markdown
## FINDING-SEC-001: [Vulnerability Title]

**Severity:** Critical / High / Medium / Low  
**Category:** Authentication / Authorization / Input Validation / etc.  
**Status:** Open / Fixed / Accepted Risk  

### Description
[Clear description of the vulnerability]

### Impact
[What can an attacker do? What data is at risk?]

### Steps to Reproduce
1. [Step 1]
2. [Step 2]
3. [Step 3]

### Proof of Concept
[Screenshot, request/response, or code snippet]

### Affected Endpoints/Pages
- `POST /api/v1/auth/login`
- `/dashboard-admin`

### Remediation
[How to fix the vulnerability]

### References
- OWASP: [Link]
- CWE: [Link]
```

---

## Current Status

**Status:** ⚠️ Checklist defined, awaiting execution

| Metric | Value |
|---|---:|
| Security Tests Planned | 100+ |
| Security Tests Executed | 0 |
| Vulnerabilities Found | 0 |
| Critical Findings | 0 |
| High Findings | 0 |
| Medium Findings | 0 |
| Low Findings | 0 |

## Blockers

1. **Test Credentials Required:**
   - Student account for testing student flows
   - Admin account for testing admin flows
   - Multiple accounts for IDOR testing

2. **Test Data Required:**
   - Valid enrollment codes
   - Valid exam codes
   - Sample files for upload testing

## Next Steps

1. ✅ Define security testing checklist
2. ⏳ Install security testing tools (Burp Suite, OWASP ZAP)
3. ⏳ Execute authentication & authorization tests
4. ⏳ Execute input validation tests
5. ⏳ Execute file upload tests
6. ⏳ Execute business logic tests
7. ⏳ Execute session & API tests
8. ⏳ Execute information disclosure tests
9. ⏳ Execute HTTPS & transport tests
10. ⏳ Document findings and create security report

## Evidence Location

- **Security Findings:** `security-findings.md`
- **Test Reports:** `reports/`
- **Screenshots:** `../evidence/security-testing/`
- **Request/Response Logs:** `reports/burp-logs/`

---

**Prepared by:** Irza Dzulhika  
**Last Updated:** 2026-05-14

**Disclaimer:** This is basic security testing only. For production systems, engage professional penetration testers and security auditors.
