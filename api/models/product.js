const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //long string tip, _ je zbog konvencije nazivanja
    name: { type: String, required: true },
    price: { type: Number, required: true },
});
module.exports = mongoose.model("Product", productSchema);
