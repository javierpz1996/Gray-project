export function DsFeedbackShowcase() {
  return (
    <div className="ds-feedback-stack">
      <div className="ds-alert ds-alert-info" role="status">
        <p className="ds-alert-title">Información</p>
        <p className="ds-alert-body">
          Los documentos se descargan en PDF desde la sección Documentos.
        </p>
      </div>
      <div className="ds-alert ds-alert-success" role="status">
        <p className="ds-alert-title">Listo</p>
        <p className="ds-alert-body">Color copiado al portapapeles.</p>
      </div>
      <div className="ds-alert ds-alert-error" role="alert">
        <p className="ds-alert-title">No se pudo enviar</p>
        <p className="ds-alert-body">
          Revisa el correo e inténtalo de nuevo en unos minutos.
        </p>
      </div>
      <div className="ds-toast" role="status" aria-live="polite">
        <p className="ds-toast-title">Toast de ejemplo</p>
        <p className="ds-toast-body">Mensaje breve tras guardar o copiar.</p>
      </div>
      <div className="ds-empty" role="status">
        <p className="ds-h3">Sin piezas en esta vista</p>
        <p className="ds-empty-body">
          Cuando publiques obra nueva, aparecerá aquí en la retícula del
          portafolio.
        </p>
        <button type="button" className="ds-btn ds-btn-primary">
          Ir al portafolio
        </button>
      </div>
    </div>
  );
}
