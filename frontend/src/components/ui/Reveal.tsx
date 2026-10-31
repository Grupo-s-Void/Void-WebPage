import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

type RevealProps = {
  as?: ElementType;
  className?: string;
  /** Atraso em ms (útil para efeito cascata). */
  delay?: number;
  children: ReactNode;
};

/**
 * Faz o conteúdo surgir suavemente quando entra na tela.
 * Depois da entrada, adiciona `is-revealed` e remove o atraso,
 * para que efeitos de hover respondam na hora.
 */
export default function Reveal({ as: Tag = "div", className = "", delay = 0, children }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let fimTimer: number | undefined;

    const revelar = () => {
      el.classList.add("is-visible");
      // 900ms = duração da transição em globals.css
      fimTimer = window.setTimeout(() => {
        el.classList.add("is-revealed");
        el.style.removeProperty("--reveal-delay");
      }, delay + 950);
    };

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          revelar();
          observador.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    observador.observe(el);

    return () => {
      observador.disconnect();
      window.clearTimeout(fimTimer);
    };
  }, [delay]);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag ref={ref} className={`VOID-reveal ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
