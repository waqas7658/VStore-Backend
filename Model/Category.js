const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a Name"],
  },
});
module.exports = mongoose.model("Category", categorySchema);
