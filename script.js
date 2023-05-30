
// Seleccionamos los elemmentos del DOM que utilizaremos

const usernameForm = document.querySelector('#username');
const emailForm = document.querySelector('#email');
const passwordForm = document.querySelector('#password');
const confirmPasswordForm = document.querySelector('#confirma_password');
const form = document.querySelector('#signup');


// Funcion que verifica  si el campo usuario cumple con lo requerido
const checkUsername = () => {

    let valid = false;
    const min = 3,
        max = 25;

    const username = usernameForm.value.trim();

    if (!isRequired(username)) {
        showError(usernameForm, 'El usuario no puede estar vacio.');
    } else if (!isBetween(username.length, min, max)) {
        showError(usernameForm, `El campo usuario debe tener entre  ${min} y  ${max} caracteres.`)
    } else {
        showSuccess(usernameForm);
        valid = true;
    }
    return valid;
};


// Funcion que verifica  si el campo Email cumple con lo requerido
const checkEmail = () => {
    let valid = false;
    const email = emailForm.value.trim();

    if (!isRequired(email)) {
        showError(emailForm, 'El campo Email no puede estar en blanco.');
    } else if (!isEmailValid(email)) {
        showError(emailForm, 'El Email no es valido.')
    } else {
        showSuccess(emailForm);
        valid = true;
    }
    return valid;
};

// Funcion que verifica  si el campo Password cumple con lo requerido
const checkPassword = () => {

    let valid = false;

    const password = passwordForm.value.trim();

    if (!isRequired(password)) {
        showError(passwordForm, 'La contraseña no puede estar en blanco');
    } else if (!isPasswordSecure(password)) {
        showError(passwordForm, 'La contraseña debe al menos 8 caracteres, tambien debe  tener 1 caracter en mayuscula, uno en minuscula , un numero, y un caracter especial (!@#$%^&*)');
    } else {
        showSuccess(passwordForm);
        valid = true;
    }

    return valid;
};

// Funcion que verifica  si el campo confirma password cumple con lo requerido.
const checkConfirmPassword = () => {
    let valid = false;
  
    const confirmPassword = confirmPasswordForm.value.trim();
    const password = passwordForm.value.trim();
    console.log(confirmPassword);
    console.log(password);

    if (!isRequired(confirmPassword)) {
        showError(confirmPasswordForm, 'Por favor ingresa nuevamente la contraseña');
    } else if (password !== confirmPassword) {
        showError(confirmPasswordForm, 'las contraseñas no coinciden');
    } else {
        showSuccess(confirmPasswordForm);
        valid = true;
    }
 console.log(valid);
    return valid;
};

// Funcion que verifica si el Email tiene un formato correcto
const isEmailValid = (email) => {
    const expresion = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return expresion.test(email);
};

// Funcion que verifica si la contraseña tiene un formato correcto
const isPasswordSecure = (password) => {
    const expresion = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return expresion.test(password);
};

// Funcion que verifica si lo que le enviamos no esta en blanco
const isRequired = value => value === '' ? false : true;

// Funcion que verifica sisi lo que le enviamos tiene la longitud correcta
const isBetween = (length, min, max) => length < min || length > max ? false : true;


// Funcion que muestra el error en el formulario
const showError = (input, message) => {

    const formField = input.parentElement;
  
    formField.classList.remove('correcto');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

// Funcion que muestra en el formulario que el campo esta correcto
const showSuccess = (input) => {

    const formField = input.parentElement;

    formField.classList.remove('error');
    formField.classList.add('correcto');

    const error = formField.querySelector('small');
    error.textContent = '';
}

// Funcion que le agrega un retraso a la muestra de los errores
const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
   
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};


//EventListener
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirma_password':
            checkConfirmPassword();
            break;
    }
}));


form.addEventListener('submit', function (e) {
   
    e.preventDefault();

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid;

   
    if (isFormValid) {

    }
});