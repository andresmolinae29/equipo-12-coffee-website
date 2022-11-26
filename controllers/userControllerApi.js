const User = require('../models/User');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const controller = {

    listAll: (req, res) => {

		const users = User.findAll();

        console.log(users);

		Promise.all([users])
			.then(users => {
				return res.status(200).json({
					status: 200,
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

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.json({
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        User.findOneUser('email', req.body.email)
            .then(userByEmail => {

                // userByEmail = userByEmail == null ? undefined:userByEmail; 

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

    // loginProcess: (req, res) => {
    //     let userTologin = User.findByField('email', req.body.email);

    //     if (userTologin) {
    //         let passwordVerification = bcrypt.compareSync(req.body.password, userTologin.password);
    //         if (passwordVerification) {
    //             delete userTologin.password;
    //             req.session.userLogged = userTologin;

    //             if(req.body.rememberMe) {
    //                 res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2});
    //             }
                
    //             return res.redirect('user/profile');
    //         }
            
    //         res.render('login', {
    //             errors: {
    //                 email: {
    //                     msg: 'Las credenciales son invalidas'
    //                 }
    //             }
    //         });
    //     }

    //     res.render('login', {
    //         errors: {
    //             email: {
    //                 msg: 'Usuario no registrado'
    //             }
    //         }
    //     });
    // },

    // profile: (req, res) => {
    //     return res.render('profile', {
    //         user: req.session.userLogged
    //     })
    // },

    // logout: (req, res) => {
    //     res.clearCookie('userEmail');
    //     req.session.destroy();
    //     return res.redirect('/')
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
