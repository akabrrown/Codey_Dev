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
      { id: "opt-wd-stu-sub-1", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Informational Website", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "About a topic or organization, mostly static pages.", sortOrder: 1 },
      { id: "opt-wd-stu-sub-2", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Web Application with User Accounts", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Interactive system with login and data management.", sortOrder: 2 },
      { id: "opt-wd-stu-sub-3", serviceId: "a1000000-0000-0000-0000-000000000007", label: "E-commerce / Online Store", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Product catalog, cart, and simulated checkout.", sortOrder: 3 },
      { id: "opt-wd-stu-sub-4", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Booking / Reservation System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Calendar schedules for appointments or bookings.", sortOrder: 4 },
      { id: "opt-wd-stu-sub-5", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Dashboard / Admin System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Data management and reporting interface.", sortOrder: 5 },

      // Features
      { id: "opt-wd-stu-feat-1", serviceId: "a1000000-0000-0000-0000-000000000007", label: "User Registration & Login", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Secure authentication for users.", sortOrder: 10 },
      { id: "opt-wd-stu-feat-2", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Role-Based Access (Admin vs User)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Different permissions based on user role.", sortOrder: 11 },
      { id: "opt-wd-stu-feat-3", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Search & Filtering", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Search through records or products.", sortOrder: 12 },
      { id: "opt-wd-stu-feat-4", serviceId: "a1000000-0000-0000-0000-000000000007", label: "File Uploads (Documents/Images)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Allow users to upload media or files.", sortOrder: 13 },
      { id: "opt-wd-stu-feat-5", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Notifications (Email/In-App)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Alerts for system events.", sortOrder: 14 },
      { id: "opt-wd-stu-feat-6", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Reports & Analytics", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Charts and data summaries.", sortOrder: 15 },
      { id: "opt-wd-stu-feat-7", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Payment Processing (MoMo/Paystack)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Simulated or live payment gateway integration.", sortOrder: 16 },

      // Timeline
      { id: "opt-wd-stu-time-1", serviceId: "a1000000-0000-0000-0000-000000000007", label: "Standard Academic Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered in time for standard defense dates.", sortOrder: 50 },

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
      { id: "opt-cs-stu-sub-1", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Inventory Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Stock tracking and supply chain management.", sortOrder: 1 },
      { id: "opt-cs-stu-sub-2", serviceId: "a1000000-0000-0000-0000-000000000009", label: "School Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Student records, grading, and administration.", sortOrder: 2 },
      { id: "opt-cs-stu-sub-3", serviceId: "a1000000-0000-0000-0000-000000000009", label: "HR & Payroll System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Employee records and salary calculations.", sortOrder: 3 },
      { id: "opt-cs-stu-sub-4", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Hospital/Clinic Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Patient records and appointments.", sortOrder: 4 },
      { id: "opt-cs-stu-sub-5", serviceId: "a1000000-0000-0000-0000-000000000009", label: "POS & Retail System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Sales processing and receipts.", sortOrder: 5 },

      // Features
      { id: "opt-cs-stu-feat-1", serviceId: "a1000000-0000-0000-0000-000000000009", label: "User Registration & Login", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Secure authentication for users.", sortOrder: 10 },
      { id: "opt-cs-stu-feat-2", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Role-Based Access (Admin vs User)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Different permissions based on user role.", sortOrder: 11 },
      { id: "opt-cs-stu-feat-3", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Search & Filtering", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Search through records or products.", sortOrder: 12 },
      { id: "opt-cs-stu-feat-4", serviceId: "a1000000-0000-0000-0000-000000000009", label: "File Uploads (Documents/Images)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Allow users to upload media or files.", sortOrder: 13 },
      { id: "opt-cs-stu-feat-5", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Notifications (Email/In-App)", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Alerts for system events.", sortOrder: 14 },
      { id: "opt-cs-stu-feat-6", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Reports & Analytics", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Charts and data summaries.", sortOrder: 15 },

      // Timeline
      { id: "opt-cs-stu-time-1", serviceId: "a1000000-0000-0000-0000-000000000009", label: "Standard Academic Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered in time for standard defense dates.", sortOrder: 50 },

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
      { id: "opt-ma-stu-sub-1", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Android App (Java/Kotlin)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Native Android application.", sortOrder: 1 },
      { id: "opt-ma-stu-sub-2", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Cross-Platform App (Flutter/React Native)", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Runs on both Android and iOS.", sortOrder: 2 },
      { id: "opt-ma-stu-sub-3", serviceId: "a1000000-0000-0000-0000-000000000011", label: "iOS App", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Native iOS application.", sortOrder: 3 },

      // Features
      { id: "opt-ma-stu-feat-1", serviceId: "a1000000-0000-0000-0000-000000000011", label: "User Authentication", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Login and Registration functionality.", sortOrder: 10 },
      { id: "opt-ma-stu-feat-2", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Camera / Image Upload", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Access device camera or gallery.", sortOrder: 11 },
      { id: "opt-ma-stu-feat-3", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Push Notifications", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Firebase or local push notifications.", sortOrder: 12 },
      { id: "opt-ma-stu-feat-4", serviceId: "a1000000-0000-0000-0000-000000000011", label: "GPS / Location Services", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Map integration and location tracking.", sortOrder: 13 },
      { id: "opt-ma-stu-feat-5", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Payment Processing", optionType: "feature", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Simulated mobile money or card payments.", sortOrder: 14 },

      // Timeline
      { id: "opt-ma-stu-time-1", serviceId: "a1000000-0000-0000-0000-000000000011", label: "Standard Academic Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered in time for standard defense dates.", sortOrder: 50 },

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
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] || process.env["API_URL"
];

export async function loadServices(): Promise<ServiceData[]> {
  const apiUrl = process.env["NEXT_PUBLIC_API_URL"] || process.env["API_URL"];
  if (!apiUrl) return FALLBACK_SERVICES;

  try {
    const res = await fetch(`${apiUrl}/api/v1/services`, {
      next: { revalidate: 300, tags: ["services-catalog"] },
      signal: AbortSignal.timeout(3000),
      headers: {
        Accept: "application/json",
      },
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
