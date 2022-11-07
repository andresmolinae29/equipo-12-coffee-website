const fs = require('fs');
const Product = require('../models/Products')
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = Product.findAll();
		res.render('products', { products : products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		const product = Product.findByPk(req.params.id);
		res.render('detail', { product : product });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
		
	},
	
	// Create -  Method to store
	store: (req, res) => {

		const resultValidation =  validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("/products", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		let productInDB = Product.findByField('name', req.body.name)

		if (productInDB) {
			return res.render('/products', {
				errors: {
					name: {
						msg: 'El producto ya se encuentra registrado'
					}
				},
				oldData: req.body
			});
		}

		Product.create(req.body);
		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		const product = Product.findByPk(req.body.id);
		res.render('product-edit-form', { productToEdit : product});
	},
	// Update - Method to update
	update: (req, res) => {
		
		const resultValidation =  validationResult(req);

		if (resultValidation.errors.length > 0) {
			return res.render("/products", {
				errors: resultValidation.mapped(),
				oldData: req.body
			});
		}

		Product.update(req.body);
		
		res.redirect("/products/detail/" + req.params.id);

		},

	// Delete - Delete one product from DB
	destroy : (req, res) => {

		let productInDB = Product.findByPk('name', req.body.id)

		if (!productInDB) {
			return res.render("/product", {
				errors: {
					name: {
						msg: 'El producto no se encuentra en la BD'
					}
				},
				oldData: req.body
			});
		}

		Product.delete();
		res.redirect("/products");
	}
};

module.exports = controller;