"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  TENANT_FEATURE_DEFS,
  DEFAULT_TENANT_FEATURES,
  type TenantFeatures,
} from "@/lib/tenant-features";
import { useUpdateTenantFeatures } from "@/hooks/api/use-admin-tenants";
import { toast } from "@/lib/toast";

interface TenantFeaturesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tenantId: string;
  tenantName: string;
  // Optional: pre-existing tenants may not have the field yet.
  features?: Partial<TenantFeatures>;
}

export function TenantFeaturesDialog({
  open,
  onOpenChange,
  tenantId,
  tenantName,
  features,
}: TenantFeaturesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>AI features — {tenantName}</DialogTitle>
          <DialogDescription>
            Enable or disable AI capabilities for this tenant.
          </DialogDescription>
        </DialogHeader>

        {/* Inner form mounts only while open, so its draft state starts fresh
            from the latest `features` on each open — no syncing effect needed. */}
        {open && (
          <FeaturesForm
            tenantId={tenantId}
            tenantName={tenantName}
            features={features}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function FeaturesForm({
  tenantId,
  tenantName,
  features,
  onClose,
}: {
  tenantId: string;
  tenantName: string;
  features?: Partial<TenantFeatures>;
  onClose: () => void;
}) {
  const [draft, setDraft] = useState<TenantFeatures>({
    ...DEFAULT_TENANT_FEATURES,
    ...features,
  });
  const update = useUpdateTenantFeatures();

  async function handleSave() {
    try {
      await update.mutateAsync({ id: tenantId, features: draft });
      toast.success("Features updated", `Saved AI permissions for ${tenantName}.`);
      onClose();
    } catch {
      toast.error("Update failed", "Could not save feature permissions.");
    }
  }

  return (
    <>
      <div className="space-y-3 py-2">
        {TENANT_FEATURE_DEFS.map((f) => (
          <div
            key={f.key}
            className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
          >
            <Switch
              id={`feat-${f.key}`}
              checked={draft[f.key]}
              onCheckedChange={(checked) =>
                setDraft((prev) => ({ ...prev, [f.key]: checked }))
              }
            />
            <Label htmlFor={`feat-${f.key}`} className="flex-1 cursor-pointer">
              <span className="block text-sm font-medium">{f.label}</span>
              <span className="block text-xs font-normal text-muted-foreground">
                {f.description}
              </span>
            </Label>
          </div>
        ))}
      </div>

      <DialogFooter>
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={update.isPending} className="gap-2">
          {update.isPending && <Loader2 className="h-4 w-4 animate-spin" />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}
