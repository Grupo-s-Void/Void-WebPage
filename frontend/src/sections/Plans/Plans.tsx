import type { CSSProperties } from "react";
import { ArrowRight } from "../../components/ui/Icons";
import "./Plans.css";

type Plano = {
  id: string;
  nome: string;
  destaque?: boolean;
  descricao: string;
  preco: number | null;
  recursos: string[];
  cta: string;
};

const PLANOS: Plano[] = [
  {
    id: "essencial",
    nome: "Essencial",
    descricao: "Para experimentar o Control sem compromisso.",
    preco: 0,
    recursos: [
      "Até 2 usuários",
      "Indicadores básicos",
      "Suporte por e-mail",
      "Histórico de 30 dias",
      "Segurança padrão",
    ],
    cta: "Começar grátis",
  },
  {
    id: "profissional",
    nome: "Profissional",
    destaque: true,
    descricao: "Para equipes que precisam de dados em tempo real.",
    preco: 199,
    recursos: [
      "Usuários ilimitados",
      "Indicadores em tempo real",
      "Suporte prioritário",
      "Histórico completo",
      "Exportação de relatórios",
    ],
    cta: "Assinar agora",
  },
  {
    id: "empresarial",
    nome: "Empresarial",
    descricao: "Para operações que exigem soluções sob medida.",
    preco: null,
    recursos: [
      "Tudo do Profissional",
      "Integrações dedicadas",
      "Gerente de conta",
      "SLA personalizado",
      "Segurança avançada",
    ],
    cta: "Falar com vendas",
  },
];

function formatarPreco(plano: Plano) {
  if (plano.preco === null) return { preco: "Sob consulta", sufixo: "" };
  if (plano.preco === 0) return { preco: "Grátis", sufixo: "" };

  return { preco: `R$${plano.preco}`, sufixo: "/mês" };
}

// Checkmark desenhado em blocos para o acabamento pixelado.
function PixelCheck() {
  return (
    <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" shapeRendering="crispEdges">
      <path
        fill="currentColor"
        d="M1 5h1v1H1zM2 6h1v1H2zM3 7h1v1H3zM4 6h1v1H4zM5 5h1v1H5zM6 4h1v1H6zM7 3h1v1H7zM8 2h1v1H8z"
      />
    </svg>
  );
}

export default function Plans() {
  return (
    <section
      id="planos"
      className="VOID-section VOID-plans"
      aria-labelledby="void-plans-title"
    >
      <div className="VOID-container VOID-plans__inner">
        <div className="VOID-plans__heading">
          <span className="VOID-label VOID-anim VOID-anim--up">PLANOS VOID</span>

          <p className="VOID-plans__intro VOID-anim VOID-anim--up">
            Soluções flexíveis que crescem junto com a sua operação, do
            primeiro teste ao uso em escala.
          </p>

          <h2 className="VOID-plans__title VOID-gpu">
            <span id="void-plans-title">Planos</span>
          </h2>

        </div>

        <div className="VOID-plans__carousel">
          <div className="VOID-plans__track">
            {PLANOS.map((plano, index) => {
              const { preco, sufixo } = formatarPreco(plano);

              return (
                <article
                  key={plano.id}
                  style={{ "--i": index } as CSSProperties}
                  className={`VOID-plans__card VOID-anim VOID-anim--scale VOID-gpu${plano.destaque ? " is-destaque" : ""}`}
                >
                  {plano.destaque && <span className="VOID-plans__tag">Mais popular</span>}

                  <span className="VOID-plans__nome">{plano.nome}</span>

                  <div className="VOID-plans__preco">
                    <strong>{preco}</strong>
                    {sufixo && <span>{sufixo}</span>}
                  </div>

                  <p className="VOID-plans__descricao">{plano.descricao}</p>

                  <ul className="VOID-plans__lista">
                    {plano.recursos.map((item, i) => (
                      <li key={item} style={{ "--k": i } as CSSProperties}>
                        <span className="VOID-plans__check">
                          <PixelCheck />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contato"
                    className={`VOID-btn ${
                      plano.destaque ? "VOID-btn--light" : "VOID-btn--ghost"
                    } VOID-plans__cta`}
                  >
                    {plano.cta}
                    <ArrowRight />
                  </a>
                </article>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
