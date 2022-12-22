const { Schema, model } = require("mongoose")

const schema = new Schema({
    bought: Number,
    name: String,
    secondName: String,
    telephone: String,
    email: { type: String, required: true, unique: true },
    isAdmin: { type: Boolean, enum: [true, false]},
    password: { type: String },
    orders: [{ type: Object }],
    viewed: [{ type: Schema.Types.ObjectId, ref: 'Products' }],
    shoppingCart: [{type: Schema.Types.ObjectId, ref: 'Products'}],
}, {
    timestamps: true
})

module.exports = model("User", schema)