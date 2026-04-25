import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { footerData, type SocialPlatform } from "@/data/footer";
import { siteConfig } from "@/data/site";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  MailIcon,
} from "@/components/icons/SocialIcons";

const socialIcons: Record<
  SocialPlatform,
  React.ComponentType<{ className?: string }>
> = {
  instagram: InstagramIcon,
  email: MailIcon,
  linkedin: LinkedInIcon,
  github: GitHubIcon,
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 space-y-3">
            <h3 className="font-bold text-lg">{footerData.title}</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {footerData.subtitle}
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description.split("|")[0].trim()}
            </p>
            <div className="flex gap-3 pt-1">
              {footerData.socialLinks.map((social) => {
                const Icon = socialIcons[social.platform];
                const isEmail = social.href.startsWith("mailto:");
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    target={isEmail ? undefined : "_blank"}
                    rel={isEmail ? undefined : "noopener noreferrer"}
                    aria-label={social.label}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Pages */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Pages
            </h4>
            <ul className="space-y-2">
              {footerData.pageLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Free Tools */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Free Tools
            </h4>
            <ul className="space-y-2">
              {footerData.toolLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/free-tools"
                  className="text-sm text-primary hover:underline font-medium"
                >
                  View all tools →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-muted-foreground">{footerData.copyright}</p>
          <div className="flex gap-5">
            {footerData.legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
