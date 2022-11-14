const db = require('../database/models');

const Product = {

    getData: function () {
        products = db.Product.findAll();

        return products;
    },

    findAll: function () {

        return this.getData();

    },

    findByPk: function (id) {

        product = db.Product.findByPk(id);

        return product;
    },

    findOneProduct: function (field, text) {

        product = db.Product.findOne({
            where: {
                [field]: text
            }
        });

        return product;
    },

    filterByField: function (field, value) {

        products = db.Product.findAll({
            where: {
                [field]: value
            }
        });

        return products;
    },

    createOneProduct: function (productData) {

        db.Product.create({
            ...productData
        });

        return productData;
    },

    delete: function (productId) {

        product = this.findByPk(productId);

        db.Product.destroy({
            where: {
                id: [productId]
            }
        })

        return product;
    },

    edit: function (id, productData) {

        product = db.Product.update(
            {
                ...productData
            },
            {
                returning: true,
                where: {
                    id: id
                }
            }
        )

        return product;
    }
}

module.exports = Product;