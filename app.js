const express = require('express');
const path = require('path')
const app = express();
const publicPath = path.resolve(__dirname, './public');

app.use( express.static(publicPath) );  

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/home.html'));
});

app.get('/carrito', (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/cart.html'));
});

app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});