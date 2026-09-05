-- Codey Dev — Comprehensive Seed Data
-- Run this once from the Supabase SQL editor after migrations.
-- All options are categorized cleanly for Web Design, Custom Software, Mobile Apps, Maintenance, and SEO.

BEGIN;

-- ── Services ─────────────────────────────────────────────────────────────────

INSERT INTO services (id, name, slug, description, base_price_min, base_price_max, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Web Design & Development',   'web-design',     'Modern websites for businesses, e-commerce stores, schools, NGOs, and corporate organisations.', 2000,  8000,  1),
  ('a1000000-0000-0000-0000-000000000002', 'Custom Software Development', 'custom-software', 'POS systems, inventory management, HR systems, school portals, and bespoke ERP solutions.', 8000,  20000, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Mobile App Development',      'mobile-app',      'iOS and Android apps for startups, commerce, deliveries, and enterprise field teams.', 6000,  18000, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Website Maintenance',         'maintenance',     'Updates, security patches, content changes, and performance checks for existing websites.', 500,   2000,  4),
  ('a1000000-0000-0000-0000-000000000005', 'SEO Services',                'seo',             'On-page SEO, keyword research, Google Business setup, and monthly reporting.', 1000,  4000,  5);

-- ── Web Design Options ────────────────────────────────────────────────────────

-- Sub-types
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'Business & Corporate Website',        'subtype', 0,    'A high-conversion website for companies, consulting firms, agencies, and clinics.',                  1),
  ('b1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'E-commerce & Online Store',           'subtype', 3000, 'A full online storefront with product catalog, cart, checkout, and online payment processing.', 2),
  ('b1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'School / NGO / Institutional Portal', 'subtype', 1000, 'Multi-page portals with event pages, donation facilities, or student hubs.',                 3),
  ('b1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000001', 'Portfolio & Creative Showcase',       'subtype', 0,    'A visual showcase designed for creatives, photographers, architects, and designers.',                 4);

-- Pages
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000001', '1–5 Core Pages (Home, About, Services, Contact, etc.)', 'page', 0,    'Essential pages to launch your online presence.',                    10),
  ('b1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000001', '6–10 Pages (Portfolio, Team, FAQs, Gallery, etc.)',   'page', 1200, 'Ideal for growing businesses requiring detailed content sections.',    11),
  ('b1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000001', '11–20 Pages (Comprehensive Multi-Department Portal)',  'page', 2800, 'Large websites with extensive service listings, blogs, and resources.', 12),
  ('b1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000001', '20+ Enterprise / Directory Pages',                    'page', 5000, 'Enterprise scale sites with extensive database content.',               13),
  ('b1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000001', 'Product Catalog / Shop Layout',                        'page', 1000, 'Dedicated shop page with product grids and category navigation.',       14),
  ('b1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000001', 'Online Booking & Appointment Page',                   'page', 1200, 'Calendar schedule page for clients to book sessions.',                  15),
  ('b1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000001', 'Donation & Giving Portal Page',                       'page', 800,  'Secure donation collection page with preset amounts.',                  16),
  ('b1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000001', 'Event Calendar & Registration Page',                   'page', 800,  'Event listings with online RSVP and ticket reservations.',              17),
  ('b1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000001', 'Careers & Job Board Page',                            'page', 600,  'Job vacancy listings with resume submission forms.',                    18),
  ('b1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000001', 'Client / Member Login Dashboard',                      'page', 1500, 'Password-protected portal area for registered users.',                 19);

-- Features
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000020', 'a1000000-0000-0000-0000-000000000001', 'Contact & Lead Capture Form',                  'feature', 300,  'Custom enquiry forms delivered directly to your email.',               20),
  ('b1000000-0000-0000-0000-000000000021', 'a1000000-0000-0000-0000-000000000001', 'Blog / News Publishing System',                     'feature', 800,  'Publish regular articles, news, and guides.',                          21),
  ('b1000000-0000-0000-0000-000000000022', 'a1000000-0000-0000-0000-000000000001', 'Admin Content Management System (CMS)',               'feature', 1500, 'Update site text, photos, and services without code.',                 22),
  ('b1000000-0000-0000-0000-000000000023', 'a1000000-0000-0000-0000-000000000001', 'Interactive Search & Product Filtering',              'feature', 1000, 'Instant search with category and price filters.',                      23),
  ('b1000000-0000-0000-0000-000000000024', 'a1000000-0000-0000-0000-000000000001', 'Customer Reviews & Ratings System',                   'feature', 500,  'Collect and display verified client feedback.',                        24),
  ('b1000000-0000-0000-0000-000000000025', 'a1000000-0000-0000-0000-000000000001', 'Live Chat Widget',                                     'feature', 400,  'Real-time conversation widget for visitor support.',                   25),
  ('b1000000-0000-0000-0000-000000000026', 'a1000000-0000-0000-0000-000000000001', 'Multi-Language Support (English, French, etc.)',        'feature', 1800, 'Full bilingual or multi-locale site translation.',                     26),
  ('b1000000-0000-0000-0000-000000000027', 'a1000000-0000-0000-0000-000000000001', 'Newsletter & Email Lead Magnet',                       'feature', 500,  'Popup and embedded email subscription forms.',                         27);

-- Integrations
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000001', 'Paystack Payment Gateway (Cards & MoMo)',          'integration', 1200, 'Accept VISA, Mastercard, MTN MoMo, Telecel Cash, and AT Money.',       30),
  ('b1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000001', 'Google Analytics 4 & Meta Pixel',                  'integration', 400,  'Track visitors, conversion events, and ad ROI.',                       31),
  ('b1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000001', 'WhatsApp Floating Business Chat',                  'integration', 200,  'Direct one-tap WhatsApp messaging button.',                            32),
  ('b1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000001', 'Social Media Live Feed (Instagram / TikTok)',          'integration', 600,  'Embed your latest social media posts automatically.',                  33),
  ('b1000000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000001', 'Email Marketing Integration (Mailchimp / Brevo)',    'integration', 800,  'Sync subscriber leads directly with your email campaign tool.',        34),
  ('b1000000-0000-0000-0000-000000000035', 'a1000000-0000-0000-0000-000000000001', 'Google Maps Interactive Embed',                     'integration', 200,  'Interactive map with turn-by-turn directions to your office.',         35);

-- Timeline
INSERT INTO service_options (id, service_id, label, option_type, price_impact, is_multiplier, multiplier_value, helper_text, sort_order) VALUES
  ('b1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000001', 'Standard Timeline', 'timeline', 0, false, null,   'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('b1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000001', 'Rush Timeline',     'timeline', 0, true,  '1.25', 'Priority queue — 25% premium. Faster delivery schedule.',             51);


-- ── Custom Software Options ───────────────────────────────────────────────────

-- Sub-types
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000002', 'Point of Sale (POS) & Retail System',         'subtype', 0, 'Touchscreen sales terminal for retail stores, supermarkets, restaurants, and pharmacies.', 1),
  ('c1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000002', 'Inventory & Warehouse Management',           'subtype', 0, 'Track stock levels, multiple warehouses, suppliers, purchase orders, and audit logs.',    2),
  ('c1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000002', 'School / Academic Management System (SMS)',  'subtype', 0, 'Admissions, grading, fee collection, parent/student portals, and report card generation.', 3),
  ('c1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'HR, Attendance & Payroll Management',          'subtype', 0, 'Staff records, biometric attendance sync, automated payslips, SSNIT and tax calculations.',4),
  ('c1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'Clinic / Pharmacy Management System',          'subtype', 0, 'Patient records, drug dispensary, appointment schedules, and billing.',                    5),
  ('c1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000002', 'Hotel & Hospitality Booking Engine',            'subtype', 0, 'Room reservations, check-in/out, housekeeping status, and guest invoicing.',              6),
  ('c1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000002', 'Custom Enterprise Workflow / ERP System',       'subtype', 0, 'Bespoke operations workflow, CRM, ticketing, or internal approval system.',               7);

-- Modules & Features
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000002', 'Inventory & Real-Time Stock Module',           'feature', 1500, 'Stock tracking, batch numbers, low-stock warnings, and reorder triggers.',               10),
  ('c1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000002', 'Multi-Branch & Multi-Location Sync',          'feature', 2500, 'Manage multiple branches or warehouses from a single unified control center.',             11),
  ('c1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000002', 'Executive Analytics & BI Reporting Dashboard',  'feature', 2000, 'Visual charts, profit/loss statements, sales trends, and KPI summaries.',                  12),
  ('c1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000002', 'Barcode & QR Code Scanner Integration',         'feature', 1200, 'Scan items instantly during checkout and warehouse stock auditing.',                      13),
  ('c1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000002', 'Role-Based Access Control (Admin, Staff, Viewer)','feature', 1000, 'Granular user permissions preventing unauthorized data access.',                           14),
  ('c1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000002', 'Automated Payroll & Tax Calculation',          'feature', 2500, 'Calculate monthly salaries, deductions, allowances, and printable payslips.',              15),
  ('c1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000002', 'Automated SMS & Email Alerts Engine',           'feature', 1200, 'Send instant receipts, payment reminders, and status updates.',                           16),
  ('c1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000002', 'Student & Parent Academic Portal',              'feature', 2500, 'Portal for viewing term results, attendance, and online fee payments.',                    17),
  ('c1000000-0000-0000-0000-000000000018', 'a1000000-0000-0000-0000-000000000002', 'Invoicing & Thermal Receipt Printer Setup',     'feature', 1500, 'Print 80mm/58mm thermal receipts and generate PDF invoices.',                             18),
  ('c1000000-0000-0000-0000-000000000019', 'a1000000-0000-0000-0000-000000000002', 'Audit Trail & System Activity Logging',          'feature', 1200, 'Immutable logs tracking all user logins, edits, cancellations, and sales.',                19);

-- Integrations
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000002', 'Paystack Payment Processing',                   'integration', 1200, 'Accept card and mobile money payments directly in the software.',                       30),
  ('c1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000002', 'Direct MTN / Telecel MoMo API Integration',     'integration', 1500, 'Automated mobile money collection and disbursement.',                                  31),
  ('c1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000002', 'WhatsApp Cloud API & Bulk SMS Gateway',         'integration', 1200, 'Send automated WhatsApp invoices, reminders, and broadcast SMS.',                      32),
  ('c1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000002', 'Accounting Export (Excel / QuickBooks / Xero)', 'integration', 1000, 'One-click export of sales, expenses, and payroll to accounting formats.',               33),
  ('c1000000-0000-0000-0000-000000000034', 'a1000000-0000-0000-0000-000000000002', 'Third-Party REST / Webhook Integration',        'integration', 2000, 'Connect with external systems, logistics partners, or regulatory APIs.',               34);

-- Timeline
INSERT INTO service_options (id, service_id, label, option_type, price_impact, is_multiplier, multiplier_value, helper_text, sort_order) VALUES
  ('c1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000002', 'Standard Timeline', 'timeline', 0, false, null,   'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('c1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000002', 'Rush Timeline',     'timeline', 0, true,  '1.25', 'Priority queue — 25% premium. Accelerated milestone sprints.',        51);


-- ── Mobile App Options ────────────────────────────────────────────────────────

-- Sub-types
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('d1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000003', 'Cross-Platform App (iOS & Android)',          'subtype', 4000, 'Unified modern Flutter / React Native codebase running on both Google Play and Apple App Store.', 1),
  ('d1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000003', 'Android Only (Google Play Store)',              'subtype', 0,    'Optimized for Android smartphones and tablets.',                                           2),
  ('d1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000003', 'iOS Only (Apple App Store)',                  'subtype', 0,    'Optimized for iPhones and iPads.',                                                         3),
  ('d1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000003', 'E-commerce & On-Demand Delivery App',         'subtype', 2000, 'Product catalogs, cart, live order tracking, and rider dispatch.',                        4),
  ('d1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000003', 'Community, Social & Booking App',              'subtype', 1500, 'User profiles, direct messaging, event booking, and member feeds.',                       5),
  ('d1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'Enterprise & Field Staff App',                 'subtype', 1000, 'Field inspections, signature captures, GPS check-ins, and task assignments.',             6);

-- Core Features
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('d1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000003', 'User Authentication (Email, Phone OTP, Social)', 'feature', 1500, 'Sign up, password reset, OTP verification, and profile management.',              10),
  ('d1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000003', 'Push Notifications & In-App Alert Center',       'feature', 1000, 'Targeted push notifications delivered even when app is closed.',                      11),
  ('d1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000003', 'In-App Chat & Direct Messaging',                'feature', 2500, 'Real-time 1-on-1 or group chat with media sharing.',                                  12),
  ('d1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000003', 'Offline-First Mode with Local Sync',              'feature', 2000, 'Allows users to continue work offline; auto-syncs when online.',                      13),
  ('d1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000003', 'Live GPS Navigation & Location Tracking',         'feature', 2000, 'Interactive maps, route calculation, and live coordinate tracking.',                 14),
  ('d1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000003', 'Dedicated Web Admin Management Dashboard',        'feature', 2500, 'Secure web portal to manage app users, content, orders, and analytics.',               15),
  ('d1000000-0000-0000-0000-000000000016', 'a1000000-0000-0000-0000-000000000003', 'Biometric Security (FaceID / Fingerprint)',        'feature', 800,  'Quick, secure biometric authentication.',                                             16),
  ('d1000000-0000-0000-0000-000000000017', 'a1000000-0000-0000-0000-000000000003', 'Camera & In-App Document / QR Scanner',           'feature', 1000, 'Capture and upload photos, scan documents, or verify QR codes.',                      17);

-- Integrations
INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('d1000000-0000-0000-0000-000000000030', 'a1000000-0000-0000-0000-000000000003', 'Paystack / MoMo Mobile In-App Payments',          'integration', 1500, 'Seamless in-app checkout supporting card and Mobile Money.',                     30),
  ('d1000000-0000-0000-0000-000000000031', 'a1000000-0000-0000-0000-000000000003', 'Firebase Cloud Messaging & Realtime DB',          'integration', 1200, 'Reliable Google cloud backend for live events and sync.',                       31),
  ('d1000000-0000-0000-0000-000000000032', 'a1000000-0000-0000-0000-000000000003', 'Google Maps SDK & Geolocation Services',          'integration', 1200, 'Native Google Maps embedding with address autocomplete.',                        32),
  ('d1000000-0000-0000-0000-000000000033', 'a1000000-0000-0000-0000-000000000003', 'Social Login (Google & Apple Sign-In)',           'integration', 800,  'One-tap OAuth sign-in required for iOS App Store approval.',                     33);

-- Timeline
INSERT INTO service_options (id, service_id, label, option_type, price_impact, is_multiplier, multiplier_value, helper_text, sort_order) VALUES
  ('d1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000003', 'Standard Timeline', 'timeline', 0, false, null,   'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('d1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000003', 'Rush Timeline',     'timeline', 0, true,  '1.25', 'Priority queue — 25% premium. Faster development turnaround.',         51);


-- ── Maintenance Options ───────────────────────────────────────────────────────

INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('e1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000004', 'Monthly Retainer (Basic)',       'subtype', 0,   'Up to 4 hours of changes per month.',                                                     1),
  ('e1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000004', 'Monthly Retainer (Standard)',    'subtype', 500, 'Up to 8 hours of changes per month.',                                                     2),
  ('e1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000004', 'One-off Fix / Update',           'subtype', 0,   'A specific repair or content change billed once.',                                        3),
  ('e1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000004', 'Security & Plugin Updates',      'feature', 300, 'Keep your site secure with regular software updates.',                                    10),
  ('e1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000004', 'Performance Optimisation',       'feature', 500, 'Speed up your site: caching, image compression, and more.',                              11),
  ('e1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000004', 'Monthly Backup',                 'feature', 200, 'Regular automated backups stored securely off-site.',                                    12),
  ('e1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000004', 'Uptime Monitoring',              'feature', 200, 'We check your site is online 24/7 and alert you if it goes down.',                      13),
  ('e1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000004', 'Standard Timeline', 'timeline', 0, false, null,   'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('e1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000004', 'Rush Timeline',     'timeline', 0, true,  '1.25', 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.',     51);


-- ── SEO Options ───────────────────────────────────────────────────────────────

INSERT INTO service_options (id, service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('f1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000005', 'One-off SEO Audit',              'subtype', 0,    'A report on what is holding your site back in search results.',                           1),
  ('f1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000005', 'Monthly SEO Management',         'subtype', 0,    'Ongoing optimisation, content updates, and monthly ranking reports.',                     2),
  ('f1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000005', 'Keyword Research',               'feature', 500,  'Find the exact words your customers search for.',                                       10),
  ('f1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000005', 'On-page Optimisation',           'feature', 800,  'Fix titles, descriptions, headings, and content structure.',                            11),
  ('f1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000005', 'Google Business Profile Setup',  'feature', 400,  'Get your business on Google Maps and search results.',                                  12),
  ('f1000000-0000-0000-0000-000000000013', 'a1000000-0000-0000-0000-000000000005', 'Monthly Ranking Reports',        'feature', 500,  'See where your site ranks each month and what is improving.',                           13),
  ('f1000000-0000-0000-0000-000000000014', 'a1000000-0000-0000-0000-000000000005', 'Backlink Building',              'feature', 1200, 'Earn links from other websites to boost your authority.',                               14),
  ('f1000000-0000-0000-0000-000000000015', 'a1000000-0000-0000-0000-000000000005', 'Local SEO (Ghana-focused)',      'feature', 800,  'Optimise for local searches in your city or region.',                                   15),
  ('f1000000-0000-0000-0000-000000000050', 'a1000000-0000-0000-0000-000000000005', 'Standard Timeline', 'timeline', 0, false, null,   'Delivered within the standard timeframe agreed at project kick-off.', 50),
  ('f1000000-0000-0000-0000-000000000051', 'a1000000-0000-0000-0000-000000000005', 'Rush Timeline',     'timeline', 0, true,  '1.25', 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.',     51);

COMMIT;
