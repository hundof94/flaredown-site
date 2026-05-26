import Link from "next/link";
import { Flame } from "lucide-react";

const LINKS = {
  Explore: [
    { href: "/protocols", label: "Protocols" },
    { href: "/studies", label: "Studies" },
    { href: "/community", label: "Community Wins" },
    { href: "/learn", label: "Deep Dives" },
  ],
  Tools: [
    { href: "/track", label: "Track Triggers" },
    { href: "/signup", label: "Join Community" },
    { href: "/login", label: "Member Login" },
  ],
  About: [
    { href: "/about", label: "About FlareDown" },
    { href: "/methodology", label: "Methodology" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-ink text-white/80 mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 font-display font-bold text-lg text-white mb-3">
              <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Flame size={16} className="text-white" />
              </span>
              FlareDown
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Real people. Real results. Real science.
            </p>
            <p className="text-sm text-white/60 leading-relaxed mt-4">
              Community-powered health resources for Psoriatic Arthritis.
            </p>
          </div>

          {Object.entries(LINKS).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white font-semibold text-sm mb-4 tracking-wide uppercase">
                {section}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} FlareDown. All rights reserved.
          </p>
          <p className="text-xs text-white/40 max-w-md text-right">
            External links open in new tabs.{" "}
            <Link href="/privacy" className="underline hover:text-white/60">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
