# Calendly Integration Plan - LawFirm-Prototype

This document outlines the strategy for replacing the current Cal.com booking system with a customized Calendly integration, supporting both inline and modal-based booking flows.

## A) Recommended Embed Approach
We will use the **Calendly Advanced JS Embed** (via their standard script and `window.Calendly` global) rather than a raw `<iframe>` tag.

### Reasoning:
1. **Dynamic Customization**: Allows passing branding parameters (`primary_color`, `background_color`) programmatically.
2. **Modal Support**: Built-in support for popups, ensuring consistent behavior across the site.
3. **Data Pre-filling**: Enables pre-filling invitee information (Name, Email) from our internal state without hard-coding it in the URL.
4. **Lifecycle Hooks**: Proper mapping of callback events (e.g., `onEventScheduled`) for future tracking or UI feedback.
5. **Next.js Performance**: Better interaction with `next/script` for optimized loading and initialization.

## B) Step-by-Step Task List

### 1. Configuration & Setup
- [ ] Record Calendly Event Type URL and branding colors in `lib/calendly-config.ts`.
- [ ] Add `NEXT_PUBLIC_CALENDLY_URL` to `.env.local`.
- [ ] Define global types for `window.Calendly` in `types/calendly.d.ts`.

### 2. Core Components
- [ ] **`CalendlyInline.tsx`**: A client-side component wrapping the inline embed widget.
- [ ] **`CalendlyModal.tsx`**: A client-side component/hook to trigger the Calendly popup.
- [ ] **`CalendlyProvider.tsx`**: (Optional) Use `next/script` in `layout.tsx` or a dedicated provider to load the Calendly JS safely.

### 3. Integration & Refactoring
- [ ] Replace `BookingInline` call in `components/sections/BookingSection.tsx` with `CalendlyInline`.
- [ ] Deprecate/Remove `components/booking/BookingInline.tsx` and `CalInitializer.tsx` once verified.
- [ ] Add Calendly trigger to main CTA buttons (e.g., in `Hero.tsx`).

### 4. Branding & Customization
- [ ] Map LawFirm primary amber (`#dfa129`) to Calendly's `primary_color`.
- [ ] Set `background_color` and `text_color` to match current dark theme aesthetic.
- [ ] Configure `hide_gdpr_banner` based on privacy requirements.

### 5. Data Capture & Prefilling
- [ ] Configure "Invitee Questions" in the Calendly dashboard.
- [ ] Implement `prefill` logic in `CalendlyInline` to support optional name/email passing.

### 6. Verification & QA
- [ ] Test on multiple browsers (Chrome, Safari, Firefox).
- [ ] Verify mobile responsiveness and scroll behavior inside the embed.

---

## C) Files/Components to Add or Modify

### New Files
- `lib/calendly-config.ts`: Configuration constants (URL, brand colors).
- `components/booking/CalendlyInline.tsx`: The main inline booking component.
- `components/booking/CalendlyModalTrigger.tsx`: A button component to open the popup.

### Modified Files
- `app/layout.tsx`: Load the Calendly script via `next/script`.
- `components/sections/BookingSection.tsx`: Update to use `CalendlyInline`.
- `components/sections/Hero.tsx`: Update "Book Now" buttons to use the modal trigger.
- `package.json`: (Cleanup) Remove `@calcom/embed-react` if no longer needed.

---

## D) Environment/Config Needed

Store the following in `.env.local` and Vercel dashboard:
```env
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/your-firm/consultation
NEXT_PUBLIC_BRAND_COLOR=dfa129  # Hex without # for Calendly params
NEXT_PUBLIC_BG_COLOR=0b0e14     # Match dark theme
NEXT_PUBLIC_TEXT_COLOR=ffffff   # Contrast color
```

---

## E) QA Checklist
- [ ] **Cross-Browser**: Check Safari (Mac/iOS) specifically for iframe height/scroll issues.
- [ ] **Mobile**: Ensure the "Invitee Questions" fields are usable on small screens.
- [ ] **Adblockers**: Verify the script loads even if aggressive adblockers are active (common issue with third-party widgets).
- [ ] **Cookie Banner**: Check if Calendly's internal GDPR banner overlaps with our site's UI.
- [ ] **Timezones**: Confirm the widget correctly detects the user's local timezone.
- [ ] **Layout Shift**: Ensure the container has a `min-height` to prevent CLS while the widget loads.

---

## F) Rollout Plan
1. **Local Dev**: Verify script loading and branding parameters.
2. **Staging**: Deploy to a Vercel preview branch for internal stakeholders.
3. **Production**: Swap components on `main` branch.
4. **Cleanup**: Remove old Cal.com dependencies and config files.
5. **Fallback**: If the script fails to load after 5 seconds, show a direct link button ("Open booking in new tab") to avoid blocking the user flow.

---

## G) Future Upgrades
- **Prefill Integration**: Pass user data from a "Lead Capture" form directly into Calendly.
- **UTM Tracking**: Pass `utm_source`, `utm_campaign` etc. into the embed to track conversion sources.
- **Webhook Integration**: Connect Calendly webhooks to the internal CRM/Supabase once we upgrade to Calendly Standard/Pro.
- **Multi-language Support**: Dynamically set `locale` based on current website language context.
