// Banco de perguntas do quiz.
//
// Cada questão traz cinco posições em espectro (2 = mais próximo de Lula,
// 1 = levemente próximo, nenhum peso = centro, 1 para Flávio = levemente
// próximo, 2 = mais próximo de Flávio Bolsonaro). O texto das alternativas
// descreve só a preferência do eleitor, sem citar candidatos.
// `weights` pode dar pontos aos dois lados ao mesmo tempo (posições de centro).
// Os pesos são uma aproximação das posições públicas mais conhecidas de cada
// candidato e servem como ponto de partida — ajuste conforme seu critério.
const QUIZ_DATA = {
  candidates: {
    lula: {
      name: "Lula",
      color: "#ff4d5e"
    },
    flavio: {
      name: "Flávio Bolsonaro",
      color: "#3d9bff"
    }
  },
  questions: [
    {
      text: "Qual deve ser o papel do Estado na economia?",
      options: [
        { text: "Comandar setores estratégicos, com empresas públicas fortes e investimento direto no crescimento.", weights: { lula: 2 } },
        { text: "Induzir o crescimento com crédito público e parcerias, mantendo estatais nos setores-chave.", weights: { lula: 1 } },
        { text: "Regular e fiscalizar, sem operar empresas nem escolher setores vencedores.", weights: { lula: 1, flavio: 1 } },
        { text: "Reduzir sua presença e deixar a maior parte da atividade para a iniciativa privada.", weights: { flavio: 1 } },
        { text: "Limitar-se ao essencial, com a menor máquina pública possível.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "O que fazer com as empresas estatais?",
      options: [
        { text: "Nenhuma estatal estratégica deve ser vendida: elas garantem soberania e emprego.", weights: { lula: 2 } },
        { text: "Avaliar caso a caso, preservando Petrobras, bancos públicos e Correios.", weights: { lula: 1 } },
        { text: "Privatizar apenas as deficitárias e manter as lucrativas sob controle público.", weights: { lula: 1, flavio: 1 } },
        { text: "Privatizar a maioria, exceto poucas atividades típicas de Estado.", weights: { flavio: 1 } },
        { text: "Privatizar o máximo possível, incluindo Petrobras e bancos públicos.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Qual política tributária você prefere?",
      options: [
        { text: "Taxar grandes fortunas, lucros e dividendos e ampliar a isenção de imposto de renda para quem ganha pouco.", weights: { lula: 2 } },
        { text: "Taxar mais o topo da renda sem aumentar a carga total sobre a população.", weights: { lula: 1 } },
        { text: "Simplificar tributos mantendo a carga atual, sem novas taxações.", weights: { lula: 1, flavio: 1 } },
        { text: "Cortar impostos de empresas para estimular investimento e reduzir a informalidade.", weights: { flavio: 1 } },
        { text: "Reduzir a carga tributária em geral, com imposto único e menos burocracia.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Como devem ser o gasto público e os programas sociais?",
      options: [
        { text: "Ampliar transferência de renda e investimento público, revendo limites de gasto.", weights: { lula: 2 } },
        { text: "Manter os programas atuais, com ajustes para garantir financiamento.", weights: { lula: 1 } },
        { text: "Concentrar a política social em quem comprova necessidade, com controle rígido das contas.", weights: { lula: 1, flavio: 1 } },
        { text: "Conter o gasto público e condicionar benefícios a contrapartidas.", weights: { flavio: 1 } },
        { text: "Cortar despesas de forma ampla, mantendo apenas programas emergenciais.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Qual deve ser a prioridade na segurança pública?",
      options: [
        { text: "Tratar a violência como problema social: renda, educação e emprego primeiro.", weights: { lula: 2 } },
        { text: "Combinar prevenção social com inteligência policial e integração das forças.", weights: { lula: 1 } },
        { text: "Investir em tecnologia, inteligência e treinamento, sem mudar a legislação penal.", weights: { lula: 1, flavio: 1 } },
        { text: "Endurecer penas e facilitar o acesso a armas para defesa pessoal.", weights: { flavio: 1 } },
        { text: "Priorizar o confronto policial, reduzir a maioridade penal e armar a população.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Como conciliar produção e meio ambiente?",
      options: [
        { text: "Priorizar preservação e fiscalização, com metas de desmatamento e transição energética.", weights: { lula: 2 } },
        { text: "Conciliar preservação e produção, com fiscalização reforçada e crédito sustentável.", weights: { lula: 1 } },
        { text: "Manter a legislação atual, equilibrando conservação e agropecuária.", weights: { lula: 1, flavio: 1 } },
        { text: "Flexibilizar o licenciamento para destravar obras e a produção agropecuária.", weights: { flavio: 1 } },
        { text: "Reduzir restrições ambientais e priorizar a exploração econômica do território.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Qual o caminho para o ensino superior?",
      options: [
        { text: "Expandir vagas e investimento nas universidades federais, com cotas e apoio à permanência.", weights: { lula: 2 } },
        { text: "Manter e ampliar o financiamento público, com cotas e incentivo ao ensino técnico.", weights: { lula: 1 } },
        { text: "Combinar verba pública com avaliação de desempenho e parcerias privadas.", weights: { lula: 1, flavio: 1 } },
        { text: "Priorizar o ensino básico e técnico e abrir espaço ao financiamento privado no superior.", weights: { flavio: 1 } },
        { text: "Reduzir a participação do Estado no ensino superior e ampliar o financiamento privado.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Como financiar a saúde pública?",
      options: [
        { text: "Reforçar o SUS com mais financiamento público e ampliação da atenção básica.", weights: { lula: 2 } },
        { text: "Ampliar o financiamento do SUS e melhorar a gestão com metas e digitalização.", weights: { lula: 1 } },
        { text: "Manter o SUS universal, com parcerias privadas para reduzir filas.", weights: { lula: 1, flavio: 1 } },
        { text: "Priorizar planos privados e concorrência no setor, com papel supletivo do Estado.", weights: { flavio: 1 } },
        { text: "Reduzir o gasto público direto e estimular a cobertura privada individual.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Como o Brasil deve se posicionar no mundo?",
      options: [
        { text: "Fortalecer BRICS e integração regional, com autonomia diante das grandes potências.", weights: { lula: 2 } },
        { text: "Manter relações com todos os blocos, sem alinhamento automático.", weights: { lula: 1 } },
        { text: "Priorizar acordos comerciais e investimento estrangeiro, com boas relações com todos.", weights: { lula: 1, flavio: 1 } },
        { text: "Aproximar o país dos EUA e de Israel, com alinhamento claro ao Ocidente.", weights: { flavio: 1 } },
        { text: "Aproximar o Brasil dos EUA e de Israel e rever a participação em blocos como os BRICS.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "Qual deve ser o papel do Estado em temas de costumes?",
      options: [
        { text: "Garantir direitos e não impor valores, preservando o Estado laico e a igualdade.", weights: { lula: 2 } },
        { text: "Garantir direitos individuais com diálogo, evitando retrocessos e imposições.", weights: { lula: 1 } },
        { text: "Manter a legislação atual e deixar as decisões para o Congresso.", weights: { lula: 1, flavio: 1 } },
        { text: "Defender a família tradicional e restringir políticas de gênero nas escolas.", weights: { flavio: 1 } },
        { text: "Reforçar valores cristãos nas políticas públicas e barrar pautas progressistas.", weights: { flavio: 2 } }
      ]
    },
    {
      text: "O que fazer com salário mínimo e aposentadorias?",
      options: [
        { text: "Aumentar o salário mínimo acima da inflação e preservar as regras atuais de aposentadoria.", weights: { lula: 2 } },
        { text: "Reajustar o mínimo pela inflação com ganho real quando possível, mantendo a reforma atual.", weights: { lula: 1 } },
        { text: "Manter as regras vigentes e só mudar com base em estudos atuariais.", weights: { lula: 1, flavio: 1 } },
        { text: "Rever benefícios e indexações para equilibrar as contas da Previdência.", weights: { flavio: 1 } },
        { text: "Elevar a idade mínima e reajustar aposentadorias apenas pela inflação.", weights: { flavio: 2 } }
      ]
    }
  ]
};
