function mostrarResultado() {
    document.getElementById("resultado").innerHTML = `
        <p>Nome: ${respostas[0]}</p>
        <p>Idade: ${respostas[1]}</p>
        <p>Cor favorita: ${respostas[2]}</p>
    `;
}