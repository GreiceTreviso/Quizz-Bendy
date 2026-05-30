
let user = JSON.parse(sessionStorage.getItem('user'))

if(user === null){
    window.location.href = './erro.html'
}
