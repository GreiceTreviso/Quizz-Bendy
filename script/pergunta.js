const respostas = {};

function salvarResposta(campo, valor) {
    respostas[campo] = valor;
    console.log('Resposta salva:', campo, valor);
}

function coletarTodasRespostas() {
    const radios = document.querySelectorAll('input[type="radio"]:checked');
    radios.forEach((radio) => {
        salvarResposta(radio.name, radio.value || radio.id);
    });
    return Object.keys(respostas).length;
}

document.addEventListener('change', function(e) {
    if (e.target.type === 'radio') {
        salvarResposta(e.target.name, e.target.value || e.target.id);
    }
});