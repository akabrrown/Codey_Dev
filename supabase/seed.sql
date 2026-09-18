-- Codey Dev — Comprehensive Seed Data
-- Run this once from the Supabase SQL editor after migrations.

BEGIN;

-- ── Services ─────────────────────────────────────────────────────────────────

INSERT INTO services (id, name, slug, description, base_price_min, base_price_max, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000006', 'Website Development (Production)',   'web-design-prod',     'Modern websites for businesses, e-commerce stores, schools, NGOs, and corporate organisations.', 2000,  8000,  1),
  ('a1000000-0000-0000-0000-000000000007', 'Website Development (Student Project)', 'web-design-student', 'Informational websites, e-commerce stores, booking systems, or dashboards for student defenses.', 2000,  8000,  2),
  ('a1000000-0000-0000-0000-000000000008', 'Custom Software Development (Production)', 'custom-software-prod', 'POS systems, inventory management, HR systems, school portals, and bespoke ERP solutions.', 8000,  20000, 3),
  ('a1000000-0000-0000-0000-000000000009', 'Custom Software Development (Student Project)', 'custom-software-student', 'Inventory, HR, School Management, or bespoke systems for student defenses.', 8000,  20000, 4),
  ('a1000000-0000-0000-0000-000000000010', 'Mobile App Development (Production)',      'mobile-app-prod',      'iOS and Android apps for startups, commerce, deliveries, and enterprise field teams.', 6000,  18000, 5),
  ('a1000000-0000-0000-0000-000000000011', 'Mobile App Development (Student Project)', 'mobile-app-student', 'Mobile apps for academic projects, featuring user accounts, notifications, and media uploads.', 6000,  18000, 6),
  ('a1000000-0000-0000-0000-000000000004', 'Website Maintenance',         'maintenance',     'Updates, security patches, content changes, and performance checks for existing websites.', 500,   2000,  7),
  ('a1000000-0000-0000-0000-000000000005', 'SEO Services',                'seo',             'On-page SEO, keyword research, Google Business setup, and monthly reporting.', 1000,  4000,  8)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug,
  description = EXCLUDED.description,
  base_price_min = EXCLUDED.base_price_min,
  base_price_max = EXCLUDED.base_price_max,
  sort_order = EXCLUDED.sort_order;

-- ── Options ────────────────────────────────────────────────────────

INSERT INTO service_options (id, service_id, label, option_type, price_impact, is_multiplier, multiplier_value, helper_text, sort_order) VALUES
  ('opt-wd-stu-sub-1', 'a1000000-0000-0000-0000-000000000007', 'Informational Website', 'subtype', 0, false, null, 'About a topic or organization, mostly static pages.', 1),
  ('opt-wd-stu-sub-2', 'a1000000-0000-0000-0000-000000000007', 'Web Application with User Accounts', 'subtype', 0, false, null, 'Interactive system with login and data management.', 2),
  ('opt-wd-stu-sub-3', 'a1000000-0000-0000-0000-000000000007', 'E-commerce / Online Store', 'subtype', 0, false, null, 'Product catalog, cart, and simulated checkout.', 3),
  ('opt-wd-stu-sub-4', 'a1000000-0000-0000-0000-000000000007', 'Booking / Reservation System', 'subtype', 0, false, null, 'Calendar schedules for appointments or bookings.', 4),
  ('opt-wd-stu-sub-5', 'a1000000-0000-0000-0000-000000000007', 'Dashboard / Admin System', 'subtype', 0, false, null, 'Data management and reporting interface.', 5),
  ('opt-wd-stu-feat-1', 'a1000000-0000-0000-0000-000000000007', 'User Registration & Login', 'feature', 0, false, null, 'Secure authentication for users.', 10),
  ('opt-wd-stu-feat-2', 'a1000000-0000-0000-0000-000000000007', 'Role-Based Access (Admin vs User)', 'feature', 0, false, null, 'Different permissions based on user role.', 11),
  ('opt-wd-stu-feat-3', 'a1000000-0000-0000-0000-000000000007', 'Search & Filtering', 'feature', 0, false, null, 'Search through records or products.', 12),
  ('opt-wd-stu-feat-4', 'a1000000-0000-0000-0000-000000000007', 'File Uploads (Documents/Images)', 'feature', 0, false, null, 'Allow users to upload media or files.', 13),
  ('opt-wd-stu-feat-5', 'a1000000-0000-0000-0000-000000000007', 'Notifications (Email/In-App)', 'feature', 0, false, null, 'Alerts for system events.', 14),
  ('opt-wd-stu-feat-6', 'a1000000-0000-0000-0000-000000000007', 'Reports & Analytics', 'feature', 0, false, null, 'Charts and data summaries.', 15),
  ('opt-wd-stu-feat-7', 'a1000000-0000-0000-0000-000000000007', 'Payment Processing (MoMo/Paystack)', 'feature', 0, false, null, 'Simulated or live payment gateway integration.', 16),
  ('opt-wd-stu-time-1', 'a1000000-0000-0000-0000-000000000007', 'Standard Academic Timeline', 'timeline', 0, false, null, 'Delivered in time for standard defense dates.', 50),
  ('opt-cs-stu-sub-1', 'a1000000-0000-0000-0000-000000000009', 'Inventory Management System', 'subtype', 0, false, null, 'Stock tracking and supply chain management.', 1),
  ('opt-cs-stu-sub-2', 'a1000000-0000-0000-0000-000000000009', 'School Management System', 'subtype', 0, false, null, 'Student records, grading, and administration.', 2),
  ('opt-cs-stu-sub-3', 'a1000000-0000-0000-0000-000000000009', 'HR & Payroll System', 'subtype', 0, false, null, 'Employee records and salary calculations.', 3),
  ('opt-cs-stu-sub-4', 'a1000000-0000-0000-0000-000000000009', 'Hospital/Clinic Management System', 'subtype', 0, false, null, 'Patient records and appointments.', 4),
  ('opt-cs-stu-sub-5', 'a1000000-0000-0000-0000-000000000009', 'POS & Retail System', 'subtype', 0, false, null, 'Sales processing and receipts.', 5),
  ('opt-cs-stu-feat-1', 'a1000000-0000-0000-0000-000000000009', 'User Registration & Login', 'feature', 0, false, null, 'Secure authentication for users.', 10),
  ('opt-cs-stu-feat-2', 'a1000000-0000-0000-0000-000000000009', 'Role-Based Access (Admin vs User)', 'feature', 0, false, null, 'Different permissions based on user role.', 11),
  ('opt-cs-stu-feat-3', 'a1000000-0000-0000-0000-000000000009', 'Search & Filtering', 'feature', 0, false, null, 'Search through records or products.', 12),
  ('opt-cs-stu-feat-4', 'a1000000-0000-0000-0000-000000000009', 'File Uploads (Documents/Images)', 'feature', 0, false, null, 'Allow users to upload media or files.', 13),
  ('opt-cs-stu-feat-5', 'a1000000-0000-0000-0000-000000000009', 'Notifications (Email/In-App)', 'feature', 0, false, null, 'Alerts for system events.', 14),
  ('opt-cs-stu-feat-6', 'a1000000-0000-0000-0000-000000000009', 'Reports & Analytics', 'feature', 0, false, null, 'Charts and data summaries.', 15),
  ('opt-cs-stu-time-1', 'a1000000-0000-0000-0000-000000000009', 'Standard Academic Timeline', 'timeline', 0, false, null, 'Delivered in time for standard defense dates.', 50),
  ('opt-ma-stu-sub-1', 'a1000000-0000-0000-0000-000000000011', 'Android App (Java/Kotlin)', 'subtype', 0, false, null, 'Native Android application.', 1),
  ('opt-ma-stu-sub-2', 'a1000000-0000-0000-0000-000000000011', 'Cross-Platform App (Flutter/React Native)', 'subtype', 0, false, null, 'Runs on both Android and iOS.', 2),
  ('opt-ma-stu-sub-3', 'a1000000-0000-0000-0000-000000000011', 'iOS App', 'subtype', 0, false, null, 'Native iOS application.', 3),
  ('opt-ma-stu-feat-1', 'a1000000-0000-0000-0000-000000000011', 'User Authentication', 'feature', 0, false, null, 'Login and Registration functionality.', 10),
  ('opt-ma-stu-feat-2', 'a1000000-0000-0000-0000-000000000011', 'Camera / Image Upload', 'feature', 0, false, null, 'Access device camera or gallery.', 11),
  ('opt-ma-stu-feat-3', 'a1000000-0000-0000-0000-000000000011', 'Push Notifications', 'feature', 0, false, null, 'Firebase or local push notifications.', 12),
  ('opt-ma-stu-feat-4', 'a1000000-0000-0000-0000-000000000011', 'GPS / Location Services', 'feature', 0, false, null, 'Map integration and location tracking.', 13),
  ('opt-ma-stu-feat-5', 'a1000000-0000-0000-0000-000000000011', 'Payment Processing', 'feature', 0, false, null, 'Simulated mobile money or card payments.', 14),
  ('opt-ma-stu-time-1', 'a1000000-0000-0000-0000-000000000011', 'Standard Academic Timeline', 'timeline', 0, false, null, 'Delivered in time for standard defense dates.', 50),
  ('opt-mt-sub-1', 'a1000000-0000-0000-0000-000000000004', 'Monthly Retainer (Basic)', 'subtype', 0, false, null, 'Up to 4 hours of changes per month.', 1),
  ('opt-mt-sub-2', 'a1000000-0000-0000-0000-000000000004', 'Monthly Retainer (Standard)', 'subtype', 500, false, null, 'Up to 8 hours of changes per month.', 2),
  ('opt-mt-sub-3', 'a1000000-0000-0000-0000-000000000004', 'One-off Fix / Update', 'subtype', 0, false, null, 'A specific repair or content change billed once.', 3),
  ('opt-mt-feat-1', 'a1000000-0000-0000-0000-000000000004', 'Security & Plugin Updates', 'feature', 300, false, null, 'Keep your site secure with regular software updates.', 10),
  ('opt-mt-feat-2', 'a1000000-0000-0000-0000-000000000004', 'Performance Optimisation', 'feature', 500, false, null, 'Speed up your site: caching, image compression, and more.', 11),
  ('opt-mt-feat-3', 'a1000000-0000-0000-0000-000000000004', 'Monthly Backup', 'feature', 200, false, null, 'Regular automated backups stored securely off-site.', 12),
  ('opt-mt-feat-4', 'a1000000-0000-0000-0000-000000000004', 'Uptime Monitoring', 'feature', 200, false, null, 'We check your site is online 24/7 and alert you if it goes down.', 13),
  ('opt-mt-time-1', 'a1000000-0000-0000-0000-000000000004', 'Standard Timeline', 'timeline', 0, false, null, 'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('opt-mt-time-2', 'a1000000-0000-0000-0000-000000000004', 'Rush Timeline', 'timeline', 0, true, '1.25', 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51),
  ('opt-seo-sub-1', 'a1000000-0000-0000-0000-000000000005', 'One-off SEO Audit', 'subtype', 0, false, null, 'A report on what is holding your site back in search results.', 1),
  ('opt-seo-sub-2', 'a1000000-0000-0000-0000-000000000005', 'Monthly SEO Management', 'subtype', 0, false, null, 'Ongoing optimisation, content updates, and monthly ranking reports.', 2),
  ('opt-seo-feat-1', 'a1000000-0000-0000-0000-000000000005', 'Keyword Research', 'feature', 500, false, null, 'Find the exact words your customers search for.', 10),
  ('opt-seo-feat-2', 'a1000000-0000-0000-0000-000000000005', 'On-page Optimisation', 'feature', 800, false, null, 'Fix titles, descriptions, headings, and content structure.', 11),
  ('opt-seo-feat-3', 'a1000000-0000-0000-0000-000000000005', 'Google Business Profile Setup', 'feature', 400, false, null, 'Get your business on Google Maps and search results.', 12),
  ('opt-seo-feat-4', 'a1000000-0000-0000-0000-000000000005', 'Monthly Ranking Reports', 'feature', 500, false, null, 'See where your site ranks each month and what is improving.', 13),
  ('opt-seo-feat-5', 'a1000000-0000-0000-0000-000000000005', 'Backlink Building', 'feature', 1200, false, null, 'Earn links from other websites to boost your authority.', 14),
  ('opt-seo-feat-6', 'a1000000-0000-0000-0000-000000000005', 'Local SEO (Ghana-focused)', 'feature', 800, false, null, 'Optimise for local searches in your city or region.', 15),
  ('opt-seo-time-1', 'a1000000-0000-0000-0000-000000000005', 'Standard Timeline', 'timeline', 0, false, null, 'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('opt-seo-time-2', 'a1000000-0000-0000-0000-000000000005', 'Rush Timeline', 'timeline', 0, true, '1.25', 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51)
ON CONFLICT (id) DO UPDATE SET
  service_id = EXCLUDED.service_id,
  label = EXCLUDED.label,
  option_type = EXCLUDED.option_type,
  price_impact = EXCLUDED.price_impact,
  is_multiplier = EXCLUDED.is_multiplier,
  multiplier_value = EXCLUDED.multiplier_value,
  helper_text = EXCLUDED.helper_text,
  sort_order = EXCLUDED.sort_order;

-- Clean up the old services that were removed
DELETE FROM services WHERE id IN (
  'a1000000-0000-0000-0000-000000000001', 
  'a1000000-0000-0000-0000-000000000002', 
  'a1000000-0000-0000-0000-000000000003'
);

COMMIT;
