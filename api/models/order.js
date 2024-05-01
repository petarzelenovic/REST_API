const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //long string tip, _ je zbog konvencije nazivanja
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: { type: Number, default: 1 }, //ref za konfigurisanje tipa
});
module.exports = mongoose.model("Order", orderSchema);
