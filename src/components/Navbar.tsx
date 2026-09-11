"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import RightPanel from "./RightPanel";
import { usePanel } from "./PanelProvider";
import { MailIcon, InstagramIcon } from "./icons";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const { panel, openMenu, openContact, close } = usePanel();
  const menuOpen = panel === "menu";
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (panel) {
        lastY.current = y;
        return;
      }

      setNavHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [panel]);

  useEffect(() => {
    document.body.style.overflow = panel ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [panel]);

  // Any open panel always wins over the scroll-hide state, without an extra effect/render.
  const hidden = navHidden && !panel;
  // The Nosotros hero has its own portrait right under the logo's usual spot — keep the toggle, drop the logo.
  const hideLogo = pathname === "/nosotros";

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="h-16 flex items-center justify-between px-6 md:px-10">
          {/* Logo — lingers a beat longer than the toggle on scroll-hide */}
          <Link
            href="/"
            aria-hidden={hideLogo}
            tabIndex={hideLogo ? -1 : undefined}
            className={`flex items-center transition-all duration-500 ease-out delay-150 will-change-transform ${
              hideLogo
                ? "opacity-0 pointer-events-none"
                : hidden
                  ? "opacity-0 -translate-y-3"
                  : "opacity-100 translate-y-0"
            }`}
          >
            <Image
              src="/logo-bg1.png"
              alt="Estudio B+G Arquitectos"
              width={2172}
              height={724}
              className="h-9 w-auto object-contain drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
              priority
              unoptimized
            />
          </Link>

          {/* Menu toggle — two lines that morph into an X. Closes whichever panel is open. */}
          <button
            onClick={() => (panel ? close() : openMenu())}
            aria-label={panel ? "Cerrar" : "Abrir menú"}
            aria-expanded={!!panel}
            className={`relative w-6 h-6 flex items-center justify-center text-[var(--text-primary)] drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-all duration-300 ease-out will-change-transform ${
              hidden ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
            }`}
          >
            <span
              className={`absolute w-6 h-0.5 bg-current transition-transform duration-250 ease-out ${
                panel ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"
              }`}
            />
            <span
              className={`absolute w-6 h-0.5 bg-current transition-transform duration-250 ease-out ${
                panel ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"
              }`}
            />
          </button>
        </div>
      </header>

      <RightPanel open={menuOpen} onClose={close}>
        <div className="h-full flex flex-col justify-between">
          <nav className="flex flex-col gap-1 px-10 pt-28">
            {navLinks.map((link) => {
              const active = isActiveLink(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-4xl sm:text-5xl font-light tracking-tight transition-colors duration-200 ${
                    active
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <button
              onClick={openContact}
              className="text-left text-4xl sm:text-5xl font-light tracking-tight transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Contacto
            </button>
          </nav>

          <div className="px-10 pb-12 pt-8 border-t border-[var(--border)] mx-10 flex flex-col gap-2">
            <a
              href="mailto:estudioarq.bg@gmail.com"
              className="flex items-center gap-2 text-base text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <MailIcon className="w-4 h-4 shrink-0" />
              estudioarq.bg@gmail.com
            </a>
            <a
              href="https://www.instagram.com/estudioarq.bg/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-base text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              <InstagramIcon className="w-4 h-4 shrink-0" />
              @estudioarq.bg
            </a>
          </div>
        </div>
      </RightPanel>
    </>
  );
}
