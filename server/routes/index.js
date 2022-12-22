const express = require("express")
const router = express.Router({ mergeParams: true })

router.use("/auth", require("./auth.routes"))
router.use("/product", require("./product.routes"))
router.use("/category", require("./category.routes"))
router.use("/subcategory", require("./subcategory.routes"))
router.use("/timetobuy", require("./timetobuy.routes"))
router.use("/specialoffers", require("./specialoffers.routes"))
router.use("/user", require("./user.routes"))

module.exports = router