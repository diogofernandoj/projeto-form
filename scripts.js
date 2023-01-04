const form = document.getElementById("form")
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

let usernameIsValid = false
let emailIsValid = false
let passwordIsValid = false
let passwordConfirmIsValid = false

// Checar inputs

username.addEventListener("change", () => {
    const usernameValue = username.value;

    if (usernameValue === "") {
        setErrorFor(username, "Esse campo é obrigatório")
        usernameIsValid = false
    } else if (usernameValue.length < 3) {
        setErrorFor(username, "Nome deve conter no mínimo 3 caracteres")
        usernameIsValid = false
    } else {
        setSuccessFor(username)
        usernameIsValid = true
    }
});

email.addEventListener('change', () => {
    const emailValue = email.value;

    if (emailValue === "") {
        setErrorFor(email, "Esse campo é obrigatório")
        emailIsValid = false
    } else if (!validateEmail(emailValue)) {
        setErrorFor(email, "O email inserido é inválido!")
        emailIsValid = false
    } else if (validateEmail(emailValue)) {
        setSuccessFor(email)
        emailIsValid = true
    }
});

password.addEventListener("change", () => {
    const passwordValue = password.value;

    if (passwordValue === "") {
        setErrorFor(password, "Esse campo é obrigatório")
        passwordIsValid = false
    } else if (passwordValue.length < 6) {
        setErrorFor(password, "A senha deve conter no mínimo 6 dígitos")
        passwordIsValid = false
    } else {
        setSuccessFor(password)
        passwordIsValid = true
    }
});

passwordConfirm.addEventListener("change", () => {
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;

    if (passwordConfirmValue === '') {
        setErrorFor(passwordConfirm, "Esse campo é obrigatório")
        passwordConfirmIsValid = false
    } else if (passwordConfirmValue.length < 6) {
        setErrorFor(passwordConfirm, "A senha deve conter no mínimo 6 dígitos")
        passwordConfirmIsValid = false
    } else if (passwordConfirmValue !== passwordValue) {
        setErrorFor(passwordConfirm, "As senhas devem ser iguais")
        passwordConfirmIsValid = false
    } else {
        setSuccessFor(passwordConfirm)
        passwordConfirmIsValid = true
    }
});

// Checar submit
const modal = document.querySelector('#modal')

form.addEventListener("submit", (e) => {
    e.preventDefault()

    let cont = 0

    if (!usernameIsValid) {
        setErrorFor(username, "Preencha o campo corretamente")
    } else if (usernameIsValid) {
        cont += 1
    }

    if (!emailIsValid) {
        setErrorFor(email, "Preencha o campo corretamente")
    } else if (emailIsValid){
        cont += 1
    }
    
    if (!passwordIsValid) {
        setErrorFor(password, "Preencha o campo corretamente")
    } else if (passwordIsValid) {
        cont += 1
    }

    if (!passwordConfirmIsValid) {
        setErrorFor(passwordConfirm, "Preencha o campo corretamente")
    } else if (passwordConfirmIsValid) {
        cont += 1
    }

    if (cont == 4) {
        modal.classList.add('active')
    }
})

function closeModal() {
    modal.classList.remove('active')
}

// Mensagem de erro e sucesso
function setErrorFor(input, msg) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');

    // Classe error
    formControl.className = "form-item error";

    // Mensagem de erro
    small.innerText = msg;
};

function setSuccessFor(input) {
    const formControl = input.parentElement;

    // Classe success
    formControl.className = "form-item success"
}

function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email)
}