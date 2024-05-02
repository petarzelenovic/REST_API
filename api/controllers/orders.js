const Order = require("../models/order");

const getAll = (req, res, next) => {
    Order.find()
        .select("_id product quantity")
        .populate("product", "_id name price") // da bi nam vratio zapravo taj product a ne samo njegov id, drugi parametar sta zelimo da nam se priakaze
        .exec()
        .then((docs) => {
            const response = {
                // pravimo da response objekat ima broj elemenata koje vraca kao i proizvode sa posebnim atributima, kao npr url za svaki
                count: docs.length,
                orders: docs.map((doc) => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/" + doc._id,
                        },
                    };
                }),
            };
            res.status(200).json(response);
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
}

const createOrder = (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) {
                return res.status(404).json({
                    message: "Product not found",
                });
            }
            const order = new Order({
                quantity: req.body.quantity,
                product: req.body.productId,
            });
            return order.save();
        })
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "Order stored",
                createdOrder: {
                    _id: result._id,
                    product: result.product,
                    quantity: result.quantity,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
}

const getById = (req, res, next) => {
    Order.findById(req.params.orderId)
        .populate("product", "_id name price")
        .exec()
        .then((order) => {
            if (!order) {
                return res.status(404).json({
                    message: "Order not found",
                });
            }
            res.status(200).json({
                order: order,
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
}

const deleteOrder = (req, res, next) => {
    Order.deleteOne({ _id: req.params.orderId })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Order deleted",
            });
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            });
        });
}

module.exports = {
    getAll,
    createOrder,
    getById,
    deleteOrder
}