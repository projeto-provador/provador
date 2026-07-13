# DESIGN.md — Sistema de Design Obsidian (Claro + Escuro)

> Fonte única de verdade visual. Nenhum componente hardcoda cor/fonte/spacing — tudo vem daqui via **tokens semânticos** (CSS variables) mapeados no Tailwind.
> Dois temas de primeira classe: **Obsidian Escuro** (default) e **Obsidian Claro**. Ambos WCAG AA.

---

## 1. Princípios visuais

1. **Obsidian premium, não "mais um site de IA".** Nada de gradiente roxo, robô, circuito. A marca é escuridão profunda + verde neural pontual + azul de interligação.
2. **O verde é acento, não preenchimento.** Neural Green marca ação, foco e o "nó" — não paredões coloridos. Escassez = poder.
3. **O nó (node) é a assinatura.** Um ponto verde com halo/glow representa o ponto de responsabilidade, o motor, a conexão. Motif recorrente e discreto.
4. **Tipografia com hierarquia dura.** Poppins pesada para display; Inter limpa para leitura. Contraste de peso, não de mil famílias.
5. **Espaço negativo é luxo.** Respiro generoso; densidade só onde há dado.
6. **Claro ≠ inversão preguiçosa.** O tema claro é uma peça premium própria (papel frio levemente azulado), não branco estourado com verde neon ilegível.

---

## 2. Paleta base de marca (imutável)

| Nome | Hex | Papel |
|:--|:--|:--|
| Obsidian | `#0B1120` | fundo escuro / cor de texto no claro |
| Obsidian 2 | `#111A2E` | superfície escura elevada |
| Obsidian 3 | `#17203A` | card escuro |
| Obsidian 4 | `#1E2A4A` | card escuro alt / borda |
| Neural Green | `#00DC82` | acento primário (fills, node, foco) |
| Interlink Blue | `#3B82F6` | acento secundário |
| White | `#FFFFFF` | texto no escuro |

**Derivados acessíveis (para texto sobre fundo claro — o neon puro falha contraste):**
| Nome | Hex | Uso |
|:--|:--|:--|
| Neural Ink | `#067A4E` | verde para **texto/links** no tema claro (AA sobre branco) |
| Interlink Ink | `#2563EB` | azul para **texto/links** no tema claro (AA sobre branco) |
| Neural Deep | `#04B26A` | verde para ícones/bordas finas no claro quando precisar de mais contraste |

> Regra: `#00DC82` e `#3B82F6` podem preencher áreas grandes e servir de acento em ambos os temas, mas **texto pequeno colorido no claro usa os `*-ink`**.

---

## 3. Tokens semânticos (a interface que os componentes usam)

Componentes referenciam **apenas** os tokens semânticos abaixo — nunca a paleta base direto. Isso permite trocar o tema sem tocar em componente.

| Token | Significado |
|:--|:--|
| `--color-bg` | fundo da página |
| `--color-surface` | card / superfície padrão |
| `--color-surface-alt` | superfície secundária / elevada |
| `--color-border` | bordas e divisores |
| `--color-text` | texto primário |
| `--color-text-muted` | texto secundário |
| `--color-text-subtle` | texto terciário / legendas |
| `--color-accent` | verde de preenchimento/acento (node, fills) |
| `--color-accent-ink` | verde para texto/links (AA no tema atual) |
| `--color-accent-contrast` | cor do texto **sobre** o verde (ex.: botão primário) |
| `--color-secondary` | azul de acento |
| `--color-secondary-ink` | azul para texto/links (AA no tema atual) |
| `--color-focus` | anel de foco |
| `--color-glow` | cor do halo do node (rgba) |
| `--shadow-card` | sombra de card |
| `--overlay-header` | fundo translúcido do header sticky |

---

## 4. Definição dos dois temas (`styles/tokens.css`)

```css
/* ===== Base de marca (não usar direto em componente) ===== */
:root{
  --obsidian:#0B1120; --obsidian-2:#111A2E; --obsidian-3:#17203A; --obsidian-4:#1E2A4A;
  --neural:#00DC82; --neural-deep:#04B26A; --neural-ink:#067A4E;
  --interlink:#3B82F6; --interlink-ink:#2563EB;
  --white:#FFFFFF;
}

/* ===== OBSIDIAN ESCURO (default) ===== */
:root, [data-theme="dark"]{
  color-scheme: dark;
  --color-bg:            var(--obsidian);
  --color-surface:       var(--obsidian-3);
  --color-surface-alt:   var(--obsidian-4);
  --color-border:        #243154;
  --color-text:          var(--white);
  --color-text-muted:    #9AA7BD;
  --color-text-subtle:   #6B7A94;
  --color-accent:        var(--neural);
  --color-accent-ink:    var(--neural);        /* neon lê bem sobre obsidian */
  --color-accent-contrast: var(--obsidian);    /* texto escuro sobre botão verde */
  --color-secondary:     var(--interlink);
  --color-secondary-ink: #7CA9FB;              /* azul clareado p/ texto no escuro */
  --color-focus:         var(--neural);
  --color-glow:          rgba(0,220,130,.14);
  --shadow-card:         0 8px 30px rgba(0,0,0,.35);
  --overlay-header:      rgba(11,17,32,.86);
}

/* ===== OBSIDIAN CLARO ===== */
[data-theme="light"]{
  color-scheme: light;
  --color-bg:            #F4F6FA;              /* papel frio, leve tom azul-obsidiana */
  --color-surface:       #FFFFFF;
  --color-surface-alt:   #EDF1F7;
  --color-border:        #D9E0EC;
  --color-text:          #0B1120;              /* a própria obsidian vira o texto */
  --color-text-muted:    #47566E;
  --color-text-subtle:   #7A8AA3;
  --color-accent:        var(--neural);        /* fills/node continuam neon */
  --color-accent-ink:    var(--neural-ink);    /* #067A4E — verde AA p/ texto */
  --color-accent-contrast: #04240F;            /* texto sobre botão verde no claro */
  --color-secondary:     var(--interlink);
  --color-secondary-ink: var(--interlink-ink); /* #2563EB — azul AA p/ texto */
  --color-focus:         var(--neural-ink);
  --color-glow:          rgba(6,122,78,.16);
  --shadow-card:         0 6px 24px rgba(11,17,32,.08);
  --overlay-header:      rgba(244,246,250,.86);
}

/* Respeita preferência do SO quando não há escolha explícita (cookie) */
@media (prefers-color-scheme: light){
  :root:not([data-theme]){ /* aplicar os valores do tema claro */ }
}
```

> Implementação do `:root:not([data-theme])` para o modo automático: preferir resolver o tema **no servidor** via cookie (ver §6) e sempre emitir `data-theme` no `<html>`, evitando o media-query fallback e o flash.

---

## 5. Contraste verificado (checagem obrigatória)

| Par | Tema | Ratio aprox. | Uso |
|:--|:--|:--|:--|
| `#FFFFFF` sobre `#0B1120` | escuro | ~17:1 | texto primário ✅ AAA |
| `#9AA7BD` sobre `#0B1120` | escuro | ~7:1 | texto muted ✅ AA |
| `#00DC82` sobre `#0B1120` | escuro | ~9:1 | acento/texto verde ✅ AA |
| `#0B1120` sobre `#F4F6FA` | claro | ~16:1 | texto primário ✅ AAA |
| `#47566E` sobre `#F4F6FA` | claro | ~6:1 | texto muted ✅ AA |
| `#067A4E` sobre `#FFFFFF` | claro | ~4.7:1 | verde texto/link ✅ AA |
| `#2563EB` sobre `#FFFFFF` | claro | ~5.1:1 | azul texto/link ✅ AA |
| `#04240F` sobre `#00DC82` | claro | ~7:1 | texto no botão verde ✅ AA |

**DoD de a11y:** toda combinação texto/fundo nova é checada nos **dois** temas antes do merge. Nunca usar `#00DC82` para texto pequeno sobre fundo claro — usar `--color-accent-ink`.

---

## 6. Alternância de tema (SSR-safe, sem flash)

Estratégia: **cookie + `data-theme` no `<html>` renderizado no servidor**. Nada de decidir tema só no cliente (causa FOUC).

1. Cookie `theme=dark|light` (default `dark`; se ausente, usar `prefers-color-scheme` resolvido no primeiro acesso e persistir).
2. No `RootLayout` (server), ler o cookie e setar `<html data-theme={theme}>`.
3. `ThemeToggle` (client) atualiza o cookie e o atributo `data-theme` na hora (sem reload), com `aria-pressed` e rótulo acessível ("Alternar tema claro/escuro").
4. Opcional: `next-themes` com `attribute="data-theme"` e `disableTransitionOnChange` — aceitável, desde que renderize no servidor sem flash.
5. Transição suave de cor ao trocar: `transition: background-color .2s, color .2s` no `body`, **desativada** sob `prefers-reduced-motion`.

---

## 7. Tipografia

| Papel | Família | Pesos | Uso |
|:--|:--|:--|:--|
| Display / headings | **Poppins** | 600, 700, 800 | H1–H3, eyebrows, números-destaque |
| Corpo / UI | **Inter** | 400, 500, 600 | parágrafos, labels, nav, botões |
| Acento editorial (opcional) | serif itálica (Georgia/Cambria) | — | só em pull-quotes editoriais; **não** na UI institucional |

- Carregar com `next/font` (self-host, `display: swap`, subset latin). Sem FOUT perceptível.
- **Escala** (clamp fluido):
  - `h1`: `clamp(2.2rem, 5vw, 3.6rem)` · peso 800 · `line-height:1.05` · `letter-spacing:-.01em`
  - `h2`: `clamp(1.7rem, 3.6vw, 2.6rem)` · 700
  - `h3`: `clamp(1.3rem, 2.2vw, 1.7rem)` · 700
  - `body`: `1rem–1.125rem` · 400/500 · `line-height:1.6`
  - `eyebrow`: `.78rem` · 600/700 · `letter-spacing:.2em` · uppercase · cor `--color-accent-ink`
  - `small/legenda`: `.85rem` · cor `--color-text-subtle`
- Largura de leitura: `max-width: 66ch` em blocos de texto corrido.

---

## 8. Espaçamento, raio, elevação, grid

- **Escala de espaçamento** (rem): 0.25 / 0.5 / 0.75 / 1 / 1.5 / 2 / 3 / 4 / 6 / 8. Usar via Tailwind (`gap-4`, `py-24`…).
- **Raio:** `--radius-sm:10px` (chips/inputs) · `--radius:16px` (cards) · `--radius-lg:24px` (blocos hero) · `full` (node/pills).
- **Elevação:** só `--shadow-card`; profundidade extra por borda (`--color-border`), não por sombra pesada — coerente com o escuro.
- **Container:** `max-width: 1120px`, padding lateral `clamp(1.2rem, 4vw, 2.5rem)`.
- **Seções:** padding vertical `clamp(3rem, 8vw, 7rem)`; divisor sutil `1px solid var(--color-border)` entre seções quando necessário.

---

## 9. Componentes visuais canônicos

### Botão
- **Primary:** fundo `--color-accent`, texto `--color-accent-contrast`, raio `--radius-sm`, peso 600. Hover: leve brilho/scale (com motion permitido). Foco: anel `--color-focus`.
- **Secondary:** fundo transparente, borda `--color-border`, texto `--color-text`; hover borda `--color-accent`.
- **Ghost:** só texto `--color-accent-ink`.
- Sempre `<a>` quando navega; `<button>` quando ação.

### Card / superfície
- Fundo `--color-surface`, borda `1px --color-border`, raio `--radius`, sombra `--shadow-card`.
- Interativo: `translateY(-4px)` + borda `--color-accent`/`--color-secondary` no hover (só com motion permitido).

### Node / glow (assinatura da marca)
- Ponto `--color-accent`, `border-radius:full`, halo `box-shadow: 0 0 0 6px var(--color-glow)`.
- Decorativo → `aria-hidden="true"`. Usar no logo, em bullets-âncora e em transições de seção. Discreto.

### Eyebrow + título de seção
- Eyebrow (uppercase, tracking largo, `--color-accent-ink`) acima de H2 Poppins. Padrão em toda seção.

### Header
- Sticky, fundo `--overlay-header` + `backdrop-filter: blur(10px)`, borda inferior `--color-border`. Logo-node à esquerda, nav ao centro/direita, `ThemeToggle` + CTA à direita.

### Footer
- Bloco de **entidade** (o que é a QuipeAI, em 2 frases — reforça AGEO) + navegação + redes (apenas as canônicas) + repetição do CTA piloto + selo `© QuipeAI`.

### Quote/arco
- Bloco destacado (`--color-surface-alt`) para a frase-âncora, Poppins itálico peso 700.

### FAQ
- `<details>`/`<summary>` acessível (abre sem JS) **ou** accordion client com `aria-expanded`; conteúdo sempre no HTML (para SEO/AGEO). Emite `FAQPage` schema junto.

---

## 10. Motion

- Biblioteca: framer-motion. Padrões: `reveal-on-scroll` (fade+translateY 24px), progresso de leitura no topo (barra `--color-accent`), hover sutil em cards/botões.
- **`prefers-reduced-motion: reduce` → desliga tudo** (sem translate, sem transition de cor, sem barra animada). Implementar via hook + media query.
- Nada de autoplay de vídeo pesado no hero (custo de CWV).

---

## 11. Imagens & OG

- OG por página: 1200×630, fundo obsidian, logo-node, título da página em Poppins, verde de acento. **Nunca** a imagem genérica do Lovable.
- Ilustração: preferir SVG/CSS (nós, linhas de interligação) a fotos stock de "IA".
- Todo `<img>`: `alt` descritivo; `next/image` com dimensões; nada de texto crítico dentro de imagem.

---

## 12. Mapeamento Tailwind v4 (theme via CSS vars)

No `globals.css`, expor os tokens ao Tailwind:

```css
@theme inline {
  --color-bg: var(--color-bg);
  --color-surface: var(--color-surface);
  --color-surface-alt: var(--color-surface-alt);
  --color-border: var(--color-border);
  --color-text: var(--color-text);
  --color-text-muted: var(--color-text-muted);
  --color-text-subtle: var(--color-text-subtle);
  --color-accent: var(--color-accent);
  --color-accent-ink: var(--color-accent-ink);
  --color-secondary: var(--color-secondary);
  --color-secondary-ink: var(--color-secondary-ink);
  --font-display: "Poppins", sans-serif;
  --font-sans: "Inter", system-ui, sans-serif;
  --radius: 16px;
}
```

Uso em componente: `className="bg-surface text-text border border-border"`, `text-accent-ink`, `font-display`. **Nunca** `bg-[#17203A]`.

---

## 13. Checklist visual de Definition of Done (por tela)

- [ ] Só tokens semânticos (zero hex/px solto).
- [ ] Correto e bonito nos **dois** temas (testar toggle).
- [ ] Contraste AA verificado nos dois temas (texto, ícone, borda).
- [ ] Verde de texto pequeno no claro usa `--color-accent-ink`, não neon.
- [ ] Foco visível em todos os interativos.
- [ ] `prefers-reduced-motion` respeitado.
- [ ] Node/glow usado com parcimônia (assinatura, não decoração ruidosa).
- [ ] Tipografia na escala; leitura ≤ 66ch.
- [ ] Sem flash de tema no primeiro paint (SSR + cookie).
