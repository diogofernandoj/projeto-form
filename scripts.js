const container = document.querySelector('.container')
const signinBtn = document.getElementById('signin-btn')
const signupBtn = document.getElementById('signup-btn')

signupBtn.addEventListener('click', () => {
    container.classList.add('active')
})
signinBtn.addEventListener('click', () => {
    container.classList.remove('active')
})


const getLocalStorage = () => JSON.parse(localStorage.getItem('db')) ?? []
const setLocalStorage = (items) => localStorage.setItem('db', JSON.stringify(items))
// Validar inputs
const registerUsername = document.getElementById('register-username')
const registerEmail = document.getElementById('register-email')
const registerPassword = document.getElementById('register-password')
const registerConfirmPassword = document.getElementById('register-confirm-password')
const registerBtn = document.getElementById('register-btn')

registerBtn.addEventListener('click', () => {
    checkRegistration()
})

function checkRegistration() {
    if (registerUsername.value === '') {
        setErrorFor(registerUsername, 'O nome de usuário é obrigatório')
    } else if (!isUsernameValid(registerUsername.value)) {
        setErrorFor(registerUsername, 'Este nome de usuário já existe')
    } else {
        setSuccessFor(registerUsername)
    }

    if (registerEmail.value === '') {
        setErrorFor(registerEmail, 'O email é obrigatório')
    } else if (!isEmailValid(registerEmail.value)) {
        setErrorFor(registerEmail, 'Por favor, insira um email válido')
    } else {
        setSuccessFor(registerEmail)
    }

    if (registerPassword.value === '') {
        setErrorFor(registerPassword, 'A senha é obrigatória')
    } else if ((registerPassword.value).length < 6) {
        setErrorFor(registerPassword, 'A senha deve conter no mínimo 6 dígitos')
    } else {
        setSuccessFor(registerPassword)
    }

    if (registerConfirmPassword.value === '') {
        setErrorFor(registerConfirmPassword, 'A senha é obrigatória')
    } else if ((registerConfirmPassword.value).length < 6) {
        setErrorFor(registerConfirmPassword, 'A senha deve conter ao mínimo 6 dígitos')
    } else if (registerConfirmPassword.value !== registerPassword.value) {
        setErrorFor(registerConfirmPassword, 'As senhas devem ser iguais')
    } else {
        setSuccessFor(registerConfirmPassword)
    }

    const formFields = document.querySelectorAll('.registration .form-field')
    const isRegistrationValid = [...formFields].every(formField => {
        return (formField.className === 'form-field success')
    })
    if (isRegistrationValid) {
        openModal()
        updateDB(registerUsername.value, registerPassword.value)
        registerUsername.value = ''
        registerEmail.value = ''
        registerPassword.value = ''
        registerConfirmPassword.value = ''

        formFields.forEach(formField => {
            formField.className = 'form-field'
        })
    
        container.classList.remove('active')
    }
}

function isUsernameValid(username) {
    const itemsDB = getLocalStorage()
    let cont = 0

    itemsDB.forEach(item => {
        if(username === item.username) {
            cont += 1
        }
    })

    if(cont>1) {
        return false
    } else if (cont===0){
        return true
    }
}

function updateDB(username, password) {
    const itemsDB = getLocalStorage()
    itemsDB.push({username: username, password: password})
    setLocalStorage(itemsDB)
}

const modal = document.querySelector('.modal-container')
const modalBtn = document.querySelector('.modal-btn')

function openModal() {
    modal.classList.add('active')
}
modalBtn.addEventListener('click', () => {
    modal.classList.remove('active')
})

// Classe success e error
function setSuccessFor(input) {
    const formField = input.parentElement
    formField.className = 'form-field success'
}
function setErrorFor(input, message) {
    const formField = input.parentElement
    formField.className = 'form-field error'

    // error message
    const small = formField.querySelector('small')
    small.innerText = message
}

function isEmailValid(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email)
}

// Fazer login
const loginUsername = document.getElementById('login-username')
const loginPassword = document.getElementById('login-password')
const loginBtn = document.getElementById('login-btn')
const loginErrorMsg = document.querySelector('.login-error')
const home = document.querySelector('.home-container')

loginBtn.addEventListener('click', () => {
    if (!!isLoginValid(loginUsername.value, loginPassword.value)) {
        home.innerHTML = `
        <div class="home"><h2>Seja bem-vindo(a), <span>${loginUsername.value}</span></h2>
        <p onclick="closeHome()">Clique aqui para retornar a tela de login</p></div>`

        home.classList.add('active')

        loginUsername.value = ''
        loginPassword.value = ''
    } else {
        loginUsername.value = ''
        loginPassword.value = ''

        loginErrorMsg.style.display = 'block'
    }
})

function closeHome() {
    home.classList.remove('active')
}

function isLoginValid(username, password) {
    const itemsDB = getLocalStorage()
    let login = false

    itemsDB.forEach(item => {
        if(item.username === username && item.password === password) {
            login = true
        }
    })
    return login
}