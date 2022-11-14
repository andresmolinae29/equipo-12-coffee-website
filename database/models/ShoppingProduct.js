module.exports = (sequelize, dataTypes) => {
    let alias = "ShoppingProduct";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        shoppingCartId: {
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        productId: {
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        units: {
            allowNull: false,
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'shopping_producs',
        timestamps: true

    };

    const ShoppingProduct = sequelize.define(
        alias,
        cols,
        config
    );

    ShoppingProduct.associate = function(models) {

        ShoppingProduct.belongsTo(models.Product, {
            as: "cartProducts",
            foreingKey: "id"
        });
        
    }

    return ShoppingProduct
}