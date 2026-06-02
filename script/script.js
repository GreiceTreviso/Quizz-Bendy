
// seleção dos elementos
let email = document.querySelector('#exampleFormControlInput1')
let password = document.querySelector('#inputPassword')
let btn = document.querySelector('.btn')

btn.addEventListener('click', login )



function login(){
     let emailValue = email.value
     let passwordValue = password.value

   // Valida se os campos estão vazios
   if (emailValue.trim() === '' || passwordValue.trim() === '') {
    alert("Por favor, preencha todos os campos!");   // para evitar erro caso não seja o email e senha identico!
    window.location.href = '../erro.html'; // caminho corrigido
    return;
}

    // criar um json
     let user = {
        email: emailValue,
        password: passwordValue
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    window.location.href = '../pagina1.html'
}