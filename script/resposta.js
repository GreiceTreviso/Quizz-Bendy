function gerarConteudoResultado(acertos) {
    const totalPerguntas = 10;
    
    if (acertos >= 0 && acertos <= 3) {
        return {
            titulo: "Péssimo!",
            imagem: "../imagens/bendycagado.png",
            mensagem: `<p><strong>${acertos}/${totalPerguntas} acertos</strong></p>
                      <p>Parece que você conhece o universo de Bendy and the Ink Machine, mas ainda não escapou completamente da tinta!
                      Talvez o projetor tenha falhado, ou o Ink Demon tenha confundido suas memórias…</p>
                      <p>Você até tenta sobreviver aos corredores da Joey Drew Studios, mas alguns detalhes importantes acabaram se perdendo no caminho.</p>`
        };
    } else if (acertos >= 4 && acertos <= 5) {
        return {
            titulo: "Fraco!",
            imagem: "../imagens/bendy-fraco.png",
            mensagem: `<p><strong>${acertos}/${totalPerguntas} acertos</strong></p>
                      <p>Você está começando a desvendar os mistérios da tinta, mas ainda há muito a aprender!
                      Os segredos do Ink Demon não se revelam tão facilmente para quem não presta atenção aos detalhes.</p>
                      <p>Continue explorando os corredores sombrios e talvez na próxima vez você consiga melhores resultados!</p>`
        };
    } else if (acertos >= 6 && acertos <= 7) {
        return {
            titulo: "Bom!",
            imagem: "../imagens/bendy joia.png",
            mensagem: `<p><strong>${acertos}/${totalPerguntas} acertos</strong></p>
                      <p>Parabéns! Você prova ser um verdadeiro admirador do universo de Bendy and the Ink Machine!
                      Seu conhecimento sobre os personagens e a trama é impressionante.</p>
                      <p>Você definitivamente merece um lugar no estúdio da Joey Drew Studios. Continue assim!</p>`
        };
    } else if (acertos >= 8 && acertos <= 9) {
        return {
            titulo: "Excelente!",
            imagem: "../imagens/exe.bendy.png",
            mensagem: `<p><strong>${acertos}/${totalPerguntas} acertos</strong></p>
                      <p>Fantástico! Você é praticamente um especialista no universo de Bendy!
                      Sua dedicação e conhecimento profundo impressionam até o próprio Ink Demon.</p>
                      <p>Você nasceu para fazer parte dessa tinta negra e sombria. Muito bom mesmo!</p>`
        };
    } else if (acertos === 10) {
        return {
            titulo: "Perfeito! 🎬",
            imagem: "../imagens/absolute bendy.jpeg",
            mensagem: `<p><strong>${acertos}/${totalPerguntas} acertos - 100%!</strong></p>
                      <p>PERFEITO! Você é a reencarnação de um verdadeiro fã de Bendy and the Ink Machine!
                      Seu conhecimento é absolutamente impecável!</p>
                      <p>Você merece estar ao lado do Bendy em cada capítulo, desvendando cada segredo da animação mais sombria e fascinante. Parabéns! 🌟</p>`
        };
    }
}

function mostrarResultado() {
    const respostasSalvas = sessionStorage.getItem('respostasQuiz');
    const respostas = respostasSalvas ? JSON.parse(respostasSalvas) : {};
    
    const totalPerguntas = 10;
    let acertos = 0;
    
    const respostasCorretas = {
        q1: '2',
        q2: '5',
        q3: '7',
        q4: '11',
        q5: '14',
        q6: '17',
        q7: '19',
        q8: '23',
        q9: '27',
        q10: '30'
    };
    
    for (const [chave, valor] of Object.entries(respostasCorretas)) {
        if (respostas[chave] === valor) {
            acertos++;
        }
    }
    
    const conteudo = gerarConteudoResultado(acertos);
    const porcentagem = Math.round((acertos / totalPerguntas) * 100);
    
    const resultDiv = document.getElementById("resultado");
    if (resultDiv) {
        const resultadoHTML = `
            <div style="text-align: center; padding: 20px;">
                <h2>${conteudo.titulo}</h2>
                <img src="${conteudo.imagem}" alt="resultado" style="max-width: 300px; margin: 20px 0;">
                ${conteudo.mensagem}
                <p style="margin-top: 20px; font-size: 14px; color: #666;">Porcentagem: ${porcentagem}%</p>
            </div>
        `;
        resultDiv.innerHTML = resultadoHTML;

// grafico
const erros = totalPerguntas - acertos;
document.getElementById("graficoContainer").innerHTML = `
<div style="width: 500px; margin: 20px auto;">
    <canvas id="myChart"></canvas>
</div>
`;
const canva = document.querySelector('#myChart');
const config = {
    type: 'bar',
    data: {
        labels: ['Acertos', 'Erros'],
        datasets: [{
            label: 'Resultado do Quiz',
            data: [acertos, erros],
            backgroundColor: [
                '#000000',
            ], }]},
    options: {
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            display: false
        },
        y: {
            display: false,
            beginAtZero: true,
            max: totalPerguntas
        }}}};
new Chart(canva, config);
    } else {
        console.log('Resultado:', acertos, 'de', totalPerguntas);
    }
    sessionStorage.setItem('resultado', JSON.stringify({
        acertos,
        total: totalPerguntas,
        porcentagem,
        titulo: conteudo.titulo
    }));
}
window.addEventListener('DOMContentLoaded', () => {
    mostrarResultado();
});
window.addEventListener('DOMContentLoaded', () => {
    mostrarResultado();
});
