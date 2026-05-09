"use client";

import type { ComponentProps } from "react";
import { Calendar } from "lucide-react";
import { CAL } from "@/lib/cal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonVariantProps = ComponentProps<"button"> &
  Parameters<typeof buttonVariants>[0];

interface Props extends Omit<ButtonVariantProps, "children"> {
  /** Override the default "Book a call" label. */
  label?: string;
  /** Hide the leading calendar icon. */
  hideIcon?: boolean;
}

/**
 * "Book a call" button that opens the Cal.com popup via the data
 * attributes the SDK looks for. Falls back to opening the public link
 * in a new tab if the SDK didn't load (offline / script blocked).
 */
export function BookCallButton({
  label = "Book a call",
  hideIcon,
  className,
  variant,
  size,
  onClick,
  ...rest
}: Props) {
  return (
    <button
      type="button"
      data-cal-namespace={CAL.namespace}
      data-cal-link={CAL.link}
      data-cal-config={JSON.stringify({
        layout: CAL.layout,
        useSlotsViewOnSmallScreen: "true",
      })}
      className={cn(buttonVariants({ variant, size }), "gap-2", className)}
      onClick={(e) => {
        // If the SDK is loaded it will intercept the click and open the
        // modal. We add a manual fallback for the case where it isn't:
        // detect "no cal" by checking whether window.Cal exists shortly
        // after the click — if not, open the public URL.
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (typeof window !== "undefined" && !("Cal" in window)) {
          (window as Window).open(CAL.publicUrl, "_blank", "noopener,noreferrer");
        }
      }}
      {...rest}
    >
      {!hideIcon && <Calendar className="h-4 w-4" />}
      {label}
    </button>
  );
}
