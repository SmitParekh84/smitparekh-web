"use client";

import { Bot, Code2, Globe, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ClientRequirements } from "@/types";

const SERVICE_LABELS: Record<string, string> = {
  website: "Website Development",
  seo: "SEO",
  "ai-automation": "AI & Automation",
  "custom-software": "Custom Software",
};

const BUDGET_LABELS: Record<string, string> = {
  "under-500": "Under $500",
  "500-2000": "$500 – $2,000",
  "2000-5000": "$2,000 – $5,000",
  "5000-15000": "$5,000 – $15,000",
  "15000-50000": "$15,000 – $50,000",
  "50000-plus": "$50,000+",
  "not-sure": "Not sure / Flexible",
};

const TIMELINE_LABELS: Record<string, string> = {
  asap: "ASAP (within 2 weeks)",
  "1-month": "1 month",
  "2-3-months": "2–3 months",
  "3-6-months": "3–6 months",
  "6-plus-months": "6+ months",
  flexible: "Flexible",
};

const WORK_PREF_LABELS: Record<string, string> = {
  us: "Smit Parekh & team",
  vendor: "Another vendor / agency",
  freelancer: "A freelancer",
};

function humanize(slug?: string | null): string {
  if (!slug) return " - ";
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function yesNo(v?: boolean): string {
  return v === true ? "Yes" : v === false ? "No" : " - ";
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="w-44 shrink-0 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="min-w-0 flex-1 text-sm">{children}</div>
    </div>
  );
}

function CategorySection({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border p-5">
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
          <Icon className="h-4 w-4 text-blue-500" />
        </div>
        <h3 className="font-semibold">{title}</h3>
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

export function ClientRequirementsView({ data }: { data: ClientRequirements }) {
  const { website, seo, aiAutomation, customSoftware } = data;

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border p-5 space-y-3">
        <Row label="Services">
          <div className="flex flex-wrap gap-1.5">
            {data.categories.map((c) => (
              <Badge key={c} variant="secondary">
                {SERVICE_LABELS[c] ?? c}
              </Badge>
            ))}
          </div>
        </Row>
        <Row label="Budget">{BUDGET_LABELS[data.budget] ?? data.budget ?? " - "}</Row>
        <Row label="Timeline">{TIMELINE_LABELS[data.timeline] ?? data.timeline ?? " - "}</Row>
        <Row label="Working with">
          {WORK_PREF_LABELS[data.workPreference] ?? data.workPreference ?? " - "}
          {data.workPreference === "vendor" && data.vendorCompanyName
            ? ` - ${data.vendorCompanyName}`
            : ""}
          {data.workPreference === "freelancer" && data.freelancerProfileUrl
            ? ` - ${data.freelancerProfileUrl}`
            : ""}
        </Row>
        {data.hasUxDesigner !== undefined && (
          <Row label="Has UX designer">{yesNo(data.hasUxDesigner)}</Row>
        )}
        {data.additionalNotes && (
          <Row label="Additional notes">
            <span className="text-muted-foreground">{data.additionalNotes}</span>
          </Row>
        )}
      </div>

      {website && (
        <CategorySection title="Website Development" icon={Globe}>
          <Row label="Existing website">
            {website.hasExistingWebsite ? website.existingUrl || "Yes" : "No"}
          </Row>
          {website.websiteType && <Row label="Website type">{humanize(website.websiteType)}</Row>}
          {website.websiteGoals?.length ? (
            <Row label="Goals">{website.websiteGoals.map(humanize).join(", ")}</Row>
          ) : null}
          {website.hasDesigner && <Row label="Has designer">{humanize(website.hasDesigner)}</Row>}
          {website.hasContent && <Row label="Has content">{humanize(website.hasContent)}</Row>}
        </CategorySection>
      )}

      {seo && (
        <CategorySection title="SEO" icon={Search}>
          <Row label="Existing website">
            {seo.hasExistingWebsite ? seo.existingUrl || "Yes" : "No"}
          </Row>
          {seo.primaryGoal?.length ? (
            <Row label="Primary goals">{seo.primaryGoal.map(humanize).join(", ")}</Row>
          ) : null}
          {seo.workingWithAgency && (
            <Row label="Working with agency">{humanize(seo.workingWithAgency)}</Row>
          )}
          {seo.hasAnalytics !== undefined && (
            <Row label="Has analytics">{yesNo(seo.hasAnalytics)}</Row>
          )}
        </CategorySection>
      )}

      {aiAutomation && (
        <CategorySection title="AI & Automation" icon={Bot}>
          {aiAutomation.automationGoals?.length ? (
            <Row label="Automation goals">
              {aiAutomation.automationGoals.map(humanize).join(", ")}
            </Row>
          ) : null}
          {aiAutomation.hasExistingSystems !== undefined && (
            <Row label="Existing systems">{yesNo(aiAutomation.hasExistingSystems)}</Row>
          )}
          {aiAutomation.existingSystemsDescription && (
            <Row label="Systems description">
              <span className="text-muted-foreground">
                {aiAutomation.existingSystemsDescription}
              </span>
            </Row>
          )}
        </CategorySection>
      )}

      {customSoftware && (
        <CategorySection title="Custom Software" icon={Code2}>
          {customSoftware.softwareType && (
            <Row label="Software type">{humanize(customSoftware.softwareType)}</Row>
          )}
          {customSoftware.description && (
            <Row label="Description">
              <span className="text-muted-foreground">{customSoftware.description}</span>
            </Row>
          )}
          {customSoftware.hasDesignWireframes && (
            <Row label="Design / wireframes">{humanize(customSoftware.hasDesignWireframes)}</Row>
          )}
          {customSoftware.hasTechSpec && (
            <Row label="Technical spec">{humanize(customSoftware.hasTechSpec)}</Row>
          )}
        </CategorySection>
      )}
    </div>
  );
}
