
import heroV from "../../assets/void-fundo.png";
import { ArrowRight } from "../../components/ui/Icons";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="inicio" className="VOID-hero" aria-label="Início">
      <div className="VOID-hero__visual" aria-hidden="true">
        <img
          src={heroV}
          alt=""
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <div className="VOID-container VOID-hero__inner">
        <ul className="VOID-hero__tags" aria-hidden="true">
          <li>Dados</li>
          <li>Inteligência</li>
          <li>Resultados</li>
        </ul>

        <div className="VOID-hero__content">
          <h1 className="VOID-hero__title">
            Inteligência
            <br />
            que transforma
            <br />
            <strong>negócios.</strong>
          </h1>

          <p className="VOID-hero__text">
            Desenvolvemos sistemas e soluções de inteligência artificial
            <br className="VOID-hero__br" /> para transformar dados em decisões reais.
          </p>

          <a href="#solucoes" className="VOID-btn VOID-btn--light">
            Conheça a VOID <ArrowRight />
          </a>
        </div>

        <a href="#solucoes" className="VOID-hero__scroll">
          <span className="VOID-hero__mouse" aria-hidden="true">
            <span />
          </span>
          Role para explorar
        </a>
      </div>
    </section>
  );
}
