const express = require('express');
const app = express();
const path = require('path');
const methodOverride =  require('method-override');
const logMiddleware = require('./middlewares/logMiddleware')
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(express.static(path.join(__dirname, './public')));  
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.urlencoded( {extended: false}));
app.use(express.json());
app.use(logMiddleware);

const indexRouter = require("./routes/mainRoutes");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
  });