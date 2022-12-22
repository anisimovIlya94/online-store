const productMock = require("../mock/products.json");
const timeToBuyMock = require("../mock/timeToBuy.json");
const categoryMock = require("../mock/categories.json");
const specialOffersMock = require("../mock/specialOffers.json");
const subCategoriesMock = require("../mock/subCategories.json");
const Product = require("../models/Product");
const Category = require("../models/Category");
const SpecialOffers = require("../models/SpecialOffers");
const Subcategory = require("../models/Subcategory");
const TimeToBuy = require("../models/TimeToBuy");

module.exports = async () => {
  const products = await Product.find();
  const categories = await Category.find();
  const specialOffers = await SpecialOffers.find();
  const subcategories = await Subcategory.find();
  const timeToBuy = await TimeToBuy.find();
  // if (products.length !== productMock.length) {
  //   await createInitialEntity(Product, productMock);
  // }
  if (categories.length !== categoryMock.length) {
    await createInitialEntity(Category, categoryMock);
  }
  if (subcategories.length !== subCategoriesMock.length) {
    await createInitialEntity(Subcategory, subCategoriesMock);
  }
  // if (timeToBuy.length !== timeToBuyMock.length) {
  //   await createInitialEntity(TimeToBuy, timeToBuyMock);
  // }
  // if (specialOffers.length !== specialOffersMock.length) {
  //   await createInitialEntity(SpecialOffers, specialOffersMock);
  // }
};

async function getCategoryIds(categories) {
  const cats = []
  for (let categ of categories) {
    const category = await Category.findOne({ iden: categ })
    cats.push(category._id)
  }
  return cats
}

async function getSubcategoryIds(subcategories) {
  const cats = []
  for (let subcateg of subcategories) {
    const subcategory = await Subcategory.findOne({ iden: subcateg })
    cats.push(subcategory._id)
  }
  return cats
}

async function createInitialEntity(Model, data) {
  // Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        // const categories = await getCategoryIds(item.categories)
        // const subcategories = await getSubcategoryIds(item.subcategories)
        delete item.iden
        const newItem = new Model({ ...item, categories: categories, subcategories: subcategories });
        await newItem.save();
        return newItem;
      } catch (error) {
        console.log(error)
        return error;
      }
    })
  );
}
