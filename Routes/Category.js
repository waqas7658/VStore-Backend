const express = require("express");
const {
  getCategory,
  postCategory,

  deleteCategory,
} = require("../Controllers/Category");

const router = express.Router();

router.get("/getCategory", getCategory);
router.post("/addCategory", postCategory);
router.delete("/deleteCategory/:id", deleteCategory);

module.exports = router;
