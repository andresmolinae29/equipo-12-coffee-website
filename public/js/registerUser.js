// const {registerUser} = require("./services/userService")
import { register } from "../../controllers/mainController"

const register = document.getElementById("register")
    register.addEventListener("submit", function(event) {
                console.log('evento', event)
                event.preventDefault()

                const data = new FormData(event.target);
                const value = Object.fromEntries(data.entries());

                console.log('value', value)
                
                registerUser(value)
                .then(value.submit)
                .catch(console.log(respone.data.error))
                
                
                /*
                
                //  console.log('data', data)
                
                registerUser(value).then(lo redirigis)
                .catch(mostras texto error) // agregar un .then y despues que haces aca?? lo redireccionas? le mostras un modal? .catch()
                */
           })

