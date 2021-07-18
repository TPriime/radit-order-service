const mongoose = require("mongoose");
const { ORDER_COLLECTION } = require("../utils/constants").collections;
const { ObjectId, Number } = mongoose.Schema.Types

// auto generated _id serves as the orderId
const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      unique: false,
    },
    productIds: [String],
    amount: {
      type: Number,
      unique: false,
    },
    orderStatus: {
      type: String,
      unique: false,
      default: "pending"
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(ORDER_COLLECTION, orderSchema);
