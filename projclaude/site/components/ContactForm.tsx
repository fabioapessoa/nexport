"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type Division = "mobility" | "agrotech" | "lineaAmarilla" | "";

type Profile = "manufacturer" | "buyer" | "other";

type FormState = {
  name: string;
  company: string;
  email: string;
  country: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  company: "",
  email: "",
  country: "",
  message: "",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isValidDivision = (value: string): value is Exclude<Division, ""> =>
  value === "mobility" || value === "agrotech" || value === "lineaAmarilla";

// The division field is synced from an external source (sessionStorage, written
// by DivisionCTA on the same page) via useSyncExternalStore rather than an
// effect + setState, since the homepage never remounts this component between
// a division card click and landing on the contact form.
function subscribeToDivision(onStoreChange: () => void) {
  window.addEventListener("nexport-division-select", onStoreChange);
  return () => window.removeEventListener("nexport-division-select", onStoreChange);
}

function getDivisionSnapshot(): Division {
  try {
    const stored = window.sessionStorage.getItem("nexport_division");
    return stored && isValidDivision(stored) ? stored : "";
  } catch {
    return "";
  }
}

function getDivisionServerSnapshot(): Division {
  return "";
}

function subscribeToProfile(onStoreChange: () => void) {
  window.addEventListener("nexport-profile-select", onStoreChange);
  return () => window.removeEventListener("nexport-profile-select", onStoreChange);
}

function getProfileSnapshot(): Profile {
  try {
    const stored = window.sessionStorage.getItem("nexport_profile");
    return stored === "manufacturer" || stored === "buyer" ? stored : "buyer";
  } catch {
    return "buyer";
  }
}

function getProfileServerSnapshot(): Profile {
  return "buyer";
}

export default function ContactForm({ form }: { form: Dictionary["contact"]["form"] }) {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | "division", string>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "validated">("idle");

  const suggestedDivision = useSyncExternalStore(
    subscribeToDivision,
    getDivisionSnapshot,
    getDivisionServerSnapshot
  );
  const [divisionOverride, setDivisionOverride] = useState<Division | null>(null);
  const division = divisionOverride ?? suggestedDivision;

  const suggestedProfile = useSyncExternalStore(
    subscribeToProfile,
    getProfileSnapshot,
    getProfileServerSnapshot
  );
  const [profileOverride, setProfileOverride] = useState<Profile | null>(null);
  const profile = profileOverride ?? suggestedProfile;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = form.requiredError;
    if (!values.company.trim()) next.company = form.requiredError;
    if (!values.email.trim()) next.email = form.requiredError;
    else if (!EMAIL_RE.test(values.email)) next.email = form.emailError;
    if (!values.country.trim()) next.country = form.requiredError;
    if (!values.message.trim()) next.message = form.requiredError;

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    window.setTimeout(() => {
      setStatus("validated");
    }, 500);
  };

  const inputClass =
    "w-full rounded-lg border border-offwhite/15 bg-ink/40 px-4 py-3 text-sm text-offwhite placeholder:text-offwhite/35 transition-colors focus:border-gold focus:outline-none";
  const labelClass = "mb-2 block text-xs font-medium uppercase tracking-[0.08em] text-offwhite/60";
  const errorClass = "mt-1.5 text-xs text-[#e3a5a5]";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            {form.name}
          </label>
          <input
            id="name"
            className={inputClass}
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
          />
          {errors.name && <p className={errorClass}>{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="company">
            {form.company}
          </label>
          <input
            id="company"
            className={inputClass}
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            aria-invalid={Boolean(errors.company)}
          />
          {errors.company && <p className={errorClass}>{errors.company}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="email">
            {form.email}
          </label>
          <input
            id="email"
            type="email"
            className={inputClass}
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
          />
          {errors.email && <p className={errorClass}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass} htmlFor="country">
            {form.country}
          </label>
          <input
            id="country"
            className={inputClass}
            value={values.country}
            onChange={(e) => update("country", e.target.value)}
            aria-invalid={Boolean(errors.country)}
          />
          {errors.country && <p className={errorClass}>{errors.country}</p>}
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>{form.profile}</legend>
        <div className="flex flex-wrap gap-3">
          {(
            [
              ["manufacturer", form.profileManufacturer],
              ["buyer", form.profileBuyer],
              ["other", form.profileOther],
            ] as const
          ).map(([value, label]) => (
            <label
              key={value}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors ${
                profile === value
                  ? "border-gold bg-gold/15 text-gold"
                  : "border-offwhite/15 text-offwhite/65 hover:border-offwhite/35"
              }`}
            >
              <input
                type="radio"
                name="profile"
                value={value}
                checked={profile === value}
                onChange={() => setProfileOverride(value)}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClass} htmlFor="division">
          {form.division}
        </label>
        <select
          id="division"
          className={inputClass}
          value={division}
          onChange={(e) => setDivisionOverride(e.target.value as Division)}
        >
          <option value="">{form.divisionPlaceholder}</option>
          <option value="mobility">{form.divisionMobility}</option>
          <option value="agrotech">{form.divisionAgrotech}</option>
          <option value="lineaAmarilla">{form.divisionLineaAmarilla}</option>
        </select>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          {form.message}
        </label>
        <textarea
          id="message"
          rows={5}
          className={inputClass}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold to-bronze px-9 py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink transition-opacity disabled:opacity-60"
      >
        {status === "submitting" ? form.submitting : form.submit}
      </button>

      {status === "validated" ? (
        <p className="rounded-lg border border-gold/30 bg-gold/[0.07] px-4 py-3 text-sm leading-relaxed text-offwhite/80">
          {form.successNotice}
        </p>
      ) : (
        <p className="text-xs leading-relaxed text-offwhite/45">{form.pendingNotice}</p>
      )}
    </form>
  );
}
