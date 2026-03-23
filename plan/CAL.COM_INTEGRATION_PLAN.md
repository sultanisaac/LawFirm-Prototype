# CAL.COM_INTEGRATION_PLAN.md (Revised: Modal-First Strategy)

This document outlines the redirected strategy for integrating **Cal.com** into the Nusalexa Law Firm prototype. Following user feedback, we are pivoting to a **Multi-Step Modal Flow** to maximize qualification before showing the booking widget.

---

## A) High-Level Workflow
1.  **Triggers:**
    -   **Header/Hero CTA:** "Book Strategic Session" opens the Booking Modal at Page 1.
    -   **Contact Form:** Clicking "Continue to Details" (after Step 1) redirects to the Booking Modal.
2.  **Modal Steps:**
    -   **Page 1 (The "Gate"):** 5 Prequalification Questions (Collecting data like Email, Conflict check).
    -   **Page 2 (The "Booking"):** Cal.com widget opens *after* questions are answered.
3.  **Data Persistence:** User Name, Email, and Topic are passed into the Cal.com embed for a prefilled experience.

---

## B) Suggested Qualification Questions
These questions ensure the lawyer is prepared and that no conflict of interest exists:
1.  **Email Address:** "Where should we send your booking confirmation and legal guide? (Required for invite)"
2.  **Entity Type:** "Is this legal matter for you personally or for an Indonesian PT/PMA company?"
3.  **Conflict Check:** "Do you have an opposing party? (Enter Name or 'N/A')" — *Critical for law firm compliance.*
4.  **Case Status:** "Have you received a legal notice or spoken with other counsel on this specific matter yet?"
5.  **Target Outcome:** "Briefly describe your ideal outcome for this session (e.g., 'Incorporate by next week')."

---

## C) Step-by-Step Task List

### 1. Structure & Navigation
- [x] Add env vars to `.env`.
- [x] Install `@calcom/embed-react`.
- [x] Define branding in `lib/cal-config.ts`.
- [ ] Update `components/header/Header.tsx` to include "Book Strategic Session" trigger.
- [ ] Remove `components/sections/BookingSection.tsx` from `app/page.tsx` (switching to modal).

### 2. Implementation: Multi-Step Booking Modal
- [ ] Create `components/booking/BookingModal.tsx` using Radix Dialog/Vaul.
- [ ] Implement a 3-page state machine inside the modal:
    - **Page 1:** Entity Type & Conflict Check.
    - **Page 2:** Case Status & Outcome Description.
    - **Page 3:** Cal.com Embed (Prefilled with session data).
- [ ] Use `field-sync` to fetch `name` and `whatsapp` if the user started on the Contact Form.

### 3. Contact Form Integration
- [ ] Modify `components/sections/ContactForm.tsx`: Replace the "Step 2" navigation with an `onOpenModal` trigger that passes current form state.

---

## D) Configuration & Environment (Updated)

| Variable | Usage |
| :--- | :--- |
| `NEXT_PUBLIC_CALCOM_EVENT_LINK` | `sultan-isaac-jgohpm/meeting` |
| `NEXT_PUBLIC_CALCOM_NAMESPACE` | `consultation` |

### Prefill Data Logic
We will pass the following to Cal.com:
- `name`: Collected from Contact Form/Modal.
- `email`: Collected in Modal Page 1.
- `notes`: Combined outcome/conflict-check answers.

---

## E) QA Checklist
- [ ] **Data Handoff:** Confirm data from Contact Form Step 1 successfully populates the Cal.com embed name field.
- [ ] **Modal State:** Ensure closing the modal resets the question progress.
- [ ] **Responsive:** Question form must fit comfortably on mobile (375px) without scrolling being trapped by the Cal.com iframe.

---

> [!IMPORTANT]
> **Data Privacy Note:** 
> Since we are asking for an opposing party name (Conflict Check), we should add a small disclaimer that this data is protected by Attorney-Client privilege.
