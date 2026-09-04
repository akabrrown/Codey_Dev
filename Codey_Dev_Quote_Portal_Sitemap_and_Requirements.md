<table><tbody><tr><td><strong>CODEY DEV</strong><br><strong>Client Request &amp; Automated Quote Portal</strong><br><em>Site Map &amp; Pre-Build Requirements — Codey Dev</em></td></tr></tbody></table>

| **Field** | **Value** |
| --- | --- |
| **Document Version** | 1.0 |
| **Purpose** | Full route map of the system, plus everything that must be prepared before build starts |
| **Related Documents** | System Design Document, Operational Workflow Guide, Figma Prompt Library |

**1\. Purpose**
===============

The System Design Document defines how the portal works; the Figma Prompt Library defines how it looks. This document defines what pages exist and in what structure (the site map), and lists everything — content, accounts, credentials, and data — that needs to be ready before development begins, so the build isn't blocked partway through waiting on missing pieces.

**2\. Site Map — Full Route Tree**
==================================

**2.1 Public Site (no login required)**
---------------------------------------

*   / — Landing — introduces the portal, links into the request flow
    *   /request — Step 1: Service Selection
    *   /request/\[service\] — Step 2: Conditional Sub-Type
    *   /request/\[service\]/features — Step 3: Features & Integrations Checklist
    *   /request/\[service\]/timeline — Step 4: Timeline Selection
    *   /request/\[service\]/details — Step 5: Contact & Upload
    *   /request/confirmation/\[reference\] — Confirmation screen after submission
*   /pricing — Public pricing overview (summarized version of the Pricing List document, for browsing before starting a request)
*   /terms — Terms & Conditions (public-readable page, linked from the request form's consent checkbox)
*   /policies — Company Policies (public-readable page)
*   /contact — Direct contact details (phone, WhatsApp, email) for customers who prefer not to use the form

**2.2 Admin Area (authenticated — Admin role only)**
----------------------------------------------------

*   /admin/login — Admin sign-in
    *   /admin — Request Queue (default landing page after login)
    *   /admin/requests/\[id\] — Request Detail View
    *   /admin/pricing — Pricing Rules Manager
    *   /admin/pricing/\[serviceId\] — Edit a specific service's options
    *   /admin/settings — Admin account settings (change password, notification email)

**3\. Route Reference Table**
=============================

| **Route** | **Access** | **Primary Purpose** |
| --- | --- | --- |
| **/** | Public | Entry point, explains the portal, CTA into /request |
| **/request → /request/.../details** | Public | 5-step request flow (Section 2.1) |
| **/request/confirmation/\[reference\]** | Public | Post-submission confirmation and reference number |
| **/pricing** | Public | Browsable summary pricing, builds trust before committing to the form |
| **/terms, /policies** | Public | Legal/consent reference pages |
| **/contact** | Public | Fallback for customers who prefer direct contact |
| **/admin/login** | Public (form only) | Authentication gate into the admin area |
| **/admin** | Admin | Daily operations hub — request queue |
| **/admin/requests/\[id\]** | Admin | Review, price-adjust, and quote a single request |
| **/admin/pricing** | Admin | Maintain service\_options and prices |
| **/admin/settings** | Admin | Account-level settings |

**4\. Page-Level Requirements Inventory**
=========================================

What each page needs before it can be built — content, data, and logic.

**4.1 Landing (/)**
-------------------

*   Content needed: headline, short intro copy, 3–5 trust points (e.g. "200+ projects delivered", turnaround promise), CTA button text.
*   Assets needed: Codey Dev logo (already available from the flyer), optional hero graphic using the circuit-pattern motif.

**4.2 Request Flow (/request/...)**
-----------------------------------

*   Data needed: finalized list of services, sub-types, features/integrations, and their price\_impact values (Section 6 below) — this is the single biggest blocker to starting build, since the whole flow is driven by this data.
*   Copy needed: field labels, helper text for each option (short explanations customers may not understand, e.g. what "Paystack Integration" means), validation error messages.
*   Logic needed: which options are mutually exclusive vs. combinable (e.g. can a customer pick both "E-commerce Website" and "Landing Page" base types? Recommended: no — sub-type selection should be single-select per service).

**4.3 Confirmation Screen**
---------------------------

*   Copy needed: confirmation message, expected follow-up time commitment (e.g. "within 24 hours") — should match what Codey Dev can realistically deliver on.

**4.4 /pricing, /terms, /policies**
-----------------------------------

*   Content: directly sourced from the existing Pricing List, Terms & Conditions, and Company Policies documents — these need to be converted to web copy (not just linked as Word docs) so they're readable on-site.

**4.5 Admin Request Queue & Detail**
------------------------------------

*   Data needed: none beyond what's defined in the System Design Document's data model — this page is generated dynamically from submitted requests.
*   Decision needed: default sort order for the queue (recommended: newest first, with unopened requests pinned to the top regardless of age).

**4.6 Admin Pricing Rules Manager**
-----------------------------------

*   Data needed: the same finalized pricing data from Section 4.2 — this page is simply the editable interface over that data, so it can't be meaningfully tested until real pricing data exists.

**5\. Navigation & User Flow**
==============================

Public request flow (linear, with back navigation allowed at every step):

1.  Landing → "Start a Request" CTA
2.  Step 1: Service Selection → auto-advances on selection
3.  Step 2: Conditional Sub-Type → Continue button
4.  Step 3: Features & Integrations → Continue button (live estimate visible throughout)
5.  Step 4: Timeline → Continue button
6.  Step 5: Contact & Upload → Submit button
7.  Confirmation Screen → optional links back to / or /pricing

Admin flow (see Operational Workflow Guide, Section 6, for the full day-to-day routine):

1.  Login → Request Queue (default view)
2.  Select a request → Detail View → adjust/send quote → back to Queue
3.  Separately: Pricing Rules Manager, accessed via sidebar navigation at any time

**6\. Pricing Data — Required Before Build**
============================================

<table><tbody><tr><td><strong>This is the critical blocker</strong><br>The request flow, live estimate, and Pricing Rules Manager all depend on one thing: a finalized table of every service, sub-type, feature, integration, and their price_impact values. Development can start on layout and static pages without this, but the core request flow cannot be meaningfully built or tested until it exists.</td></tr></tbody></table>

Recommended format to prepare this in before build (a simple spreadsheet works well): Service | Sub-Type | Option Label | Option Type (page/feature/integration/timeline) | Price Impact Min | Price Impact Max | Notes. This can be derived directly from the existing Pricing List document — it just needs to be broken into individual line items rather than price ranges per whole service.

**7\. Accounts & Credentials Checklist**
========================================

Set these up before development begins, so environment variables (Operational Workflow Guide, Section 4) can be filled in from day one.

| **Account** | **Needed For** | **Status** |
| --- | --- | --- |
| **Supabase project** | Database, Auth, RLS | ☐ To create |
| **Cloudinary account** | File uploads | ☐ To create |
| **Resend account + verified sending domain** | Email notifications | ☐ To create |
| **Arcjet account** | Rate limiting / abuse protection | ☐ To create |
| **Upstash Redis database** | Backing store for Arcjet rate limiting | ☐ To create |
| **Vercel account** | Hosting/deployment | ☐ To create |
| **Domain name** | Public URL for the portal | ☐ To register / confirm |
| **GitHub repository** | Source control | ☐ To create |

**8\. Content & Asset Checklist**
=================================

*   Final, itemized pricing data (Section 6) — highest priority.
*   Logo files in web-ready formats (SVG preferred, PNG fallback) — can be extracted/recreated from the existing flyer.
*   Web-ready copies of Terms & Conditions and Company Policies (converted from the Word documents to page content).
*   Landing page copy (headline, intro, trust points, CTA text).
*   Confirmation and quote email templates — tone and content to match the branded document style already established.
*   Realistic follow-up time commitment for the confirmation message (must match what Codey Dev can actually deliver).
*   Decision on mutually-exclusive vs. combinable options (Section 4.2) for each service.

<table><tbody><tr><td><strong>How This Fits the Documentation Set</strong><br>With the Site Map &amp; Pre-Build Requirements complete alongside the System Design Document, Operational Workflow Guide, and Figma Prompt Library, all four pieces together give a developer everything needed to move into the Developer Handoff Spec once Figma screens are generated and reviewed.</td></tr></tbody></table>