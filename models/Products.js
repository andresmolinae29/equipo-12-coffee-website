const fs = require('fs')

const User = {
    fileName: './data/productsDatabase.json',
    
    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allProducts = this.findAll();
        let userFound = allProducts.find(oneProduct => oneProduct.id == id);

        return userFound
    },

    // en productos deberia agregar un findall by filter
    findByField: function (field, text) {
        let allProducts = this.findAll();
        let userFound = allProducts.find(oneProduct => oneProduct[field] == text);

        return userFound
    },

    generateId: function () {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if (lastProduct) {
            return lastProduct.id + 1
        }

        return 1;
        
    },

    create: function(userData) {
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...userData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },

    delete: function(id) {
        let allProducts = this.findAll();
        let finalUsers = allProducts.filter(users => users.id != id);

        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;