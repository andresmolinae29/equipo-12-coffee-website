const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.resolve(__dirname, './public');
const indexRouter = require("./routes/mainRoutes");

app.use( express.static(publicPath) );

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
  });