const Cart = require("../Model/Cart");
const Products = require("../Model/Products");

//post Cart

exports.postCart = async (req, res) => {
  const productsFind = await Products.find(req.body.id);
  console.log(productsFind);
};
