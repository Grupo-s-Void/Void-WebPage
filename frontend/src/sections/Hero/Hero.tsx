import heroV from "../../assets/void-fundo.png";
import { ArrowRight } from "../../components/ui/Icons";
import "./Hero.css";

export default function Hero() {
  return (
    <section id="inicio" className="VOID-hero" aria-label="Início">
      <div className="VOID-hero__visual VOID-anim" aria-hidden="true">
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
        <ul className="VOID-hero__tags VOID-anim" aria-hidden="true">
          <li>Dados</li>
          <li>Inteligência</li>
          <li>Resultados</li>
        </ul>

        <div className="VOID-hero__content">
          <h1 className="VOID-hero__title VOID-anim VOID-anim--up VOID-gpu">
            Inteligência
            <br />
            que transforma
            <br />
            <strong>negócios.</strong>
          </h1>

          <p className="VOID-hero__text VOID-anim VOID-anim--up">
            Desenvolvemos tecnologia para simplificar processos,
            <br className="VOID-hero__br" /> automatizar operações e criar
            soluções inteligentes para empresas.
          </p>

          <a href="#solucoes" className="VOID-btn VOID-btn--light VOID-hero__cta VOID-anim VOID-anim--up">
            Conheça a VOID <ArrowRight />
          </a>
        </div>

        <a href="#solucoes" className="VOID-hero__scroll VOID-anim">
          <span className="VOID-hero__mouse" aria-hidden="true">
            <span />
          </span>
          Role para explorar
        </a>
      </div>
    </section>
  );
}
