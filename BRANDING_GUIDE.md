# NUSALEXA Law Office - Branding Guide

This guide provides style references and branding assets specifically for generating HTML emails and marketing materials that align with the "Dark Performance Lab" aesthetic of NUSALEXA Law Office.

## 🎨 Color Palette

We utilize a dark, premium aesthetic to communicate authority and modern efficiency. 

* **Deep Slate (Primary Background)**: `#0b0e14`
  * Use for the main body background of the email to create a cinematic feel.
* **Secondary Dark (Card Background)**: `#10141e`
  * Use for content cards, inner wrappers, or distinct sections within the email.
* **Primary Gold (Accent & Interactive)**: `#dfa129`
  * Use for buttons, call-to-actions, highlighted text, icons, and primary borders. 
* **Text Primary**: `#ffffff` (White)
  * Use for primary headings and strong text.
* **Text Secondary**: `rgba(255, 255, 255, 0.7)` or `#a0aab2`
  * Use for body paragraphs, descriptions, and subtle subheadings.
* **Success/Trust Emerald**: `#10b981` or `#34d399` (Use sparingly for trust indicators like security badges).

## 🖋️ Typography

* **Primary Font Family**: `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif`
  * **Note**: Since custom web fonts (like Inter) are often stripped by some email clients, always provide reliable web-safe fallbacks.
* **Headings**: Use bold weights (700 or 800). Keep them clean, capitalized for small labels, and authoritative for titles.
* **Body Text**: Use regular weight (400) or medium (500) for readability on dark backgrounds. Optimal size is 14px to 16px.

## 📧 Email Style & Formatting Principles

1. **Table-Based Layouts**: For maximum compatibility across email clients (especially Outlook), rely on HTML `<table role="presentation">` for all layout structures instead of CSS flexbox or grid.
2. **Inline Styles**: Keep critical CSS styles inline. 
3. **Glassmorphism / Border Effects**: While true glassmorphism is hard in email, you can mimic the premium feel using subtle borders: `border: 1px solid rgba(255, 255, 255, 0.1);`
4. **Rounded Corners**: Use `border-radius: 12px;` or `border-radius: 16px;` on cards and buttons for a modern aesthetic.
5. **Button Styling**: 
   * Background: `#dfa129` (Primary Gold)
   * Text Color: `#422006` (or a very dark brown/slate to provide sharp contrast)
   * Font Weight: Bold (`font-weight: 700;`)
   * Padding: e.g., `14px 28px`
   * Rounded corners: `12px`
   * Text Decoration: `none`

## 💎 Tone and Voice

* **Business-First**: Keep copy concise, results-oriented, and free of unnecessary fluff. Time is valuable.
* **Professional & Modern**: Evoke trust and authority without sounding archaic or relying on outdated legal jargon.
* **Action-Oriented**: Always provide a clear, unambiguous next step or call-to-action (CTA).
