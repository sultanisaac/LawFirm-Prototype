export const CALENDLY_URL = process.env.NEXT_PUBLIC_CALENDLY_URL || "";
export const BRAND_COLOR = process.env.NEXT_PUBLIC_BRAND_COLOR || "dfa129";
export const BG_COLOR = process.env.NEXT_PUBLIC_BG_COLOR || "0b0e14";
export const TEXT_COLOR = process.env.NEXT_PUBLIC_TEXT_COLOR || "ffffff";

// Full URL with branding query parameters
export const getCalendlyUrI = (prefillData?: { name?: string; email?: string }) => {
  const url = new URL(CALENDLY_URL);
  url.searchParams.set("hide_gdpr_banner", "1");
  url.searchParams.set("primary_color", BRAND_COLOR);
  url.searchParams.set("background_color", BG_COLOR);
  url.searchParams.set("text_color", TEXT_COLOR);
  
  if (prefillData?.name) url.searchParams.set("name", prefillData.name);
  if (prefillData?.email) url.searchParams.set("email", prefillData.email);
  
  return url.toString();
};
