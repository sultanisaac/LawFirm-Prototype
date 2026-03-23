"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { CALCOM_NAMESPACE, CALCOM_UI_CONFIG } from "@/lib/cal-config";

export default function CalInitializer() {
  useEffect(() => {
    (async function () {
      try {
        const cal = await getCalApi({ namespace: CALCOM_NAMESPACE });
        cal("ui", CALCOM_UI_CONFIG);
      } catch (error) {
        console.warn("Cal.com initialization error:", error);
      }
    })();
  }, []);

  return null;
}
