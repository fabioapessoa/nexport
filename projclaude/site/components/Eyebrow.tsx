import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  tone?: "bronze" | "gold";
  align?: "left" | "center";
};

export default function Eyebrow({ children, tone = "bronze", align = "left" }: EyebrowProps) {
  const color = tone === "gold" ? "text-gold" : "text-bronze";
  const line = tone === "gold" ? "bg-gold/70" : "bg-bronze";

  return (
    <div
      className={`mb-4 flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      }`}
    >
      <span className={`h-px w-8 ${line}`} />
      <span className={`text-[13px] font-semibold uppercase tracking-[0.22em] ${color}`}>
        {children}
      </span>
    </div>
  );
}
