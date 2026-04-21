import {
  DiscordLogoIcon,
  GithubLogoIcon,
  TwitterLogoIcon,
} from "@phosphor-icons/react/dist/ssr";

import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-oxcil-elevated-900 border-t py-16">
      <div className="mx-auto max-w-350 px-2.5 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand column */}
          <div className="lg:max-w-xs">
            <a href="#" aria-label="Oxcil home" className="inline-flex">
              <Logo className="text-oxcil-elevated-200 h-10" />
            </a>
            <p className="text-oxcil-elevated-500 mt-4 text-sm">
              AI-powered operator console for business workflows across existing tools.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                className="border-oxcil-elevated-800 hover:border-oxcil-accent-700 hover:bg-oxcil-accent-950 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <GithubLogoIcon
                  weight="fill"
                  className="text-oxcil-elevated-500 h-4 w-4"
                />
              </a>
              <a
                href="#"
                className="border-oxcil-elevated-800 hover:border-oxcil-accent-700 hover:bg-oxcil-accent-950 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <TwitterLogoIcon
                  weight="fill"
                  className="text-oxcil-elevated-500 h-4 w-4"
                />
              </a>
              <a
                href="#"
                className="border-oxcil-elevated-800 hover:border-oxcil-accent-700 hover:bg-oxcil-accent-950 flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
              >
                <DiscordLogoIcon
                  weight="fill"
                  className="text-oxcil-elevated-500 h-4 w-4"
                />
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-16">
            <div>
              <h4 className="text-oxcil-elevated-200 text-sm font-medium">Product</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Operator Console
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Templates
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Run History
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-oxcil-elevated-200 text-sm font-medium">Platform</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Workflow Runtime
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Artifacts
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-oxcil-elevated-200 text-sm font-medium">Company</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Roadmap
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-oxcil-elevated-200 text-sm font-medium">Legal</h4>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-oxcil-elevated-500 hover:text-oxcil-elevated-400 text-sm transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-oxcil-elevated-900 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <span className="text-oxcil-elevated-600 text-xs">
            © 2026 Oxcil. All rights reserved.
          </span>
          <div className="flex items-center gap-2">
            <span className="bg-oxcil-accent-400 h-2 w-2 animate-pulse rounded-full" />
            <span className="text-oxcil-elevated-500 text-xs">
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
