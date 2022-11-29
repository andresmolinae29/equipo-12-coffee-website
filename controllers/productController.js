const { createProduct } = require('../services/productService');
const { validationResult } = require('express-validator');

const productController = {
    create: (req, res) => {
        return res.render("product-create-form")
    },

    createProcess: (req, res) => {

        console.log(JSON.parse(JSON.stringify(req.body)));
        // const resultValidation = validationResult(req);

        // if (resultValidation.errors.length > 0) {
        //     console.log(resultValidation.mapped());
        //     return res.render("product-create-form", {
        //         errors: resultValidation.mapped(),
        //         oldData: req.body
        //     })
        // }

        let filename = req.file ? req.file.filename : "img-default.jpg";

        const data = {
            ...req.body,
            img: filename
        };

        createProduct(data)
            .then(result => {
                if (result.message) {
                    console.log(result.message);
                    return res.render("product-create-form", {
                        errors: result.message,
                    });
                } else {
                    return res.redirect("/");
                }
            })
            .catch(errors => {
                console.log(errors)
                return res.render("product-create-form", {
                    message: errors
                })
            })
    }
}

module.exports = productController;