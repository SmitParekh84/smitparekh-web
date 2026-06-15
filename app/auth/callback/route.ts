import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { Resend } from "resend";

/**
 * Supabase OAuth callback handler.
 * Exchanges the `code` query param for a session cookie and redirects back
 * to the page the user was on (encoded in `next`).
 * Sends a welcome email to brand-new users (first sign-in).
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/free-tools";

  if (code) {
    try {
      const supabase = await createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data.user) {
        // Detect first login: created_at ≈ last_sign_in_at (within 30 s)
        const created = new Date(data.user.created_at).getTime();
        const lastSignIn = data.user.last_sign_in_at
          ? new Date(data.user.last_sign_in_at).getTime()
          : 0;
        const isNewUser = Math.abs(created - lastSignIn) < 30_000;

        if (isNewUser && process.env.RESEND_API_KEY) {
          const name =
            data.user.user_metadata?.full_name ||
            data.user.user_metadata?.name ||
            data.user.email?.split("@")[0] ||
            "there";
          const email = data.user.email;
          const from = process.env.RESEND_FROM || "Portfolio <noreply@smitparekh.co.in>";

          try {
            const resend = new Resend(process.env.RESEND_API_KEY);
            await resend.emails.send({
              from,
              to: email!,
              subject: `Welcome to Smit Parekh's Portfolio! 🎉`,
              html: `
                <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
                  <h2 style="color:#2563eb">Hey ${name}, welcome!</h2>
                  <p style="color:#374151">You now have access to free AI-powered tools on <a href="https://www.smitparekh.co.in">smitparekh.co.in</a>:</p>
                  <ul style="color:#374151">
                    <li>📄 <strong>ATS Resume Analyzer</strong> - score your resume with AI</li>
                    <li>🖼️ <strong>Background Remover</strong> - remove image backgrounds instantly</li>
                    <li>✍️ <strong>LinkedIn Post Generator</strong> - create viral content</li>
                  </ul>
                  <p style="color:#374151">Head to your <a href="https://www.smitparekh.co.in/dashboard" style="color:#2563eb">dashboard</a> to track your usage.</p>
                  <p style="color:#6b7280;font-size:14px">- Smit Parekh</p>
                </div>
              `,
            });
          } catch (mailErr) {
            // Non-fatal - don't block redirect
            console.error("[auth/callback] welcome email failed:", mailErr);
          }
        }

        return NextResponse.redirect(`${origin}${next}`);
      }
    } catch {
      // fall through to error redirect
    }
  }

  return NextResponse.redirect(`${origin}/free-tools?auth_error=1`);
}
