/**
 * Dados centrais do site. Altere aqui e o site inteiro se atualiza.
 */

export const SITE = {
  nome: "VOID",
  email: "contato@void.com.br",
  // TODO: substituir pelo telefone real antes de publicar.
  telefone: { rotulo: "+55 (49) 99999-9999", href: "tel:+5549999999999" },
  cidade: "Videira - SC",
} as const;

/** Redes sociais. Deixe `href` vazio para esconder o ícone. */
export const REDES_SOCIAIS = {
  linkedin: "",
  instagram: "",
  youtube: "",
} as const;

/** Seções da página, na ordem em que aparecem. */
export const SECOES = ["inicio", "solucoes", "sobre", "contato"] as const;

export type SecaoId = (typeof SECOES)[number];

/** Links do menu principal. */
export const NAVEGACAO: { id: SecaoId; rotulo: string }[] = [
  { id: "inicio", rotulo: "Início" },
  { id: "solucoes", rotulo: "Soluções" },
  { id: "sobre", rotulo: "Sobre" },
  { id: "contato", rotulo: "Contato" },
];

export const mailto = (assunto?: string) =>
  `mailto:${SITE.email}${assunto ? `?subject=${encodeURIComponent(assunto)}` : ""}`;
