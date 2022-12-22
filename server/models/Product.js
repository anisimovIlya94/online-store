const { Schema, model } = require("mongoose")

const schema = new Schema({
    name: { type: String, required: true },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory'}],
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    quantity: { type: Object },
    code: { type: Number, required: true },
    images: [{ type: String, required: true }],
    time: { type: Object },
    age: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    bigPrice: Number,
    description: String
}, {
    timestamps: true
})

module.exports = model("Product", schema)