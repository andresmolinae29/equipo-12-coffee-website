const bcrypt = require('bcrypt');
const fs = require('fs');
let { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/users.json');

const controller = {
    // Create - New User
    register: (req, res) => {
        res.render('register');

    },

    login: (req, res) => {
        res.render('login');
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');

            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }

            for (let i = 0; i < users.length; i++) {
                if (users[i].email == req.body.email) {
                    if (bcrypt.compareSync(req.body.password, users[i].password)) {
                        let userLogued = users[i];
                        break;
                    }
                }
            }

            if (userLogued == undefined) {
                return res.render('login', { errors: [{ msg: 'Credenciales invalidas' }] });
            }

            req.session.userLogued = userLogued;
            res.render('/')

        } else {
            return res.render('login', { errors: errors.errors });
        }
    },

    // Create -  Method to store
    store: (req, res) => {

        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const usersJSON = fs.readFileSync(usersFilePath, 'utf-8');

            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }

            const product = {
                id: Date.now(),
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                type: req.body.type,
                avatar: req.file.filename,
            };

            users.push(product);

            usersJson = JSON.stringify(users, null, " ");

            fs.writeFileSync(usersFilePath, users);
            res.redirect("/");

        } else {
            res.render('register', {
                errors: errors.array(),
                old: req.body
            });
            // falta ajustarlo en el html
        }

    },

    // Update - Form to edit
    edit: (req, res) => {

        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
        const id = req.params.id;
        const user = users.find((user) => user.id == id);

        res.render('users-edit-form', { usersToEdit: user });
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
        res.redirect("/users/detail/" + req.params.id); // cambiar

    },

    // Delete - Delete one from DB
    destroy: (req, res) => {
        let users = JSON.parse(fs.readFileSync(usersFilePath, "utf-8"));
        users = users.filter((p) => p.id != req.params.id);

        const data = JSON.stringify(users, null, " ");
        fs.writeFileSync(usersFilePath, data);
        res.redirect("register");
    }
};

module.exports = controller;
