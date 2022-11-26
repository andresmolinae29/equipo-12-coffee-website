const axios = require('axios');

const getProducts = () => {
    return axios.get("http://localhost:3000/product/getAll").then(response => { return response.data });
}

module.exports = {
    getProducts
}