"use client";

import type { ReactNode } from "react";

type ProfileCTAProps = {
  profile: "manufacturer" | "buyer";
  label: string;
  className?: string;
  children?: ReactNode;
};

export default function ProfileCTA({ profile, label, className = "", children }: ProfileCTAProps) {
  return (
    <a
      href="#contacto"
      onClick={() => {
        try {
          window.sessionStorage.setItem("nexport_profile", profile);
        } catch {
          // sessionStorage unavailable (e.g. private mode) — safe to ignore
        }
        window.dispatchEvent(
          new CustomEvent("nexport-profile-select", { detail: profile })
        );
      }}
      className={className}
    >
      {children ?? label}
    </a>
  );
}
