import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Todas as animações do site (GSAP + ScrollTrigger).
 *
 * Os estados iniciais (opacity: 0, deslocamentos e escalas) ficam no CSS
 * (classes `.VOID-anim*` em globals.css), para nada "piscar" antes do JS.
 *
 * As entradas são reversíveis: tocam ao chegar na seção (descendo ou
 * subindo) e se desfazem ao sair dela, nos dois sentidos.
 *
 * Ao terminar a entrada, cada elemento recebe `is-in` e perde os estilos
 * inline, para o hover em CSS funcionar. Antes de reverter, o estado final
 * é devolvido ao GSAP e a classe sai.
 */

const EASE_ENTRADA = "power4.out";
/** A saída é mais rápida que a entrada, para não atrasar a navegação. */
const VELOCIDADE_SAIDA = 1.8;

const FINAL = { opacity: 1, x: 0, y: 0, scale: 1 };

/** Entrega o elemento ao CSS: estado final via `.is-in`, sem estilos inline. */
function finalizar(alvos: gsap.TweenTarget) {
  gsap.utils.toArray<HTMLElement>(alvos).forEach((el) => {
    el.classList.add("is-in");
    gsap.set(el, { clearProps: "opacity,visibility,transform" });
  });
}

/** Devolve ao GSAP os elementos que o CSS assumiu, sem salto visual. */
function desfinalizar(alvos: gsap.TweenTarget) {
  gsap.utils.toArray<HTMLElement>(alvos).forEach((el) => {
    if (!el.classList.contains("is-in")) return;
    gsap.set(el, FINAL);
    el.classList.remove("is-in");
  });
}

/** Stagger que libera cada elemento assim que a própria animação termina. */
function cascata(intervalo: number) {
  return {
    each: intervalo,
    onComplete(this: gsap.core.Tween) {
      finalizar(this.targets());
    },
  };
}

type Reversivel = {
  /** Timeline pausada com as entradas. */
  tl: gsap.core.Timeline;
  /** Elementos que recebem `is-in` (precisam ser devolvidos antes de reverter). */
  alvos: gsap.TweenTarget;
  trigger: string;
  start?: string;
  end?: string;
  aoEntrar?: () => void;
  aoSairCompleto?: () => void;
};

/** Liga uma timeline ao scroll: entra nos dois sentidos, sai nos dois sentidos. */
function reversivel({ tl, alvos, trigger, start = "top 85%", end = "bottom 15%", aoEntrar, aoSairCompleto }: Reversivel) {
  tl.eventCallback("onReverseComplete", () => aoSairCompleto?.());

  const entrar = () => {
    aoEntrar?.();
    tl.timeScale(1).play();
  };

  const sair = () => {
    desfinalizar(alvos);
    tl.timeScale(VELOCIDADE_SAIDA).reverse();
  };

  ScrollTrigger.create({
    trigger,
    start,
    end,
    onEnter: entrar,
    onEnterBack: entrar,
    onLeave: sair,
    onLeaveBack: sair,
  });
}

function animarHero() {
  // Fundo de partículas, menu e logo: fade-in imediato no load (não revertem).
  // O header mantém opacity inline (ver Header.css), por isso não é finalizado.
  gsap
    .timeline()
    .to([".VOID-hero__visual", ".VOID-header"], {
      opacity: 1,
      duration: 1.2,
      ease: "power2.out",
      onComplete: () => finalizar(".VOID-hero__visual"),
    })
    .fromTo(".VOID-hero__visual img", { scale: 1.04 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);

  // Conteúdo do hero: toca no load e de novo sempre que se volta ao topo.
  const alvos = [".VOID-hero__tags", ".VOID-hero__title", ".VOID-hero__text", ".VOID-hero__cta", ".VOID-hero__scroll"];

  const tl = gsap
    .timeline({ paused: true, defaults: { ease: EASE_ENTRADA } })
    .to(
      ".VOID-hero__tags",
      { opacity: 1, duration: 1.2, ease: "power2.out", onComplete: () => finalizar(".VOID-hero__tags") },
      0.3,
    )
    // Título: sobe de baixo para cima.
    .fromTo(
      ".VOID-hero__title",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, onComplete: () => finalizar(".VOID-hero__title") },
      0.15,
    )
    // Subtexto e CTA: em cascata de 0.25s logo após o título terminar.
    .fromTo(
      [".VOID-hero__text", ".VOID-hero__cta"],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: cascata(0.25) },
      ">",
    )
    .to(
      ".VOID-hero__scroll",
      { opacity: 1, duration: 0.8, ease: "power2.out", onComplete: () => finalizar(".VOID-hero__scroll") },
      "<0.25",
    );

  reversivel({ tl, alvos, trigger: ".VOID-hero", start: "top bottom", end: "bottom 45%" });

  // Indicador de scroll: flutuação vertical contínua.
  gsap.to(".VOID-hero__mouse", {
    y: 8,
    duration: 1.4,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
}

function animarSolucoes() {
  const cabecalho = ".VOID-solutions .VOID-section-head > *";
  reversivel({
    tl: gsap.timeline({ paused: true }).fromTo(
      cabecalho,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: EASE_ENTRADA, stagger: cascata(0.15) },
    ),
    alvos: cabecalho,
    trigger: ".VOID-solutions .VOID-section-head",
  });

  // Cards: 0s, 0.2s, 0.4s.
  const cards = ".VOID-solutions__grid .VOID-card";
  reversivel({
    tl: gsap.timeline({ paused: true }).fromTo(
      cards,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: EASE_ENTRADA, stagger: cascata(0.2) },
    ),
    alvos: cards,
    trigger: ".VOID-solutions__grid",
  });
}

function animarPlanos() {
  const cabecalho = [".VOID-plans__heading .VOID-label", ".VOID-plans__intro"];
  reversivel({
    tl: gsap.timeline({ paused: true }).fromTo(
      cabecalho,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: EASE_ENTRADA, stagger: cascata(0.12) },
    ),
    alvos: cabecalho,
    trigger: ".VOID-plans__heading",
  });

  // Palavra gigante: fade nos dois sentidos + escala ligada ao scroll.
  reversivel({
    tl: gsap.timeline({ paused: true }).to(".VOID-plans__title", { opacity: 1, duration: 1.2, ease: "power2.out" }),
    alvos: [],
    trigger: ".VOID-plans",
  });

  gsap.fromTo(
    ".VOID-plans__title",
    { scale: 0.85 },
    {
      scale: 1.1,
      ease: "none",
      // termina quando a seção encosta no topo: parada na tela, a palavra já está ~1.08
      scrollTrigger: { trigger: ".VOID-plans", start: "top bottom", end: "top top", scrub: 1 },
    },
  );

  // Cards: fade-in scale (0.9 → 1) com stagger leve.
  const carrossel = document.querySelector(".VOID-plans__carousel");
  const cards = ".VOID-plans__card";
  reversivel({
    tl: gsap.timeline({ paused: true }).fromTo(
      cards,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "expo.out", stagger: cascata(0.1) },
    ),
    alvos: cards,
    trigger: ".VOID-plans__carousel",
    // dispara/reinicia a cascata interna (preço, lista, botão) definida em Plans.css
    aoEntrar: () => carrossel?.classList.add("is-visible"),
    aoSairCompleto: () => carrossel?.classList.remove("is-visible"),
  });
}

function animarContato() {
  // Blocos deslizam em direção ao centro, juntos.
  const blocos = [".VOID-contact__intro", ".VOID-contact__side"];
  reversivel({
    tl: gsap
      .timeline({
        paused: true,
        defaults: { duration: 1.2, ease: "expo.out" },
        onComplete: () => finalizar(blocos),
      })
      .fromTo(".VOID-contact__intro", { opacity: 0, x: -60 }, { opacity: 1, x: 0 }, 0)
      .fromTo(".VOID-contact__side", { opacity: 0, x: 60 }, { opacity: 1, x: 0 }, 0),
    alvos: blocos,
    trigger: ".VOID-contact__grid",
  });

  // Footer: fica no fim absoluto da página, então só sai ao voltar para cima.
  reversivel({
    tl: gsap.timeline({ paused: true }).to(".VOID-footer", {
      opacity: 1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => finalizar(".VOID-footer"),
    }),
    alvos: ".VOID-footer",
    trigger: ".VOID-footer",
    start: "top 95%",
    end: "bottom top",
  });
}

export function useVoidAnimations() {
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      animarHero();
      animarSolucoes();
      animarPlanos();
      animarContato();
    });

    // Menos movimento: tudo visível de imediato (o CSS também garante isso).
    mm.add("(prefers-reduced-motion: reduce)", () => {
      document.querySelectorAll(".VOID-anim").forEach((el) => el.classList.add("is-in"));
      document.querySelector(".VOID-plans__carousel")?.classList.add("is-visible");
    });

    return () => mm.revert();
  }, []);
}
