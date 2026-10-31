
import { ArrowRight, Plus } from "../../components/ui/Icons";
import Reveal from "../../components/ui/Reveal";
import controlImage from "../../assets/voidcontrol.png";
import "./Solutions.css";

type StatusSistema = "producao" | "desenvolvimento";

type Sistema = {
  id: string;
  status: StatusSistema;
  nome?: string;
  descricao: string;
  imagem?: string;
  link: {
    rotulo: string;
    href: string;
  };
};

const SISTEMAS: Sistema[] = [
  {
    id: "control",
    status: "producao",
    nome: "Control",
    descricao:
      "Gestão e acompanhamento operacional em uma interface centralizada, com indicadores e informações em tempo real.",
    imagem: controlImage,
    link: {
      rotulo: "Quero conhecer",
      href: "#contato",
    },
  },
  {
    id: "sistema-02",
    status: "desenvolvimento",
    descricao: "Um novo sistema da VOID está em desenvolvimento.",
    link: {
      rotulo: "Saiba mais",
      href: "#contato",
    },
  },
  {
    id: "sistema-03",
    status: "desenvolvimento",
    descricao: "Novas soluções estão chegando.",
    link: {
      rotulo: "Saiba mais",
      href: "#contato",
    },
  },
];

const STATUS: Record<StatusSistema, string> = {
  producao: "Em produção",
  desenvolvimento: "Em desenvolvimento",
};

function SistemaCard({
  sistema,
  index,
}: {
  sistema: Sistema;
  index: number;
}) {
  const emProducao = sistema.status === "producao";

  return (
    <Reveal
      as="article"
      delay={index * 120}
      className={`VOID-card ${
        emProducao ? "VOID-card--live" : "VOID-card--soon"
      }`}
    >
      <header className="VOID-card__top">
        <span className="VOID-card__num">
          {String(index + 1).padStart(2, "0")}
        </span>

        <span className={`VOID-pill VOID-pill--${sistema.status}`}>
          {STATUS[sistema.status]}
        </span>
      </header>

      {emProducao ? (
        <>
          <h3 className="VOID-card__name">
            <span className="VOID-logo">Void</span> {sistema.nome}
          </h3>

          <p className="VOID-card__text">{sistema.descricao}</p>

          <div className="VOID-card__preview">
            {sistema.imagem && (
              <img
                src={sistema.imagem}
                alt="Prévia da interface do VOID Control"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </>
      ) : (
        <div className="VOID-card__soon">
          <span className="VOID-card__plus" aria-hidden="true">
            <Plus />
          </span>

          <h3>Em breve</h3>

          <p className="VOID-card__text">{sistema.descricao}</p>
        </div>
      )}

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
            <span className="VOID-label">Nossos sistemas</span>

            <h2
              id="void-solutions-title"
              className="VOID-title VOID-solutions__title"
            >
              Soluções em desenvolvimento
              <br />
              para impulsionar o seu negócio.
            </h2>
          </div>

          <p className="VOID-lead">
            Estamos desenvolvendo uma linha de sistemas focados em resolver
            desafios reais das empresas, com o apoio da inteligência artificial.
          </p>
        </Reveal>

        <div className="VOID-solutions__grid">
          {SISTEMAS.map((sistema, index) => (
            <SistemaCard
              key={sistema.id}
              sistema={sistema}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
