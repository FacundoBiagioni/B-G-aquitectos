import { whatsappContacts, whatsappUrl } from "@/data/site";
import { WhatsAppIcon, ArrowRightIcon } from "./icons";

// Quiet, in-flow WhatsApp option for the contact panel — one row per partner,
// styled like the rest of the site instead of a floating green bubble.
export default function WhatsAppContact() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[var(--text-secondary)] text-[11px] tracking-[0.2em] uppercase">
        Escribinos por WhatsApp
      </p>
      <div className="flex flex-col gap-px bg-[var(--border)] border border-[var(--border)]">
        {whatsappContacts.map((c) => (
          <a
            key={c.phone}
            href={whatsappUrl(c.phone)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Escribirle por WhatsApp a ${c.name} (se abre en una nueva pestaña)`}
            className="group flex items-center gap-4 px-4 py-3.5 min-h-[60px] bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] transition-colors duration-200"
          >
            <span className="w-10 h-10 shrink-0 flex items-center justify-center border border-[#3a3a3a] text-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-200">
              <WhatsAppIcon className="w-5 h-5" />
            </span>
            <span className="flex-1 min-w-0">
              <span className="block text-[var(--text-primary)] text-base">{c.name}</span>
              <span className="block text-[var(--text-secondary)] text-base tabular-nums">
                {c.display}
              </span>
            </span>
            <ArrowRightIcon className="w-4 h-4 shrink-0 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all duration-300" />
          </a>
        ))}
      </div>
    </div>
  );
}
