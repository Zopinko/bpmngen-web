"use client";

import Link from "next/link";
import { type ComponentProps } from "react";
import { trackEvent } from "@/lib/analytics-client";
import { type AnalyticsEventName } from "@/lib/analytics-events";

type TrackEventConfig = {
  eventName: AnalyticsEventName;
  path?: string;
};

type TrackEventLinkProps = Omit<ComponentProps<typeof Link>, "onClick"> & {
  eventNames?: AnalyticsEventName[];
  events?: TrackEventConfig[];
  path?: string;
  onClick?: ComponentProps<typeof Link>["onClick"];
};

export function TrackEventLink({
  eventNames = [],
  events = [],
  path,
  onClick,
  ...props
}: TrackEventLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
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
