// seleção dos elementos
let email = document.querySelector('#exampleFormControlInput1')
let password = document.querySelector('#inputPassword')
let btn = document.querySelector('.btn')
let mensagemErro = document.querySelector('#mensagemErro')

// Domínios de email permitidos
const dominiosPermitidos = ['@gmail.com', '@hotmail.com', '@outlook.com', '@yahoo.com', '@email.com']

btn.addEventListener('click', login )
password.addEventListener('input', validarSenha)

// Função para validar o formato e domínio do email
function validarEmail(emailValue) {
    // Verifica se o email contém @
    if (!emailValue.includes('@')) {
        return { valido: false, mensagem: '❌ Email inválido! Deve conter "@"' }
    }

    // Verifica se algum dos domínios permitidos está presente
    const temDominioValido = dominiosPermitidos.some(dominio => emailValue.endsWith(dominio))
    
    if (!temDominioValido) {
        const dominios = dominiosPermitidos.join(', ')
        return { 
            valido: false, 
            mensagem: `❌ Domínio não permitido! Use: ${dominios}` 
        }
    }

    // Verifica se tem algo antes do @
    const partes = emailValue.split('@')
    if (partes[0].trim() === '') {
        return { valido: false, mensagem: '❌ Email inválido! Há algo errado antes do "@"' }
    }

    return { valido: true, mensagem: '' }
}

// Função para validar os requisitos da senha
function validarSenha() {
    const senhaValue = password.value
    
    // Requisitos
    const temMin8 = senhaValue.length >= 8
    const temMaiuscula = /[A-Z]/.test(senhaValue)
    const temMinuscula = /[a-z]/.test(senhaValue)
    const temNumero = /[0-9]/.test(senhaValue)
    const temEspecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(senhaValue)
    
    // Atualizar elementos visuais
    atualizarRequisito('req-min', temMin8)
    atualizarRequisito('req-maiuscula', temMaiuscula)
    atualizarRequisito('req-minuscula', temMinuscula)
    atualizarRequisito('req-numero', temNumero)
    atualizarRequisito('req-especial', temEspecial)
    
    // Calcular força da senha
    let forcaTotal = 0
    if (temMin8) forcaTotal++
    if (temMaiuscula) forcaTotal++
    if (temMinuscula) forcaTotal++
    if (temNumero) forcaTotal++
    if (temEspecial) forcaTotal++
    
    atualizarBarraForca(forcaTotal)
    
    return { temMin8, temMaiuscula, temMinuscula, temNumero, temEspecial }
}

// Função para atualizar o elemento de requisito
function atualizarRequisito(idRequisito, atendido) {
    const elemento = document.querySelector(`#${idRequisito}`)
    const icone = elemento.querySelector('.icone')
    
    if (atendido) {
        elemento.classList.add('atendido')
        icone.textContent = '✓'
    } else {
        elemento.classList.remove('atendido')
        icone.textContent = '✗'
    }
}

// Função para atualizar a barra de força
function atualizarBarraForca(forcaTotal) {
    const barra = document.querySelector('#barraSenha')
    const textoForca = document.querySelector('#textoForca')
    const percentual = (forcaTotal / 5) * 100
    
    barra.style.width = percentual + '%'
    
    // Mudar cor baseado na força
    if (forcaTotal === 0) {
        barra.style.backgroundColor = '#ccc'
        textoForca.textContent = ''
    } else if (forcaTotal <= 2) {
        barra.style.backgroundColor = '#e74c3c'
        textoForca.textContent = '🔴 Senha fraca'
    } else if (forcaTotal <= 3) {
        barra.style.backgroundColor = '#f39c12'
        textoForca.textContent = '🟡 Senha média'
    } else if (forcaTotal === 4) {
        barra.style.backgroundColor = '#2ecc71'
        textoForca.textContent = '🟢 Senha forte'
    } else if (forcaTotal === 5) {
        barra.style.backgroundColor = '#27ae60'
        textoForca.textContent = '🟢 Senha muito forte!'
    }
}

function login(){
     let emailValue = email.value
     let passwordValue = password.value

   // Limpa mensagem anterior
   mensagemErro.textContent = ''
   mensagemErro.style.display = 'none'
   mensagemErro.style.color = '#721c24'

   // Valida se os campos estão vazios
   if (emailValue.trim() === '' || passwordValue.trim() === '') {
    mensagemErro.textContent = '❌ Por favor, preencha TODOS os campos!'
    mensagemErro.style.display = 'block'
    return;
}

    // Valida o email
    const validacao = validarEmail(emailValue)
    if (!validacao.valido) {
        mensagemErro.textContent = validacao.mensagem
        mensagemErro.style.display = 'block'
        return;
    }

    // Valida a senha
    const validacaoSenha = validarSenha()
    if (!validacaoSenha.temMin8 || !validacaoSenha.temMaiuscula || !validacaoSenha.temMinuscula || !validacaoSenha.temNumero || !validacaoSenha.temEspecial) {
        mensagemErro.textContent = '❌ A senha não atende aos requisitos! Verifique os itens acima.'
        mensagemErro.style.display = 'block'
        return;
    }

    // Mensagem de sucesso
    mensagemErro.textContent = '✓ Login validado com sucesso!'
    mensagemErro.style.color = '#27ae60'
    mensagemErro.style.display = 'block'

    // criar um json
     let user = {
        email: emailValue,
        password: passwordValue
    }

    sessionStorage.setItem('user', JSON.stringify(user))
    
    // Aguarda 1 segundo para mostrar a mensagem de sucesso antes de redirecionar
    setTimeout(() => {
        window.location.href = '../pagina1.html'
    }, 1000)
}