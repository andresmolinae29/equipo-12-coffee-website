module.exports = (sequelize, dataTypes) => {
    let alias = "ShoppingCart";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        userId: {
            allowNull: false,
            type: dataTypes.INTEGER,
        },
        createdAt: {
            type: dataTypes.DATE 
        },
        updatedAt: {
            type: dataTypes.DATE 
        }
    };
    let config = {
        tableName: 'shopping_cart',
        timestamps: true

    };

    const ShoppingCart = sequelize.define(
        alias,
        cols,
        config
    );

    ShoppingCart.associate = function(models) {

        ShoppingCart.belongsTo(models.User, {
            as: 'shoppingCart',
            foreign_key: 'id'
        });
    }

    return ShoppingCart
}