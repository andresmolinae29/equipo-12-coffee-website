const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');

// const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.render('products', { products : products });
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));		
		const id = req.params.id;
		const product = products.find((product) => product.id == id);
		
		res.render('detail', { product : product });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
		
	},
	
	// Create -  Method to store
	store: (req, res) => {

		let errors = validationResult(req);

		if (errors.isEmpty()) {
			const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		
			const product = {
				id : Date.now(),
				name : req.body.name,
				description : req.body.description,
				size : req.body.size,
				price : req.body.price,
				category : req.body.category,		
				img : req.file.filename,
				longDescription : req.body.longDescription,
				sellingCategory : req.body.sellingCategory
			}
	
			products.push(product)
	
			productsJson = JSON.stringify(products, null, " ")
	
			fs.writeFileSync(productsFilePath, productsJson)
			res.redirect("/products");
		} else {
			res.render('product-create-form', { 
				errors: errors.array(),
				old: req.body
			 });
			// falta ajustarlo en el html
		}

	},

	// Update - Form to edit
	edit: (req, res) => {

		const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));		
		const id = req.params.id;
		const product = products.find((product) => product.id == id);

		res.render('product-edit-form', { productToEdit : product});
	},
	// Update - Method to update
	update: (req, res) => {
		
		const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

		products.forEach((p) => {
		if (p.id == req.params.id) {
			p.name = req.body.name,
            p.description = req.body.description,
            p.size = req.body.size,
			p.price = req.body.price,
			p.category = req.body.category,		
            p.longDescription = req.body.longDescription,
            p.sellingCategory = req.body.sellingCategory
		}
		});

		const data = JSON.stringify(products, null, " ");
		fs.writeFileSync(productsFilePath, data);
		res.redirect("/products/detail/" + req.params.id);

		},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));
		products = products.filter((p) => p.id != req.params.id);

		const data = JSON.stringify(products, null, " ");
		fs.writeFileSync(productsFilePath, data);
		res.redirect("/products");
	}
};

module.exports = controller;