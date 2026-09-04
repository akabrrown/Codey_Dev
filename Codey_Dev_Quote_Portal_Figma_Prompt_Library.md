<table><tbody><tr><td><strong>CODEY DEV</strong><br><strong>Client Request &amp; Automated Quote Portal</strong><br><em>Figma Prompt Library — Codey Dev</em></td></tr></tbody></table>

| **Field** | **Value** |
| --- | --- |
| **Document Version** | 1.0 |
| **Purpose** | Screen-by-screen prompts for generating Figma design frames (AI Figma tools or manual design brief) |
| **Related Documents** | System Design Document, Operational Workflow Guide |

**1\. How to Use This Library**
===============================

Each prompt below describes one screen: its purpose, key elements, and the specific instruction to give a Figma AI design tool (or a human designer as a brief). Prompts are written to be pasted in directly. Generate screens in the order listed — later screens reference components established in earlier ones (e.g. the button and card styles from the Design Foundations screen).

**2\. Brand Foundations**
=========================

**Color Palette**
-----------------

| **Token** | **Hex** | **Usage** |
| --- | --- | --- |
| **Navy Dark** | #0E2338 | Headers, primary buttons, footer |
| **Navy** | #16324F | Section backgrounds, secondary surfaces |
| **Teal / Cyan** | #35C4E0 | Links, active states, progress indicators, accents |
| **Orange** | #F0522A | Call-to-action buttons, alerts, "Rush" badges |
| **Light Teal Tint** | #E7F6FA | Info callouts, selected-option backgrounds |
| **Light Orange Tint** | #FDEAE4 | Warning states, price-change indicators |
| **Neutral Text** | #3A3A3A | Body copy |
| **White** | #FFFFFF | Base background, card surfaces |

**Typography**
--------------

*   Headings: bold, sentence case, navy dark — matches the flyer's confident, blocky headline style.
*   Body: clean sans-serif (Inter or similar), neutral grey text for readability on white/light backgrounds.
*   Avoid thin/light font weights for headings — the brand's flyer uses bold, high-contrast type.

**3\. Anti-AI-Generic Design Rules**
====================================

Apply these across every screen in this library:

*   No glassmorphism, no gradient blobs, no generic centered-hero SaaS template layout.
*   No uniform pill-shaped buttons on every element — use the flyer's angled/chevron motif (the "C" logomark shape) as an occasional accent, not literally repeated everywhere.
*   No stock 3D illustrations or generic "team high-fiving" imagery — if imagery is needed, favor the circuit-board/tech-pattern motif from the flyer background, used sparingly.
*   Buttons and cards should use sharp-to-slightly-rounded corners (4–8px), not fully pill-shaped, matching the flyer's angular banner shapes.
*   The diagonal-cut banner shapes from the flyer (navy banner with an angled bottom edge, orange accent shape behind it) are a distinctive brand element — reuse this shape language for section dividers instead of plain rectangles.

**4\. Public Form — Step 1: Service Selection**
-----------------------------------------------

The customer's entry point. Large, clear category cards — no login required.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design a mobile-first landing screen for a service request form. Header: navy dark (#0E2338) bar with 'CODEY DEV' logomark top-left, angled bottom edge matching a chevron motif. Below: heading 'What can we build for you?' in bold navy. Five large selectable cards in a responsive grid (single column on mobile): Web Design &amp; Development, Custom Software, Mobile App Development, Website Maintenance, SEO Services — each card has an icon, title, and one-line description, white background, subtle border, teal (#35C4E0) highlight ring on hover/selected state. A slim progress indicator at the top shows 'Step 1 of 6'. Sharp-to-slightly-rounded corners (6px), no pill shapes, no gradients.</td></tr></tbody></table>

**5\. Public Form — Step 2: Conditional Sub-Type**
--------------------------------------------------

Adapts based on Step 1 selection — shown here for the Custom Software path.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design Step 2 of the request form, shown after 'Custom Software' is selected in Step 1. Heading: 'What type of system do you need?'. Radio-card options: POS System, Inventory Management, HR Management, School Management, Other. Selected card gets a teal left-border accent (4px) and light teal tint background (#E7F6FA), matching the callout box style used in Codey Dev documents. Back button (text link, top-left) and Continue button (solid navy #0E2338, white text, sharp corners) at the bottom, sticky on mobile.</td></tr></tbody></table>

**6\. Public Form — Step 3: Features & Integrations Checklist**
---------------------------------------------------------------

Where the price starts building up — shown alongside a live estimate.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design Step 3: a checklist screen split into two zones on desktop (single scrolling column on mobile). Left/top zone: heading 'Select the features you need' with checkbox list items grouped under sub-headings (e.g. 'Core Features', 'Integrations') — each item shows its label and a small '+GH₵X – Y' tag in grey next to it. Right/bottom zone: a sticky summary card with navy dark background showing 'Estimated Price' in teal, a large price range in white bold text, and a breakdown list of selected items with their contribution — this card should visually feel like the price is 'live' and updating, with a subtle animated-feel highlight on the total when changed.</td></tr></tbody></table>

**7\. Public Form — Step 4: Timeline Selection**
------------------------------------------------

Simple binary choice with a transparent rush-fee note.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design Step 4: two large selectable cards side by side (stacked on mobile) — 'Standard Timeline' (no extra badge) and 'Rush Timeline' with an orange (#F0522A) badge reading '+25%'. Below the cards, a short reassurance line: 'Rush projects are prioritized but may affect revision turnaround.' The live estimate summary card from Step 3 remains visible, updating instantly when Rush is toggled to show the recalculated range.</td></tr></tbody></table>

**8\. Public Form — Step 5: Contact & Upload**
----------------------------------------------

Final step before submission — contact fields plus optional file upload.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design Step 5: a clean form with fields for Full Name, Business Name (optional), Phone Number, Email, and a large textarea labeled 'Anything else we should know?'. Below, a drag-and-drop file upload zone with a dashed teal border, upload icon, and text 'Drop files here or click to upload (PDF, DOCX, JPG, PNG — max 10MB each, up to 3 files)'. A checkbox: 'I agree to the Terms &amp; Conditions' (linked text in teal). Large orange (#F0522A) 'Submit Request' button at the bottom. The live estimate card remains visible as a final confirmation of what they're about to submit.</td></tr></tbody></table>

**9\. Public Form — Confirmation Screen**
-----------------------------------------

Shown immediately after successful submission.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design a confirmation screen: centered checkmark icon in a teal circle, heading 'Request Received!' in bold navy, sub-text showing the reference number (e.g. 'Reference: CD-2026-0091') and the estimated range once more, and a message: 'We'll review your request and follow up within 24 hours.' Include the Codey Dev contact details (phone, WhatsApp, email) as a secondary block below, and a subtle background echo of the flyer's circuit-pattern texture in the top corner, kept light so it doesn't compete with the confirmation message.</td></tr></tbody></table>

**10\. Admin Dashboard — Request Queue**
----------------------------------------

The Admin's daily working view — desktop-first, must also work on tablet.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design an admin dashboard list view. Left sidebar: navy dark (#0E2338) with Codey Dev logomark, nav items (Requests, Pricing Rules, Settings), teal highlight on active item. Main area: a table of requests with columns Reference No., Customer, Service, Estimated Range, Status (as a colored pill: grey=New, teal=Reviewed, orange=Quote Sent, green=Accepted), Date. Filter bar above the table (status dropdown, service dropdown, search box). New/unopened requests have a small teal dot indicator next to the reference number. Table rows have subtle alternating shading matching the document tables (white / #F2F8FA).</td></tr></tbody></table>

**11\. Admin Dashboard — Request Detail View**
----------------------------------------------

Where the admin reviews, adjusts price, and sends the quote.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design a request detail screen, opened from the queue. Top: reference number, customer name/contact, and current status pill, with a status-change dropdown. Main body in two columns (stack on smaller screens): left column shows the full option breakdown (each selected feature/integration with its price contribution, in a bordered list mirroring the pricing tables used in Codey Dev documents) ending in a bold total estimate; right column shows uploaded files as cards with a download icon, plus an internal 'Admin Notes' textarea (light grey background to signal it's internal-only). Below: an editable 'Final Price' input field with a required 'Reason for adjustment' text field that only appears if the entered price differs from the auto-estimate. Bottom action bar: 'Save' (outline button) and 'Send Quote to Customer' (solid orange #F0522A button).</td></tr></tbody></table>

**12\. Admin Dashboard — Pricing Rules Manager**
------------------------------------------------

Where prices are maintained without a code deploy.

<table><tbody><tr><td><strong>FIGMA PROMPT</strong><br>Design a settings-style screen listing all services as expandable sections; each expands to show its service_options in an editable table (Label, Type, Price Impact GH₵, Active toggle). An 'Add Option' button (teal outline) sits at the bottom of each service section, and an 'Add New Service' button (solid navy) sits at the top of the page. Include a small info banner at the top: 'Changes here apply to new requests only — existing quotes are unaffected,' styled like the info callouts used in Codey Dev documents (light teal background, teal left border).</td></tr></tbody></table>

<table><tbody><tr><td><strong>Next in the Documentation Sequence</strong><br>Once these screens are generated and reviewed, the final step is the Developer Handoff Spec — translating the approved designs into layout, token, and component specifications ready for implementation.</td></tr></tbody></table>