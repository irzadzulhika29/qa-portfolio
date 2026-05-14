# Security Basic Testing Checklist

| ID | Area | Test | Expected Result | Status | Evidence |
|---|---|---|---|---|---|
| SEC-001 | Authentication | Access student route without login | Redirect to login or unauthorized response | Not Run | TBD |
| SEC-002 | Authentication | Access protected API without token | API returns unauthorized response | Not Run | TBD |
| SEC-003 | Authorization | Student accesses admin page directly | Access denied or redirected safely | Not Run | TBD |
| SEC-004 | Authorization | Student token calls admin mutation endpoint | API forbids action | Not Run | TBD |
| SEC-005 | CBT Integrity | Start exam without camera permission | Exam start is blocked | Not Run | TBD |
| SEC-006 | CBT Integrity | Start exam without fullscreen | Exam start is blocked | Not Run | TBD |
| SEC-007 | IDOR Basic | Access another student's note or attempt by changing identifier | Access is denied | Not Run | TBD |
| SEC-008 | File Upload | Upload unsupported file in participant bulk or exam image flow | File is rejected safely | Not Run | TBD |
| SEC-009 | Session | Reopen protected page after logout | Session is invalidated and access is blocked | Not Run | TBD |
| SEC-010 | Error Handling | Trigger invalid request or server error | No stack trace or sensitive data exposed | Not Run | TBD |
