import type { ServiceData } from "./form-context";

export const FALLBACK_SERVICES: ServiceData[] = [
  {
    id: "a1000000-0000-0000-0000-000000000006",
    name: "Website Development (Production)",
    slug: "web-design-prod",
    description: "Modern websites for businesses, e-commerce stores, schools, NGOs, and corporate organisations.",
    basePriceMin: "2000",
    basePriceMax: "8000",
    options: [

      // Subtypes
      { id: "52be0a86-80d5-5935-8d6e-56a76858c51f", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Business & Corporate Website", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A high-conversion website for companies, consulting firms, agencies, and clinics.", sortOrder: 1 },
      { id: "ff46b87a-a8da-51aa-890f-9221f3f64254", serviceId: "a1000000-0000-0000-0000-000000000006", label: "E-commerce & Online Store", optionType: "subtype", priceImpact: "3000", isMultiplier: false, multiplierValue: null, helperText: "A full online storefront with product catalog, cart, checkout, and online payment processing.", sortOrder: 2 },
      { id: "782bf740-3e6f-5e86-b14d-4a6503d040ad", serviceId: "a1000000-0000-0000-0000-000000000006", label: "School / NGO / Institutional Portal", optionType: "subtype", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Multi-page portals with event pages, donation facilities, or student hubs.", sortOrder: 3 },
      { id: "4af0c3ac-a0b4-543b-9f3a-4029ec24bc09", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Portfolio & Creative Showcase", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A visual showcase designed for creatives, photographers, architects, and designers.", sortOrder: 4 },

      // Pages
      { id: "34ac37e3-0f65-51a8-b199-6f6214f8dcea", serviceId: "a1000000-0000-0000-0000-000000000006", label: "1–5 Core Pages (Home, About, Services, Contact, etc.)", optionType: "page", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Essential pages to launch your online presence.", sortOrder: 10 },
      { id: "b8922c02-d339-5de7-8765-f8276041ae09", serviceId: "a1000000-0000-0000-0000-000000000006", label: "6–10 Pages", optionType: "page", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "More comprehensive site for businesses with multiple services.", sortOrder: 11 },
      { id: "4c789c37-5053-5ef9-9943-d74da32e9fa1", serviceId: "a1000000-0000-0000-0000-000000000006", label: "10+ Pages / Dynamic Content", optionType: "page", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Large-scale site with complex navigation and multiple dynamic templates.", sortOrder: 12 },

      // Features
      { id: "efc59dd7-d993-53ce-bb01-a56a0de82f80", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Content Management System (CMS)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Manage your own text and images easily without coding.", sortOrder: 20 },
      { id: "b3cb719b-436d-5514-bef1-54bfeec4fdb8", serviceId: "a1000000-0000-0000-0000-000000000006", label: "SEO Foundation Setup", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Basic meta tags, sitemap generation, and clean URLs.", sortOrder: 21 },
      { id: "86935fa2-e6ac-5753-b9a5-0b521adf9655", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Advanced SEO & Analytics Integration", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Deep Google Analytics setup, Search Console integration, and advanced schemas.", sortOrder: 22 },
      { id: "b7bcb1da-e0cf-5212-8bc3-180f763bee3e", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Multilingual Support", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Website translated and structured for multiple languages (e.g., English/French).", sortOrder: 23 },
      { id: "ef7106d5-27a1-50a4-8576-9e4def87d8b3", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Custom Animations & Interactions", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Premium, smooth scrolling effects, hover states, and dynamic elements.", sortOrder: 24 },
      { id: "5e0d147f-18ef-55c6-b2e6-da6ec375ab72", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Third-Party API Integration", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Connect with CRMs (HubSpot, Salesforce), email marketing, or other tools.", sortOrder: 25 },

      // Timelines
      { id: "397e5e9f-9a8b-5d8a-9f35-8cac708083f6", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "b9bda15e-d41b-53e5-8bdb-958e3351a510", serviceId: "a1000000-0000-0000-0000-000000000006", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },

    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000007",
    name: "Website Development (Student Project)",
    slug: "web-design-student",
    description: "Informational websites, e-commerce stores, booking systems, or dashboards for student defenses.",
    basePriceMin: "2000",
    basePriceMax: "8000",
    options: [

      // Subtypes
      { id: "224e77a7-ca43-5a12-bb9c-f569c0c95ea6", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Informational Website", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "About a topic or organization, mostly static pages.", sortOrder: 1 },
      { id: "035600e6-4276-5045-8f9e-6f3b54652788", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Web Application with User Accounts", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Interactive system with login and data management.", sortOrder: 2 },
      { id: "7f4861c7-456b-526b-9966-59add8598b81", serviceId: "a1000000-0000-0000-0000-000000000007", label: "E-commerce / Online Store", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Product catalog, cart, and simulated checkout.", sortOrder: 3 },
      { id: "6ce452d0-726c-5e7c-980b-0669c3de7ef1", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Booking / Reservation System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Calendar schedules for appointments or bookings.", sortOrder: 4 },
      { id: "af34e427-fc00-5928-86dd-f41a02a306ed", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Dashboard / Admin System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Data management and reporting interface.", sortOrder: 5 },

      // Features
      { id: "34f2bbec-5371-53fe-8637-95b354cdb2eb", serviceId: "a1000000-0000-0000-0000-000000000007", label: "User Registration & Login", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Secure authentication for users.", sortOrder: 10 },
      { id: "b9ebdac5-c1e1-5b3a-a9df-0846f4917a50", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Role-Based Access (Admin vs User)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Different permissions based on user role.", sortOrder: 11 },
      { id: "fc6772f8-eb54-5014-add6-911652c2f484", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Search & Filtering", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Search through records or products.", sortOrder: 12 },
      { id: "6de2cd39-d48c-5c1a-a3f9-341b3c6deae1", serviceId: "a1000000-0000-0000-0000-000000000007", label: "File Uploads (Documents/Images)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Allow users to upload media or files.", sortOrder: 13 },
      { id: "8e8f548b-d3c1-56a1-ad22-6851afc0efdf", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Notifications (Email/In-App)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Alerts for system events.", sortOrder: 14 },
      { id: "85269cbb-f180-5ce7-bb6a-45de11669312", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Reports & Analytics", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Charts and data summaries.", sortOrder: 15 },
      { id: "e8fa7b49-918d-5485-82bf-97784560d2b2", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Payment Processing (MoMo/Paystack)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Simulated or live payment gateway integration.", sortOrder: 16 },

      // Timelines
      { id: "a832ce25-470c-5805-b0ce-0fc498f950e0", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Standard Academic Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered in time for standard defense dates.", sortOrder: 50 },

    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000008",
    name: "Custom Software Development (Production)",
    slug: "custom-software-prod",
    description: "POS systems, inventory management, HR systems, school portals, and bespoke ERP solutions.",
    basePriceMin: "8000",
    basePriceMax: "20000",
    options: [

      // Subtypes
      { id: "e911b486-3008-5984-9ad4-e980017074ca", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Inventory / Supply Chain Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Track stock levels, orders, and supplier data across locations.", sortOrder: 1 },
      { id: "4a15347a-6254-5942-aa22-5dcf90686d2e", serviceId: "a1000000-0000-0000-0000-000000000008", label: "HR & Payroll Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Manage employee records, attendance, leave, and salary disbursements.", sortOrder: 2 },
      { id: "a68f85ee-c932-592e-ae80-d7b5d379e05c", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Hospital / Clinic Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Patient records, appointment scheduling, billing, and lab results.", sortOrder: 3 },
      { id: "8aae5651-c91e-5a49-9a0f-84d512808d57", serviceId: "a1000000-0000-0000-0000-000000000008", label: "School / University Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Student enrollment, grading, timetables, and fee collection.", sortOrder: 4 },
      { id: "dc1dcc0a-0a80-5ea4-b3fa-0b233a345dc5", serviceId: "a1000000-0000-0000-0000-000000000008", label: "POS & Retail Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Point of sale interface with receipt generation and daily sales tracking.", sortOrder: 5 },

      // Features
      { id: "46f2a9a9-e857-5d61-a55c-86a155bdf4f0", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Role-Based Access Control (RBAC)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Granular permissions for Admins, Managers, and Staff.", sortOrder: 10 },
      { id: "1d19fce0-edb4-5bbf-9942-2191ce2cde64", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Advanced Reporting & Exporting", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Custom PDF/Excel report generation and interactive dashboards.", sortOrder: 11 },
      { id: "b137c839-793f-5332-90ee-523a3f82ae18", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Automated Email/SMS Notifications", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "System alerts triggered by specific events (e.g., low stock, appointments).", sortOrder: 12 },
      { id: "501e7681-c91e-54b4-a4a5-9c0c3c051502", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Payment Gateway Integration", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Accept mobile money (MoMo) and card payments directly in the software.", sortOrder: 13 },
      { id: "01629bdc-32bf-5cbd-b2ff-92b812a7ecad", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Offline Capability / Sync", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Continue working without internet; data syncs when connection is restored.", sortOrder: 14 },

      // Timelines
      { id: "c2aa7c82-dff8-52b8-bf00-728c6cf34b1c", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "82c3bb7e-ddd7-5bc4-be31-de7f36229875", serviceId: "a1000000-0000-0000-0000-000000000008", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },

    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000009",
    name: "Custom Software Development (Student Project)",
    slug: "custom-software-student",
    description: "Inventory, HR, School Management, or bespoke systems for student defenses.",
    basePriceMin: "8000",
    basePriceMax: "20000",
    options: [

      // Subtypes
      { id: "8f9a25ca-b088-54f3-a9fe-7085ad57ba8b", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Inventory Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Stock tracking and supply chain management.", sortOrder: 1 },
      { id: "2877a94b-5214-56bc-bfab-dd8310c007e9", serviceId: "a1000000-0000-0000-0000-000000000009", label: "School Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Student records, grading, and administration.", sortOrder: 2 },
      { id: "1cb4e28d-39cc-5be9-acfb-eb75d67057c6", serviceId: "a1000000-0000-0000-0000-000000000009", label: "HR & Payroll System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Employee records and salary calculations.", sortOrder: 3 },
      { id: "7f17740d-ffe4-5cda-b828-eea622d004ce", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Hospital/Clinic Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Patient records and appointments.", sortOrder: 4 },
      { id: "fdf92cfe-d322-52de-9865-d8a08ecd8193", serviceId: "a1000000-0000-0000-0000-000000000009", label: "POS & Retail System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Sales processing and receipts.", sortOrder: 5 },

      // Features
      { id: "ef48d0dd-d8ec-5be9-81cf-28f79428ed8a", serviceId: "a1000000-0000-0000-0000-000000000009", label: "User Registration & Login", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Secure authentication for users.", sortOrder: 10 },
      { id: "fc5fe281-57b3-555c-b113-232dad96a168", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Role-Based Access (Admin vs User)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Different permissions based on user role.", sortOrder: 11 },
      { id: "fffed687-43df-5386-98d0-f095f5d96f56", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Search & Filtering", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Search through records or products.", sortOrder: 12 },
      { id: "433260a6-e7c0-5305-8659-33024f2285e5", serviceId: "a1000000-0000-0000-0000-000000000009", label: "File Uploads (Documents/Images)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Allow users to upload media or files.", sortOrder: 13 },
      { id: "3fbbc7a5-bc14-588d-a363-4a1dda3b20a7", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Notifications (Email/In-App)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Alerts for system events.", sortOrder: 14 },
      { id: "4b874b3f-bed8-5f71-84ed-b74733f48651", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Reports & Analytics", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Charts and data summaries.", sortOrder: 15 },

      // Timelines
      { id: "aefccbb0-5077-59e0-847b-c369467514fb", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Standard Academic Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered in time for standard defense dates.", sortOrder: 50 },

    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000010",
    name: "Mobile App Development (Production)",
    slug: "mobile-app-prod",
    description: "iOS and Android apps for startups, commerce, deliveries, and enterprise field teams.",
    basePriceMin: "6000",
    basePriceMax: "18000",
    options: [

      // Subtypes
      { id: "d2f5c524-c712-571e-aa21-14c4dd203a78", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Cross-Platform App (iOS & Android)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Built using Flutter or React Native for dual-platform reach.", sortOrder: 1 },
      { id: "0014068b-b61b-532b-b0b9-6d65d03aa316", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Native Android App Only", optionType: "subtype", priceImpact: "-1000", isMultiplier: false, multiplierValue: null, helperText: "Built specifically and only for the Google Play Store.", sortOrder: 2 },
      { id: "fbb7bd1d-3512-5349-bf1e-4c57a569ba61", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Native iOS App Only", optionType: "subtype", priceImpact: "-1000", isMultiplier: false, multiplierValue: null, helperText: "Built specifically and only for the Apple App Store.", sortOrder: 3 },

      // Features
      { id: "d8748449-693d-59e7-a181-b8df6c794b5b", serviceId: "a1000000-0000-0000-0000-000000000010", label: "User Authentication & Profiles", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Secure login via email, Google, or Apple, and profile management.", sortOrder: 10 },
      { id: "1cff9606-24a9-50a7-94f5-5a4ef1b853e7", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Push Notifications", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Engage users with real-time alerts and messages.", sortOrder: 11 },
      { id: "b6ff3475-d18c-56f1-bf72-1c961240dd71", serviceId: "a1000000-0000-0000-0000-000000000010", label: "In-App Purchases / Subscriptions", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Integration with Apple and Google billing systems.", sortOrder: 12 },
      { id: "b4e06f8f-03c4-5e9c-a380-52176aba7342", serviceId: "a1000000-0000-0000-0000-000000000010", label: "GPS & Location Tracking", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Live maps, routing, or location-based services (e.g., delivery tracking).", sortOrder: 13 },
      { id: "b95d46ed-09f8-538a-89eb-ad1760e47910", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Camera & Media Processing", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Capture photos, scan QR codes, or upload files directly.", sortOrder: 14 },
      { id: "cea55d33-891d-5df4-9b61-c2f0ce37d46c", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Offline Mode / Local Storage", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "App functions smoothly without an active internet connection.", sortOrder: 15 },

      // Timelines
      { id: "ebe1a11b-4ef4-56b2-aca1-90cce62d7ad1", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "3c50759c-5853-5d0c-b443-127267573559", serviceId: "a1000000-0000-0000-0000-000000000010", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },

    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000011",
    name: "Mobile App Development (Student Project)",
    slug: "mobile-app-student",
    description: "Mobile apps for academic projects, featuring user accounts, notifications, and media uploads.",
    basePriceMin: "6000",
    basePriceMax: "18000",
    options: [

      // Subtypes
      { id: "faaf9ce3-4eee-544c-821e-381e9fde5910", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Android App (Java/Kotlin)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Native Android application.", sortOrder: 1 },
      { id: "ef38719e-8167-50b6-b5ef-fe701b3b5c58", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Cross-Platform App (Flutter/React Native)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Runs on both Android and iOS.", sortOrder: 2 },
      { id: "ead38ae5-3aea-5f00-b34a-2748929ae51a", serviceId: "a1000000-0000-0000-0000-000000000011", label: "iOS App", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Native iOS application.", sortOrder: 3 },

      // Features
      { id: "731e0c7d-e218-596b-9457-3fe93ef12767", serviceId: "a1000000-0000-0000-0000-000000000011", label: "User Authentication", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Login and Registration functionality.", sortOrder: 10 },
      { id: "59942f49-6f8d-5727-8897-02cef55979a0", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Camera / Image Upload", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Access device camera or gallery.", sortOrder: 11 },
      { id: "b204c8cb-84c2-5392-bc04-c05020764c5b", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Push Notifications", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Firebase or local push notifications.", sortOrder: 12 },
      { id: "39a86b6e-b88c-533c-af91-0614729e9824", serviceId: "a1000000-0000-0000-0000-000000000011", label: "GPS / Location Services", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Map integration and location tracking.", sortOrder: 13 },
      { id: "f5718578-b4ff-5c3e-a93c-aacaa5b070a4", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Payment Processing", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Simulated mobile money or card payments.", sortOrder: 14 },

      // Timelines
      { id: "3a141dca-6530-523f-a2d3-62171960376e", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Standard Academic Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered in time for standard defense dates.", sortOrder: 50 },

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

      // Subtypes
      { id: "b08ceb5c-51d6-5d9b-8fe7-ac354366fd52", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Monthly Retainer (Basic)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Up to 4 hours of changes per month.", sortOrder: 1 },
      { id: "7c43e7f7-f267-5803-838d-bd76ee7caf30", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Monthly Retainer (Standard)", optionType: "subtype", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Up to 8 hours of changes per month.", sortOrder: 2 },
      { id: "00980854-ddd1-59fc-9c4b-62fe6e90b6ec", serviceId: "a1000000-0000-0000-0000-000000000004", label: "One-off Fix / Update", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A specific repair or content change billed once.", sortOrder: 3 },

      // Features
      { id: "1ca7e440-f74f-5908-8239-68a6e8687298", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Security & Plugin Updates", optionType: "feature", priceImpact: "300", isMultiplier: false, multiplierValue: null, helperText: "Keep your site secure with regular software updates.", sortOrder: 10 },
      { id: "8ff16a59-4006-5858-984e-570c07f63d3f", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Performance Optimisation", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Speed up your site: caching, image compression, and more.", sortOrder: 11 },
      { id: "22ff4122-cc87-5558-b68e-dfbc5b4c9ce3", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Monthly Backup", optionType: "feature", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "Regular automated backups stored securely off-site.", sortOrder: 12 },
      { id: "dd6b99c8-f72b-5732-b447-60d3f8921c03", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Uptime Monitoring", optionType: "feature", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "We check your site is online 24/7 and alert you if it goes down.", sortOrder: 13 },

      // Timelines
      { id: "e6e24f64-721e-5910-86db-c4e43c908e08", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "d8f1bd6b-08bb-54b7-8f94-7a47daeaff9f", serviceId: "a1000000-0000-0000-0000-000000000004", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },

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

      // Subtypes
      { id: "cc4b53e3-ffa1-5a85-9d88-0e84e5d8be5d", serviceId: "a1000000-0000-0000-0000-000000000005", label: "One-off SEO Audit", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A report on what is holding your site back in search results.", sortOrder: 1 },
      { id: "38985701-d122-518c-9ae0-c6cdfcebb592", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Monthly SEO Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Ongoing optimisation, content updates, and monthly ranking reports.", sortOrder: 2 },

      // Features
      { id: "28fa09cc-910d-5efd-8df0-5906bb7ccc32", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Keyword Research", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "Find the exact words your customers search for.", sortOrder: 10 },
      { id: "3782f289-ee64-5004-aac5-d3fa5056fad7", serviceId: "a1000000-0000-0000-0000-000000000005", label: "On-page Optimisation", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Fix titles, descriptions, headings, and content structure.", sortOrder: 11 },
      { id: "0be6f7f0-99db-5574-ac93-0089ddadb449", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Google Business Profile Setup", optionType: "feature", priceImpact: "400", isMultiplier: false, multiplierValue: null, helperText: "Get your business on Google Maps and search results.", sortOrder: 12 },
      { id: "d2383bd3-9716-5c92-b6b3-06ad54cb02a8", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Monthly Ranking Reports", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "See where your site ranks each month and what is improving.", sortOrder: 13 },
      { id: "c21ee3f6-5b01-594f-a6e8-c5503f68f9a9", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Backlink Building", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Earn links from other websites to boost your authority.", sortOrder: 14 },
      { id: "15e663a8-73f0-53c1-8650-449996bd7469", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Local SEO (Ghana-focused)", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Optimise for local searches in your city or region.", sortOrder: 15 },

      // Timelines
      { id: "e7bb9b54-0eaf-5914-b0bc-9a08146a7792", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "a1311d03-d585-5a6e-a0bb-6538fcb38d1c", serviceId: "a1000000-0000-0000-0000-000000000005", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },

    ],
  },
];
