const Product = require("../models/product");

const getAll = (req, res, next) => {
    Product.find()
        .select("name price _id") // sta zelimo da nam response vrati
        .exec()
        .then((docs) => {
            const response = {
                // pravimo da response objekat ima broj elemenata koje vraca kao i proizvode sa posebnim atributima, kao npr url za svaki
                count: docs.length,
                products: docs.map((doc) => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/" + doc._id,
                        },
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

const createdProduct = (req, res, next) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
    });

    product
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Created product succesfully",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result.price,
                    request: {
                        type: "GET",
                        url: "http://localhost:3000/products/" + result._id,
                    },
                },
            });
        }) //then() je succesfull callback
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        }); //save() provided by mongoose koje mozemo koristiit nad mongoose elementima
}

const getById = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .select("price name _id")
        .exec()
        .then((doc) => {
            console.log("From database:", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID",
                });
            }
        }) //then() je succesfull callback
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

const updateProduct = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {}; // napravimo objekat da u njega smestamo ono sto zelimo da menjamo
    for (const ops of req.body) {
        //prodjemo kroz body i izvlacimo sta cemo menjati
        updateOps[ops.propName] = ops.value; // iz bodya izvlacimo ono sto zelimo da menjamo, i ubacujemo kao key value u njega
    }
    //kada saljemo u body prosledjujemo niz sa objektima koji imaju 'propName':'price', 'value':'123'
    Product.updateOne({ _id: id }, { $set: updateOps }) //ide updateOne umesto update
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Product updated",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

const deleteProduct = (req, res, next) => {
    const id = req.params.productId; // uhvatimo id iz urla
    Product.deleteOne({ _id: id }) // remove se ne koristi vise u novoj verziji koristi deleteOne ili deleteMany
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Product deleted",
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        }); // brisemo onaj proizvod koji ima taj id
}

module.exports = {
    getAll,
    createdProduct,
    getById,
    updateProduct,
    deleteProduct
}