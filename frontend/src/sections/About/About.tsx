
import { ArrowRight } from "../../components/ui/Icons";
import Reveal from "../../components/ui/Reveal";
import "./About.css";

type TipoPilar = "dados" | "tecnologia" | "estrategia" | "resultados";

interface IconePilarProps {
  tipo: TipoPilar;
}

const PILARES: {
  id: string;
  titulo: string;
  descricao: string;
  icone: TipoPilar;
}[] = [
  {
    id: "dados",
    titulo: "DADOS",
    descricao:
      "Transformamos informações em clareza, revelando oportunidades e apoiando decisões mais inteligentes.",
    icone: "dados",
  },
  {
    id: "tecnologia",
    titulo: "TECNOLOGIA",
    descricao:
      "Desenvolvemos soluções digitais que simplificam processos e conectam pessoas, sistemas e informações.",
    icone: "tecnologia",
  },
  {
    id: "estrategia",
    titulo: "ESTRATÉGIA",
    descricao:
      "Unimos análise e visão de negócio para transformar desafios em novas possibilidades.",
    icone: "estrategia",
  },
  {
    id: "resultados",
    titulo: "RESULTADOS",
    descricao:
      "Acreditamos na evolução contínua, com eficiência, inteligência e impacto real para os negócios.",
    icone: "resultados",
  },
];

function IconePilar({ tipo }: IconePilarProps) {
  const comum = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg
      viewBox="0 0 48 48"
      width="42"
      height="42"
      {...comum}
      aria-hidden="true"
    >
      {tipo === "dados" && (
        <>
          <path d="M8 37V25h8v12M20 37V16h8v21M32 37V8h8v29" />
          <path d="m8 18 11-7 9 3 12-8" />
          <circle cx="8" cy="18" r="2" />
          <circle cx="28" cy="14" r="2" />
          <circle cx="40" cy="6" r="2" />
        </>
      )}

      {tipo === "tecnologia" && (
        <>
          <rect x="7" y="9" width="34" height="27" rx="3" />
          <path d="M7 16h34M13 23h10M13 28h7M13 32h4" />
          <rect x="28" y="21" width="8" height="9" rx="1" />
          <path d="M17 41h14M24 36v5" />
          <path d="M33 25h-2M33 28h-2" />
        </>
      )}

      {tipo === "estrategia" && (
        <>
          <circle cx="24" cy="24" r="17" />
          <circle cx="24" cy="24" r="3" />
          <path d="m20 28 4-12 4 12-4-3z" />
          <path d="M24 3v5M24 40v5M3 24h5M40 24h5" />
        </>
      )}

      {tipo === "resultados" && (
        <>
          <path d="M8 39V9M8 39h33" />
          <path d="m13 32 9-9 7 4 13-15" />
          <path d="M32 12h10v10" />
          <circle cx="22" cy="23" r="2" />
          <circle cx="29" cy="27" r="2" />
        </>
      )}
    </svg>
  );
}

export default function About() {
  return (
    <section
      id="sobre"
      className="VOID-section VOID-about"
      aria-labelledby="void-about-title"
    >
      <div className="VOID-container VOID-about__inner">
        <Reveal className="VOID-about__heading">
          <span className="VOID-label">SOBRE A VOID</span>

          <h2 id="void-about-title">Conheça a VOID</h2>

          <span className="VOID-about__underline" />

          <p className="VOID-about__intro">
            Tecnologia, inteligência e estratégia para transformar a maneira
            como empresas evoluem.
          </p>
        </Reveal>

        <div className="VOID-about__pillars">
          {PILARES.map((pilar, index) => (
            <Reveal
              key={pilar.id}
              className="VOID-about__item"
              delay={index * 100}
            >
              <div className="VOID-about__icon">
                <IconePilar tipo={pilar.icone} />
              </div>

              <h3>{pilar.titulo}</h3>

              <p>{pilar.descricao}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="VOID-about__footer" delay={350}>
          <a href="#contato">
            Vamos construir algo juntos
            <ArrowRight />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
