export const ALLOWED_ANALYTICS_EVENTS = [
  "landing_page_view",
  "landing_try_demo_click",
  "demo_opened",
  "paid_clicked",
  "signup_started",
  "signup_completed",
  "demo_create_account_click",
  "link_click",
] as const;

export type AnalyticsEventName = (typeof ALLOWED_ANALYTICS_EVENTS)[number];

export function isAllowedAnalyticsEvent(eventName: string): eventName is AnalyticsEventName {
  return ALLOWED_ANALYTICS_EVENTS.includes(eventName as AnalyticsEventName);
}
