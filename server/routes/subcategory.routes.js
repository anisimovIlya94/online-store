const express = require("express")
const router = express.Router({ mergeParams: true })
const Subcategory = require("../models/Subcategory")

router.get("/", async (req, res) => {
    try {
        const list = await Subcategory.find()
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: "Произошла ошибка на сервере. Попробуйте позже"
        })
    }
})

module.exports = router