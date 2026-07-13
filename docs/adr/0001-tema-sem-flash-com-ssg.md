# ADR 0001 — Tema sem flash mantendo SSG (inline script + cookie)

**Status:** aceito · **Data:** 2026-07-13 · **Reversibilidade:** Tipo 2 (troca barata)

## Contexto

`DESIGN.md §6` pede tema resolvido "no servidor via cookie", emitindo `data-theme` no `<html>`. Porém, ler cookie (`next/headers`) no `RootLayout` opta **todas** as rotas em renderização dinâmica por request — conflita com a regra de ouro "SSG por padrão" (`CLAUDE.md §4`), com CWV e com custo de edge.

## Decisão

Manter SSG e eliminar o FOUC com a alternativa já prevista no stack canônico (`CLAUDE.md §4`: "implementação própria com cookie + inline script anti-FOUC"):

1. HTML estático sai com `data-theme="dark"` (default da marca).
2. Script inline **bloqueante no `<head>`** (roda antes do primeiro paint): lê o cookie `theme`; ausente, resolve `prefers-color-scheme` e **persiste** o cookie; aplica `data-theme` no `<html>`.
3. `ThemeToggle` (client) alterna atributo + cookie sem reload.

O requisito real de `DESIGN.md §6` — "sem flash no primeiro paint" e persistência via cookie — é atendido; muda apenas o mecanismo (pré-paint no cliente em vez de por request no servidor).

## Consequências

- Todas as rotas continuam `○ (Static)`.
- `suppressHydrationWarning` no `<html>` (o atributo pode divergir do SSR por design).
- Se um dia houver personalização por request (A/B server-side), reavaliar leitura de cookie no server por segmento de rota.
