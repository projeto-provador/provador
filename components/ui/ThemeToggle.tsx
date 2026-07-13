"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { THEME_COOKIE, type Theme } from "@/lib/theme";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    document.cookie = `${THEME_COOKIE}=${next};path=/;max-age=31536000;SameSite=Lax`;
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={theme === "light"}
      aria-label="Alternar tema claro/escuro"
      className="inline-flex size-9 items-center justify-center rounded-sm border border-border text-text-muted transition-colors hover:border-accent hover:text-text motion-reduce:transition-none"
    >
      <Moon aria-hidden className="size-4 theme-light:hidden" />
      <Sun aria-hidden className="hidden size-4 theme-light:block" />
    </button>
  );
}
