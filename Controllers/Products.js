const Category = require("../Model/Category");
const Products = require("../Model/Products");

//get all products
exports.getProducts = async (req, res) => {
  try {
    const allProducts = await Products.find().populate("category");
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(404).json(error);
  }
};

//get single product

exports.singleProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const oneProduct = await Products.findById(id).populate("category");
    res.status(200).json(oneProduct);
  } catch (error) {
    res.status(404).json(error);
  }
};

//post products
exports.postProducts = async (req, res) => {
  const { title, description, price, category, isFeatured } = req.body;

  console.log(category);
  try {
    const postProduct = await Products.create({
      title,
      description,
      price,
      image: req.file.filename,
      category,
      isFeatured,
    });
    res.status(200).json({ postProduct });
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

// delete product

exports.deleteProducts = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Products.findByIdAndDelete(id);
    if (deleteProduct) {
      res.status(200).json({ msg: " deleted " });
    } else {
      res.status(400).json({ msg: " not  deleted " });
    }
  } catch (error) {}
};

// update product

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, category, isFeatured } = req.body;
  // const categories = await Category.findById(req.body.category);

  try {
    let updateData = {
      title: title,
      description: description,
      price: price,
      category: category,
      isFeatured: isFeatured,
    };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    const updateProduct = await Products.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (updateProduct) {
      res.status(200).json({ updateProduct });
    } else {
      res.status(400).json({ msg: "id not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get count of products

exports.CountProduct = async (req, res) => {
  try {
    const productCount = await Products.countDocuments();
    res.status(200).json({ productCount });
  } catch (error) {
    res.status(500).json(error);
  }
};

//  filter products

exports.filterProducts = async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const filteredProducts = await Products.find({
      category: categoryId,
    }).populate("category");
    res.status(200).json(filteredProducts);
  } catch (error) {
    res.status(500).json(error);
  }
};
