import type { Metadata } from "next";
import { allFontVariables } from "./lib/fonts";
import { VariantProvider } from "./lib/variant-context";
import "./showcase.css";

export const metadata: Metadata = {
  title: "设计系统预览 — 客户经营工作台",
  description: "Painel navegável de design system. Soft-tech / calmo.",
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={allFontVariables}>
      <VariantProvider>
        <div className="ds-root">{children}</div>
      </VariantProvider>
    </div>
  );
}
