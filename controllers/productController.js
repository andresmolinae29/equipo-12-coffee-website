const { createProduct, getOneProduct, editProduct } = require('../services/productService');
const { validationResult } = require('express-validator');

const productController = {
    create: (req, res) => {
        return res.render("product-create-form")
    },

    createProcess: (req, res) => {

        // console.log(JSON.parse(JSON.stringify(req.body)));
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
        
            return res.render("product-create-form", {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }

        let filename = req.file ? req.file.filename : "img-default.jpg";


        const data = {
            ...req.body,
            img: filename
        };

        createProduct(data)
            .then(result => {
                if (result.message) {
                  
                    return res.render("product-create-form", {
                        errors: result.message,
                    });
                } else {
                    return res.redirect("/");
                }
            })
            .catch(errors => {
              
                return res.render("product-create-form", {
                    message: errors
                })
            })
    },

    edit: (req, res) => {

        const id = req.params.id;

        getOneProduct(id)
            .then(response => {
                if (response.product[0] != null) {
                    // console.log(response.product[0])
                    return res.render("product-edit-form", { productToEdit : response.product[0]});
                } else {
                    // Colocar aca redireccion a error 404
                    return res.redirect("/", { message : "El producto no existe"});
                }
                
            })
            .catch(errors => {
                return res.render("product-edit-form", {
                    message: errors
                })
            })   
    },

    editProcess: (req, res) => {

        // const resultValidation = validationResult(req);

        // if (resultValidation.errors.length > 0) {
        
        //     return res.render("product-edit-form", {
        //         errors: resultValidation.mapped(),
        //         productToEdit: req.body
        //     })
        // }

        let filename = req.file ? req.file.filename : "img-default.jpg";


        const data = {
            ...req.body,
            img: filename
        };

        const id = req.params.id;

        console.log("id", id);

        editProduct(id, data)
            .then(productEditted => {
                console.log("edicion", productEditted)
                return res.redirect("/product/detail/"+id);
            })
            .catch(errors => {
                console.log(errors);
                return res.render("product-edit-form", {
                    message: errors
                })
            })

    },

    viewDetail: (req, res) => {

        const id = req.params.id;

        getOneProduct(id)
            .then(response => {
                if (response.product[0] != null) {

                    return res.render("detail", { product : response.product[0]});
                } else {
                    // Colocar aca redireccion a error 404
                    return res.redirect("/", { message : "El producto no existe"});
                }
                
            })
            .catch(errors => {
                return res.render("detail", {
                    message: errors
                })
            })  
    }

}

module.exports = productController;