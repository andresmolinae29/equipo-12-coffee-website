window.addEventListener("load", function() {

    let email = document.querySelector("#email");
    let emailError = document.querySelector("#emailError");

    let password = document.querySelector("#password");
    let passwordError = document.querySelector("#passwordError");

    const registerForm = document.querySelector("form");
    
    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let errores = {};

        if(email.value.length < 1) {
            errores.email = "Este campo debe estar completo";
        }
        if(password.value.length < 8) {
            errores.password = "Este campo debe estar completo y tener al menos 8 caracteres";
        }

        if(Object.keys(errores).length >=1) {
            
            emailError.innerHTML = errores.email ? errores.email : "";
            passwordError.innerHTML = errores.password ? errores.password : "";
            
        } else {

            registerForm.submit();

        }
   })

})