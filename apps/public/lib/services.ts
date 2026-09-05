import type { ServiceData } from "./form-context";

export const FALLBACK_SERVICES: ServiceData[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Web Design & Development",
    slug: "web-design",
    description: "Modern websites for businesses, e-commerce stores, schools, NGOs, and corporate organisations.",
    basePriceMin: "2000",
    basePriceMax: "8000",
    options: [
      // Subtypes
      { id: "opt-wd-sub-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Business & Corporate Website", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A high-conversion website for companies, consulting firms, agencies, and clinics.", sortOrder: 1 },
      { id: "opt-wd-sub-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "E-commerce & Online Store", optionType: "subtype", priceImpact: "3000", isMultiplier: false, multiplierValue: null, helperText: "A full online storefront with product catalog, cart, checkout, and online payment processing.", sortOrder: 2 },
      { id: "opt-wd-sub-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "School / NGO / Institutional Portal", optionType: "subtype", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Multi-page portals with event pages, donation facilities, or student hubs.", sortOrder: 3 },
      { id: "opt-wd-sub-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Portfolio & Creative Showcase", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A visual showcase designed for creatives, photographers, architects, and designers.", sortOrder: 4 },

      // Pages
      { id: "opt-wd-page-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "1–5 Core Pages (Home, About, Services, Contact, etc.)", optionType: "page", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Essential pages to launch your online presence.", sortOrder: 10 },
      { id: "opt-wd-page-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "6–10 Pages (Portfolio, Team, FAQs, Gallery, etc.)", optionType: "page", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Ideal for growing businesses requiring detailed content sections.", sortOrder: 11 },
      { id: "opt-wd-page-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "11–20 Pages (Comprehensive Multi-Department Portal)", optionType: "page", priceImpact: "2800", isMultiplier: false, multiplierValue: null, helperText: "Large websites with extensive service listings, blogs, and resources.", sortOrder: 12 },
      { id: "opt-wd-page-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "20+ Enterprise / Directory Pages", optionType: "page", priceImpact: "5000", isMultiplier: false, multiplierValue: null, helperText: "Enterprise scale sites with extensive database content.", sortOrder: 13 },
      { id: "opt-wd-page-5", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Product Catalog / Shop Layout", optionType: "page", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Dedicated shop page with product grids and category navigation.", sortOrder: 14 },
      { id: "opt-wd-page-6", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Online Booking & Appointment Page", optionType: "page", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Calendar schedule page for clients to book sessions.", sortOrder: 15 },
      { id: "opt-wd-page-7", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Donation & Giving Portal Page", optionType: "page", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Secure donation collection page with preset amounts.", sortOrder: 16 },
      { id: "opt-wd-page-8", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Event Calendar & Registration Page", optionType: "page", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Event listings with online RSVP and ticket reservations.", sortOrder: 17 },
      { id: "opt-wd-page-9", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Careers & Job Board Page", optionType: "page", priceImpact: "600", isMultiplier: false, multiplierValue: null, helperText: "Job vacancy listings with resume submission forms.", sortOrder: 18 },
      { id: "opt-wd-page-10", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Client / Member Login Dashboard", optionType: "page", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Password-protected portal area for registered users.", sortOrder: 19 },

      // Features
      { id: "opt-wd-feat-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Contact & Lead Capture Form", optionType: "feature", priceImpact: "300", isMultiplier: false, multiplierValue: null, helperText: "Custom enquiry forms delivered directly to your email.", sortOrder: 20 },
      { id: "opt-wd-feat-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Blog / News Publishing System", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Publish regular articles, news, and guides.", sortOrder: 21 },
      { id: "opt-wd-feat-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Admin Content Management System (CMS)", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Update site text, photos, and services without code.", sortOrder: 22 },
      { id: "opt-wd-feat-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Interactive Search & Product Filtering", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Instant search with category and price filters.", sortOrder: 23 },
      { id: "opt-wd-feat-5", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Customer Reviews & Ratings System", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Collect and display verified client feedback.", sortOrder: 24 },
      { id: "opt-wd-feat-6", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Live Chat Widget", optionType: "feature", priceImpact: "400", isMultiplier: false, multiplierValue: null, helperText: "Real-time conversation widget for visitor support.", sortOrder: 25 },
      { id: "opt-wd-feat-7", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Multi-Language Support (English, French, etc.)", optionType: "feature", priceImpact: "1800", isMultiplier: false, multiplierValue: null, helperText: "Full bilingual or multi-locale site translation.", sortOrder: 26 },
      { id: "opt-wd-feat-8", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Newsletter & Email Lead Magnet", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Popup and embedded email subscription forms.", sortOrder: 27 },

      // Integrations
      { id: "opt-wd-int-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Paystack Payment Gateway (Cards & MoMo)", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Accept VISA, Mastercard, MTN MoMo, Telecel Cash, and AT Money.", sortOrder: 30 },
      { id: "opt-wd-int-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Google Analytics 4 & Meta Pixel", optionType: "integration", priceImpact: "400", isMultiplier: false, multiplierValue: null, helperText: "Track visitors, conversion events, and ad ROI.", sortOrder: 31 },
      { id: "opt-wd-int-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "WhatsApp Floating Business Chat", optionType: "integration", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "Direct one-tap WhatsApp messaging button.", sortOrder: 32 },
      { id: "opt-wd-int-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Social Media Live Feed (Instagram / TikTok)", optionType: "integration", priceImpact: "600", isMultiplier: false, multiplierValue: null, helperText: "Embed your latest social media posts automatically.", sortOrder: 33 },
      { id: "opt-wd-int-5", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Email Marketing Integration (Mailchimp / Brevo)", optionType: "integration", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Sync subscriber leads directly with your email campaign tool.", sortOrder: 34 },
      { id: "opt-wd-int-6", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Google Maps Interactive Embed", optionType: "integration", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "Interactive map with turn-by-turn directions to your office.", sortOrder: 35 },

      // Timeline
      { id: "opt-wd-time-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-wd-time-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery schedule.", sortOrder: 51 },
    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "Custom Software Development",
    slug: "custom-software",
    description: "POS systems, inventory management, HR systems, school portals, and bespoke ERP solutions.",
    basePriceMin: "8000",
    basePriceMax: "20000",
    options: [
      // Subtypes
      { id: "opt-cs-sub-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Point of Sale (POS) & Retail System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Touchscreen sales terminal for retail stores, supermarkets, restaurants, and pharmacies.", sortOrder: 1 },
      { id: "opt-cs-sub-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Inventory & Warehouse Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Track stock levels, multiple warehouses, suppliers, purchase orders, and audit logs.", sortOrder: 2 },
      { id: "opt-cs-sub-3", serviceId: "a1000000-0000-0000-0000-000000000002", label: "School / Academic Management System (SMS)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Admissions, grading, fee collection, parent/student portals, and report card generation.", sortOrder: 3 },
      { id: "opt-cs-sub-4", serviceId: "a1000000-0000-0000-0000-000000000002", label: "HR, Attendance & Payroll Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Staff records, biometric attendance sync, automated payslips, SSNIT and tax calculations.", sortOrder: 4 },
      { id: "opt-cs-sub-5", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Clinic / Pharmacy Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Patient records, drug dispensary, appointment schedules, and billing.", sortOrder: 5 },
      { id: "opt-cs-sub-6", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Hotel & Hospitality Booking Engine", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Room reservations, check-in/out, housekeeping status, and guest invoicing.", sortOrder: 6 },
      { id: "opt-cs-sub-7", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Custom Enterprise Workflow / ERP System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Bespoke operations workflow, CRM, ticketing, or internal approval system.", sortOrder: 7 },

      // Modules & Features
      { id: "opt-cs-feat-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Inventory & Real-Time Stock Module", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Stock tracking, batch numbers, low-stock warnings, and reorder triggers.", sortOrder: 10 },
      { id: "opt-cs-feat-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Multi-Branch & Multi-Location Sync", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Manage multiple branches or warehouses from a single unified control center.", sortOrder: 11 },
      { id: "opt-cs-feat-3", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Executive Analytics & BI Reporting Dashboard", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Visual charts, profit/loss statements, sales trends, and KPI summaries.", sortOrder: 12 },
      { id: "opt-cs-feat-4", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Barcode & QR Code Scanner Integration", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Scan items instantly during checkout and warehouse stock auditing.", sortOrder: 13 },
      { id: "opt-cs-feat-5", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Role-Based Access Control (Admin, Staff, Viewer)", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Granular user permissions preventing unauthorized data access.", sortOrder: 14 },
      { id: "opt-cs-feat-6", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Automated Payroll & Tax Calculation", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Calculate monthly salaries, deductions, allowances, and printable payslips.", sortOrder: 15 },
      { id: "opt-cs-feat-7", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Automated SMS & Email Alerts Engine", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Send instant receipts, payment reminders, and status updates.", sortOrder: 16 },
      { id: "opt-cs-feat-8", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Student & Parent Academic Portal", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Portal for viewing term results, attendance, and online fee payments.", sortOrder: 17 },
      { id: "opt-cs-feat-9", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Invoicing & Thermal Receipt Printer Setup", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Print 80mm/58mm thermal receipts and generate PDF invoices.", sortOrder: 18 },
      { id: "opt-cs-feat-10", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Audit Trail & System Activity Logging", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Immutable logs tracking all user logins, edits, cancellations, and sales.", sortOrder: 19 },

      // Integrations
      { id: "opt-cs-int-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Paystack Payment Processing", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Accept card and mobile money payments directly in the software.", sortOrder: 30 },
      { id: "opt-cs-int-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Direct MTN / Telecel MoMo API Integration", optionType: "integration", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Automated mobile money collection and disbursement.", sortOrder: 31 },
      { id: "opt-cs-int-3", serviceId: "a1000000-0000-0000-0000-000000000002", label: "WhatsApp Cloud API & Bulk SMS Gateway", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Send automated WhatsApp invoices, reminders, and broadcast SMS.", sortOrder: 32 },
      { id: "opt-cs-int-4", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Accounting Export (Excel / QuickBooks / Xero)", optionType: "integration", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "One-click export of sales, expenses, and payroll to accounting formats.", sortOrder: 33 },
      { id: "opt-cs-int-5", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Third-Party REST / Webhook Integration", optionType: "integration", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Connect with external systems, logistics partners, or regulatory APIs.", sortOrder: 34 },

      // Timeline
      { id: "opt-cs-time-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-cs-time-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Accelerated milestone sprints.", sortOrder: 51 },
    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "Mobile App Development",
    slug: "mobile-app",
    description: "iOS and Android apps for startups, commerce, deliveries, and enterprise field teams.",
    basePriceMin: "6000",
    basePriceMax: "18000",
    options: [
      // Subtypes
      { id: "opt-ma-sub-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Cross-Platform App (iOS & Android)", optionType: "subtype", priceImpact: "4000", isMultiplier: false, multiplierValue: null, helperText: "Unified modern Flutter / React Native codebase running on both Google Play and Apple App Store.", sortOrder: 1 },
      { id: "opt-ma-sub-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Android Only (Google Play Store)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Optimized for Android smartphones and tablets.", sortOrder: 2 },
      { id: "opt-ma-sub-3", serviceId: "a1000000-0000-0000-0000-000000000003", label: "iOS Only (Apple App Store)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Optimized for iPhones and iPads.", sortOrder: 3 },
      { id: "opt-ma-sub-4", serviceId: "a1000000-0000-0000-0000-000000000003", label: "E-commerce & On-Demand Delivery App", optionType: "subtype", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Product catalogs, cart, live order tracking, and rider dispatch.", sortOrder: 4 },
      { id: "opt-ma-sub-5", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Community, Social & Booking App", optionType: "subtype", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "User profiles, direct messaging, event booking, and member feeds.", sortOrder: 5 },
      { id: "opt-ma-sub-6", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Enterprise & Field Staff App", optionType: "subtype", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Field inspections, signature captures, GPS check-ins, and task assignments.", sortOrder: 6 },

      // Core Features
      { id: "opt-ma-feat-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "User Authentication (Email, Phone OTP, Social)", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Sign up, password reset, OTP verification, and profile management.", sortOrder: 10 },
      { id: "opt-ma-feat-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Push Notifications & In-App Alert Center", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Targeted push notifications delivered even when app is closed.", sortOrder: 11 },
      { id: "opt-ma-feat-3", serviceId: "a1000000-0000-0000-0000-000000000003", label: "In-App Chat & Direct Messaging", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Real-time 1-on-1 or group chat with media sharing.", sortOrder: 12 },
      { id: "opt-ma-feat-4", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Offline-First Mode with Local Sync", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Allows users to continue work offline; auto-syncs when online.", sortOrder: 13 },
      { id: "opt-ma-feat-5", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Live GPS Navigation & Location Tracking", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Interactive maps, route calculation, and live coordinate tracking.", sortOrder: 14 },
      { id: "opt-ma-feat-6", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Dedicated Web Admin Management Dashboard", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Secure web portal to manage app users, content, orders, and analytics.", sortOrder: 15 },
      { id: "opt-ma-feat-7", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Biometric Security (FaceID / Fingerprint)", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Quick, secure biometric authentication.", sortOrder: 16 },
      { id: "opt-ma-feat-8", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Camera & In-App Document / QR Scanner", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Capture and upload photos, scan documents, or verify QR codes.", sortOrder: 17 },

      // Integrations
      { id: "opt-ma-int-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Paystack / MoMo Mobile In-App Payments", optionType: "integration", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Seamless in-app checkout supporting card and Mobile Money.", sortOrder: 30 },
      { id: "opt-ma-int-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Firebase Cloud Messaging & Realtime DB", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Reliable Google cloud backend for live events and sync.", sortOrder: 31 },
      { id: "opt-ma-int-3", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Google Maps SDK & Geolocation Services", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Native Google Maps embedding with address autocomplete.", sortOrder: 32 },
      { id: "opt-ma-int-4", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Social Login (Google & Apple Sign-In)", optionType: "integration", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "One-tap OAuth sign-in required for iOS App Store approval.", sortOrder: 33 },

      // Timeline
      { id: "opt-ma-time-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-ma-time-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster development turnaround.", sortOrder: 51 },
    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000004",
    name: "Website Maintenance",
    slug: "maintenance",
    description: "Updates, security patches, content changes, and performance checks for existing websites.",
    basePriceMin: "500",
    basePriceMax: "2000",
    options: [
      { id: "opt-mt-sub-1", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Monthly Retainer (Basic)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Up to 4 hours of changes per month.", sortOrder: 1 },
      { id: "opt-mt-sub-2", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Monthly Retainer (Standard)", optionType: "subtype", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Up to 8 hours of changes per month.", sortOrder: 2 },
      { id: "opt-mt-sub-3", serviceId: "a1000000-0000-0000-0000-000000000004", label: "One-off Fix / Update", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A specific repair or content change billed once.", sortOrder: 3 },
      { id: "opt-mt-feat-1", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Security & Plugin Updates", optionType: "feature", priceImpact: "300", isMultiplier: false, multiplierValue: null, helperText: "Keep your site secure with regular software updates.", sortOrder: 10 },
      { id: "opt-mt-feat-2", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Performance Optimisation", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Speed up your site: caching, image compression, and more.", sortOrder: 11 },
      { id: "opt-mt-feat-3", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Monthly Backup", optionType: "feature", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "Regular automated backups stored securely off-site.", sortOrder: 12 },
      { id: "opt-mt-feat-4", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Uptime Monitoring", optionType: "feature", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "We check your site is online 24/7 and alert you if it goes down.", sortOrder: 13 },
      { id: "opt-mt-time-1", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-mt-time-2", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },
    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000005",
    name: "SEO Services",
    slug: "seo",
    description: "On-page SEO, keyword research, Google Business setup, and monthly reporting.",
    basePriceMin: "1000",
    basePriceMax: "4000",
    options: [
      { id: "opt-seo-sub-1", serviceId: "a1000000-0000-0000-0000-000000000005", label: "One-off SEO Audit", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A report on what is holding your site back in search results.", sortOrder: 1 },
      { id: "opt-seo-sub-2", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Monthly SEO Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Ongoing optimisation, content updates, and monthly ranking reports.", sortOrder: 2 },
      { id: "opt-seo-feat-1", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Keyword Research", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Find the exact words your customers search for.", sortOrder: 10 },
      { id: "opt-seo-feat-2", serviceId: "a1000000-0000-0000-0000-000000000005", label: "On-page Optimisation", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Fix titles, descriptions, headings, and content structure.", sortOrder: 11 },
      { id: "opt-seo-feat-3", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Google Business Profile Setup", optionType: "feature", priceImpact: "400", isMultiplier: false, multiplierValue: null, helperText: "Get your business on Google Maps and search results.", sortOrder: 12 },
      { id: "opt-seo-feat-4", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Monthly Ranking Reports", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "See where your site ranks each month and what is improving.", sortOrder: 13 },
      { id: "opt-seo-feat-5", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Backlink Building", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Earn links from other websites to boost your authority.", sortOrder: 14 },
      { id: "opt-seo-feat-6", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Local SEO (Ghana-focused)", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Optimise for local searches in your city or region.", sortOrder: 15 },
      { id: "opt-seo-time-1", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-seo-time-2", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },
    ],
  },
];

export async function loadServices(): Promise<ServiceData[]> {
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3002";
  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(3000), // 3s timeout to prevent build hangs
    });
    if (!res.ok) return FALLBACK_SERVICES;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
    return FALLBACK_SERVICES;
  } catch {
    return FALLBACK_SERVICES;
  }
}
