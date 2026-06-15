import { redirect } from "next/navigation";

// `/client` has no UI of its own - send visitors into the portal. Authenticated
// clients land on their dashboard; unauthenticated ones are bounced to the login
// page by <ClientGuard> in the layout. This replaces the previous 404.
export default function ClientIndexPage() {
  redirect("/client/dashboard");
}
