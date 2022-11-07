const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const logMiddleware = require('./middlewares/logMiddleware');
const cookies = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cookieAuthMiddleware = require('./middlewares/AuthMiddleware');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');

app.use(session( {
  secret: 'Shhh, It is a secret',
  resave: false,
  saveUninitialized: false,
} ));


app.use(express.static(path.join(__dirname, './public')));  
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookies());
app.use(methodOverride('_method'));
app.use(express.urlencoded( {extended: false}));
app.use(express.json());
app.use(logMiddleware);
app.use(cookieAuthMiddleware);
app.use(userLoggedMiddleware);

const indexRouter = require("./routes/mainRoutes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
  const oferta = productos.filter((elemento) => elemento.sellingCategory == "new");

  const visita = productos.filter((elemento) => elemento.sellingCategory == "sale");

  res.render("home", { oferta: oferta, visita: visita });
});

app.use("/", indexRouter);

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
  });