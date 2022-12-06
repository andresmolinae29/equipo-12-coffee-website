const axios = require('axios');

const getProducts = () => {
    return axios.get("http://localhost:3000/api/product/getAll")
        .then(response => { return response.data })
        .catch(error => { return error });;
}

const getFilterProducts = (field, value) => {
    return axios.get("http://localhost:3000/api/product/getFiltered", { params: { [field]: value } })
        .then(response => { return response.data })
        .catch(error => { return error });;
}

const getOneProduct = (id) => {
    return axios.get("http://localhost:3000/api/product/detail/" + id)
        .then(response => { return response.data })
        .catch(error => { return error });;
}

const createProduct = (data) => {
    return axios.post("http://localhost:3000/api/product/create", data)
        .then(response => { return response.data })
        .catch(error => { return error });
}

const deleteOneProduct = (id) => {
    return axios.delete("http://localhost:3000/api/product/delete/" + id)
        .then(response => { return response.data })
        .catch(error => { return error });;
}

const editProduct = (id, data) => {
    return axios.put("http://localhost:3000/api/product/edit/" + id, data)
        .then(response => { return response.data })
        .catch(error => { return error });
}

module.exports = {
    getProducts,
    getOneProduct,
    getFilterProducts,
    createProduct,
    deleteOneProduct,
    editProduct
}
