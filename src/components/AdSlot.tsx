// Google AdSense ad slot. Replace data-ad-client with your publisher ID.
// Placeholder shown in dev/preview when AdSense is not configured.
import { useEffect, useRef } from "react";

interface AdSlotProps {
  slot?: string;
  format?: string;
  className?: string;
  label?: string;
}

const AD_CLIENT = "ca-pub-5789369620960870"; // TODO: replace with real publisher ID

export function AdSlot({ slot = "0000000000", format = "auto", className, label = "Advertisement" }: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (AD_CLIENT.includes("XXXX")) return;
    try {
      // @ts-expect-error - adsbygoogle is injected by Google's script
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* noop */
    }
  }, []);

  return (
    <aside
      className={`w-full flex flex-col items-center gap-1 my-4 ${className ?? ""}`}
      aria-label={label}
    >
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {/* Google AdSense Ad Slot */}
      <ins
        ref={ref}
        className="adsbygoogle block w-full min-h-[90px] bg-muted/40 rounded-md border border-dashed border-border flex items-center justify-center text-xs text-muted-foreground"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      >
        {AD_CLIENT.includes("XXXX") ? "Ad space" : null}
      </ins>
    </aside>
  );
}
