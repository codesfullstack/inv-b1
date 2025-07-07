import mongoose from 'mongoose';

const productSchema = mongoose.Schema(
  {
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    utility: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
productSchema.statics.removeById = async function (productId) {
  return this.findByIdAndRemove(productId);
};
const Product = mongoose.model('Product', productSchema);
export default Product;
