
import { ArrowRight } from "../../components/ui/Icons";
import Reveal from "../../components/ui/Reveal";
import controlImage from "../../assets/voidcontrol.png";
import "./Solutions.css";

type Sistema = {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
  link: {
    rotulo: string;
    href: string;
  };
};

const SISTEMAS: Sistema[] = [
  {
    id: "control",
    nome: "Control",
    descricao:
      "Gestão e acompanhamento operacional em uma interface centralizada, com indicadores e informações em tempo real.",
    imagem: controlImage,
    link: {
      rotulo: "Quero conhecer",
      href: "#contato",
    },
  },
];

function SistemaCard({ sistema }: { sistema: Sistema }) {
  return (
    <Reveal
      as="article"
      className="VOID-card VOID-card--live"
    >
      <header className="VOID-card__top">
        <span className="VOID-card__num">01</span>

        <span className="VOID-pill VOID-pill--producao">
          Em produção
        </span>
      </header>

      <h3 className="VOID-card__name">
        <span className="VOID-logo">Void</span> {sistema.nome}
      </h3>

      <p className="VOID-card__text">{sistema.descricao}</p>

      <div className="VOID-card__preview">
        <img
          src={sistema.imagem}
          alt={`Prévia da interface do VOID ${sistema.nome}`}
          loading="lazy"
          decoding="async"
        />
      </div>

      <a href={sistema.link.href} className="VOID-link VOID-card__link">
        {sistema.link.rotulo}
        <ArrowRight />
      </a>
    </Reveal>
  );
}

export default function Solutions() {
  return (
    <section
      id="solucoes"
      className="VOID-section VOID-solutions"
      aria-labelledby="void-solutions-title"
    >
      <div className="VOID-container">
        <Reveal className="VOID-section-head">
          <div>
            <span className="VOID-label">Nosso sistema</span>

            <h2
              id="void-solutions-title"
              className="VOID-title VOID-solutions__title"
            >
              Tecnologia para impulsionar
              <br />
              o seu negócio.
            </h2>
          </div>

          <p className="VOID-lead">
            Conheça o VOID Control, nossa solução para gestão e
            acompanhamento operacional, desenvolvida para
            simplificar processos e gerar resultados.
          </p>
        </Reveal>

        <div className="VOID-solutions__grid">
          {SISTEMAS.map((sistema) => (
            <SistemaCard
              key={sistema.id}
              sistema={sistema}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
