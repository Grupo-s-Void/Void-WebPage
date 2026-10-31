import { useEffect } from "react";
import { SECOES } from "../config/site";

const DURACAO_MS = 850;
const MEDIA_DESKTOP = "(min-width: 1025px) and (hover: hover)";

const prefereMenosMovimento = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Rolagem "uma seção por vez" com a roda do mouse em telas grandes.
 * Em touch/tablet a rolagem nativa é mantida. Seções mais altas que a tela
 * rolam normalmente até a borda, para nenhum conteúdo ser pulado.
 * Links internos (#id) também usam a navegação suave.
 */
export function useSectionScroll() {
  useEffect(() => {
    const desktop = window.matchMedia(MEDIA_DESKTOP);
    let indiceAtual = 0;
    let bloqueado = false;
    let temporizador: number | undefined;

    const obterSecoes = () =>
      SECOES.map((id) => document.getElementById(id)).filter(
        (el): el is HTMLElement => el !== null,
      );

    const alturaDoHeader = () =>
      document.querySelector<HTMLElement>(".VOID-header")?.offsetHeight ?? 72;

    const obterPosicao = (el: HTMLElement) => {
      const topo =
        el.getBoundingClientRect().top +
        window.scrollY -
        (el.id === "inicio" ? 0 : alturaDoHeader());
      const limite = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
      return Math.max(0, Math.min(topo, limite));
    };

    const obterIndiceAtual = () => {
      const secoes = obterSecoes();
      let melhor = 0;
      let menorDistancia = Infinity;
      secoes.forEach((secao, i) => {
        const distancia = Math.abs(obterPosicao(secao) - window.scrollY);
        if (distancia < menorDistancia) {
          menorDistancia = distancia;
          melhor = i;
        }
      });
      return melhor;
    };

    const rolarPara = (top: number) =>
      window.scrollTo({ top, behavior: prefereMenosMovimento() ? "instant" : "smooth" });

    const navegar = (indice: number) => {
      const destino = obterSecoes()[indice];
      if (!destino) return;

      indiceAtual = indice;
      bloqueado = true;
      rolarPara(obterPosicao(destino));

      window.clearTimeout(temporizador);
      temporizador = window.setTimeout(() => (bloqueado = false), DURACAO_MS);
    };

    const secaoAindaTemConteudo = (direcao: 1 | -1) => {
      const secao = obterSecoes()[indiceAtual];
      if (!secao) return false;

      const { top, bottom } = secao.getBoundingClientRect();
      const header = secao.id === "inicio" ? 0 : alturaDoHeader();
      return direcao === 1 ? bottom > window.innerHeight + 2 : top < header - 2;
    };

    const aoRolar = (evento: WheelEvent) => {
      if (!desktop.matches || evento.ctrlKey || Math.abs(evento.deltaY) < 1) return;
      if (document.body.style.overflow === "hidden") return;

      const origem = evento.target;
      if (origem instanceof Element && origem.closest("[data-void-native-scroll]")) return;

      const direcao: 1 | -1 = evento.deltaY > 0 ? 1 : -1;

      if (!bloqueado) {
        indiceAtual = obterIndiceAtual();
        if (secaoAindaTemConteudo(direcao)) return;
      }

      evento.preventDefault();
      if (bloqueado) return;

      const total = obterSecoes().length;
      const proximo = Math.max(0, Math.min(indiceAtual + direcao, total - 1));

      if (proximo !== indiceAtual) navegar(proximo);
      else if (direcao === 1) rolarPara(document.documentElement.scrollHeight);
    };

    const aoClicar = (evento: MouseEvent) => {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;

      const link = (evento.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return;

      const indice = obterSecoes().findIndex((secao) => secao.id === id);
      if (indice === -1) return;

      evento.preventDefault();
      navegar(indice);
      history.replaceState(null, "", `#${id}`);
    };

    const sincronizar = () => {
      if (!bloqueado) indiceAtual = obterIndiceAtual();
    };

    indiceAtual = obterIndiceAtual();

    window.addEventListener("wheel", aoRolar, { passive: false });
    window.addEventListener("scroll", sincronizar, { passive: true });
    document.addEventListener("click", aoClicar);

    return () => {
      window.removeEventListener("wheel", aoRolar);
      window.removeEventListener("scroll", sincronizar);
      document.removeEventListener("click", aoClicar);
      window.clearTimeout(temporizador);
    };
  }, []);
}
