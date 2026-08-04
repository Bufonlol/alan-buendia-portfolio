"use client";

import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { SITE } from "@/data/site";

type Status = "idle" | "sending" | "success" | "error";

/** Web3Forms access key. Public by design (it only allows sending mail to
 *  the site owner), so it ships to the browser regardless. The env var
 *  overrides this default when set. */
const WEB3FORMS_KEY = "17508351-5e19-4548-b04d-32d13b33ba1a";

/**
 * Contact form. Posts to Web3Forms (no backend / no database). Falls back
 * to a mailto link if no access key is available, so the section is never
 * broken. Get a free key at https://web3forms.com.
 */
export default function ContactForm() {
  const { t } = useLang();
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || WEB3FORMS_KEY;
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!accessKey) return; // fallback UI is shown instead
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", accessKey);
    data.append("from_name", SITE.name);
    data.append("subject", `Nuevo mensaje desde ${SITE.url}`);

    setStatus("sending");
    setError("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message ?? "");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full border border-paper/25 bg-transparent px-4 py-3 text-sm text-paper placeholder:text-mute/60 transition-colors focus:border-acid focus:outline-none";
  const labelCls = "u-label mb-2 block text-mute";

  // No key configured yet — keep the section useful with a direct mail link.
  if (!accessKey) {
    return (
      <div className="border border-paper/15 p-6">
        <p className="text-sm text-paper/80">
          {t({
            es: "El formulario se activa al configurar la clave de Web3Forms. Mientras tanto, escríbeme directo:",
            en: "The form activates once the Web3Forms key is set. In the meantime, write me directly:",
          })}
        </p>
        <a
          href={`mailto:${SITE.email}`}
          className="btn-editorial mt-5 text-paper"
        >
          {SITE.email}
          <span className="arrow-x" aria-hidden="true" />
        </a>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-3 border border-acid/60 p-6"
        role="status"
      >
        <span className="h-2 w-2 bg-acid" aria-hidden="true" />
        <p className="display text-2xl text-acid">
          {t({ es: "¡Mensaje enviado!", en: "Message sent!" })}
        </p>
        <p className="text-sm text-paper/80">
          {t({
            es: "Gracias por escribir. Te respondo lo antes posible.",
            en: "Thanks for reaching out. I'll get back to you soon.",
          })}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* honeypot */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="cf-name" className={labelCls}>
          {t({ es: "Nombre", en: "Name" })}
        </label>
        <input
          id="cf-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder={t({ es: "Tu nombre", en: "Your name" })}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cf-email" className={labelCls}>
          Email
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t({ es: "tu@correo.com", en: "you@email.com" })}
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>
          {t({ es: "Mensaje", en: "Message" })}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder={t({
            es: "Cuéntame sobre tu proyecto…",
            en: "Tell me about your project…",
          })}
          className={`${inputCls} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-acid" role="alert">
          {t({
            es: "Algo salió mal. Intenta de nuevo o escríbeme por correo.",
            en: "Something went wrong. Try again or email me directly.",
          })}
          {error ? ` (${error})` : ""}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-editorial btn-editorial--acid self-start disabled:opacity-60"
      >
        {status === "sending"
          ? t({ es: "Enviando…", en: "Sending…" })
          : t({ es: "Enviar mensaje", en: "Send message" })}
        <span className="arrow-x" aria-hidden="true" />
      </button>
    </form>
  );
}
