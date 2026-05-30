
let user = JSON.parse(sessionStorage.getItem('user'))

// validação de acesso direto
if(user === null){
    window.location.href = './erro.html'
}

if(user.email !== 'info@gmail.com' || user.password !== 'bendy'){
    window.location.href = './erro.html'
}

let ps = document.querySelectorAll('p')
ps[0].textContent = `EMAIL: ${user.email}`
ps[1].textContent = `SENHA: ${user.password}`