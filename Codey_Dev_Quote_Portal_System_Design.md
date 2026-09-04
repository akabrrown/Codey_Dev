<table><tbody><tr><td><strong>CODEY DEV</strong><br><strong>Client Request &amp; Automated Quote Portal</strong><br><em>System Design Document — Codey Dev</em></td></tr></tbody></table>

| **Field** | **Value** |
| --- | --- |
| **Document Version** | 1.0 |
| **Status** | Draft — for review before build |
| **Prepared For** | Codey Dev |
| **Related Documents** | Pricing List, Terms & Conditions, Company Policies, Service Agreement |

**1\. Problem Statement**
=========================

Today, every incoming project request is priced manually: a customer describes what they want over WhatsApp or email, and Codey Dev works out a price using the pricing ranges in the Pricing List. This is slow for the customer (no instant number), repetitive for Codey Dev (re-deriving the same hour × rate math each time), and easy to under- or over-quote when a request is rushed.  
This document specifies a self-service web portal where a customer selects the service they want, answers a short set of questions about scope (pages/screens, features, integrations, timeline), optionally uploads a requirements document, and receives an instant estimated price — built from the same pricing logic Codey Dev already uses. The submission lands in an admin dashboard where Codey Dev reviews it, adjusts the price if needed, and responds.

**2\. Goals & Non-Goals**
=========================

**Goals**
---------

*   Give customers an instant, defensible price estimate without manual back-and-forth.
*   Replace ad-hoc mental math with a single, auditable pricing engine that mirrors the Pricing List.
*   Give Codey Dev one place (admin dashboard) to see every request, its computed price, uploaded files, and status.
*   Let Codey Dev override the auto-computed price before sending a final quote — the engine estimates, the human decides.

**Non-Goals (Phase 1)**
-----------------------

*   Online contract signing — the existing Service Agreement remains a manually signed document for now (candidate for Phase 2, Section 16).
*   Deposit payment collection through the portal — payment continues via Mobile Money/bank transfer per the Payment Policy (Phase 2 candidate).
*   Customer login/account area to track request status — v1 is submit-and-be-contacted; a status-tracking portal is a Phase 2 candidate once request volume justifies it.

**3\. User Roles**
==================

Following the minimum-viable-role approach used across Codey Dev projects, this system has exactly two roles:

| **Role** | **Access** |
| --- | --- |
| **Admin (Codey Dev)** | Full access: view/manage all requests, download files, override pricing, change status, send quotes |
| **Public / Customer** | No login required: fills the request form, uploads files, receives the estimate and a confirmation email — no dashboard access |

<table><tbody><tr><td><strong>Why no customer login in v1</strong><br>A login system (accounts, password resets, sessions) adds real build and support cost. Since customers submit once and Codey Dev follows up directly (WhatsApp/email/call), a login area doesn't yet earn its complexity. Add it in Phase 2 if repeat customers or status-tracking demand grows.</td></tr></tbody></table>

**4\. User Journeys**
=====================

**4.1 Customer Journey**
------------------------

1.  Lands on the portal, selects a service category (Web Design, Custom Software, Mobile App, Maintenance, SEO).
2.  The form adapts: e.g. selecting "Custom Software" asks which type (POS, Inventory, HR, School Mgmt, Other); selecting "Web Design" asks number of pages and site type.
3.  Customer ticks the features/integrations they need (payment gateway, login system, admin panel, etc.) and picks a timeline (Standard / Rushed).
4.  As selections change, an estimated price range updates live on screen, computed by the Pricing Engine (Section 7).
5.  Customer enters contact details, optionally uploads a document (brief, logo, reference site), and submits.
6.  Customer sees a confirmation screen and receives a confirmation email with their estimate and reference number.

**4.2 Admin Journey**
---------------------

1.  Codey Dev receives an email notification of a new request and opens the Admin Dashboard.
2.  Reviews the request: selected options, computed estimate, uploaded file(s), and customer contact info.
3.  Downloads any uploaded files for review.
4.  Adjusts the price if the auto-estimate needs correction (e.g. unusually complex requirement), adds internal notes.
5.  Marks status (New → Reviewed → Quote Sent → Accepted / Declined → In Progress → Completed) and sends the final quote to the customer (email, generated from the request).

**5\. System Architecture**
===========================

| **Layer** | **Technology** | **Why** |
| --- | --- | --- |
| **Frontend & Forms** | Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui | Matches Codey Dev's standard stack; server components keep the public form fast on average customer connections |
| **Auth (admin only)** | Supabase Auth | Simple email/password or magic-link login for the single Admin role — no public auth needed |
| **Database** | Supabase PostgreSQL + Row-Level Security | Relational fit for services/options/pricing rules/requests; RLS locks all tables to admin-only reads except the public insert path |
| **File Uploads** | Cloudinary (signed uploads) | Signed, direct-from-browser uploads keep large files off the Next.js server; consistent with other Codey Dev projects |
| **Email Notifications** | Resend | Admin new-request alerts and customer confirmation/quote emails |
| **Rate Limiting / Abuse Protection** | Arcjet + Upstash Redis | Protects the public submission endpoint from spam/bot flooding since it requires no login |
| **Hosting** | Vercel | Zero-config deploy for Next.js, matches existing Codey Dev projects |

High-level flow: Customer Form (Next.js, public) → Pricing Engine (server-side calculation) → Supabase (request stored) → Resend (admin notified) → Admin Dashboard (Next.js, authenticated) → Supabase (status/price updated) → Resend (customer notified).

**6\. Data Model**
==================

**6.1 services**
----------------

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | uuid, PK |  |
| **name** | text | e.g. "Web Design", "Custom Software" |
| **slug** | text, unique | URL-safe key used by the form |
| **base\_price\_min / base\_price\_max** | numeric | Starting range before options are added, from the Pricing List |
| **active** | boolean | Hide a service from the form without deleting history |

**6.2 service\_options**
------------------------

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | uuid, PK |  |
| **service\_id** | uuid, FK → services |  |
| **label** | text | e.g. "Booking Calendar Page", "Paystack Integration" |
| **option\_type** | text | page / feature / integration / timeline |
| **price\_impact** | numeric | Hours × rate value this option adds (Section 7) |
| **is\_multiplier** | boolean | true for timeline options (e.g. Rush = ×1.25) instead of a flat add |

**6.3 requests**
----------------

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | uuid, PK |  |
| **reference\_no** | text, unique | Human-friendly code shown to the customer, e.g. CD-2026-0091 |
| **service\_id** | uuid, FK |  |
| **customer\_name / phone / email** | text |  |
| **notes** | text | Free-text "anything else" field from the customer |
| **estimated\_min / estimated\_max** | numeric | Auto-computed by the Pricing Engine at submission time |
| **final\_price** | numeric, nullable | Set by Admin once a firm quote is issued |
| **status** | text (enum) | new / reviewed / quote\_sent / accepted / declined / in\_progress / completed |
| **admin\_notes** | text | Internal-only, never shown to the customer |
| **created\_at / updated\_at** | timestamptz |  |

**6.4 request\_selections**
---------------------------

Join table recording exactly which service\_options a given request selected — preserves a full audit trail of how each estimate was calculated, even if pricing rules change later.

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | uuid, PK |  |
| **request\_id** | uuid, FK → requests |  |
| **service\_option\_id** | uuid, FK → service\_options |  |
| **price\_impact\_at\_time** | numeric | Snapshot of the option's price at submission — protects historical quotes from later price-list edits |

**6.5 request\_files**
----------------------

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | uuid, PK |  |
| **request\_id** | uuid, FK → requests |  |
| **cloudinary\_public\_id** | text |  |
| **file\_name / file\_type / file\_size** | text / text / integer | Shown in the admin dashboard before download |
| **uploaded\_at** | timestamptz |  |

**6.6 status\_log**
-------------------

Append-only history of status changes, so Codey Dev can see how long a request sat in each stage — useful later for spotting bottlenecks (e.g. quotes sitting too long before follow-up).

| **Field** | **Type** | **Notes** |
| --- | --- | --- |
| **id** | uuid, PK |  |
| **request\_id** | uuid, FK → requests |  |
| **from\_status / to\_status** | text |  |
| **changed\_at** | timestamptz |  |

**7\. Automated Pricing Engine — Design**
=========================================

**ADR: Rule-Based Additive Engine vs. Fixed Package Only**
----------------------------------------------------------

**_Context_**  
The portal needs to turn a variable set of customer choices (pages, features, integrations, timeline) into a price range in real time, without a developer manually estimating each submission.  
**_Decision_**  
Use a rule-based additive engine: every selectable option in service\_options carries a price\_impact value (in GH₵, derived from hours × Codey Dev's rate — the same method used to build the Pricing List). The engine sums base price + selected option impacts, then applies any multiplier options (e.g. Rush Timeline), and finally applies a fixed buffer percentage for revision/contingency headroom.  
**_Why not fixed packages only_**  
Packages (Basic/Standard/Premium) are excellent for repeat, well-understood products, but Custom Software requests vary too much in shape (a POS with 2 features priced the same as one with 8 is inaccurate). An additive engine lets each request be priced on what it actually contains, while packages can still be offered as pre-filled shortcuts on top of the same engine (Section 7.3).  
**_Consequences_**

*   Every price change only needs a service\_options row edited — no code redeploy to adjust prices.
*   Full transparency: the admin dashboard can show "why" a price came out a certain way, option by option.
*   Requires Codey Dev to seed and maintain accurate price\_impact values per option — see Section 7.2.

**7.1 Calculation Formula**
---------------------------

estimated\_min / estimated\_max = ( base\_price\_min/max + Σ selected non-multiplier option price\_impact ) × ( 1 + buffer% ) × ( timeline multiplier, if Rush selected )  
Default buffer% = 12% (matches the revision/contingency cushion already used in Codey Dev's manual quoting). Default rush multiplier = 1.25 (a 25% rush premium).

**7.2 Worked Example**
----------------------

Custom Software → POS System, with: Inventory Sync (feature), Paystack Integration, Rush Timeline.

| **Component** | **Value (GH₵)** |
| --- | --- |
| **Base (POS System, min–max)** | 8,000 – 20,000 |
| **\+ Inventory Sync feature** | +1,500 – 2,500 |
| **\+ Paystack Integration** | +800 – 1,600 |
| **Subtotal** | 10,300 – 24,100 |
| **\+ 12% buffer** | 11,536 – 26,992 |
| **× 1.25 rush multiplier** | ≈ 14,420 – 33,740 |

This mirrors the exact hours × rate + buffer + rush logic already taught for manual quoting — the portal just automates the arithmetic, and Codey Dev seeds the input numbers once.

**7.3 Package Shortcuts (optional layer on top)**
-------------------------------------------------

For services with well-understood tiers (e.g. POS Basic/Standard/Premium), the form can offer a "Quick Pick" that pre-selects the matching service\_options for that tier, then still lets the customer add/remove individual options from there — giving both a fast path and full customization on the same engine.

**8\. Dynamic Form Design**
===========================

*   Step 1 — Service category (radio cards): Web Design, Custom Software, Mobile App, Maintenance, SEO.
*   Step 2 — Conditional sub-type: e.g. Custom Software reveals POS / Inventory / HR / School Mgmt / Other; Web Design reveals page-count and site-type (business / e-commerce / school-NGO-corporate).
*   Step 3 — Feature & integration checklist, scoped to the chosen service (pulled live from service\_options where service\_id matches).
*   Step 4 — Timeline choice: Standard or Rushed, with the rush note ("+25%") shown inline for transparency.
*   Step 5 — Live estimate panel, sticky on screen, recalculating on every change (client-side estimate for responsiveness, re-verified server-side on submit so a manipulated client price can never be saved).
*   Step 6 — Contact details + optional file upload + free-text notes + submit.

<table><tbody><tr><td><strong>Security Note</strong><br>The estimate shown while filling the form is calculated client-side for a snappy experience, but the price actually stored on submission is always recalculated server-side from the selected option IDs. This prevents a customer from tampering with browser requests to submit a fake low price.</td></tr></tbody></table>

**9\. File Uploads**
====================

*   Uploads go directly from the customer's browser to Cloudinary via a signed upload URL generated by a Next.js server action — files never pass through the app server, keeping it fast under load.
*   Accepted types: PDF, DOCX, JPG, PNG. Max size: 10MB per file, up to 3 files per request (configurable).
*   Each successful upload writes a row to request\_files, linked to the request, so the Admin Dashboard can list and download them directly from Cloudinary.
*   Files are private (not publicly listable) — download links are signed and only generated when an authenticated Admin requests them.

**10\. Admin Dashboard**
========================

**10.1 Request Queue**
----------------------

*   Table view of all requests: reference no., customer, service, estimate range, status, date submitted — filterable by status and service, sortable by date/value.
*   New requests are visually flagged until opened for the first time.

**10.2 Request Detail View**
----------------------------

*   Full breakdown of selected options and how the estimate was built (each option and its price\_impact, per Section 7.2's format).
*   Uploaded files, each with a Download button.
*   Editable final\_price field, with a required short reason note if it differs from the auto-estimate (keeps a record of why manual judgment overrode the engine).
*   Status dropdown with the workflow from Section 4.2; every change is written to status\_log.
*   "Send Quote" action — generates and sends a branded quote email (Resend) to the customer with the final price and a link/attachment referencing the Pricing List, Terms & Conditions, and next steps to sign the Service Agreement.

**10.3 Pricing Rules Manager**
------------------------------

*   A simple settings screen listing all services and service\_options, where Codey Dev can add new options, edit price\_impact values, or deactivate an option — without needing a developer to change code, since this is exactly what the Pricing List should stay in sync with.

**11\. Notifications**
======================

| **Trigger** | **Recipient** | **Content** |
| --- | --- | --- |
| **New request submitted** | Admin | Reference no., service, estimate range, link to Admin Dashboard |
| **Request submitted** | Customer | Confirmation, reference no., estimate range, "we'll follow up within X hours" |
| **Quote sent by Admin** | Customer | Final price, validity period, link/attachment to Terms & Policies, next step (deposit + Service Agreement) |

**12\. Security & Access Control**
==================================

*   Supabase RLS: requests, request\_files, request\_selections, status\_log — SELECT/UPDATE restricted to authenticated Admin role only. Public role is granted INSERT-only on requests/request\_selections/request\_files via a narrow policy, and cannot read back other customers' data.
*   Arcjet rate-limiting on the public submission endpoint (e.g. max 5 submissions per IP per hour) to prevent spam/bot flooding, backed by Upstash Redis.
*   Server-side re-validation of the submitted price (Section 8) prevents client-side tampering.
*   Admin auth via Supabase Auth (email/password or magic link); no public sign-up path exists for the admin login.
*   Uploaded files scanned for allowed MIME types/extensions before accepting, to reduce malicious file risk.

**13\. Infrastructure & Free-Tier Strategy**
============================================

| **Service** | **Free Tier Sufficient Until** | **Upgrade Trigger** |
| --- | --- | --- |
| **Supabase** | 500MB DB, 50K monthly active users | Request volume/database size approaching limits — Pro plan ($25/mo) |
| **Vercel (Hobby)** | 100GB bandwidth/month | Traffic spikes from marketing pushes — upgrade to Pro |
| **Cloudinary** | 25 monthly credits (~25GB storage/bandwidth combined) | High volume of large file uploads — paid tier |
| **Resend** | 3,000 emails/month, 100/day | High submission volume — paid tier |
| **Upstash Redis** | 10,000 commands/day | Very unlikely to be hit by rate-limiting alone — monitor only |

**14\. Non-Functional Requirements**
====================================

*   Performance: public form should be interactive within 2 seconds on an average Ghanaian mobile connection (3G/4G) — favor server components and minimal client JS on the form.
*   Mobile-first: the majority of customers will fill this form on a phone; the form must work well on small screens (matches Codey Dev's existing mobile-responsive standard).
*   Accessibility: form fields properly labeled, sufficient color contrast on the navy/teal/orange palette, keyboard-navigable.
*   Auditability: every price shown to a customer must be reconstructable later from request\_selections — no price is ever "just a number" with no explanation.

**15\. Assumptions & Open Questions**
=====================================

*   Assumes Codey Dev will seed and periodically review service\_options price\_impact values — the engine is only as accurate as this data.
*   Assumes a single Admin user for v1; if a second team member joins, Supabase Auth already supports adding a second admin account with the same RLS role.
*   Open question: should declined/abandoned requests auto-expire or archive after a set period? Suggested default: no auto-deletion, but a "stale" flag after 30 days with no status change, to prompt follow-up.
*   Open question: should the public form require the customer to accept the Terms & Conditions before submitting (checkbox), even though no payment is taken at this stage? Recommended: yes — sets expectations early and keeps a submission-time record of acceptance.

**16\. Phase 2 Roadmap**
========================

1.  Customer accepts quote online → triggers Paystack deposit payment (50%) directly from the quote email.
2.  Auto-generate a pre-filled Service Agreement (from the accepted request data) for e-signature.
3.  Customer-facing status tracking (magic-link, no password) to check progress without contacting Codey Dev directly.
4.  Analytics dashboard: conversion rate from request → accepted quote, average time-to-quote, most-requested service types — to refine the Pricing List over time.

<table><tbody><tr><td><strong>Next Step</strong><br>This document is ready for review. Once approved, the standard Codey Dev sequence continues: Operational Workflow Guide → Figma Prompt Library → Developer Handoff Spec, before implementation begins.</td></tr></tbody></table>