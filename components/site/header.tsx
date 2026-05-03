"use client";

import { useEffect, useState } from "react";
import { LightningIcon } from "@phosphor-icons/react/dist/ssr";
import { motion } from "motion/react";

import { PageContainer } from "@/components/layout/page-container";
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
  { id: "workflow", label: "Workflow" },
  { id: "how-it-works", label: "How it works" },
  { id: "trust", label: "Trust" },
  { id: "compare", label: "Compare" },
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
        className="bg-background/24 fixed top-0 right-0 left-0 z-50 backdrop-blur-sm"
      >
        <PageContainer className="flex h-20 items-center justify-between">
          <a href="#" aria-label="Oxcil home" className="flex items-center">
            <span
              className={`block overflow-hidden transition-all duration-500 ${scrolled ? "max-w-8" : "max-w-33"} `}
            >
              <Logo className="text-oxcil-neutral-50 h-7 sm:h-8" />
            </span>
          </a>

          <motion.nav
            aria-label="Primary"
            variants={NAVBAR_CONTENT_VARIANTS}
            initial={false}
            animate="visible"
            className="shadow-oxcil-neutral-950/30 border-oxcil-neutral-800 bg-oxcil-neutral-950 absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border px-2 py-1.5 shadow-lg backdrop-blur-md md:flex"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-full border px-4 py-1.5 text-sm transition-[color,border-color]",
                    isActive
                      ? "text-oxcil-neutral-100 border-transparent"
                      : "text-oxcil-neutral-400 hover:text-oxcil-neutral-100 border-transparent"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="header-nav-active-pill"
                      className="bg-oxcil-neutral-800/90 border-oxcil-neutral-700/80 shadow-oxcil-nav absolute inset-0 -z-10 rounded-full border"
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
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
            <Button
              asChild
              variant="ghost"
              shape="pill"
              className="hidden md:inline-flex"
            >
              <a href="#">Sign in</a>
            </Button>
            <Button
              variant="brand"
              shape="pill"
              className="hidden h-auto px-5 py-2.5 md:flex"
            >
              <LightningIcon weight="fill" className="h-4 w-4" />
              Console
            </Button>
          </motion.div>
        </PageContainer>
      </motion.header>

      <motion.div
        variants={FLOATING_CTA_VARIANTS}
        initial={false}
        animate={scrolled ? "visible" : "hidden"}
        className="fixed right-6 bottom-6 z-50 lg:right-12"
      >
        <Button variant="brand" shape="pill" className="h-auto px-6 py-3 shadow-lg">
          <LightningIcon weight="fill" className="h-4 w-4" />
          Request access
        </Button>
      </motion.div>
    </>
  );
}
