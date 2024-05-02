const express = require("express");

const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRouts = require("./api/routes/products");
const orderRouts = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");
const tokenRoutes = require("./api/routes/token");

mongoose.connect(
    "mongodb+srv://node-shop:node-shop@node-rest-shop.exu1srt.mongodb.net/?retryWrites=true&w=majority&appName=node-rest-shop"
);

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false })); //extended false only support simple bodies
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Acces-Control-Allow-Origin", "*"); // postavljamo header za sve req
    res.header("Access-Control-Allow-Headers", "*");
    if (req.method === "OPTIONS") {
        res.header(
            "Access-Control-Allow-Methods",
            "PUT",
            "POST",
            "PATCH",
            "DELETE",
            "GET"
        );
        return res.status(200).json({});
    }

    next();
});

app.use("/products", productRouts); // sve sa /products ce biti prosledjeno na product.js fajl
//setsup middleware , any req has to go through app

//svaki put kad se uradi nesto na serveru mora da se restartuje server

app.use("/orders", orderRouts);
app.use("/user", userRoutes);
app.use("/token", tokenRoutes);

//ako nikakvu rutu nije prepoznao znaci da je doslo do greske
app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error); //prosledjuje request ali ovaj error request
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        },
    });
});
module.exports = app;

//npm install --save-dev nodemon automatski nadgleda fajlove i pokrece server opet da ne radimo mi to
//npm install --save morgan - node package za logging
// npm install --save body-parser - package da parsira body of incoming requests
//npm install --save mongoose - package za upravljanje bazom
