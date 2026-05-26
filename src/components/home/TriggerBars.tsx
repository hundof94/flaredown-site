"use client";

import { useEffect, useRef, useState } from "react";
import { TRIGGERS } from "@/lib/mock-data";

function TriggerBar({ name, percentage, delay }: { name: string; percentage: number; delay: number }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-ink-2 w-28 flex-shrink-0 font-medium">{name}</span>
      <div className="flex-1 bg-ink/8 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
          style={{ width: animated ? `${percentage}%` : "0%" }}
        />
      </div>
      <span className="text-sm font-bold text-ink w-10 text-right">{percentage}%</span>
    </div>
  );
}

export function TriggerBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-3">
      {TRIGGERS.map((trigger, i) => (
        <TriggerBar
          key={trigger.name}
          name={trigger.name}
          percentage={trigger.percentage}
          delay={visible ? i * 80 : 99999}
        />
      ))}
    </div>
  );
}
