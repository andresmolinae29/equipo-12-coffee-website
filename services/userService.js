const axios = require('axios');

const registerUser = (data) => {  
    return axios.post("http://localhost:3000/api/user/register", data)
        .then(response => { return response.data })
        .catch(error => { return error});
}

const loginUser = (data) => {
    return axios.post("http://localhost:3000/api/user/login", data)
        .then(response => { return response.data })
        .catch(error => { return error});
}

module.exports = {
    registerUser,
    loginUser
}