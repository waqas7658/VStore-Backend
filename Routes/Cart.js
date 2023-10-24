const express = require("express");
const { postCart } = require("../Controllers/Cart");


const router = express.Router();


router.post("/addCart", postCart);

module.exports = router;
