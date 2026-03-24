# Calendly Integration Plan - LawFirm-Prototype

This document outlines the strategy for replacing the current Cal.com booking system with a customized Calendly integration.

**Core Philosophy:** 
- **Embed-Only**: We use the Calendly JS embed, NOT the Scheduling API. 
- **Calendly-Native Management**: Admins manage all Event Types, Questions, Locations, and Timezones directly within the Calendly Dashboard. Our site acts only as a branded portal for this experience.

## A) Recommended Embed Approach
We will use the **Calendly Advanced JS Embed** (triggered via the `window.Calendly` global) to power a **Multi-Step Modal**.

### 1. Configuration & Setup
- [x] Record Calendly Event Type URL and branding colors in `lib/calendly-config.ts`.
- [x] Add `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_BRAND_COLOR`, etc., to `.env`.
- [x] Update `types/calendly.d.ts` to support the custom prefill object.

### 2. The Multi-Step Booking Modal
- [x] **Phase 1: Qualification Form**: Create a 2-page form inside `BookingModal.tsx`.
- [x] **Phase 2: Calendly Integration**: On the final page, load the Calendly embed with prefilled data.

### 3. Data Capture & Handover
The modal asks 5 high-level questions for lead capture, which are then carried into Calendly:
1. **Full Name** -> (Passed to Calendly field: Name)
2. **Email Address** -> (Passed to Calendly field: Email)
3. **Legal Area** -> (Passed to internal context/prefill)
4. **Company / Entity Name** -> (Passed to internal context/prefill)
5. **Conflict Check / Objective** -> (Passed as part of the "Notes" or prefill to Calendly)

*Note: All final booking logic (e.g., secondary questions or specific locations) is managed by admins inside their Calendly account.*

### 4. Integration Triggers
- [x] **Header Button**: Update the "Book Strategic Session" icon (beside the Email icon) in `HeaderMobileFirst.tsx` to open the modal.
- [x] **Primary Hero CTA**: Update "Book Strategic Session" in `Hero.tsx` to open the modal.
- [x] **Contact Form Submission**: Update `ContactForm.tsx` to trigger the modal upon "Continue" or "Submit", mapping captured Name/Email to the modal context.
- [x] **Booking Section**: Update `BookingSection.tsx` (centered premium CTA) to open the modal.

### 5. Final Implementation Checklist
- [x] **Environment Setup**: `NEXT_PUBLIC_CALENDLY_URL` and branding tokens configured in `.env`.
- [x] **TypeScript Definitions**: `window.Calendly` properly typed in `types/calendly.d.ts`.
- [x] **Security Headers**: No CSP or SSR issues with `next/script` loading.
- [x] **Multi-Step Persistence**: Modal correctly captures and holds 5 qualification questions.
- [x] **Data Handover**: Name & Email successfully prefill into the Calendly widget.
- [x] **Branding Alignment**: Widget background matches site dark theme (#0b0e14).
- [x] **Trigger Sync**: All "Book Strategic Session" buttons throughout the site open the new modal.
- [x] **Legacy Cleanup**: Removed `@calcom/embed-react` and associated legacy files.
