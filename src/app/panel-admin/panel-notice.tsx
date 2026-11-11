"use client";

import { CircleAlert, Check } from "lucide-react";
import { useEffect, useState } from "react";

type PanelNoticeProps = {
  tone: "ok" | "error";
  message: string;
};

const LEAVE_MS = 600;

export function PanelNotice({ tone, message }: PanelNoticeProps) {
  const [open, setOpen] = useState(true);
  const [leaving, setLeaving] = useState(false);

  function dismiss() {
    setLeaving(true);
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    url.searchParams.delete("ok");
    const next = `${url.pathname}${url.search}`;
    window.history.replaceState(null, "", next);

    const timeout = window.setTimeout(dismiss, 4000);
    return () => window.clearTimeout(timeout);
  }, [message, tone]);

  useEffect(() => {
    if (!leaving) return;
    const timeout = window.setTimeout(() => setOpen(false), LEAVE_MS);
    return () => window.clearTimeout(timeout);
  }, [leaving]);

  if (!open) return null;

  return (
    <div className="panel-notice-anchor">
      <div
        className="panel-notice"
        data-tone={tone}
        data-leaving={leaving ? "true" : "false"}
        role={tone === "error" ? "alert" : "status"}
      >
        <span className="panel-notice-icon" aria-hidden="true">
          {tone === "error" ? <CircleAlert strokeWidth={2.25} /> : <Check strokeWidth={2.5} />}
        </span>
        <div>
          <p className="panel-notice-title">{tone === "error" ? "No se pudo completar" : "Listo"}</p>
          <p className="panel-notice-body">{message}</p>
        </div>
        <button type="button" className="panel-notice-close" onClick={dismiss}>
          Cerrar
        </button>
      </div>
    </div>
  );
}
