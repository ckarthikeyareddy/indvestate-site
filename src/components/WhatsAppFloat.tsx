"use client";
// Floating WhatsApp button on every page (CONTENT §13): bottom-right, carbon
// fill, hairline border, square corners, message-circle icon in ink plus
// "WhatsApp ↗" in .iv-label, 44px tall, safe-area aware. The wa.me text is
// prefilled from the current route's topic (a property page passes its own).
// Hidden (translateY + opacity) while any form is in the viewport. Not saffron.
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ds";
import { whatsappFloat } from "@/content/pages";
import { propertyBySlug } from "@/content/properties";
import { whatsappHref } from "@/content/site";

export function prefillFor(pathname: string): string {
  const prop = pathname.match(/^\/live\/([^/]+)/);
  if (prop) {
    const p = propertyBySlug(prop[1]);
    if (p) return p.ctas.whatsapp.prefill;
  }
  const hit = whatsappFloat.byRoute.filter((r) => r.text && pathname.startsWith(r.prefix)).sort((a, b) => b.prefix.length - a.prefix.length)[0];
  return hit?.text ?? whatsappFloat.fallback;
}

export function WhatsAppFloat() {
  const pathname = usePathname() ?? "/";
  const [hidden, setHidden] = useState(false);
  const admin = pathname.startsWith("/admin");

  useEffect(() => {
    const visible = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.add(e.target);
          else visible.delete(e.target);
        }
        setHidden(visible.size > 0);
      },
      { threshold: 0 },
    );
    let raf = 0;
    const collect = () => {
      raf = 0;
      io.disconnect();
      visible.clear();
      document.querySelectorAll("form").forEach((f) => io.observe(f));
      setHidden(false);
    };
    collect();
    // Forms mount and unmount (success panels, route changes); re-collect on DOM changes.
    const mo = new MutationObserver(() => {
      if (!raf) raf = requestAnimationFrame(collect);
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (admin) return null;
  return (
    <a
      className="wa-float"
      href={whatsappHref(prefillFor(pathname))}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={whatsappFloat.aria}
      data-hidden={hidden ? "true" : "false"}
      tabIndex={hidden ? -1 : undefined}
    >
      <Icon name="message-circle" size={18} />
      <span className="iv-label">{whatsappFloat.label} ↗</span>
    </a>
  );
}
