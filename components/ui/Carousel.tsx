"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export type CarouselImage = {
  /** Caminho em /public, ex.: "/produtos/auditoria-ia/dashboard.webp". */
  src: string;
  /** Alt descritivo — obrigatório (a11y + SEO). */
  alt: string;
  /** Legenda visível opcional. */
  caption?: string;
};

type CarouselProps = {
  images: ReadonlyArray<CarouselImage>;
  /** Proporção do palco (CSS aspect-ratio). Default 16/10. */
  aspect?: string;
  className?: string;
};

/**
 * Carrossel de screenshots — acessível (teclado + swipe), nos dois temas,
 * respeitando prefers-reduced-motion. Não renderiza nada sem imagem (seguro
 * em produção enquanto os arquivos não chegam).
 */
export function Carousel({ images, aspect = "16 / 10", className }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback((next: number) => setIndex((i) => (next + count) % count), [count]);

  useEffect(() => {
    if (index > count - 1) setIndex(0);
  }, [count, index]);

  if (count === 0) return null;

  return (
    <div
      className={`flex flex-col gap-4 ${className ?? ""}`}
      role="group"
      aria-roledescription="carrossel"
      aria-label="Telas do produto"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div
        className="relative overflow-hidden rounded-lg border border-border bg-surface-alt shadow-card"
        style={{ aspectRatio: aspect }}
        onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
          if (Math.abs(dx) > 40) go(index + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        {images.map((img, i) => (
          <figure
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-300 motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== index}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 720px"
              className="object-cover"
              priority={i === 0}
            />
            {img.caption ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-bg/80 px-4 py-2 text-sm text-text-muted backdrop-blur-sm">
                {img.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Imagem anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/90 text-text backdrop-blur-sm transition-colors hover:border-accent motion-reduce:transition-none"
            >
              <ChevronLeft aria-hidden className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Próxima imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface/90 text-text backdrop-blur-sm transition-colors hover:border-accent motion-reduce:transition-none"
            >
              <ChevronRight aria-hidden className="size-4" />
            </button>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div
          className="flex items-center justify-center gap-2"
          role="tablist"
          aria-label="Selecionar tela"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Ir para a tela ${i + 1}: ${img.alt}`}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                i === index ? "w-6 bg-accent" : "w-2 bg-border hover:bg-text-subtle"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
