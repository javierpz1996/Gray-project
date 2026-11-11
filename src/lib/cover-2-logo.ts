export const cover2LogoMarks = [
  { id: "sello", label: "Sello", hint: "Entra gris, enorme, y queda amarillo" },
  { id: "amarillo", label: "Amarillo", hint: "El amarillo entra enorme y se achica" },
  { id: "gris", label: "Gris", hint: "El gris entra enorme y se queda" },
  { id: "cambio", label: "Cambio", hint: "Entra amarillo y se asienta en gris" },
  { id: "giro", label: "Giro", hint: "Se achica dando media vuelta" },
  { id: "caida", label: "Caída", hint: "Baja desde arriba mientras se achica" },
  { id: "cruce", label: "Cruce", hint: "El gris se aleja y el amarillo se asienta encima" },
  { id: "enfoque", label: "Enfoque", hint: "Entra desenfocado y se define al achicarse" },
  { id: "iris", label: "Iris", hint: "Se abre un círculo y el gris se apaga detrás" },
  { id: "plano", label: "Plano", hint: "El logo se acuesta como una placa y queda de frente" },
  { id: "vela", label: "Vela", hint: "Baja de tamaño muy lento, con el gris de eco" },
  { id: "corte", label: "Corte", hint: "Una ranura horizontal se abre hasta mostrar el amarillo" },
] as const;

export type Cover2LogoMark = (typeof cover2LogoMarks)[number]["id"];

const cover2LogoMarkIds = new Set<string>(cover2LogoMarks.map((entry) => entry.id));

export function parseCover2LogoMark(value: string | null | undefined): Cover2LogoMark {
  return value && cover2LogoMarkIds.has(value) ? (value as Cover2LogoMark) : "cruce";
}
