"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics-client";

export function LandingPageViewTracker() {
  useEffect(() => {
    void trackEvent("landing_page_view");
  }, []);

  return null;
}
