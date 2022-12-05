const db = require('../database/models');
const Sequelize = require('sequelize');

const Product = {

    getData: function () {
        let products = db.Product.findAll();

        return products;
    },

    findAll: function () {

        return this.getData();

    },

    findByPk: function (id) {

        let product = db.Product.findByPk(id);

        return product;
    },

    findOneProduct: function (field, text) {

        let product = db.Product.findOne({
            where: {
                [field]: text
            }
        });

        return product;
    },

    filterByField: function (field, value) {

        let products = db.Product.findAll({
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

        let product = this.findByPk(productId);

        db.Product.destroy({
            where: {
                id: [productId]
            }
        })

        return product;
    },

    edit: function (id, productData) {

        let product = db.Product.update(
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
    },

    categories: function () {
        
        let categories = db.Product.findAll({
            attributes: [
                [Sequelize.fn('DISTINCT', Sequelize.col('sellingCategory')) ,'sellingCategory']
            ],
            
        });

        return categories;
    },

    lastProduct: function() {

        let lastProduct = db.Product.findAll({
            limit: 1,
            order: [[
                'createdAt', 'DESC'
            ]]
        });

        return lastProduct;
    }
}

module.exports = Product;