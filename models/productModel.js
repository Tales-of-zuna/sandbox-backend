const mongoose = require("mongoose");

var productSchema = new mongoose.Schema(
  {
    variants: [
      {
        title: {
          type: String,
        },
        slug: {
          type: String,
        },
        price: {
          type: Number,
        },
        image: {
          type: Object,
        },
      },
    ],
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    category: {
      type: String,
      require: true,
    },
    brand: {
      type: String,
      required: true,
    },
    presentation_images: {
      type: Array,
    },
    quantity: { type: Number, required: true },
    sold: { type: Number, default: 0 },
    image: {
      type: Object,
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
