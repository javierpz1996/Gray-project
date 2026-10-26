"use client";

import {
  DsField,
  DsFieldError,
  DsFieldHint,
  DsInput,
  DsLabel,
  DsSelect,
  DsSelectContent,
  DsSelectItem,
  DsSelectTrigger,
  DsSelectValue,
  DsTextarea,
  DsUiScope,
} from "@/components/desing-system/ui";

export function DsFormShowcase() {
  return (
    <DsUiScope className="ds-form-grid">
      <DsField>
        <DsLabel htmlFor="ds-input-nombre">Nombre</DsLabel>
        <DsInput
          id="ds-input-nombre"
          type="text"
          placeholder="Tu nombre"
          autoComplete="name"
        />
        <DsFieldHint>Texto de ayuda opcional.</DsFieldHint>
      </DsField>

      <DsField>
        <DsLabel htmlFor="ds-input-email">Correo</DsLabel>
        <DsInput
          id="ds-input-email"
          type="email"
          placeholder="correo@ejemplo.com"
          autoComplete="email"
        />
      </DsField>

      <DsField>
        <DsLabel htmlFor="ds-input-error">Campo con error</DsLabel>
        <DsInput
          id="ds-input-error"
          type="text"
          defaultValue="valor inválido"
          aria-invalid="true"
          aria-describedby="ds-input-error-msg"
        />
        <DsFieldError id="ds-input-error-msg">
          Este campo es obligatorio.
        </DsFieldError>
      </DsField>

      <DsField>
        <DsLabel htmlFor="ds-select-tema">Tema</DsLabel>
        <DsSelect defaultValue="obra">
          <DsSelectTrigger id="ds-select-tema" className="w-full">
            <DsSelectValue placeholder="Elegir tema" />
          </DsSelectTrigger>
          <DsSelectContent>
            <DsSelectItem value="obra">Obra</DsSelectItem>
            <DsSelectItem value="documentos">Documentos</DsSelectItem>
            <DsSelectItem value="contacto">Contacto</DsSelectItem>
          </DsSelectContent>
        </DsSelect>
      </DsField>

      <DsField className="ds-field-full">
        <DsLabel htmlFor="ds-textarea-mensaje">Mensaje</DsLabel>
        <DsTextarea
          id="ds-textarea-mensaje"
          rows={4}
          placeholder="Escribe tu mensaje…"
        />
      </DsField>
    </DsUiScope>
  );
}
