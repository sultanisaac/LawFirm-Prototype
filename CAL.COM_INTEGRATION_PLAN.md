# CAL.COM_INTEGRATION_PLAN.md

This document outlines the strategy for integrating **Cal.com** into the Nusalexa Law Firm prototype. The goal is to provide a seamless, high-conversion booking experience that aligns with our premium amber/dark-mode aesthetic.

---

## A) Recommended Embed Approach
**Recommendation: Advanced JS Embed (via `@calcom/embed-react` or `getCalApi`)**

*   **Reasoning:**
    *   **Performance:** The JS embed allows for "lazy initialization," meaning we only load the heavy booking widget when the user reaches the section or clicks a button.
    *   **Flexibility:** It supports both inline embeds (for a dedicated section) and modal popups (for CTAs) using a single library.
    *   **Branding:** It provides direct API hooks to inject CSS-like variables (colors, rounding) into the iframe post-load, which is more reliable than standard iframe parameters.
    *   **Next.js Compatibility:** Works smoothly with Next.js client components and avoids SSR issues.

---

## B) Step-by-Step Task List

### 1. Setup & Configuration
- [ ] Add `NEXT_PUBLIC_CALCOM_EVENT_LINK` to `.env.local`.
- [ ] Install dependencies: `npm install @calcom/embed-react`.
- [ ] Define branding tokens in a new `lib/cal-config.ts` file.

### 2. Implementation: Inline Embed
- [ ] Create `components/booking/BookingInline.tsx` using the `Cal` component.
- [ ] Implement loading skeleton/state to prevent layout shift.
- [ ] Create a new landing page section: `components/sections/BookingSection.tsx`.
- [ ] Integrate the section into `app/page.tsx` (likely after the FAQ or Services).

### 3. Implementation: Modal Overlay
- [ ] Create `components/booking/BookingModalTrigger.tsx`.
- [ ] Update Header or Hero CTAs to support `data-cal-link` attributes.
- [ ] Ensure the global script is initialized once in `RootLayout`.

### 4. Branding & Customization
- [ ] Apply HSL-to-HEX converted brand colors to the Cal config.
- [ ] Hide the GDPR banner if we handle it via our own site-wide banner (requires Cal.com Pro/Team).
- [ ] Configure `hideEventTypeDetails: false` and `layout: 'month_view'` for clarity.

---

## C) Files/Components to Add or Modify

| File Path | Purpose |
| :--- | :--- |
| `lib/cal-config.ts` | Centralized branding configuration and helper functions. |
| `components/booking/BookingInline.tsx` | Client component wrapping the Cal.com inline widget. |
| `components/sections/BookingSection.tsx` | Full-width landing page section with copy and the embed. |
| `components/booking/BookingModal.tsx` | Global modal trigger logic using `getCalApi`. |
| `app/layout.tsx` | Global initialization of the Cal.com embed script. |
| `components/sections/Hero.tsx` | (Optional) Add "Book a Consultation" button with modal trigger. |

---

## D) Configuration & Environment

### Brand Colors (Derived from `globals.css`)
We will pass these variables to the `ui` object in the Cal embed:
- **Primary Color:** `#dfa129` (hsl 38 78% 52%)
- **Background Color:** `#0b0e14` (hsl 225 22% 6%)
- **Text Color:** `#e9e6e0` (hsl 38 12% 90%)
- **Rounding:** `16px` (to match our premium card design)

### Environment Variables
```env
NEXT_PUBLIC_CALCOM_EVENT_LINK="nusalexa/initial-consultation"
NEXT_PUBLIC_CALCOM_NAMESPACE="consultation"
```

---

## E) QA Checklist

- [ ] **Responsiveness:** Test on mobile (375px) to ensure Cal's internal responsive view doesn't break our container overflow.
- [ ] **Cross-Browser:** Verify in Safari (iOS) and Chrome (Desktop).
- [ ] **Adblockers:** Confirm the section fails gracefully or shows a "Contact via WhatsApp" fallback if `cal.com` is blocked.
- [ ] **Timezones:** Confirm the widget correctly detects the user's local timezone.
- [ ] **Performance:** Measure "Script Load Time" and ensure it's deferred until necessary.
- [ ] **Prefill:** (Manual Test) Pass `?name=Test` in URL to see if it pre-populates.

---

## F) Rollout & Fallback Plan

1. **Phase 1: Local Testing**
   - Implement the `BookingInline` component with a mock URL.
2. **Phase 2: Staging**
   - Connect to the real Cal.com Event Type and verify branding parameters.
3. **Phase 3: Fallback Strategy**
   - If the Cal script fails to initialize within 5 seconds, show a "Hard Link" button to the Cal.com page directly or highlight the WhatsApp CTA as an alternative.

---

## G) Future Upgrades (Post-MVP)

- **Advanced Prefill:** If a user fills out the `ContactForm` but doesn't submit, we can "pre-warm" the booking embed with their name and email via state.
- **Conversion Tracking:** Inject UTM parameters into the Cal embed to track which section (Hero vs Footer) drives more bookings.
- **Webhooks:** Hook into Cal.com webhooks to automatically create a "Client Lead" in a CRM or trigger a WhatsApp confirmation.
- **Dynamic Routing:** Different Event Types for different services (e.g., Corporate vs Dispute Resolution) based on the current page context.

---

> [!IMPORTANT]
> **Branding Limitation Note:** 
> Cal.com embeds are iframes. While we can control primary/text/background colors and rounding via the API, we cannot inject custom fonts or complex CSS animations into the internal booking flow. We should focus on matching the core palette to maintain visual harmony.
