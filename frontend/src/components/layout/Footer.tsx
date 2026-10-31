import { REDES_SOCIAIS, SITE, mailto } from "../../config/site";
import { Instagram, LinkedIn, YouTube } from "../ui/Icons";
import "./Footer.css";

type Link = { rotulo: string; href?: string };

const COLUNAS: { titulo: string; links: Link[] }[] = [
  {
    titulo: "Soluções",
    links: [
      { rotulo: "VOID Analytics", href: "#solucoes" },
      { rotulo: "Novos sistemas em breve", href: "#solucoes" },
    ],
  },
  {
    titulo: "Empresa",
    links: [
      { rotulo: "Sobre", href: "#sobre" },
      { rotulo: "Contato", href: "#contato" },
      { rotulo: "Trabalhe conosco", href: mailto("Trabalhe conosco") },
    ],
  },
  {
    titulo: "Contato",
    links: [
      { rotulo: SITE.email, href: mailto() },
      { rotulo: SITE.telefone.rotulo, href: SITE.telefone.href },
      { rotulo: SITE.cidade },
    ],
  },
];

const REDES = [
  { rotulo: "LinkedIn", href: REDES_SOCIAIS.linkedin, Icone: LinkedIn },
  { rotulo: "Instagram", href: REDES_SOCIAIS.instagram, Icone: Instagram },
  { rotulo: "YouTube", href: REDES_SOCIAIS.youtube, Icone: YouTube },
].filter((rede) => rede.href);

export default function Footer() {
  return (
    <footer className="VOID-footer">
      <div className="VOID-container">
        <div className="VOID-footer__top">
          <div className="VOID-footer__brand">
            <a href="#inicio" className="VOID-logo VOID-footer__logo">
              Void
            </a>

            <p>
              Inteligência artificial, análise de dados
              <br />e sistemas para empresas que evoluem.
            </p>

            {REDES.length > 0 && (
              <div className="VOID-footer__social">
                {REDES.map(({ rotulo, href, Icone }) => (
                  <a key={rotulo} href={href} aria-label={rotulo} target="_blank" rel="noopener noreferrer">
                    <Icone />
                  </a>
                ))}
              </div>
            )}
          </div>

          {COLUNAS.map((coluna) => (
            <nav key={coluna.titulo} className="VOID-footer__col" aria-label={coluna.titulo}>
              <h3>{coluna.titulo}</h3>
              <ul>
                {coluna.links.map((link) => (
                  <li key={link.rotulo}>
                    {link.href ? <a href={link.href}>{link.rotulo}</a> : <span>{link.rotulo}</span>}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="VOID-footer__bottom">
          <span>© {new Date().getFullYear()} VOID. Todos os direitos reservados.</span>
        </div>
      </div>
    </footer>
  );
}
