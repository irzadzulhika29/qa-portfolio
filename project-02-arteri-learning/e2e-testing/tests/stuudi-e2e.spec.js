// @ts-check
const { test, expect } = require('@playwright/test');

// ============================================
// Test Credentials
// ============================================
const TEACHER = { identifier: 'teacher_porto@test.com', password: 'password123' };
const STUDENT = { identifier: 'student_porto@test.com', password: 'password123' };
const INVALID = { identifier: 'invalid@test.com', password: 'wrongpass' };
const BASE_URL = 'http://localhost:3001';

// ============================================
// 1. AUTH FLOW — Login, Redirect, Error Handling
// ============================================
test.describe('🔐 Auth Flow', () => {

  test('1.1 Login page loads with correct title', async ({ page }) => {
    await page.goto('/login');
    await expect(page).toHaveTitle(/Login - Stuudi/);
    await expect(page.getByRole('heading', { name: /Selamat datang/i })).toBeVisible();
    await expect(page.getByLabel('Username atau Email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Masuk Sekarang' })).toBeVisible();
  });

  test('1.2 Invalid login stays on login page', async ({ page }) => {
    await page.goto('/login');
    await page.waitForSelector('#password');
    await page.getByLabel('Username atau Email').fill(INVALID.identifier);
    await page.locator('#password').fill(INVALID.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();

    // Should stay on login page (not redirect)
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL('/login');
  });

  test('1.3 Empty form submission — no page crash', async ({ page }) => {
    await page.goto('/login');
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    // Should still be on login page, not error
    await expect(page).toHaveURL('/login');
  });

  test('1.4 Teacher login redirects to /dashboard-admin', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();

    // Wait for redirect
    await page.waitForURL('/dashboard-admin', { timeout: 15000 });
    await expect(page).toHaveURL('/dashboard-admin');
  });

  test('1.5 Student login redirects to /dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(STUDENT.identifier);
    await page.locator('#password').fill(STUDENT.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();

    // Wait for redirect
    await page.waitForURL('/dashboard', { timeout: 15000 });
    await expect(page).toHaveURL('/dashboard');
  });
});

// ============================================
// 2. TEACHER DASHBOARD — Layout & Components
// ============================================
test.describe('📊 Teacher Dashboard', () => {

  test('2.1 Dashboard loads with sidebar navigation', async ({ page }) => {
    // Login first
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard-admin', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Sidebar menu items should be visible
    const sidebar = page.locator('nav');
    await expect(sidebar.getByText('Dashboard')).toBeVisible();
    await expect(sidebar.getByText('Courses')).toBeVisible();
    await expect(sidebar.getByText('Participant')).toBeVisible();
  });

  test('2.2 Dashboard page content loads', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard-admin', { timeout: 15000 });

    // Verify we're on the admin dashboard
    await expect(page).toHaveURL('/dashboard-admin');
  });

  test('2.3 Topbar shows user info', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard-admin', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Topbar should show user info
    const topbar = page.locator('header');
    await expect(topbar).toBeVisible();
  });
});

// ============================================
// 3. STUDENT DASHBOARD — Layout & Components
// ============================================
test.describe('🎓 Student Dashboard', () => {

  test('3.1 Student dashboard loads correctly', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(STUDENT.identifier);
    await page.locator('#password').fill(STUDENT.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard', { timeout: 15000 });
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/dashboard');
  });

  test('3.2 Student sidebar has correct menu items', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(STUDENT.identifier);
    await page.locator('#password').fill(STUDENT.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Sidebar links should be present
    await expect(page.getByRole('link', { name: 'Courses' })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('link', { name: /Team/i })).toBeVisible({ timeout: 5000 });
  });
});

// ============================================
// 4. RBAC — Role-Based Access Control
// ============================================
test.describe('🛡️ RBAC Validation', () => {

  test('4.1 Unauthenticated user redirected to login', async ({ page }) => {
    await page.goto('/dashboard-admin');
    await page.waitForURL('**/login**', { timeout: 10000 });
    await expect(page).toHaveURL(/login/);
  });

  test('4.2 Student cannot access teacher dashboard', async ({ page }) => {
    // Student tries to access /dashboard-admin
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(STUDENT.identifier);
    await page.locator('#password').fill(STUDENT.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard', { timeout: 10000 });

    // Try navigating to admin
    await page.goto('/dashboard-admin');
    // Should be redirected back to student dashboard or stay put
    await page.waitForTimeout(2000);
    const currentUrl = page.url();
    expect(currentUrl).not.toContain('/dashboard-admin');
  });

  test('4.3 Teacher redirected from student dashboard', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard-admin', { timeout: 10000 });

    // Try navigating to student dashboard — should be blocked by RoleGuard
    await page.goto('/dashboard', { waitUntil: 'commit', timeout: 5000 }).catch(() => {});
    await page.waitForTimeout(2000);
    // Should be redirected to /dashboard-admin
    expect(page.url()).toContain('/dashboard-admin');
  });
});

// ============================================
// 5. NAVIGATION — Sidebar Links Work
// ============================================
test.describe('🧭 Navigation', () => {

  test('5.1 Navigate to Courses page via sidebar', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard-admin', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Courses' }).click();
    await page.waitForURL(/courses/, { timeout: 10000 });
    await expect(page).toHaveURL(/courses/);
  });

  test('5.2 Navigate to Participant page via sidebar', async ({ page }) => {
    await page.goto('/login');
    await page.getByLabel('Username atau Email').fill(TEACHER.identifier);
    await page.locator('#password').fill(TEACHER.password);
    await page.getByRole('button', { name: 'Masuk Sekarang' }).click();
    await page.waitForURL('/dashboard-admin', { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    await page.getByRole('link', { name: 'Participant' }).click();
    await page.waitForURL(/participant/, { timeout: 10000 });
    await expect(page).toHaveURL(/participant/);
  });
});

// ============================================
// 6. Performance — Basic Page Load
// ============================================
test.describe('⏱️ Page Load Performance', () => {

  test('6.1 Login page loads under 5 seconds', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/login');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000);
  });
});
