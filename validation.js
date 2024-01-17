const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const tel = document.getElementById("tel");
const password1 = document.getElementById("pwd");
const password2 = document.getElementById("confPwd");


form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

form.addEventListener('input', e => {
    if (e.target.tagName === 'INPUT') {
        validateInput(e.target);
    }
});

form.addEventListener('focusin', e => {
    if (e.target.tagName === 'INPUT') {
        e.target.parentElement.parentElement.classList.remove('error');
    }
});

function validateInput(input) {
    const trimmedValue = input.value.trim();
    const inputControl = input.parentElement.parentElement;
    const errorDiv = inputControl.querySelector('.error');

    const userFirstNameValue = firstName.value.trim();
    const userLastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password1.value.trim();
    const password2Value = password2.value.trim();
    const telValue = tel.value.trim();

    switch (input.type) {
        case 'email':
            if (!isValidEmail(trimmedValue)) {
                setError(email, "Please enter a valid email address");
            } else {
                setSuccess(email);
            }
            break;

        case 'tel':
            if (!isValidTel(trimmedValue)) {
                setError(tel, "It should contain 10 digits.");
            } else {
                setSuccess(tel);
            }
            break;
        }           
        switch (input.id){
            case 'firstName': 
                if (trimmedValue === '') {
                    setError (firstName, 'This field is required');
                } else {
                    setSuccess (firstName);
                }
                break;
                
            case 'lastName': 
                if (trimmedValue === '') {
                    setError (lastName, 'This field is required');
                } else {
                    setSuccess (lastName);
                }
                break;
}

            switch (input.id){
                case 'pwd':
                    if (!isValidPass(trimmedValue)) {
                        setError(password1, "Min. 8 characters 1 uppercase 1 lowercase and 1 symbol")
                    } else {
                        setSuccess(password1);
                    }
                    break;
                    case 'confPwd':
                        const password1Value = document.getElementById('pwd').value.trim();
                        if (password1Value !== trimmedValue) {
                            setError(password2, "Passwords are not the same");
                        } else {
                            setSuccess(password2);
                        }
                        break;
}
}

// form.addEventListener('blur', e => {
//     if (e.target.tagName === 'INPUT' && e.target.value.trim() === '') {
//         e.target.classList.add('invalid');
//     }
// });

function setError(element, message) {
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}

function setErrorShake(element, message) {
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = message;
    inputControl.classList.add('error','shake');
    inputControl.classList.remove('success');

    setTimeout(() => {
        inputControl.classList.remove('shake');
    }, 500);
}


function setSuccess(element){
    const inputControl = element.parentElement.parentElement;
    const errorDisplay = inputControl.querySelector(".error");

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}
function isValidEmail(email){
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(String(email).toLowerCase());
}
function isValidTel (tel){
    const telRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return telRegex.test(tel)
}
function isValidPass(password){
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    return passRegex.test(password);
}

function validateInputs() {
    const userFirstNameValue = firstName.value.trim();
    const userLastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password1.value.trim();
    const password2Value = password2.value.trim();
    const telValue = tel.value.trim();
    
    if (userFirstNameValue === ''){
        setErrorShake (firstName, 'First Name is required');
    }
    else {
        setSuccess(firstName);
    }

    if (userLastNameValue === ''){
        setErrorShake (lastName, 'Last Name is required');
    }
    else {
        setSuccess(lastName);
    }

    if (emailValue === ""){
        setErrorShake(email, 'Please, provide an email')
    }
    else if (!isValidEmail(emailValue)){
        setErrorShake(email, 'Provide a valid email address');
    }
    else {
        setSuccess(email);
    }

    if (passwordValue === ""){
        setErrorShake(password1, 'Password is required');
        return;
    }
    else if (passwordValue.length < 8){
        setErrorShake(password1, 'Password must contain 8-15 characters');
        return;
    }
    else if (passwordValue.length > 15){
        setErrorShake(password1, 'Password must contain 8-15 characters');
        return;
    }
    else if (!isValidPass(passwordValue)){
        setErrorShake(password1, 'Password must contain a capital letter, a number and a symbol');
        return;
    }
    else {
        setSuccess(password1);
    }

    if (password2Value === '') {
        setErrorShake(password2, "Please confirm your password");
    }
    else if (password2Value != passwordValue){
        setErrorShake(password2,'Confirm password must be same as password');
    }
    else if (password2Value != passwordValue){
        setSuccess(password2);
    }
    submitBtn.innerText = "Success!";
    submitBtn.style.backgroundColor = "green";
}
// function validateAllInputs() {
//     const inputs = form.querySelectorAll('input');
//     const submitBtn = document.getElementById("submitBtn");

//     for (const input of inputs) {
//         validateInput(input);

//         const inputControl = input.parentElement.parentElement;
//         if (inputControl.classList.contains('error')) {
//             return false;
//         }
//     }
//     submitBtn.innerText = "Success!";
//     return true;
// }
