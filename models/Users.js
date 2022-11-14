const db = require('../database/models');

const User = {
    
    // getData: function () {
    //     users = db.User.findAll();

    //     return users;
    // },

    findAll: function () {

        return db.User.findAll();

    },

    findByPk: function (id) {

        user = db.User.findByPk(id);

        return user;
    },

    findOneUser: function (field, text) {

        user = db.User.findOne({
            where: {
                [field]: text
            }
        });

        return user;
    },

    filterByField: function (field, value) {

        users = db.User.findAll({
            where: {
                [field]: value
            }
        });

        return users;
    },

    createOneUser: function (userData) {

        db.User.create({
            ...userData
        });

        return userData;
    },

    delete: function (UserId) {

        user = this.findByPk(UserId);

        db.User.destroy({
            where: {
                id: [UserId]
            }
        })

        return user;
    },

    edit: function (id, userData) {

        user = db.User.update(
            {
                ...userData
            },
            {
                returning: true,
                where: {
                    id: id
                }
            }
        )

        return user;
    }
}

module.exports = User;