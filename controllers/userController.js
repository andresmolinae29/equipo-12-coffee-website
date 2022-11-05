const User = require('../models/Users')
const bcrypt = require('bcryptjs');

const controller = {
    // Create - New User
    register: (req, res) => {
        res.cookie( )
        res.render('register');

    },
    processRegister: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultvalidation.errors.length > 0) {
            return res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }

        let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('register', {
                errors: {
                    email: {
                        msg: 'El email se encuentra registrado'
                    }
                },
                oldData: req.body
            });
        }

        let userToCreate = {
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10)

        };

        User.create(userToCreate);
        return res.redirect('/user/login');

    },
    login: (req, res) => {
        return res.render('login');
    },
    loginProcess: (req, res) => {
        let userTologin = User.findByField('email', req.body.email);

        if (userTologin) {
            let passwordVerification = bcrypt.compareSync(req.body.password, userTologin.password);
            if (passwordVerification) {
                delete userTologin.password;
                req.session.userLogged = userTologin;

                if(req.body.rememberMe) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2});
                }
                
                return res.redirect('user/profile');
            }
            
            res.render('login', {
                errors: {
                    email: {
                        msg: 'Las credenciales son invalidas'
                    }
                }
            });
        }

        res.render('login', {
            errors: {
                email: {
                    msg: 'Usuario no registrado'
                }
            }
        });
    },
    profile: (req, res) => {
        return res.render('profile', {
            user: req.session.userLogged
        })
    },
    logout: (res, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },
    edit: (req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const id = req.params.id;
        const user = users.find((user) => user.id == id);

        return res.render('users-edit-form', { usersToEdit: user });
    },
    // Update - Method to update
    update: (req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));

        users.forEach((p) => {
            if (p.id == req.params.id) {
                p.name = req.body.name,
                    p.username = req.body.username,
                    p.password = req.body.password,
                    p.type = req.body.type,
                    p.avatar = req.file.filename
            }
        });

        const data = JSON.stringify(users, null, " ");
        fs.writeFileSync(usersFilePath, data);
        return res.redirect("/users/detail/" + req.params.id); // cambiar

    },

    // Delete - Delete one from DB
    destroy: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        users = users.filter((p) => p.id != req.params.id);

        const data = JSON.stringify(users, null, " ");
        fs.writeFileSync(usersFilePath, data);
        return res.redirect("register");
    }
};

module.exports = controller;
