const { createProduct, getOneProduct, editProduct, getProducts, deleteOneProduct } = require('../services/productService');
const { validationResult } = require('express-validator');

const productController = {
    create: (req, res) => {
        return res.render("product-create-form")
    },

    createProcess: (req, res) => {

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
                    return res.redirect("404", 
                    // { message : "El producto no existe"}
                    );
                }
                
            })
            .catch(errors => {
                return res.render("product-edit-form", {
                    message: errors
                })
            })   
    },

    editProcess: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {

            console.log(resultValidation.mapped());
        
            return res.redirect("/product/edit/" + req.params.id, 
            // {
            //     errors: resultValidation.mapped(),
            //     productToEdit: req.body
            // }
            )
        }

        let data = null;

        if (req.file) {
            let filename = req.file.filename;
            data = {
                ...req.body,
                img: filename
            };  
        } else {
            data = {
            ...req.body
        };
        }

        const id = req.params.id;

        console.log(data);

        editProduct(id, data)
            .then(productEditted => {
 
                return res.redirect("/product/manage-products");
            })
            .catch(errors => {
   
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
    },

    management: async (req, res) => {
        const products = await getProducts();
        return res.render("product-management", { products : products.products })
    },

    deleteProduct: (req, res) => {
        const id = req.params.id;

        deleteOneProduct(id)
            .then(productDeleted => {
                return res.redirect("/product/manage-products");
            })
            .catch(errors => {
   
                return res.render("404", {
                    message: errors
                })
            })
    }

}

module.exports = productController;