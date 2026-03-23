"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CALCOM_EVENT_LINK, CALCOM_NAMESPACE, CALCOM_UI_CONFIG } from "@/lib/cal-config";

export default function BookingInline() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: CALCOM_NAMESPACE });
      cal("ui", CALCOM_UI_CONFIG);
    })();
  }, []);

  return (
    <div className="w-full min-h-[600px] rounded-2xl overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm self-center shadow-2xl">
      <Cal
        namespace={CALCOM_NAMESPACE}
        calLink={CALCOM_EVENT_LINK}
        style={{ width: "100%", height: "100%", minHeight: "600px" }}
        config={{ layout: "month_view", theme: "dark" }}
      />
    </div>
  );
}
