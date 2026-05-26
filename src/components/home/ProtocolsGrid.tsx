import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProtocolCard } from "@/components/shared/ProtocolCard";
import { PROTOCOLS } from "@/lib/mock-data";

export function ProtocolsGrid() {
  const featured = PROTOCOLS.slice(0, 6);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs font-semibold text-primary uppercase tracking-widest mb-2">
            Community Protocols
          </p>
          <h2 className="font-display text-h2 text-ink">
            What&apos;s actually working
          </h2>
        </div>
        <Link
          href="/protocols"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary font-semibold hover:underline"
        >
          All {PROTOCOLS.length} protocols <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-stagger">
        {featured.map((protocol) => (
          <ProtocolCard key={protocol.id} protocol={protocol} />
        ))}
      </div>

      <div className="mt-8 text-center sm:hidden">
        <Link
          href="/protocols"
          className="inline-flex items-center gap-1.5 text-sm text-primary font-semibold"
        >
          View all protocols <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
}
