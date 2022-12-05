const User = require('../models/User');
const bcrypt = require('bcryptjs');

const controller = {

    listAll: (req, res) => {

        const users = User.findAll();

        Promise.all([users])
            .then(users => {
                return res.status(200).json({
                    status: 200,
                    qty: users[0].length,
                    users: users
                });
            })
            .catch(errors => {
                return res.json({
                    message: errors,
                });
            })
    },

    // Create - New User
    processRegister: (req, res) => {

        User.findOneUser('email', req.body.email)
        .then(userByEmail => {

            if (userByEmail) {
                return res.json({
                    status: 200,
                    message: "El email se encuentra registrado"
                })
            } else {

                let userToCreate = {
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10)

                };

                delete userToCreate.passwordConfirmation;

                User.createOneUser(userToCreate);

                delete userToCreate.password;

                return res.status(200).json({
                    status: 200,
                    userCreated: userToCreate
                })
            }
        })
        .catch(errors => {
            res.json({
                message: errors
            })
        });

    },

    loginProcess: (req, res) => {

        let userTologin = req.body;

        User.findOneUser("email", userTologin.email)
            .then(user => {
                if (user) {
                    let passwordVerification = bcrypt.compareSync(userTologin.password, user.password);


                    if (passwordVerification == true) {

                        return res.status(200).json({
                            status: 200,
                            userLogged: user
                        })
                    } 

                    return res.status(200).json({
                    status: 400,
                    message: "Credenciales invalidas"
                    })    
                    
                } else {
                    res.json({
                        errors: {
                            email: {
                                msg: 'Usuario no esta registrado'
                            }
                        }
                    })
                }
                })
            .catch(errors => {
                res.json({
                    message: errors
                })
            })

    },

    // profile: (req, res) => {
    //     return res.render('profile', {
    //         user: req.session.userLogged
    //     })
    // },

    edit: (req, res) => {

        User.edit(req.params.id, req.body)
            .then(userEdited => {

                userEdited = User.findByPk(req.params.id);

                return userEdited;
            })
            .then(user => {

                return res.status(200).json({
                    status: 200,
                    userEdited: user
                });

            })
            .catch(errors => {
                return res.json({
                    message: errors
                });
            })
    },

    destroy: (req, res) => {

        User.delete(req.params.id)
            .then(user => {
                return res.status(200).json({
                    status: 200,
                    userDeleted: user
                });
            })
            .catch(errors => {
                return res.json({
                    message: errors
                });
            })
    },
};

module.exports = controller;
