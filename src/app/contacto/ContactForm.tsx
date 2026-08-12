"use client";

import { useState } from "react";

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

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    tipo: "",
    mensaje: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Placeholder: integrar con un servicio de email (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start justify-center gap-4 py-16">
        <div className="w-10 h-10 border border-[var(--accent)] flex items-center justify-center">
          <span className="text-[var(--accent)] text-lg">✓</span>
        </div>
        <h3 className="text-2xl font-light">¡Mensaje enviado!</h3>
        <p className="text-[var(--text-secondary)] leading-relaxed max-w-sm">
          Gracias por escribirnos. Te respondemos a la brevedad, generalmente dentro de las 24 hs.
        </p>
        <button
          onClick={() => { setStatus("idle"); setForm({ nombre: "", email: "", telefono: "", tipo: "", mensaje: "" }); }}
          className="mt-4 text-[var(--accent)] text-xs tracking-[0.15em] uppercase hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
            Nombre *
          </label>
          <input
            type="text"
            name="nombre"
            required
            value={form.nombre}
            onChange={handleChange}
            placeholder="Tu nombre"
            className="bg-transparent border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="bg-transparent border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
          Teléfono
        </label>
        <input
          type="tel"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
          placeholder="0221 15 000-0000"
          className="bg-transparent border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
          Tipo de proyecto *
        </label>
        <select
          name="tipo"
          required
          value={form.tipo}
          onChange={handleChange}
          className="bg-[var(--bg)] border border-[var(--border)] px-4 py-3 text-sm focus:outline-none focus:border-[var(--text-secondary)] transition-colors appearance-none cursor-pointer text-[var(--text-primary)]"
        >
          <option value="" disabled className="text-[var(--text-muted)]">
            Seleccioná una opción
          </option>
          {tiposDeProyecto.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[var(--text-muted)] text-[10px] tracking-[0.2em] uppercase">
          Mensaje *
        </label>
        <textarea
          name="mensaje"
          required
          value={form.mensaje}
          onChange={handleChange}
          rows={5}
          placeholder="Contanos sobre tu proyecto. Ubicación, m² estimados, necesidades especiales..."
          className="bg-transparent border border-[var(--border)] px-4 py-3 text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--text-secondary)] transition-colors resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="px-8 py-3.5 bg-[var(--text-primary)] text-[var(--bg)] text-xs tracking-[0.15em] uppercase font-medium hover:bg-[var(--accent)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 self-start"
      >
        {status === "sending" ? "Enviando..." : "Enviar mensaje"}
      </button>

      <p className="text-[var(--text-muted)] text-xs">
        También podés escribirnos directamente a{" "}
        <a
          href="mailto:estudioarq.bg@gmail.com"
          className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          estudioarq.bg@gmail.com
        </a>
      </p>
    </form>
  );
}
