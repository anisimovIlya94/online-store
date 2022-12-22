const express = require("express")
const router = express.Router({ mergeParams: true })
const SpecialOffers = require("../models/SpecialOffers")
const User = require("../models/User")
const auth = require("../middleware/auth.middleware")

router.get("/", async (req, res) => {
    try {
        const list = await SpecialOffers.find()
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: "Произошла ошибка на сервере. Попробуйте позже"
        })
    }
})

router.patch("/:recId", auth, async (req, res) => {
    try {
      const { recId } = req.params;
      const user = await User.findById(req.user._id);
      if (user.isAdmin) {
        const updatedRecomendation = await SpecialOffers.findByIdAndUpdate(recId , req.body, { new: true });
        return res.status(200).send(updatedRecomendation);
      } else {
        res.status(401).json({ message: "User is not admin" });
      }
    } catch (error) {
      res.status(500).json({
        message: "Произошла ошибка на сервере. Попробуйте позже",
      });
    }
  });
  

module.exports = router