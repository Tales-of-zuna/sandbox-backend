const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    orderNum: String,

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        count: Number,
        color: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash on Delivery",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    orderNotes: {
      Array,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
