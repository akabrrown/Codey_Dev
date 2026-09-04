-- Codey Dev — Seed Data
-- Run this once from the Supabase SQL editor after migrations.
-- Review and adjust all price_impact values against the current Pricing List before going live.

BEGIN;

-- ── Services ─────────────────────────────────────────────────────────────────

INSERT INTO services (id, name, slug, description, base_price_min, base_price_max, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Web Design & Development',   'web-design',     'Websites for businesses, e-commerce stores, schools, NGOs, and corporate organisations.', 2000,  8000,  1),
  ('a1000000-0000-0000-0000-000000000002', 'Custom Software Development', 'custom-software', 'POS systems, inventory management, HR systems, school management, and bespoke tools.', 8000,  20000, 2),
  ('a1000000-0000-0000-0000-000000000003', 'Mobile App Development',      'mobile-app',      'Android and iOS apps for businesses and startups.', 6000,  18000, 3),
  ('a1000000-0000-0000-0000-000000000004', 'Website Maintenance',         'maintenance',     'Updates, security patches, content changes, and performance checks for existing websites.', 500,   2000,  4),
  ('a1000000-0000-0000-0000-000000000005', 'SEO Services',                'seo',             'On-page SEO, keyword research, Google Business setup, and monthly reporting.', 1000,  4000,  5);

-- ── Web Design Options ────────────────────────────────────────────────────────

-- Sub-types (single-select — option_type=subtype, price_impact=0, used only for routing)
INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Business Website',               'subtype', 0,    'A professional website for your company: about, services, contact, and more.',                  1),
  ('a1000000-0000-0000-0000-000000000001', 'E-commerce / Online Store',      'subtype', 3000, 'A full online shop where customers can browse products and pay online.',                         2),
  ('a1000000-0000-0000-0000-000000000001', 'School / NGO / Corporate',       'subtype', 1000, 'Multi-page sites with portals, event pages, or donation features.',                             3);

-- Pages (additive)
INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', '1–5 Pages',   'page', 0,    'Covers Home, About, Services, Contact, and one more.',    10),
  ('a1000000-0000-0000-0000-000000000001', '6–10 Pages',  'page', 1200, 'Portfolio, Gallery, FAQ, Blog, or additional content.',   11),
  ('a1000000-0000-0000-0000-000000000001', '11–20 Pages', 'page', 2800, 'Large sites with multiple content sections or a blog.',   12),
  ('a1000000-0000-0000-0000-000000000001', '20+ Pages',   'page', 5000, 'Enterprise or directory-style sites.',                    13);

-- Features
INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Contact / Enquiry Form',        'feature', 300,  'A form customers can fill in to reach you.',                                               20),
  ('a1000000-0000-0000-0000-000000000001', 'Blog / News Section',           'feature', 800,  'A section where you can publish articles and news.',                                       21),
  ('a1000000-0000-0000-0000-000000000001', 'Booking / Appointment System',  'feature', 2000, 'Online booking calendar where clients can schedule appointments.',                         22),
  ('a1000000-0000-0000-0000-000000000001', 'Admin / CMS Panel',             'feature', 1500, 'A login area where you can update content without a developer.',                           23),
  ('a1000000-0000-0000-0000-000000000001', 'Photo / Portfolio Gallery',     'feature', 500,  'A visual grid or slideshow of your work or products.',                                     24),
  ('a1000000-0000-0000-0000-000000000001', 'Live Chat Widget',              'feature', 400,  'A chat window so visitors can message you directly.',                                      25),
  ('a1000000-0000-0000-0000-000000000001', 'Multi-language Support',        'feature', 1800, 'Your site in two or more languages (e.g. English and French).',                            26);

-- Integrations
INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Paystack Payment Integration',  'integration', 1200, 'Accept card and mobile money payments on your site via Paystack.',                    30),
  ('a1000000-0000-0000-0000-000000000001', 'Google Analytics',              'integration', 300,  'Track how many people visit your site and what they click.',                           31),
  ('a1000000-0000-0000-0000-000000000001', 'WhatsApp Chat Button',          'integration', 200,  'A floating WhatsApp button that opens a chat with you directly.',                     32),
  ('a1000000-0000-0000-0000-000000000001', 'Social Media Feed Integration', 'integration', 600,  'Show your latest Instagram or Facebook posts on your website.',                       33),
  ('a1000000-0000-0000-0000-000000000001', 'Email Marketing (Mailchimp)',   'integration', 800,  'Connect a newsletter sign-up form to your Mailchimp account.',                        34),
  ('a1000000-0000-0000-0000-000000000001', 'Google Maps Embed',             'integration', 200,  'A map showing your business location.',                                               35);

-- ── Custom Software Options ───────────────────────────────────────────────────

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000002', 'POS System',                    'subtype', 0,    'A point-of-sale system for retail shops, restaurants, or service businesses.',             1),
  ('a1000000-0000-0000-0000-000000000002', 'Inventory Management',          'subtype', 0,    'Track stock levels, suppliers, purchase orders, and sales.',                               2),
  ('a1000000-0000-0000-0000-000000000002', 'HR Management System',          'subtype', 0,    'Manage staff records, attendance, payroll, and leave.',                                    3),
  ('a1000000-0000-0000-0000-000000000002', 'School Management System',      'subtype', 0,    'Student records, class scheduling, fees, results, and parent portals.',                    4),
  ('a1000000-0000-0000-0000-000000000002', 'Other / Custom',                'subtype', 0,    'Describe your needs in the notes field and we will price accordingly.',                   5);

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000002', 'Inventory / Stock Module',      'feature', 1500, 'Track stock in and out, with low-stock alerts.',                                          10),
  ('a1000000-0000-0000-0000-000000000002', 'Multi-branch / Multi-user',     'feature', 2000, 'Separate access and data for multiple locations or staff roles.',                        11),
  ('a1000000-0000-0000-0000-000000000002', 'Reports & Analytics Dashboard', 'feature', 2000, 'Charts and tables showing sales, expenses, attendance, or any key metric.',              12),
  ('a1000000-0000-0000-0000-000000000002', 'Barcode / QR Code Scanner',     'feature', 1200, 'Scan items at checkout or for stock-taking.',                                            13),
  ('a1000000-0000-0000-0000-000000000002', 'User Login & Role Management',  'feature', 1000, 'Different login accounts with different levels of access.',                               14),
  ('a1000000-0000-0000-0000-000000000002', 'Payroll Processing',            'feature', 2500, 'Automated salary calculation including deductions and allowances.',                       15),
  ('a1000000-0000-0000-0000-000000000002', 'SMS / Email Notifications',     'feature', 1000, 'Auto-send alerts to staff, parents, or customers.',                                      16),
  ('a1000000-0000-0000-0000-000000000002', 'Student / Parent Portal',       'feature', 2000, 'A login area for parents or students to check results and fees.',                        17),
  ('a1000000-0000-0000-0000-000000000002', 'Expense Tracking',              'feature', 1000, 'Log and categorize business expenses alongside revenue.',                                 18);

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000002', 'Paystack Integration',          'integration', 1200, 'Accept card and mobile money payments inside the software.',                         20),
  ('a1000000-0000-0000-0000-000000000002', 'MTN / Vodafone MoMo API',       'integration', 1500, 'Direct mobile money collection without leaving your system.',                        21),
  ('a1000000-0000-0000-0000-000000000002', 'WhatsApp / SMS Gateway',        'integration', 1200, 'Automated WhatsApp messages or bulk SMS from inside the system.',                    22),
  ('a1000000-0000-0000-0000-000000000002', 'Third-party API Connection',    'integration', 2000, 'Connect your system to an external service (e.g. tax authority, courier).',          23);

-- ── Mobile App Options ────────────────────────────────────────────────────────

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'Android Only',                  'subtype', 0,    'Published on the Google Play Store.',                                                      1),
  ('a1000000-0000-0000-0000-000000000003', 'iOS Only',                      'subtype', 0,    'Published on the Apple App Store.',                                                        2),
  ('a1000000-0000-0000-0000-000000000003', 'Android & iOS',                 'subtype', 4000, 'A single codebase published on both stores.',                                              3);

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'User Accounts / Login',         'feature', 1200, 'Users can sign up, log in, and manage their profile.',                                   10),
  ('a1000000-0000-0000-0000-000000000003', 'Push Notifications',            'feature', 1000, 'Send alerts to users even when the app is closed.',                                      11),
  ('a1000000-0000-0000-0000-000000000003', 'In-app Chat / Messaging',       'feature', 2500, 'Users can send messages to each other or to your team.',                                 12),
  ('a1000000-0000-0000-0000-000000000003', 'Offline Mode',                  'feature', 2000, 'The app still works without an internet connection.',                                     13),
  ('a1000000-0000-0000-0000-000000000003', 'Maps & Location Services',      'feature', 1500, 'Show maps, track locations, or use GPS features.',                                       14),
  ('a1000000-0000-0000-0000-000000000003', 'Admin Web Panel',               'feature', 2500, 'A web dashboard for you to manage app content and users.',                               15);

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000003', 'Paystack / MoMo Payments',      'integration', 1500, 'Accept payments inside the app.',                                                    20),
  ('a1000000-0000-0000-0000-000000000003', 'Social Login (Google/Facebook)', 'integration', 800, 'Users can sign in with their Google or Facebook account.',                           21),
  ('a1000000-0000-0000-0000-000000000003', 'Firebase / Real-time Database', 'integration', 1200, 'Live data syncing across all users instantly.',                                      22);

-- ── Maintenance Options ───────────────────────────────────────────────────────

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000004', 'Monthly Retainer (Basic)',       'subtype', 0,    'Up to 4 hours of changes per month.',                                                     1),
  ('a1000000-0000-0000-0000-000000000004', 'Monthly Retainer (Standard)',    'subtype', 500,  'Up to 8 hours of changes per month.',                                                     2),
  ('a1000000-0000-0000-0000-000000000004', 'One-off Fix / Update',           'subtype', 0,    'A specific repair or content change billed once.',                                        3);

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000004', 'Security & Plugin Updates',      'feature', 300, 'Keep your site secure with regular software updates.',                                    10),
  ('a1000000-0000-0000-0000-000000000004', 'Performance Optimisation',       'feature', 500, 'Speed up your site: caching, image compression, and more.',                              11),
  ('a1000000-0000-0000-0000-000000000004', 'Monthly Backup',                 'feature', 200, 'Regular automated backups stored securely off-site.',                                    12),
  ('a1000000-0000-0000-0000-000000000004', 'Uptime Monitoring',              'feature', 200, 'We check your site is online 24/7 and alert you if it goes down.',                      13);

-- ── SEO Options ───────────────────────────────────────────────────────────────

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000005', 'One-off SEO Audit',              'subtype', 0,    'A report on what is holding your site back in search results.',                           1),
  ('a1000000-0000-0000-0000-000000000005', 'Monthly SEO Management',         'subtype', 0,    'Ongoing optimisation, content updates, and monthly ranking reports.',                     2);

INSERT INTO service_options (service_id, label, option_type, price_impact, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000005', 'Keyword Research',               'feature', 500,  'Find the exact words your customers search for.',                                       10),
  ('a1000000-0000-0000-0000-000000000005', 'On-page Optimisation',           'feature', 800,  'Fix titles, descriptions, headings, and content structure.',                            11),
  ('a1000000-0000-0000-0000-000000000005', 'Google Business Profile Setup',  'feature', 400,  'Get your business on Google Maps and search results.',                                  12),
  ('a1000000-0000-0000-0000-000000000005', 'Monthly Ranking Reports',        'feature', 500,  'See where your site ranks each month and what is improving.',                           13),
  ('a1000000-0000-0000-0000-000000000005', 'Backlink Building',              'feature', 1200, 'Earn links from other websites to boost your authority.',                               14),
  ('a1000000-0000-0000-0000-000000000005', 'Local SEO (Ghana-focused)',      'feature', 800,  'Optimise for local searches in your city or region.',                                   15);

-- ── Timeline Multipliers (apply to ALL services) ──────────────────────────────

INSERT INTO service_options (service_id, label, option_type, price_impact, is_multiplier, multiplier_value, helper_text, sort_order) VALUES
  ('a1000000-0000-0000-0000-000000000001', 'Standard Timeline', 'timeline', 0, FALSE, NULL, 'Delivered within the standard timeframe agreed at project kick-off.',   50),
  ('a1000000-0000-0000-0000-000000000001', 'Rush Timeline',     'timeline', 0, TRUE,  1.25, 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51),
  ('a1000000-0000-0000-0000-000000000002', 'Standard Timeline', 'timeline', 0, FALSE, NULL, 'Delivered within the standard timeframe agreed at project kick-off.',   50),
  ('a1000000-0000-0000-0000-000000000002', 'Rush Timeline',     'timeline', 0, TRUE,  1.25, 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51),
  ('a1000000-0000-0000-0000-000000000003', 'Standard Timeline', 'timeline', 0, FALSE, NULL, 'Delivered within the standard timeframe agreed at project kick-off.',   50),
  ('a1000000-0000-0000-0000-000000000003', 'Rush Timeline',     'timeline', 0, TRUE,  1.25, 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51),
  ('a1000000-0000-0000-0000-000000000004', 'Standard Timeline', 'timeline', 0, FALSE, NULL, 'Delivered within the standard timeframe agreed at project kick-off.',   50),
  ('a1000000-0000-0000-0000-000000000004', 'Rush Timeline',     'timeline', 0, TRUE,  1.25, 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51),
  ('a1000000-0000-0000-0000-000000000005', 'Standard Timeline', 'timeline', 0, FALSE, NULL, 'Delivered within the standard timeframe agreed at project kick-off.',   50),
  ('a1000000-0000-0000-0000-000000000005', 'Rush Timeline',     'timeline', 0, TRUE,  1.25, 'Priority queue — 25% premium. Faster delivery may reduce revision rounds.', 51);

COMMIT;
