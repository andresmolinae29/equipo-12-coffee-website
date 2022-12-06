const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const logMiddleware = require('./middlewares/logMiddleware');
const cookies = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware');
const error404 = require('./middlewares/err404Middleware');

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
  res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
  next(); 
})

app.use(session( {
  secret: 'Shhh, It is a secret',
  resave: false,
  saveUninitialized: false,
}));

app.use(express.static(path.join(__dirname, './public')));  
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookies());
app.use(methodOverride('_method'));
app.use(express.json());
app.use(logMiddleware);
app.use(userLoggedMiddleware);

const indexRouter = require("./routes/mainRoutes");
const userRouterApi = require("./routes/userRoutesApi");
const productRouterApi = require("./routes/productRoutesApi");

const userRoute = require("./routes/userRoutes.js");
const productRoute = require("./routes/productRoutes.js");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/api/user", userRouterApi);
app.use("/api/product", productRouterApi);

app.use("/user", userRoute);
app.use("/product", productRoute);

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
  });
  app.use(error404);