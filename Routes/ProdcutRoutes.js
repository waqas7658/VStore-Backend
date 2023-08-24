const express = require("express");

const path = require("path");
const multer = require("multer");
const {
  getProducts,
  postProducts,
  singleProduct,
  deleteProducts,
  updateProduct,
} = require("../Controllers/Products");

const router = express.Router();

// code for multer//
const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./Uploads");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/allproducts", getProducts);
router.get("/singleproduct/:id", singleProduct);
router.delete("/deleteproduct/:id", deleteProducts);
router.post("/postproduct", upload.single("image"), postProducts);
router.put("/updateproduct/:id", upload.single("image"), updateProduct);

module.exports = router;
