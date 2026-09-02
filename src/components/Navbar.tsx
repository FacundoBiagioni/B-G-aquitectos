"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/contacto", label: "Contacto" },
];

function isActiveLink(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  // Reset menu state during render (no flash) instead of in an effect after paint.
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;

      if (menuOpen) {
        lastY.current = y;
        return;
      }

      setNavHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Menu open always wins over the scroll-hide state, without an extra effect/render.
  const hidden = navHidden && !menuOpen;
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
              src="/logo-bg.png"
              alt="Estudio B+G Arquitectos"
              width={2500}
              height={709}
              className="h-9 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Menu toggle — two lines that morph into an X */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className={`relative w-6 h-6 flex items-center justify-center text-[var(--text-primary)] transition-all duration-300 ease-out will-change-transform ${
              hidden ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"
            }`}
          >
            <span
              className={`absolute w-6 h-px bg-current transition-transform duration-250 ease-out ${
                menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[5px] rotate-0"
              }`}
            />
            <span
              className={`absolute w-6 h-px bg-current transition-transform duration-250 ease-out ${
                menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[5px] rotate-0"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Menu panel */}
      <div
        className={`fixed top-0 right-0 z-40 h-full w-full sm:w-[420px] bg-[var(--bg)] border-l border-[var(--border)] flex flex-col justify-between transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
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
        </nav>

        <div className="px-10 pb-12 pt-8 border-t border-[var(--border)] mx-10 flex flex-col gap-2">
          <a
            href="mailto:estudioarq.bg@gmail.com"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            estudioarq.bg@gmail.com
          </a>
          <a
            href="https://www.instagram.com/estudioarq.bg/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            @estudioarq.bg
          </a>
        </div>
      </div>
    </>
  );
}
