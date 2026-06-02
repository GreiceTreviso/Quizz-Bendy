let respostas = {};

function carregarRespostasDoStorage() {
    const respostasSalvas = sessionStorage.getItem('respostasQuiz');
    if (respostasSalvas) {
        respostas = JSON.parse(respostasSalvas);
    }
}

function salvarResposta(campo, valor) {
    respostas[campo] = valor;
    sessionStorage.setItem('respostasQuiz', JSON.stringify(respostas));
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
    carregarRespostasDoStorage();
});

document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        salvarResposta(e.target.name, e.target.value || e.target.id);
    }
});