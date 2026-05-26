"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Flame } from "lucide-react";

const NAV_LINKS = [
  { href: "/protocols", label: "Protocols" },
  { href: "/studies", label: "Studies" },
  { href: "/community", label: "Community" },
  { href: "/track", label: "Track" },
  { href: "/learn", label: "Deep Dives" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-ink/10">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl text-ink">
          <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Flame size={16} className="text-white" />
          </span>
          FlareDown
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-meta text-ink-2 hover:text-primary transition-colors duration-200 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/login"
            className="text-meta text-ink-2 hover:text-ink transition-colors duration-200 font-medium"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="px-4 py-2 bg-primary text-white text-meta font-semibold rounded-pill hover:bg-primary-dark transition-colors duration-200"
          >
            Join free
          </Link>
        </div>

        <button
          className="md:hidden p-2 text-ink-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden bg-background border-b border-ink/10 px-4 pb-4">
          <div className="flex flex-col gap-3 pt-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-2 text-ink-2 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex gap-3 pt-2 border-t border-ink/10">
              <Link href="/login" className="flex-1 text-center py-2 text-ink-2 font-medium">
                Log in
              </Link>
              <Link
                href="/signup"
                className="flex-1 text-center py-2 bg-primary text-white font-semibold rounded-pill"
              >
                Join free
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
