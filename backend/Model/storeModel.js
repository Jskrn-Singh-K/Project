const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Store name is required"],
    },
    address: String, 
    
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
