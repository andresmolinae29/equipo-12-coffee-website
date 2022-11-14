module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        name: {
            unique: true,
            allowNull: false,
            type: dataTypes.STRING,
        },
        description: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        size: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        price: {
            allowNull: false,
            type: dataTypes.FLOAT
        },
        category: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        img: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        longDescription: {
            allowNull: true,
            type: dataTypes.STRING,
        },
        discount: {
            allowNull: false,
            type: dataTypes.FLOAT
        },
        sellingCategory: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        createdAt: {
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'products',
        timestamps: false
    };

    const Product = sequelize.define(
        alias,
        cols,
        config
    );

    Product.associate = function(models) {

        Product.belongsToMany(models.ShoppingCart, {
            as: 'cartProducts',
            through: 'shopping_products',
            foreign_key: 'product_id',
            otherKey: 'shopping_cart_id',
            timestamps: false
        });

    }

    return Product
}