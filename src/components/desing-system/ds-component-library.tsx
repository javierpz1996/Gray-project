"use client";

import Image from "next/image";
import {
  DsAccordion,
  DsAccordionContent,
  DsAccordionItem,
  DsAccordionTrigger,
  DsAlert,
  DsAlertDescription,
  DsAlertTitle,
  DsBadge,
  DsButton,
  DsCard,
  DsCardContent,
  DsCardDescription,
  DsCardFooter,
  DsCardHeader,
  DsCardTitle,
  DsCarousel,
  DsCarouselContent,
  DsCarouselItem,
  DsCarouselNext,
  DsCarouselPrevious,
  DsCheckbox,
  DsDialog,
  DsDialogContent,
  DsDialogDescription,
  DsDialogFooter,
  DsDialogHeader,
  DsDialogTitle,
  DsDialogTrigger,
  DsDropdownMenu,
  DsDropdownMenuCheckboxItem,
  DsDropdownMenuContent,
  DsDropdownMenuItem,
  DsDropdownMenuLabel,
  DsDropdownMenuSeparator,
  DsDropdownMenuTrigger,
  DsField,
  DsLabel,
  DsPopover,
  DsPopoverContent,
  DsPopoverDescription,
  DsPopoverHeader,
  DsPopoverTitle,
  DsPopoverTrigger,
  DsProgress,
  DsSegment,
  DsSegmented,
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
  DsSeparator,
  DsSheet,
  DsSheetContent,
  DsSheetDescription,
  DsSheetHeader,
  DsSheetTitle,
  DsSheetTrigger,
  DsSwitch,
  DsTooltip,
  DsTooltipContent,
  DsTooltipTrigger,
  DsUiScope,
} from "@/components/desing-system/ui";
import { useState } from "react";

const segments = [
  { id: "obra", label: "Obra" },
  { id: "documentos", label: "Documentos" },
  { id: "bio", label: "Bio" },
] as const;

const carouselSlides = [
  { token: "--ds-coral", title: "Coral" },
  { token: "--ds-blue", title: "Azul" },
  { token: "--ds-orange", title: "Naranja" },
  { token: "--ds-yellow", title: "Amarillo" },
  { token: "--ds-green", title: "Verde" },
  { token: "--ds-sky", title: "Cielo" },
] as const;

export function DsComponentLibrary() {
  const [segment, setSegment] = useState<string>("obra");
  const [menuObra, setMenuObra] = useState(true);

  return (
    <DsUiScope className="ds-ui-library-grid">
      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Controles</h3>
          <p className="max-w-[42rem] text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            Botones y etiquetas con la paleta del DS: coral primario y tonos de
            pintura en badges y estados.
          </p>
        </header>
        <div className="ds-subsection-body ds-ui-row">
          <DsButton>Continuar</DsButton>
          <DsButton variant="secondary">Cancelar</DsButton>
          <DsButton variant="tertiary">Más opciones</DsButton>
          <DsButton variant="ghost">Enlace de acción</DsButton>
          <DsButton variant="destructive" size="sm">Eliminar</DsButton>
          <DsBadge>Publicado</DsBadge>
          <DsBadge variant="blue">Azul pintura</DsBadge>
          <DsBadge variant="orange">Naranja</DsBadge>
          <DsBadge variant="yellow">Highlight</DsBadge>
          <DsBadge variant="subtle">Borrador</DsBadge>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Segmentado</h3>
        </header>
        <div className="ds-subsection-body ds-ui-stack max-w-lg">
          <DsSegmented aria-label="Secciones de ejemplo">
            {segments.map((item) => (
              <DsSegment
                key={item.id}
                selected={segment === item.id}
                onSelect={() => setSegment(item.id)}
              >
                {item.label}
              </DsSegment>
            ))}
          </DsSegmented>
          <p className="text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            {segment === "obra" && "Retícula de piezas con imagen y metadata."}
            {segment === "documentos" && "Listado de PDFs con portada."}
            {segment === "bio" && "Texto biográfico con medida de lectura."}
          </p>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Tarjetas</h3>
          <p className="max-w-[42rem] text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            Variantes para fichas, avisos y bloques con imagen.
          </p>
        </header>
        <div className="ds-subsection-body ds-ui-card-grid">
          <DsCard className="max-w-sm">
            <DsCardHeader>
              <DsCardTitle>Predeterminada</DsCardTitle>
              <DsCardDescription>
                Borde hairline y sombra suave.
              </DsCardDescription>
            </DsCardHeader>
            <DsCardContent>
              Óleo sobre lienzo · 2024 · Colección privada.
            </DsCardContent>
            <DsCardFooter>
              <DsButton size="sm">Ver ficha</DsButton>
            </DsCardFooter>
          </DsCard>

          <DsCard variant="outline" className="max-w-sm">
            <DsCardHeader>
              <DsCardTitle>Contorno</DsCardTitle>
              <DsCardDescription>Sin sombra, trazo 2px.</DsCardDescription>
            </DsCardHeader>
            <DsCardContent>
              Útil en listas densas o sobre fondos ya elevados.
            </DsCardContent>
          </DsCard>

          <DsCard variant="elevated" className="max-w-sm">
            <DsCardHeader>
              <DsCardTitle>Elevada</DsCardTitle>
              <DsCardDescription>
                Sombra media para destacar una acción.
              </DsCardDescription>
            </DsCardHeader>
            <DsCardContent>
              CTAs principales o modales ligeros.
            </DsCardContent>
          </DsCard>

          <DsCard variant="accent" className="max-w-sm">
            <DsCardHeader>
              <DsCardTitle>Acento coral</DsCardTitle>
              <DsCardDescription>
                Franja superior de marca.
              </DsCardDescription>
            </DsCardHeader>
            <DsCardContent>
              Novedades, publicaciones o piezas destacadas.
            </DsCardContent>
          </DsCard>

          <DsCard variant="wash" className="max-w-sm">
            <DsCardHeader>
              <DsCardTitle>Fondo cielo</DsCardTitle>
              <DsCardDescription>
                Superficie semántica informativa.
              </DsCardDescription>
            </DsCardHeader>
            <DsCardContent>
              Tips, contexto de sala o notas de proceso.
            </DsCardContent>
          </DsCard>

          <DsCard className="max-w-sm p-0">
            <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--ds-line)] bg-[var(--ds-surface-muted)]">
              <Image
                src="/obra/obra-04.svg"
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, 320px"
                className="object-cover"
              />
            </div>
            <DsCardHeader>
              <DsCardTitle>Con imagen</DsCardTitle>
              <DsCardDescription>
                Media arriba, texto debajo.
              </DsCardDescription>
            </DsCardHeader>
            <DsCardContent>
              Patrón habitual en la retícula del portafolio.
            </DsCardContent>
          </DsCard>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Carrusel</h3>
          <p className="max-w-[42rem] text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            Muestra de la paleta de pintura: flechas, teclado y una diapositiva
            por vista.
          </p>
        </header>
        <div className="ds-subsection-body">
          <DsCarousel className="ds-ui-carousel mx-auto">
            <DsCarouselContent>
              {carouselSlides.map((slide) => (
                <DsCarouselItem key={slide.token}>
                  <figure className="ds-ui-carousel-slide">
                    <div
                      className="ds-ui-carousel-swatch"
                      style={{ background: `var(${slide.token})` }}
                      aria-hidden="true"
                    />
                    <figcaption>
                      {slide.title}
                      <span className="ds-ui-carousel-token">{slide.token}</span>
                    </figcaption>
                  </figure>
                </DsCarouselItem>
              ))}
            </DsCarouselContent>
            <DsCarouselPrevious />
            <DsCarouselNext />
          </DsCarousel>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Formulario</h3>
        </header>
        <div className="ds-subsection-body grid max-w-lg gap-5">
          <DsField>
            <DsLabel htmlFor="ds-lib-technique">Técnica</DsLabel>
            <DsSelect defaultValue="oleo">
              <DsSelectTrigger id="ds-lib-technique">
                <DsSelectValue placeholder="Elegir" />
              </DsSelectTrigger>
              <DsSelectContent>
                <DsSelectItem value="oleo">Óleo</DsSelectItem>
                <DsSelectItem value="acrilico">Acrílico</DsSelectItem>
                <DsSelectItem value="mixta">Mixta</DsSelectItem>
              </DsSelectContent>
            </DsSelect>
          </DsField>
          <div className="flex items-center gap-3">
            <DsCheckbox id="ds-lib-news" defaultChecked />
            <DsLabel htmlFor="ds-lib-news">Recibir novedades</DsLabel>
          </div>
          <div className="flex items-center justify-between gap-4">
            <DsLabel htmlFor="ds-lib-notify">Notificaciones</DsLabel>
            <DsSwitch id="ds-lib-notify" defaultChecked />
          </div>
          <div className="ds-ui-stack">
            <div className="flex justify-between text-sm">
              <span>Subida</span>
              <span className="text-[var(--ds-muted)]">66%</span>
            </div>
            <DsProgress value={66} />
          </div>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Feedback y estructura</h3>
        </header>
        <div className="ds-subsection-body ds-ui-stack max-w-xl">
          <DsAlert variant="info">
            <DsAlertTitle>Información</DsAlertTitle>
            <DsAlertDescription>
              Los PDFs se abren en una pestaña nueva del navegador.
            </DsAlertDescription>
          </DsAlert>
          <DsAlert variant="destructive">
            <DsAlertTitle>No se pudo guardar</DsAlertTitle>
            <DsAlertDescription>
              Revisa la conexión e inténtalo de nuevo.
            </DsAlertDescription>
          </DsAlert>
          <DsSeparator />
          <DsAccordion type="single" collapsible defaultValue="obra">
            <DsAccordionItem value="obra">
              <DsAccordionTrigger>Obra</DsAccordionTrigger>
              <DsAccordionContent>
                Piezas con imagen, título y metadata en la retícula.
              </DsAccordionContent>
            </DsAccordionItem>
            <DsAccordionItem value="docs">
              <DsAccordionTrigger>Documentos</DsAccordionTrigger>
              <DsAccordionContent>
                PDFs descargables con portada y enlace directo.
              </DsAccordionContent>
            </DsAccordionItem>
          </DsAccordion>
        </div>
      </section>

      <section className="ds-subsection-stack">
        <header className="ds-subsection-header">
          <h3 className="ds-h3">Capas flotantes</h3>
          <p className="max-w-[42rem] text-[var(--ds-text-small)] text-[var(--ds-muted)]">
            Diálogos y menús sobre Radix; estilos propios en{" "}
            <code className="ds-token">desing-system-ui.css</code>.
          </p>
        </header>
        <div className="ds-subsection-body ds-ui-row">
          <DsTooltip>
            <DsTooltipTrigger asChild>
              <DsButton variant="secondary">Tooltip</DsButton>
            </DsTooltipTrigger>
            <DsTooltipContent>Copiar enlace de la pieza</DsTooltipContent>
          </DsTooltip>

          <DsPopover>
            <DsPopoverTrigger asChild>
              <DsButton variant="secondary">Popover</DsButton>
            </DsPopoverTrigger>
            <DsPopoverContent className="w-72">
              <DsPopoverHeader>
                <DsPopoverTitle>Detalle rápido</DsPopoverTitle>
                <DsPopoverDescription>
                  Panel contextual sin abandonar el flujo principal.
                </DsPopoverDescription>
              </DsPopoverHeader>
            </DsPopoverContent>
          </DsPopover>

          <DsDropdownMenu>
            <DsDropdownMenuTrigger asChild>
              <DsButton variant="secondary">Menú</DsButton>
            </DsDropdownMenuTrigger>
            <DsDropdownMenuContent align="start" className="w-52">
              <DsDropdownMenuLabel>Portafolio</DsDropdownMenuLabel>
              <DsDropdownMenuSeparator />
              <DsDropdownMenuItem>Ver obra</DsDropdownMenuItem>
              <DsDropdownMenuItem>Descargar PDF</DsDropdownMenuItem>
              <DsDropdownMenuCheckboxItem
                checked={menuObra}
                onCheckedChange={setMenuObra}
              >
                Solo obra
              </DsDropdownMenuCheckboxItem>
            </DsDropdownMenuContent>
          </DsDropdownMenu>

          <DsDialog>
            <DsDialogTrigger asChild>
              <DsButton variant="secondary">Diálogo</DsButton>
            </DsDialogTrigger>
            <DsDialogContent>
              <DsDialogHeader>
                <DsDialogTitle>Contacto</DsDialogTitle>
                <DsDialogDescription>
                  En el sitio principal el contacto es mailto y redes; esto es
                  demostración del componente.
                </DsDialogDescription>
              </DsDialogHeader>
              <DsDialogFooter>
                <DsButton type="button">Entendido</DsButton>
              </DsDialogFooter>
            </DsDialogContent>
          </DsDialog>

          <DsSheet>
            <DsSheetTrigger asChild>
              <DsButton variant="secondary">Panel lateral</DsButton>
            </DsSheetTrigger>
            <DsSheetContent side="right">
              <DsSheetHeader>
                <DsSheetTitle>Navegación</DsSheetTitle>
                <DsSheetDescription>
                  Patrón sheet para pantallas estrechas.
                </DsSheetDescription>
              </DsSheetHeader>
            </DsSheetContent>
          </DsSheet>
        </div>
      </section>
    </DsUiScope>
  );
}
