let url ='http://localhost:3000/rota1'

let resp = await fetch(url)

let dados = await resp.json()

alert(dados.msg)
console.log(dados)