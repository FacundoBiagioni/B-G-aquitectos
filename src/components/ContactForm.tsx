"use client";

import { useState } from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";
import { siteInfo } from "@/data/site";

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  tipo: string;
  mensaje: string;
};

const tiposDeProyecto = [
  "Casa en barrio privado",
  "Edificio en altura",
  "Proyecto comercial",
  "Otro",
];

const emptyForm: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  tipo: "",
  mensaje: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Web3Forms honeypot: a hidden checkbox named "botcheck" that people never
  // see, but form-filling bots tick. https://docs.web3forms.com (Spam protection)
  const [botcheck, setBotcheck] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Bot detected: pretend it worked and don't send anything.
    if (botcheck) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          subject: `Nueva consulta de ${form.nombre} — Estudio B+G`,
          from_name: form.nombre,
          ...form,
        }),
      });
      const data = await res.json();
      setStatus(data.success ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };


  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start justify-center gap-4 py-8">
        <div className="w-12 h-12 border border-[var(--accent)] flex items-center justify-center text-[var(--accent)]">
          <CheckIcon className="w-5 h-5" />
        </div>
        <h3 className="font-display text-3xl">¡Mensaje enviado!</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed text-base">
          Gracias por escribirnos. Te respondemos a la brevedad, generalmente dentro de las 24 hs.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm(emptyForm);
          }}
          className="link-arrow is-accent mt-2"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input
        type="checkbox"
        name="botcheck"
        checked={botcheck}
        onChange={(e) => setBotcheck(e.target.checked)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        style={{ display: "none" }}
      />
      <Field id="cf-nombre" label="Nombre" required>
        <input
          id="cf-nombre"
          type="text"
          name="nombre"
          required
          autoComplete="name"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Tu nombre"
          className={inputClass}
        />
      </Field>

      <Field id="cf-email" label="Email" required>
        <input
          id="cf-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={handleChange}
          placeholder="tu@email.com"
          className={inputClass}
        />
      </Field>

      <Field id="cf-telefono" label="Teléfono">
        <input
          id="cf-telefono"
          type="tel"
          name="telefono"
          autoComplete="tel"
          value={form.telefono}
          onChange={handleChange}
          placeholder="0221 15 000-0000"
          className={inputClass}
        />
      </Field>

      <Field id="cf-tipo" label="Tipo de proyecto" required>
        <div className="relative">
          <select
            id="cf-tipo"
            name="tipo"
            required
            value={form.tipo}
            onChange={handleChange}
            className={`${inputClass} w-full appearance-none pr-10 bg-[var(--bg)] ${
              form.tipo ? "" : "text-[var(--text-muted)]"
            }`}
          >
            <option value="" disabled>
              Seleccioná una opción
            </option>
            {tiposDeProyecto.map((t) => (
              <option key={t} value={t} className="text-[var(--text-primary)]">
                {t}
              </option>
            ))}
          </select>
          {/* appearance-none hides the native arrow — draw our own. */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]"
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </Field>

      <Field id="cf-mensaje" label="Mensaje" required>
        <textarea
          id="cf-mensaje"
          name="mensaje"
          required
          value={form.mensaje}
          onChange={handleChange}
          rows={4}
          placeholder="Contanos sobre tu proyecto. Ubicación, m² estimados, necesidades especiales..."
          className={`${inputClass} resize-none`}
        />
      </Field>

      <button type="submit" disabled={status === "sending"} className="btn-primary mt-1">
        {status === "sending" ? (
          <>
            <span
              className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"
              aria-hidden
            />
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <ArrowRightIcon className="w-4 h-4" />
          </>
        )}
      </button>

      <div aria-live="polite">
        {status === "error" && (
          <p className="text-red-400 text-base leading-relaxed">
            No pudimos enviar el mensaje. Escribinos directo a{" "}
            <a href={`mailto:${siteInfo.email}`} className="underline">
              {siteInfo.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

// text-base (16px) on inputs also stops iOS Safari from zooming in on focus.
const inputClass =
  "bg-transparent border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] text-base placeholder:text-[var(--text-muted)] hover:border-[#3a3a3a] focus:outline-none focus:border-[var(--accent)] transition-colors duration-200";

function Field({
  id,
  label,
  required = false,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[var(--text-secondary)] text-[11px] tracking-[0.2em] uppercase">
        {label}
        {required && (
          <span className="text-[var(--accent)] ml-1" aria-hidden>
            *
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
