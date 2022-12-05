window.addEventListener("load", function() {

    let name = document.querySelector("#fullName");
    let nameError = document.querySelector("#nameError");

    let userName = document.querySelector("#userName");
    let userNameError = document.querySelector("#userNameError");

    let email = document.querySelector("#email");
    let emailError = document.querySelector("#emailError");

    let password = document.querySelector("#password");
    let passwordError = document.querySelector("#passwordError");

    let repassword = document.querySelector("#passwordConfirmation");
    let repasswordError = document.querySelector("#passwordConfirmationError");

    const registerForm = document.querySelector("form");
    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let errores = {};

        if(name.value.length < 1) {
            errores.name = "Este campo debe estar completo";
        }
        if(userName.value.length < 1) {
            errores.userName = "Este campo debe estar completo";
        }
        if(email.value.length < 1) {
            errores.email = "Este campo debe estar completo";
        }
        if(password.value.length < 8) {
            errores.password = "Este campo debe estar completo y tener al menos 8 caracteres";
        }
        if(repassword.value.length < 8) {
            errores.repassword = "Este campo debe estar completo y tener al menos 8 caracteres";
        }

        if(Object.keys(errores).length >=1) {
            nameError.innerHTML = errores.name ? errores.name : "";
            userNameError.innerHTML = errores.userName ? errores.userName : "";
            emailError.innerHTML = errores.email ? errores.email : "";
            passwordError.innerHTML = errores.password ? errores.password : "";
            repasswordError.innerHTML = errores.repassword ? errores.repassword : "";
        } else {

            registerForm.submit();

        }
   })

})