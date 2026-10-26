import type { ReactNode } from "react";

export function DsUiScope({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className ? `ds-ui-scope ${className}` : "ds-ui-scope"}>
      {children}
    </div>
  );
}
