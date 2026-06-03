let respostas = {};

function carregarRespostasDoStorage() {
    const respostasSalvas = sessionStorage.getItem('respostasQuiz');
    if (respostasSalvas) {
        respostas = JSON.parse(respostasSalvas);
    }
}

function atualizarBarraProgresso() {
    const totalPerguntas = 10;
    const perguntasRespondidas = Object.keys(respostas).length;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    // Calcula a porcentagem
    const porcentagem = (perguntasRespondidas / totalPerguntas) * 100;
    
    if (progressBar) {
        // Atualiza o width do ::after via CSS custom property
        progressBar.style.setProperty('--progress-width', porcentagem + '%');
    }
    
    if (progressText) {
        progressText.textContent = `${perguntasRespondidas}/${totalPerguntas} Perguntas respondidas`;
    }
}

function salvarResposta(campo, valor) {
    respostas[campo] = valor;
    sessionStorage.setItem('respostasQuiz', JSON.stringify(respostas));
    atualizarBarraProgresso();
    console.log('Resposta salva:', campo, valor);
}

function coletarTodasRespostas() {
    carregarRespostasDoStorage();
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach((radio) => {
        salvarResposta(radio.name, radio.value || radio.id);
    });
    return Object.keys(respostas).length;
}

document.addEventListener('DOMContentLoaded', function() {
    // Carrega respostas salvas se existirem
    carregarRespostasDoStorage();
    // Atualiza a barra com o progresso atual
    atualizarBarraProgresso();
});

document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        salvarResposta(e.target.name, e.target.value || e.target.id);
    }
});