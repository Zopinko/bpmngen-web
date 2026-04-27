"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { buildSignupUrlWithSid, trackEvent } from "@/lib/analytics-client";
import { type AnalyticsEventName } from "@/lib/analytics-events";

type TrackEventConfig = {
  eventName: AnalyticsEventName;
  path?: string;
};

type TrackEventLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  eventNames?: AnalyticsEventName[];
  events?: TrackEventConfig[];
  appendSessionIdToSignup?: boolean;
  path?: string;
  onClick?: ComponentProps<typeof Link>["onClick"];
};

export function TrackEventLink({
  eventNames = [],
  events = [],
  appendSessionIdToSignup = false,
  path,
  onClick,
  ...props
}: TrackEventLinkProps) {
  const resolvedHref =
    appendSessionIdToSignup && typeof props.href === "string"
      ? buildSignupUrlWithSid(props.href)
      : props.href;

  return (
    <Link
      {...props}
      href={resolvedHref}
      onClick={(event) => {
        if (appendSessionIdToSignup && typeof props.href === "string" && event.currentTarget instanceof HTMLAnchorElement) {
          event.currentTarget.href = buildSignupUrlWithSid(props.href, true);
        }
        onClick?.(event);
        for (const trackedEvent of events) {
          void trackEvent(trackedEvent.eventName, trackedEvent.path ?? path);
        }
        for (const eventName of eventNames) {
          void trackEvent(eventName, path);
        }
      }}
    />
  );
}
