// Respostas corretas (id do radio button correto)
const respostasCorretas = {
  1: "3",  // Boris - Sim, grande participação
  2: "5",  // Anjo - Alice
  3: "7",  // Ink demon se comunica - Sim, em Bendy and the dark revival
  4: "9",  // Quem vê como Deus - Sammy Lawrence
  5: "11", // Onde se passam - No Studio de animação
  6: "15", // Derrotar Ink demon - Sim, quebrando o loop
  7: "17", // Criador Ink demon - Joey Drew
  8: "24", // Bendy e Ink demon - Sim, são
  9: "22", // Boris é único - Sim, os outros lobos não são Boris
  10: "23" // Objetivo Ink demon - Manter o ciclo eterno
};

// Inicializar objeto de respostas no sessionStorage
function inicializarRespostas() {
  if (!sessionStorage.getItem('respostas')) {
    sessionStorage.setItem('respostas', JSON.stringify({}));
  }
}

// Salvar resposta quando clica no radio button
function salvarResposta(idRadio) {
  const respostas = JSON.parse(sessionStorage.getItem('respostas')) || {};
  
  // Encontrar qual pergunta foi respondida baseado no ID
  const pergunta = encontrarPergunta(idRadio);
  
  if (pergunta) {
    respostas[pergunta] = idRadio;
    sessionStorage.setItem('respostas', JSON.stringify(respostas));
    console.log(`Resposta salva - Pergunta ${pergunta}: ${idRadio}`);
  }
}

// Encontrar qual pergunta corresponde ao radio button
function encontrarPergunta(idRadio) {
  for (let i = 1; i <= 10; i++) {
    const ids = obterIdsPerguntas(i);
    if (ids.includes(parseInt(idRadio))) {
      return i;
    }
  }
  return null;
}

// Obter IDs dos radio buttons de cada pergunta
function obterIdsPerguntas(numeroPergunta) {
  const questoes = {
    1: [1, 2, 3],
    2: [4, 5, 6],
    3: [7, 8, 9],
    4: [8, 9, 10],
    5: [11, 12, 13],
    6: [14, 15, 16],
    7: [17, 18, 19],
    8: [18, 19, 20],
    9: [21, 22, 23],
    10: [21, 22, 23]
  };
  return questoes[numeroPergunta] || [];
}

// Calcular pontuação
function calcularPontuacao() {
  const respostas = JSON.parse(sessionStorage.getItem('respostas')) || {};
  let acertos = 0;

  for (let pergunta = 1; pergunta <= 10; pergunta++) {
    const respostaUsuario = respostas[pergunta];
    const respostaCorreta = respostasCorretas[pergunta];

    if (respostaUsuario && respostaUsuario.toString() === respostaCorreta) {
      acertos++;
    }
  }

  return acertos;
}

// Adicionar listeners aos radio buttons
function adicionarListeners() {
  const radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(radio => {
    radio.addEventListener('change', function() {
      salvarResposta(this.id);
    });
  });
}

// Inicializar ao carregar a página
window.addEventListener('DOMContentLoaded', function() {
  inicializarRespostas();
  adicionarListeners();
});

// Preparar resultado antes de navegar
function prepararResultado() {
  const acertos = calcularPontuacao();
  sessionStorage.setItem('pontuacao', acertos);
}
