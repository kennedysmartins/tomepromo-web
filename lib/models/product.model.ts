import mongoose from "mongoose"
import shortid from "shortid" 

shortid.characters(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
)

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => shortid.generate().substring(0, 4),
      unique: true,
    },
    url: { type: String, required: true },
    currency: { type: String, required: false },
    image: { type: String, required: true },
    title: { type: String, required: false },
    currentPrice: { type: Number, required: false },
    originalPrice: { type: Number, required: false },
    priceHistory: [
      {
        price: { type: Number, required: false },
        date: { type: Date, default: Date.now },
      },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    recurrencePrice: { type: Number },
    discountRate: { type: Number },
    buyLink: { type: String },
    announcement1: { type: String },
    productCode: { type: String },
    catchyText: { type: String },
    conditionPayment: { type: String },
    website: { type: String },
    cupom: { type: String },
    cupomValue: { type: String },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    shopName: { type: String },
    isOutOfStock: { type: Boolean, default: false },
    users: [
      {
        email: { type: String, required: false },
      },
    ],
    default: [],
  },
  { timestamps: true }
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
