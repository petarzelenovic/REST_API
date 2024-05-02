const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, default: 1 }, //ref za konfigurisanje tipa
});
module.exports = mongoose.model("Order", orderSchema);
