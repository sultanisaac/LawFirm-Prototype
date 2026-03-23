export const CALCOM_EVENT_LINK = process.env.NEXT_PUBLIC_CALCOM_EVENT_LINK || "";
export const CALCOM_NAMESPACE = process.env.NEXT_PUBLIC_CALCOM_NAMESPACE || "consultation";

export const CALCOM_UI_CONFIG = {
  theme: "dark" as const,
  styles: {
    branding: {
      brandColor: "#dfa129", // Primary amber
    },
  },
  hideEventTypeDetails: false,
  layout: "month_view" as const,
};

// CSS-like variable values forced for the embed iframe
export const CALCOM_BRAND_VARS = {
  "--cal-brand-color": "#dfa129",
  "--cal-bg-color": "#0b0e14",
  "--cal-text-color": "#e9e6e0",
  "--cal-border-radius": "16px",
};
