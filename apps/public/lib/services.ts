import type { ServiceData } from "./form-context";

export const FALLBACK_SERVICES: ServiceData[] = [
  {
    id: "a1000000-0000-0000-0000-000000000001",
    name: "Web Design & Development",
    slug: "web-design",
    description: "Websites for businesses, e-commerce stores, schools, NGOs, and corporate organisations.",
    basePriceMin: "2000",
    basePriceMax: "8000",
    options: [
      { id: "opt-wd-sub-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Business Website", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A professional website for your company: about, services, contact, and more.", sortOrder: 1 },
      { id: "opt-wd-sub-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "E-commerce / Online Store", optionType: "subtype", priceImpact: "3000", isMultiplier: false, multiplierValue: null, helperText: "A full online shop where customers can browse products and pay online.", sortOrder: 2 },
      { id: "opt-wd-sub-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "School / NGO / Corporate", optionType: "subtype", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Multi-page sites with portals, event pages, or donation features.", sortOrder: 3 },
      { id: "opt-wd-page-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "1–5 Pages", optionType: "page", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Covers Home, About, Services, Contact, and one more.", sortOrder: 10 },
      { id: "opt-wd-page-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "6–10 Pages", optionType: "page", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Portfolio, Gallery, FAQ, Blog, or additional content.", sortOrder: 11 },
      { id: "opt-wd-page-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "11–20 Pages", optionType: "page", priceImpact: "2800", isMultiplier: false, multiplierValue: null, helperText: "Large sites with multiple content sections or a blog.", sortOrder: 12 },
      { id: "opt-wd-page-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "20+ Pages", optionType: "page", priceImpact: "5000", isMultiplier: false, multiplierValue: null, helperText: "Enterprise or directory-style sites.", sortOrder: 13 },
      { id: "opt-wd-feat-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Contact / Enquiry Form", optionType: "feature", priceImpact: "300", isMultiplier: false, multiplierValue: null, helperText: "A form customers can fill in to reach you.", sortOrder: 20 },
      { id: "opt-wd-feat-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Blog / News Section", optionType: "feature", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "A section where you can publish articles and news.", sortOrder: 21 },
      { id: "opt-wd-feat-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Booking / Appointment System", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Online booking calendar where clients can schedule appointments.", sortOrder: 22 },
      { id: "opt-wd-feat-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Admin / CMS Panel", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "A login area where you can update content without a developer.", sortOrder: 23 },
      { id: "opt-wd-feat-5", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Photo / Portfolio Gallery", optionType: "feature", priceImpact: "500", isMultiplier: false, multiplierValue: null, helperText: "A visual grid or slideshow of your work or products.", sortOrder: 24 },
      { id: "opt-wd-feat-6", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Live Chat Widget", optionType: "feature", priceImpact: "400", isMultiplier: false, multiplierValue: null, helperText: "A chat window so visitors can message you directly.", sortOrder: 25 },
      { id: "opt-wd-feat-7", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Multi-language Support", optionType: "feature", priceImpact: "1800", isMultiplier: false, multiplierValue: null, helperText: "Your site in two or more languages (e.g. English and French).", sortOrder: 26 },
      { id: "opt-wd-int-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Paystack Payment Integration", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Accept card and mobile money payments on your site via Paystack.", sortOrder: 30 },
      { id: "opt-wd-int-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Google Analytics", optionType: "integration", priceImpact: "300", isMultiplier: false, multiplierValue: null, helperText: "Track how many people visit your site and what they click.", sortOrder: 31 },
      { id: "opt-wd-int-3", serviceId: "a1000000-0000-0000-0000-000000000001", label: "WhatsApp Chat Button", optionType: "integration", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "A floating WhatsApp button that opens a chat with you directly.", sortOrder: 32 },
      { id: "opt-wd-int-4", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Social Media Feed Integration", optionType: "integration", priceImpact: "600", isMultiplier: false, multiplierValue: null, helperText: "Show your latest Instagram or Facebook posts on your website.", sortOrder: 33 },
      { id: "opt-wd-int-5", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Email Marketing (Mailchimp)", optionType: "integration", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Connect a newsletter sign-up form to your Mailchimp account.", sortOrder: 34 },
      { id: "opt-wd-int-6", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Google Maps Embed", optionType: "integration", priceImpact: "200", isMultiplier: false, multiplierValue: null, helperText: "A map showing your business location.", sortOrder: 35 },
      { id: "opt-wd-time-1", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-wd-time-2", serviceId: "a1000000-0000-0000-0000-000000000001", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },
    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000002",
    name: "Custom Software Development",
    slug: "custom-software",
    description: "POS systems, inventory management, HR systems, school management, and bespoke tools.",
    basePriceMin: "8000",
    basePriceMax: "20000",
    options: [
      { id: "opt-cs-sub-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "POS System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "A point-of-sale system for retail shops, restaurants, or service businesses.", sortOrder: 1 },
      { id: "opt-cs-sub-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Inventory Management", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Track stock levels, suppliers, purchase orders, and sales.", sortOrder: 2 },
      { id: "opt-cs-sub-3", serviceId: "a1000000-0000-0000-0000-000000000002", label: "HR Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Manage staff records, attendance, payroll, and leave.", sortOrder: 3 },
      { id: "opt-cs-sub-4", serviceId: "a1000000-0000-0000-0000-000000000002", label: "School Management System", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Student records, class scheduling, fees, results, and parent portals.", sortOrder: 4 },
      { id: "opt-cs-sub-5", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Other / Custom", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Describe your needs in the notes field and we will price accordingly.", sortOrder: 5 },
      { id: "opt-cs-feat-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Inventory / Stock Module", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Track stock in and out, with low-stock alerts.", sortOrder: 10 },
      { id: "opt-cs-feat-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Multi-branch / Multi-user", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Separate access and data for multiple locations or staff roles.", sortOrder: 11 },
      { id: "opt-cs-feat-3", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Reports & Analytics Dashboard", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Charts and tables showing sales, expenses, attendance, or any key metric.", sortOrder: 12 },
      { id: "opt-cs-feat-4", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Barcode / QR Code Scanner", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Scan items at checkout or for stock-taking.", sortOrder: 13 },
      { id: "opt-cs-feat-5", serviceId: "a1000000-0000-0000-0000-000000000002", label: "User Login & Role Management", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Different login accounts with different levels of access.", sortOrder: 14 },
      { id: "opt-cs-feat-6", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Payroll Processing", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Automated salary calculation including deductions and allowances.", sortOrder: 15 },
      { id: "opt-cs-feat-7", serviceId: "a1000000-0000-0000-0000-000000000002", label: "SMS / Email Notifications", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Auto-send alerts to staff, parents, or customers.", sortOrder: 16 },
      { id: "opt-cs-feat-8", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Student / Parent Portal", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "A login area for parents or students to check results and fees.", sortOrder: 17 },
      { id: "opt-cs-feat-9", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Expense Tracking", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Log and categorize business expenses alongside revenue.", sortOrder: 18 },
      { id: "opt-cs-int-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Paystack Integration", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Accept card and mobile money payments inside the software.", sortOrder: 20 },
      { id: "opt-cs-int-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "MTN / Vodafone MoMo API", optionType: "integration", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Direct mobile money collection without leaving your system.", sortOrder: 21 },
      { id: "opt-cs-int-3", serviceId: "a1000000-0000-0000-0000-000000000002", label: "WhatsApp / SMS Gateway", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Automated WhatsApp messages or bulk SMS from inside the system.", sortOrder: 22 },
      { id: "opt-cs-int-4", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Third-party API Connection", optionType: "integration", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "Connect your system to an external service (e.g. tax authority, courier).", sortOrder: 23 },
      { id: "opt-cs-time-1", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-cs-time-2", serviceId: "a1000000-0000-0000-0000-000000000002", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },
    ],
  },
  {
    id: "a1000000-0000-0000-0000-000000000003",
    name: "Mobile App Development",
    slug: "mobile-app",
    description: "Android and iOS apps for businesses and startups.",
    basePriceMin: "6000",
    basePriceMax: "18000",
    options: [
      { id: "opt-ma-sub-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Android Only", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Published on the Google Play Store.", sortOrder: 1 },
      { id: "opt-ma-sub-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "iOS Only", optionType: "subtype", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Published on the Apple App Store.", sortOrder: 2 },
      { id: "opt-ma-sub-3", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Android & iOS", optionType: "subtype", priceImpact: "4000", isMultiplier: false, multiplierValue: null, helperText: "A single codebase published on both stores.", sortOrder: 3 },
      { id: "opt-ma-feat-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "User Accounts / Login", optionType: "feature", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Users can sign up, log in, and manage their profile.", sortOrder: 10 },
      { id: "opt-ma-feat-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Push Notifications", optionType: "feature", priceImpact: "1000", isMultiplier: false, multiplierValue: null, helperText: "Send alerts to users even when the app is closed.", sortOrder: 11 },
      { id: "opt-ma-feat-3", serviceId: "a1000000-0000-0000-0000-000000000003", label: "In-app Chat / Messaging", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "Users can send messages to each other or to your team.", sortOrder: 12 },
      { id: "opt-ma-feat-4", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Offline Mode", optionType: "feature", priceImpact: "2000", isMultiplier: false, multiplierValue: null, helperText: "The app still works without an internet connection.", sortOrder: 13 },
      { id: "opt-ma-feat-5", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Maps & Location Services", optionType: "feature", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Show maps, track locations, or use GPS features.", sortOrder: 14 },
      { id: "opt-ma-feat-6", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Admin Web Panel", optionType: "feature", priceImpact: "2500", isMultiplier: false, multiplierValue: null, helperText: "A web dashboard for you to manage app content and users.", sortOrder: 15 },
      { id: "opt-ma-int-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Paystack / MoMo Payments", optionType: "integration", priceImpact: "1500", isMultiplier: false, multiplierValue: null, helperText: "Accept payments inside the app.", sortOrder: 20 },
      { id: "opt-ma-int-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Social Login (Google/Facebook)", optionType: "integration", priceImpact: "800", isMultiplier: false, multiplierValue: null, helperText: "Users can sign in with their Google or Facebook account.", sortOrder: 21 },
      { id: "opt-ma-int-3", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Firebase / Real-time Database", optionType: "integration", priceImpact: "1200", isMultiplier: false, multiplierValue: null, helperText: "Live data syncing across all users instantly.", sortOrder: 22 },
      { id: "opt-ma-time-1", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Standard Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: false, multiplierValue: null, helperText: "Delivered within the standard timeframe agreed at project kick-off.", sortOrder: 50 },
      { id: "opt-ma-time-2", serviceId: "a1000000-0000-0000-0000-000000000003", label: "Rush Timeline", optionType: "timeline", priceImpact: "0", isMultiplier: true, multiplierValue: "1.25", helperText: "Priority queue — 25% premium. Faster delivery may reduce revision rounds.", sortOrder: 51 },
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
