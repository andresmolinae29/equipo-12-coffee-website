const axios = require('axios');

const registerUser = (data) => {
    console.log("Axio", data);
    return axios.post("http://localhost:3000/user/register", data)
        .then(response => { return response.data })
        .catch(error => { return response.data.error});
}

module.exports = {
    registerUser
}