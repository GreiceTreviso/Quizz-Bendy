async function enviarResultado() {
	const url = 'http://localhost:3000/rota1'

	try {
		const resp = await fetch(url)

		if (!resp.ok) {
			throw new Error(`Erro HTTP: ${resp.status}`)
		}

		const dados = await resp.text()
		alert('Resultado efetuado com sucesso!')
		console.log(dados)
	} catch (erro) {
		alert('Não foi possível efetuar o resultado. Verifique se o servidor está funcionando.')
		console.error(erro)
	}
}

enviarResultado()