"use client";

import { useEffect, useState } from "react";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

import {
  FLOATING_CTA_VARIANTS,
  NAVBAR_CONTENT_VARIANTS,
  NAVBAR_VARIANTS,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "product", label: "Product" },
  { id: "workflow", label: "Workflows" },
  { id: "comparison", label: "Trust" },
  { id: "pricing", label: "Pricing" },
] as const;

type NavSectionId = (typeof NAV_ITEMS)[number]["id"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<NavSectionId>("product");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);

      const activationLine = window.innerHeight * 0.32;
      const currentSection = NAV_ITEMS.reduce<{ id: NavSectionId; distance: number }>(
        (closest, item) => {
          const section = document.getElementById(item.id);

          if (!section) {
            return closest;
          }

          const distance = Math.abs(section.getBoundingClientRect().top - activationLine);

          return distance < closest.distance ? { id: item.id, distance } : closest;
        },
        { id: NAV_ITEMS[0].id, distance: Number.POSITIVE_INFINITY }
      ).id;

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        variants={NAVBAR_VARIANTS}
        initial="initial"
        animate="visible"
        className="fixed top-0 right-0 left-0 z-50"
      >
        <div className="mx-auto flex h-20 max-w-350 items-center justify-between px-2.5 sm:px-6 lg:px-12">
          <a href="#" aria-label="Oxcil home" className="flex items-center">
            <span
              className={`block overflow-hidden transition-all duration-500 ${scrolled ? "max-w-10" : "max-w-33"} `}
            >
              <Logo className="text-oxcil-elevated-50 h-10" />
            </span>
          </a>

          <motion.nav
            aria-label="Primary"
            variants={NAVBAR_CONTENT_VARIANTS}
            initial={false}
            animate="visible"
            className={`border-oxcil-elevated-800 bg-oxcil-elevated-900/80 shadow-oxcil-elevated-950/30 absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg backdrop-blur-md md:flex`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-oxcil-elevated-800 text-oxcil-elevated-100"
                      : "text-oxcil-elevated-400 hover:text-oxcil-elevated-100"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </motion.nav>

          <motion.div
            variants={NAVBAR_CONTENT_VARIANTS}
            initial={false}
            animate={scrolled ? "hidden" : "visible"}
            className="flex items-center gap-4"
          >
            <a
              href="#"
              className="text-oxcil-elevated-400 hover:text-oxcil-elevated-100 hidden text-sm transition-colors md:block"
            >
              Sign in
            </a>
            <Button className="bg-oxcil-accent-400 text-oxcil-accent-950 hover:bg-oxcil-accent-300 hidden h-auto rounded-full px-5 py-2.5 text-sm md:flex">
              <LightningIcon weight="fill" className="mr-1.5 h-4 w-4" />
              Console
            </Button>
          </motion.div>
        </div>
      </motion.header>

      <motion.div
        variants={FLOATING_CTA_VARIANTS}
        initial={false}
        animate={scrolled ? "visible" : "hidden"}
        className="fixed right-6 bottom-6 z-50 lg:right-12"
      >
        <Button className="bg-oxcil-accent-400 text-oxcil-accent-950 hover:bg-oxcil-accent-300 shadow-oxcil-accent-400/20 h-auto rounded-full px-6 py-3 text-sm shadow-lg">
          <LightningIcon weight="fill" className="mr-1.5 h-4 w-4" />
          Request access
        </Button>
      </motion.div>
    </>
  );
}
