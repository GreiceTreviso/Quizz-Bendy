
let user = JSON.parse(sessionStorage.getItem('user'))

// validação de acesso direto
if(user === null){
    window.location.href = './erro.html'
}