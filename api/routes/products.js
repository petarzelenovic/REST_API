const express = require("express");

const router = express.Router();

const productController = require("../controllers/products");
const checkAuth = require("../middleware/check-auth");


router.get("/", productController.getAll);

router.post("/", checkAuth, productController.createdProduct);

router.get("/:productId", productController.getById);

router.patch("/:productId", checkAuth, productController.updateProduct);

router.delete("/:productId", checkAuth, productController.deleteProduct);

// u node jsu :nazivProm je kao ${x} u jsu
module.exports = router;
