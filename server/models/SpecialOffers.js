const { Schema, model } = require("mongoose")

const schema = new Schema({
    value: {type: Number, required: true}
}, {
    timestamps: true
})

module.exports = model("SpecialOffers", schema)