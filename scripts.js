const form = document.getElementById("form")
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordConfirm = document.getElementById("passwordConfirm");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});

function checkInputs() {
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmValue = passwordConfirm.value;

    if (usernameValue === "") {
        setErrorFor(username, "Esse campo é obrigatório")}
        else if (usernameValue.length < 3) {
            setErrorFor(username, "Nome deve conter no mínimo 3 caracteres")
        } else setSuccessFor(username)

    if (emailValue === "") {
        setErrorFor(email, "Esse campo é obrigatório")
    } else {
        setSuccessFor(email)
    }

    if (passwordValue === "") {
        setErrorFor(password, "Esse campo é obrigatório")
    } else if (passwordValue.length < 6) {
        setErrorFor(password, "A senha deve conter no mínimo 6 dígitos")
    } else {
        setSuccessFor(password)
    }

    if (passwordConfirmValue === '') {
        setErrorFor(passwordConfirm, "Esse campo é obrigatório")
    } else if (passwordConfirmValue != passwordValue) {
        setErrorFor(passwordConfirm, "As senhas devem ser iguais")
    } else {
        setSuccessFor(passwordConfirm)
    }
};

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