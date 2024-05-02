import { number } from "joi";
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    Description: String,
    price: Number,
    category: String,
    sizes: Array,
    deliveryInfo: String,
    onSale: String,
    priceDrop: Number,
    imageUrl: String,
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
