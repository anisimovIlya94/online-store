const { Schema, model } = require("mongoose")

const schema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId },
    iden: { type: String }
}, {
    timestamps: true
})

module.exports = model("Subcategory", schema)