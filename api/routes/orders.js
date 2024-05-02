const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const checkAuth = require("../middleware/check-auth");
const orderController = require("../controllers/orders");
const Product = require("../models/product");

router.get("/", checkAuth, orderController.getAll);

router.post("/", checkAuth, orderController.createOrder);

router.get("/:orderId", checkAuth, orderController.getById);

router.delete("/:orderId", checkAuth, orderController.deleteOrder);

module.exports = router;
