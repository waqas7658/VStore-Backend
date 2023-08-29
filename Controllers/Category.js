const Category = require("../Model/Category");
// const { Category } = require("../Model/Category");

//get category
exports.getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json(error);
  }
};

//post Category

exports.postCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name });
    // console.log(Category);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
// delete category

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await Category.findByIdAndDelete(id);
    if (deleteCategory) {
      res.status(200).json({ msg: "Category deleted" });
    } else {
      res.status(400).json({ msg: "Category not found" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};
