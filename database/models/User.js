module.exports = (sequelize, dataTypes) => {
    let alias = "User";
    let cols = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        userName: {
            allowNull: false,
            type: dataTypes.STRING
        },
        fullName: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: dataTypes.STRING,
        },
        avatar: {
            allowNull: true,
            type: dataTypes.STRING
        },
        type: {
            allowNull: false,
            defaultValue: 'user',
            type: dataTypes.STRING
        },
        createdAt: {
            type: dataTypes.DATE 
        },
        updatedAt: {
            type: dataTypes.DATE 
        }
    };
    let config = {
        tableName: 'users',
        timestamps: false

    };

    const User = sequelize.define(
        alias,
        cols,
        config
    );

    User.associate = function(models) {

        User.hasMany(models.ShoppingCart, {
            as: 'shoppingCart',
            foreign_key: 'user_id'
        });
    }

    return User
}