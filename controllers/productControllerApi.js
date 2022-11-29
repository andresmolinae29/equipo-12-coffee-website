const { validationResult } = require('express-validator');
const Product = require('../models/Product');

const controller = {
	// Root - Show all products
	listAll: (req, res) => {

		Product.findAll()
			.then(pr => {
				let parsedProducts = pr.map(el => { return el.dataValues }) 
				return res.status(200).json({
					status: 200,
					products: parsedProducts
				})
			}).catch(errors => {
				return res.json({
					message: errors,
				});
			})
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		const products = Product.findByPk(req.params.id);

		Promise.all([products])
			.then(product => {
				return res.status(200).json({
					status: 200,
					product: product
				});
			})
			.catch(errors => {
				return res.json({
					message: errors,
				});
			})

	},

	// Create -  Method to store
	store: (req, res) => {

		let product = req.body;

		if (!product.img) {
			product.img = 'img-default.jpg'
		};

		Product.findOneProduct('name', product.name)
			.then(productByName => {
				return productByName
			})
			.then(productByName => {
				if (productByName) {
					return res.json({
						status: 200,
						message: "El producto se encuentra en la base de datos"
					})
				} else {
					Product.createOneProduct(product)
					return res.status(200).json({
						status: 200,
						productCreated: product
					})
				}
			})
			.catch(errors => {
				res.json({
					message: errors
				})
			})
	},

	// Update - Method to update
	update: (req, res) => {

		Product.edit(req.params.id, req.body)
			.then(productEdited => {

                productEdited = Product.findByPk(req.params.id);

                return productEdited;
            })
            .then(product => {

				return res.status(200).json({
					status: 200,
					productEdited: product
				});

            })
			.catch(errors => {
				return res.json({
					message: errors
				});
			})
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {

		Product.delete(req.params.id)
			.then(product => {
				return res.status(200).json({
					status: 200,
					productDeleted: product
				});
			})
			.catch(errors => {
				return res.json({
					message: errors
				});
			})
	},

	filterDataByCategory: (req, res) => {

		Product.filterByField('sellingCategory', req.query.category)
			.then(products => {
				return res.status(200).json({
					status: 200,
					products: products
				})
			})
			.catch(errors => {
				return res.json({
					message: errors
				})
			});
	}
};

module.exports = controller;