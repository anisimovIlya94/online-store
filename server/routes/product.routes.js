const express = require("express")
const router = express.Router({ mergeParams: true })
const Product = require("../models/Product")
const auth = require("../middleware/auth.middleware")
const User = require("../models/User")

router.get("/", async (req, res) => {
    try {
        const list = await Product.find()
        res.status(200).send(list)
    } catch (error) {
        res.status(500).json({
            message: "Произошла ошибка на сервере. Попробуйте позже"
        })
    }
})

router.patch("/:productId", auth, async (req, res) => {
    try {
      const { productId } = req.params;
      const user = await User.findById(req.user._id);
      if (user.isAdmin) {
        const updatedProduct = await Product.findByIdAndUpdate(productId , req.body, { new: true });
        return res.status(200).send(updatedProduct);
      } else {
        res.status(401).json({ message: "User is not admin" });
      }
    } catch (error) {
        res.status(500).json({
        message: "Произошла ошибка на сервере. Попробуйте позже",
      });
    }
});
  
router.put("/", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.isAdmin) { 
            const newProduct = await Product.create(req.body)
            return res.status(200).send(newProduct);
        } else {
            res.status(401).json({ message: "User is not admin" });
          }
    } catch (error) {
        res.status(500).json({
            message: "Произошла ошибка на сервере. Попробуйте позже",
          });
    }
})

router.delete("/:productId", auth, async (req, res) => {
    const {productId} = req.params
    try {
        const user = await User.findById(req.user._id);
        if (user.isAdmin) {
            await Product.findByIdAndRemove(productId)
            return res.status(200).send(null);
         }
    } catch (error) {
        res.status(500).json({
            message: "Произошла ошибка на сервере. Попробуйте позже",
          });
    }
})

module.exports = router