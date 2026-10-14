import { LOGOTIPO, SIMBOLO } from "@/lib/branding/desenho";
import { cn } from "@/lib/utils";

/**
 * A marca do PRODUTO desenhada em SVG inline — o que a tela mostra quando
 * ninguém configurou marca própria (`marcaEhADoProduto`, em `lib/branding.ts`).
 *
 * Inline, e não `<img src="/algo.svg">`, por três motivos:
 *  - as cores seguem o TEMA: o ladrilho muda de verde e o texto acompanha o
 *    contraste da interface;
 *  - nada em `public/`: um `.svg` fixo ali seria servido na instalação de um
 *    revendedor que configurou a marca dele;
 *  - a barra lateral já usa `<img>` para o logo CONFIGURADO, e o e2e
 *    `marca-logo.spec.ts` mede "barra sem `<img>`" como "sem logo do
 *    revendedor". Um `<img>` do produto ali faria a spec medir a coisa errada.
 */

type Props = {
  readonly nome: string;
  readonly className?: string;
  /** Use when the mark sits on the graphite application sidebar. */
  readonly superficieEscura?: boolean;
  /** `true` quando o texto ao lado já nomeia a marca — evita ler duas vezes. */
  readonly decorativo?: boolean;
};

const LADRILHO_CLARO_ESCURO = "fill-[#173F35] dark:fill-[#1F6B52]";
const SIMBOLO_CLARO_ESCURO = "fill-[#FFFFFF] stroke-[#FFFFFF]";
const NOME_CLARO_ESCURO = "fill-[#1c1814] dark:fill-[#f6f1ea]";
const SUFIXO_CLARO_ESCURO = "fill-[#5b5043] dark:fill-[#8a7e6b]";
const LADRILHO_SUPERFICIE_ESCURA = "fill-[#1F6B52]";
const NOME_SUPERFICIE_ESCURA = "fill-[#f6f1ea]";
const SUFIXO_SUPERFICIE_ESCURA = "fill-[#c0b6a7]";

// As classes acima repetem os hexes de `CORES_DA_MARCA` porque o Tailwind só
// gera utilitário para valor LITERAL no fonte. Quem impede os dois de divergirem
// é `tests/unit/marca-do-produto.test.tsx`, que compara as classes à paleta —
// e não uma asserção em runtime: um throw aqui derrubaria a casca inteira.
export const CLASSES_DE_COR = {
  ladrilho: LADRILHO_CLARO_ESCURO,
  simbolo: SIMBOLO_CLARO_ESCURO,
  nome: NOME_CLARO_ESCURO,
  sufixo: SUFIXO_CLARO_ESCURO,
} as const;

function acessibilidade(nome: string, decorativo: boolean) {
  return decorativo
    ? ({ "aria-hidden": true } as const)
    : ({ role: "img", "aria-label": nome } as const);
}

function DesenhoDoSimbolo({ superficieEscura }: { readonly superficieEscura: boolean }) {
  return (
    <g transform={LOGOTIPO.simbolo.transform}>
      <rect
        width={SIMBOLO.ladrilho.width}
        height={SIMBOLO.ladrilho.height}
        rx={SIMBOLO.ladrilho.rx}
        className={superficieEscura ? LADRILHO_SUPERFICIE_ESCURA : LADRILHO_CLARO_ESCURO}
      />
      <path
        d={SIMBOLO.arco.d}
        fill="none"
        strokeWidth={SIMBOLO.arco.strokeWidth}
        strokeLinecap="round"
        className={SIMBOLO_CLARO_ESCURO}
      />
      {SIMBOLO.barras.map((barra) => (
        <rect key={`${barra.x}-${barra.y}`} {...barra} className={SIMBOLO_CLARO_ESCURO} />
      ))}
    </g>
  );
}

/** O símbolo sozinho — para a barra recolhida, avatar e cantos apertados. */
export function SimboloDoProduto({ nome, className, decorativo = false, superficieEscura = false }: Props) {
  return (
    <svg
      viewBox={SIMBOLO.viewBox}
      className={cn("shrink-0", className)}
      {...acessibilidade(nome, decorativo)}
    >
      <DesenhoDoSimbolo superficieEscura={superficieEscura} />
    </svg>
  );
}

/** Símbolo + nome — para a barra aberta e a fachada de entrada. */
export function LogotipoDoProduto({ nome, className, decorativo = false, superficieEscura = false }: Props) {
  return (
    <svg
      viewBox={LOGOTIPO.viewBox}
      className={cn("shrink-0", className)}
      {...acessibilidade(nome, decorativo)}
    >
      <DesenhoDoSimbolo superficieEscura={superficieEscura} />
      <text
        className={superficieEscura ? NOME_SUPERFICIE_ESCURA : NOME_CLARO_ESCURO}
        x="264"
        y="108"
        fontFamily='"Segoe UI", "Microsoft YaHei", sans-serif'
        fontSize="78"
        fontWeight="700"
        letterSpacing="-1"
      >
        {LOGOTIPO.nome}
      </text>
      <text
        className={superficieEscura ? SUFIXO_SUPERFICIE_ESCURA : SUFIXO_CLARO_ESCURO}
        x="268"
        y="168"
        fontFamily='"Cascadia Code", Consolas, monospace'
        fontSize="34"
        fontWeight="500"
        letterSpacing="6"
      >
        {LOGOTIPO.sufixo}
      </text>
    </svg>
  );
}
