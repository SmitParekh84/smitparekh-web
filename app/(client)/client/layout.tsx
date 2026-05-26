import { ClientGuard } from "@/components/client/ClientGuard";
import { ClientShell } from "@/components/client/ClientShell";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientGuard>
      <ClientShell>{children}</ClientShell>
    </ClientGuard>
  );
}
