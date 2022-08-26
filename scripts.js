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
username.addEventListener("input", () => {
    const usernameValue = username.value;

    if (usernameValue === "") {
        setErrorFor(username, "Esse campo é obrigatório")
    } else if (usernameValue.length < 3) {
        setErrorFor(username, "Nome deve conter no mínimo 3 caracteres")
    } else {
        setSuccessFor(username)
    }
});

email.addEventListener('input', () => {
    const emailValue = email.value;

    if (emailValue === "") {
        setErrorFor(email, "Esse campo é obrigatório")
    } else {
        setSuccessFor(email)
    }
});

password.addEventListener("input", () => {
    const passwordValue = password.value;

    if (passwordValue === "") {
        setErrorFor(password, "Esse campo é obrigatório")
    } else if (passwordValue.length < 6) {
        setErrorFor(password, "A senha deve conter no mínimo 6 dígitos")
    } else {
        setSuccessFor(password)
    }
});

passwordConfirm.addEventListener("input", () => {
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;

    if (passwordConfirmValue === '') {
        setErrorFor(passwordConfirm, "Esse campo é obrigatório")
    } else if (passwordConfirmValue.length < 6) {
        setErrorFor(passwordConfirm, "A senha deve conter no mínimo 6 dígitos")
    } else if (passwordConfirmValue !== passwordValue) {
        setErrorFor(passwordConfirm, "As senhas devem ser iguais")
    } else {
        setSuccessFor(passwordConfirm)
    }
});

// Checar submit
const modal = document.querySelector('#modal')

form.addEventListener("submit", (e) => {
    e.preventDefault()

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
    
    const emailValue = email.value;

    if (emailValue === "") {
        setErrorFor(email, "Esse campo é obrigatório")
        emailIsValid = false
    } else {
        setSuccessFor(email)
        emailIsValid = true
    }
    
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

    if (usernameIsValid === true && emailIsValid === true && passwordIsValid === true && passwordConfirmIsValid === true) {
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