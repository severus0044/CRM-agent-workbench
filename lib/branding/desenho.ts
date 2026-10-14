/**
 * A geometria da marca do produto.
 *
 * O desenho é um ladrilho verde com um "C" aberto e três barras ascendentes.
 * Ele é código, e não um SVG em `public/`, porque a marca padrão só pode
 * aparecer quando a instalação não configurou uma marca própria. O mesmo
 * desenho alimenta a barra lateral, as telas públicas e o favicon gerado em
 * runtime por `app/icon.tsx`.
 */

export type BarraDoSimbolo = {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly rx: number;
};

/** O símbolo: ladrilho de 216, "C" aberto e barras de pipeline. */
export const SIMBOLO = {
  viewBox: "0 0 216 216",
  ladrilho: { width: 216, height: 216, rx: 48 },
  arco: {
    d: "M144 68 A54 54 0 1 0 144 148",
    strokeWidth: 26,
  },
  barras: [
    { x: 84, y: 112, width: 14, height: 26, rx: 7 },
    { x: 102, y: 98, width: 14, height: 40, rx: 7 },
    { x: 120, y: 84, width: 14, height: 54, rx: 7 },
  ] as readonly BarraDoSimbolo[],
} as const;

/** O logotipo: símbolo + CRM-agent / workbench. */
export const LOGOTIPO = {
  viewBox: "0 0 752 216",
  proporcao: 752 / 216,
  simbolo: { transform: "translate(0 0)" },
  nome: "CRM-agent",
  sufixo: "workbench",
} as const;

/**
 * As cores da marca do produto, por tema. O ladrilho é sempre verde e o
 * símbolo é sempre branco; só o texto acompanha o tema da interface.
 */
export const CORES_DA_MARCA = {
  claro: { ladrilho: "#173F35", simbolo: "#FFFFFF", nome: "#1c1814", sufixo: "#5b5043" },
  escuro: { ladrilho: "#1F6B52", simbolo: "#FFFFFF", nome: "#f6f1ea", sufixo: "#8a7e6b" },
} as const;
