import * as React from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

function Spinner({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      role="status"
      aria-label="Loading"
      data-slot="spinner"
      className={cn("inline-flex items-center justify-center text-muted-foreground", className)}
      {...props}
    >
      <Loader2 className="h-4 w-4 animate-spin" />
    </div>
  );
}

export { Spinner };
