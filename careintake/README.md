# CareIntake Mangaluru

AI-assisted patient case-taking and appointment booking for five Mangaluru hospitals.

## Structure
- `backend/` Flask server: `app.py` (routes, login/OTP security, AI triage, availability rules)
- `frontend/` `templates/` (HTML pages) and `static/` (CSS, JavaScript)
- `database/` `schema.sql` (all tables), the SQLite file, uploaded evidence files, staff accounts

## Run
    pip install -r requirements.txt
    python backend/app.py   # http://127.0.0.1:5000  (Windows: double-click run.bat)

First run creates `database/careintake_v2.db` and `database/staff_accounts.txt` (staff emails only, no passwords). Each doctor and hospital desk sets their own password from Sign in > Set or reset password (email code, then new password).

## Three separate logins
- Patients: the front page `/` (Sign in / Create account tabs, email code verification)
- Doctors and hospital desks: `/admin` (one admin login; the account decides which portal opens, email code on every login)

## Demo logins (testing)
Password for all three: `Demo@1234`. Emails: `patient@gmail.com` (front page), `doctor@gmail.com` and `hospital@gmail.com` (admin login). They sign in without a verification code and are shown on each login page.
Set `DEMO_MODE=0` before going live: demo accounts are removed and the code check applies to everyone.

## Environment variables
- ANTHROPIC_API_KEY: enables real AI triage (otherwise a built-in rules fallback is used). AI_MODEL to change model.
- SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM: send verification codes by email.
- SHOW_OTP=0: hide codes on screen. Default 1 is demo mode, codes also print in the console. Set 0 in production.
- HTTPS=1: secure cookies. SECRET_KEY: override the generated secret.key.

## Security included
Password hashing, 5-attempt lockout for 15 minutes, email OTP (hashed, 5 min, 5 tries), CSRF tokens, 30 minute sessions, role checks on every route,
uploads limited to PDF/PNG/JPG with content check, random file names stored outside static and served only to the patient, their booked doctor and that hospital,
security headers, double-booking blocked by a database constraint, audit log.
For real patient data, deploy behind HTTPS, encrypt the disk/database, and review against India's DPDP Act and your hospital policy.
