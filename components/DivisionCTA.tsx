"use client";

type DivisionCTAProps = {
  division: "mobility" | "agrotech" | "lineaAmarilla";
  label: string;
  className?: string;
};

export default function DivisionCTA({ division, label, className = "" }: DivisionCTAProps) {
  return (
    <a
      href="#contacto"
      onClick={() => {
        try {
          window.sessionStorage.setItem("nexport_division", division);
        } catch {
          // sessionStorage unavailable (e.g. private mode) — safe to ignore
        }
        // The contact form lives on the same page (anchor navigation only),
        // so it may already be mounted — notify it directly as well.
        window.dispatchEvent(
          new CustomEvent("nexport-division-select", { detail: division })
        );
      }}
      className={className}
    >
      {label}
      <span aria-hidden="true" className="ml-2">→</span>
    </a>
  );
}
