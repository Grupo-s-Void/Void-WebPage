import { useEffect, useState } from "react";
import { NAVEGACAO, type SecaoId } from "../../config/site";
import { ArrowRight, Close, Menu } from "../ui/Icons";
import "./Header.css";

export default function Header() {
  const [ativo, setAtivo] = useState<SecaoId>("inicio");
  const [rolado, setRolado] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);

  // Destaca o link da seção visível e escurece o header ao rolar.
  useEffect(() => {
    let frame = 0;

    const atualizar = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setRolado(window.scrollY > 12);

        const referencia = window.innerHeight * 0.4;
        let atual: SecaoId = "inicio";

        for (const { id } of NAVEGACAO) {
          const secao = document.getElementById(id);
          if (secao && secao.getBoundingClientRect().top <= referencia) atual = id;
        }

        const noFim =
          window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

        setAtivo(noFim ? "contato" : atual);
      });
    };

    atualizar();
    window.addEventListener("scroll", atualizar, { passive: true });
    window.addEventListener("resize", atualizar);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", atualizar);
      window.removeEventListener("resize", atualizar);
    };
  }, []);

  // Menu móvel: trava a rolagem do fundo e fecha com Esc.
  useEffect(() => {
    if (!menuAberto) return;

    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const fecharComEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuAberto(false);
    };
    const fecharSeDesktop = () => {
      if (window.innerWidth > 900) setMenuAberto(false);
    };

    window.addEventListener("keydown", fecharComEsc);
    window.addEventListener("resize", fecharSeDesktop);

    return () => {
      document.body.style.overflow = anterior;
      window.removeEventListener("keydown", fecharComEsc);
      window.removeEventListener("resize", fecharSeDesktop);
    };
  }, [menuAberto]);

  const classes = ["VOID-header", rolado && "is-scrolled", menuAberto && "is-open"]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={classes}>
      <div className="VOID-container VOID-header__inner">
        <a href="#inicio" className="VOID-header__logo VOID-logo" aria-label="VOID — início">
          Void
        </a>

        <nav className="VOID-header__nav" aria-label="Principal">
          {NAVEGACAO.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={ativo === link.id ? "is-active" : undefined}
              aria-current={ativo === link.id ? "location" : undefined}
            >
              {link.rotulo}
            </a>
          ))}
        </nav>

        <a href="#contato" className="VOID-btn VOID-btn--ghost VOID-header__cta">
          Fale conosco <ArrowRight />
        </a>

        <button
          type="button"
          className="VOID-header__toggle"
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="void-menu-movel"
          onClick={() => setMenuAberto((v) => !v)}
        >
          {menuAberto ? <Close /> : <Menu />}
        </button>
      </div>

      <div
        id="void-menu-movel"
        className="VOID-header__mobile"
        aria-hidden={!menuAberto}
        inert={!menuAberto}
        onClick={() => setMenuAberto(false)}
      >
        <nav aria-label="Menu móvel">
          {NAVEGACAO.map((link, i) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={ativo === link.id ? "is-active" : undefined}
              style={{ transitionDelay: `${menuAberto ? 80 + i * 50 : 0}ms` }}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {link.rotulo}
            </a>
          ))}
        </nav>

        <a href="#contato" className="VOID-btn VOID-btn--light">
          Fale conosco <ArrowRight />
        </a>
      </div>
    </header>
  );
}
