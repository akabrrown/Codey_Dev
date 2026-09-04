<table><tbody><tr><td><strong>CODEY DEV</strong><br><strong>Client Request &amp; Automated Quote Portal</strong><br><em>Operational Workflow Guide — Codey Dev</em></td></tr></tbody></table>

| **Field** | **Value** |
| --- | --- |
| **Document Version** | 1.0 |
| **Audience** | Codey Dev (Admin/Operator), and any future team member |
| **Related Documents** | System Design Document, Pricing List |

**1\. Purpose**
===============

The System Design Document explains what the portal is and how it's built. This guide explains how to run it day-to-day: setting up your machine, deploying changes, processing incoming requests, keeping pricing rules accurate, and handling things going wrong. Follow this guide alongside the System Design Document, not instead of it.

**2\. Environments**
====================

| **Environment** | **Purpose** | **URL Pattern** |
| --- | --- | --- |
| **Local** | Your machine — day-to-day development and testing | http://localhost:3000 |
| **Preview** | Automatic, per pull request — safe place to test a change before it goes live | <branch-name>.vercel.app |
| **Production** | The live portal customers use | yourdomain.com (or the assigned Vercel domain) |

**3\. Local Development Setup (Windows)**
=========================================

All commands below use PowerShell, matching your Windows development environment.

**3.1 First-time setup**
------------------------

git clone <repository-url>  
cd quote-portal  
npm install  
copy .env.example .env.local  
Open .env.local in your editor and fill in the values listed in Section 4 below.

**3.2 Running locally**
-----------------------

npm run dev  
Visit http://localhost:3000 for the public form, and http://localhost:3000/admin for the dashboard (log in with your Supabase Admin credentials).

**3.3 Common commands**
-----------------------

| **Command** | **What it does** |
| --- | --- |
| **npm run dev** | Start local development server with hot reload |
| **npm run build** | Production build — run this before pushing if you changed config |
| **npm run lint** | Check code style issues |
| **npx supabase db push** | Apply local schema changes to your Supabase project |

**4\. Environment Variables / Secrets Checklist**
=================================================

Never commit real values to Git. Keep a private copy of these outside the repo (e.g. in a password manager) as a backup.

| **Variable** | **Where to get it** |
| --- | --- |
| **NEXT\_PUBLIC\_SUPABASE\_URL / ANON\_KEY** | Supabase Project → Settings → API |
| **SUPABASE\_SERVICE\_ROLE\_KEY** | Supabase Project → Settings → API (server-side only — never expose to the browser) |
| **CLOUDINARY\_CLOUD\_NAME / API\_KEY / API\_SECRET** | Cloudinary Dashboard → Settings → Access Keys |
| **RESEND\_API\_KEY** | Resend Dashboard → API Keys |
| **ARCJET\_KEY** | Arcjet Dashboard → Site → API Key |
| **UPSTASH\_REDIS\_REST\_URL / TOKEN** | Upstash Console → Redis Database → REST API |
| **ADMIN\_NOTIFICATION\_EMAIL** | The inbox that should receive new-request alerts (e.g. codey.it360@gmail.com) |

**5\. Deployment Workflow**
===========================

1.  Create a branch for your change: git checkout -b fix/short-description
2.  Make your change locally, test at localhost:3000.
3.  Commit and push: git add ., then git commit -m "message", then git push origin <branch-name>.
4.  Vercel automatically creates a Preview Deployment — open the preview URL and test the change on a real deployed environment before going further.
5.  Open a pull request on GitHub, merge to main once satisfied.
6.  Vercel automatically deploys main to Production — no manual deploy step needed.

<table><tbody><tr><td><strong>Never edit pricing rules through code changes</strong><br>Price adjustments (Section 7) should go through the admin dashboard's Pricing Rules Manager, not a code deploy — this keeps price history accurate and avoids needing a developer for every price tweak.</td></tr></tbody></table>

**6\. Daily Admin Operations**
==============================

Suggested routine each time a new-request email arrives (or once daily if volume is low):

1.  Open the Admin Dashboard → Request Queue. New requests are flagged.
2.  Open the request. Review the selected options, computed estimate, and any uploaded files (download and check them).
3.  Decide: does the auto-estimate look right for this specific request, or does it need a manual adjustment (e.g. an unusually complex "Other" custom software request)?
4.  If adjusting, enter the final\_price and a short reason note (this is required — it keeps a record for future pricing-rule improvements).
5.  Change status to Reviewed, then use "Send Quote" to email the customer the final number, referencing the Pricing List/Terms.
6.  Follow up outside the system (WhatsApp/call) if no response within your usual follow-up window.
7.  Once a customer accepts and pays the deposit (per the Payment Policy), update status to Accepted, then In Progress once work starts, and Completed at handover.

**7\. Pricing Rules Maintenance**
=================================

The portal's prices should always match the published Pricing List. Update both together.

1.  Open Admin Dashboard → Pricing Rules Manager.
2.  To change a price: edit the price\_impact (or base price) field for the relevant service/option and save — this applies to new requests only; past requests keep their snapshot (Section 6.4 of the System Design Document).
3.  To add a new option (e.g. a new integration you now offer): create a new service\_option row with a label, type, and price\_impact.
4.  To retire an option: mark it inactive rather than deleting it, so historical requests that used it still display correctly.
5.  After any pricing change, update the Codey Dev Pricing List document to match, so the public-facing document and the live portal never contradict each other.

**8\. Monitoring & Backups**
============================

*   Supabase provides automatic daily backups on paid tiers; on the free tier, export a manual backup periodically (Supabase Dashboard → Database → Backups) until upgrading.
*   Check the Vercel dashboard occasionally for failed deployments or function errors.
*   Check Resend's dashboard periodically to confirm notification emails are being delivered, not bouncing or landing in spam.
*   Consider a free uptime monitor (e.g. Uptime Kuma or a similar free tool) pinging the public form URL, so you're alerted if the site goes down rather than finding out from a customer.

**9\. Incident Response**
=========================

| **Symptom** | **Likely Cause** | **First Steps** |
| --- | --- | --- |
| **Form loads but submit fails** | Supabase down, or RLS policy blocking insert | Check Supabase status page; check Vercel function logs for the error |
| **No admin notification email arrives** | Resend key expired/rate-limited, or email in spam | Check Resend dashboard delivery logs; check spam folder |
| **File upload fails** | Cloudinary quota exceeded, or signed URL expired | Check Cloudinary usage dashboard; verify signed upload endpoint is working |
| **Estimate looks wrong** | A pricing rule was misconfigured | Check Pricing Rules Manager for the affected service\_option; compare with Pricing List |
| **Site fully down** | Vercel deployment failure or domain/DNS issue | Check Vercel dashboard deployment status; check domain DNS settings |

**10\. Change Management — Adding a New Service Category**
==========================================================

1.  Decide the new service's base price range and add it as a new row in the Pricing List document first (source of truth for the business decision).
2.  Add the corresponding service row via the Pricing Rules Manager (or a database migration if the change is structural, e.g. a wholly new option\_type).
3.  Add its service\_options (pages/features/integrations relevant to it) with price\_impact values.
4.  Test the new category end-to-end on a Preview Deployment before it reaches Production.
5.  Announce the new service on your usual channels (WhatsApp status, social media) once live.

<table><tbody><tr><td><strong>Next in the Documentation Sequence</strong><br>With this guide in place, the next document is the Figma Prompt Library — screen-by-screen prompts for designing the public form and Admin Dashboard, followed by the Developer Handoff Spec once designs are reviewed.</td></tr></tbody></table>