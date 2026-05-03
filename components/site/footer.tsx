import {
  DiscordLogoIcon,
  GithubLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import { PageContainer } from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { StatusDot } from "@/components/ui/status-dot";

export function Footer() {
  return (
    <footer className="border-t border-(--section-divider) py-16">
      <PageContainer>
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand column */}
          <div className="lg:max-w-xs">
            <a href="#" aria-label="Oxcil home" className="inline-flex">
              <Logo className="text-oxcil-neutral-200 h-8" />
            </a>
            <p className="text-oxcil-neutral-500 mt-4 text-sm">
              AI-powered operator console for business workflows across existing tools.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Button asChild variant="icon" size="icon" shape="soft">
                <a href="#" aria-label="GitHub">
                  <GithubLogoIcon weight="fill" className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="icon" size="icon" shape="soft">
                <a href="#" aria-label="Twitter">
                  <TwitterLogoIcon weight="fill" className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="icon" size="icon" shape="soft">
                <a href="#" aria-label="Discord">
                  <DiscordLogoIcon weight="fill" className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-16">
            <div>
              <h4 className="text-oxcil-neutral-200 text-sm font-medium">Product</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Operator Console
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Run History
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-oxcil-neutral-200 text-sm font-medium">Platform</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Workflow Runtime
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Artifacts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-oxcil-neutral-200 text-sm font-medium">Company</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-oxcil-neutral-200 text-sm font-medium">Legal</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-neutral-500 hover:text-oxcil-neutral-400 text-sm transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-oxcil-neutral-800 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <span className="text-oxcil-neutral-500 text-xs">
            © 2026 Oxcil. All rights reserved.
          </span>
          <Badge
            variant="brand"
            className="gap-2 px-3 py-1 text-xs font-medium tracking-normal"
          >
            <StatusDot />
            All systems operational
          </Badge>
        </div>
      </PageContainer>
    </footer>
  );
}
