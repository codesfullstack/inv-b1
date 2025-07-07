import mongoose from 'mongoose';

const productInvoiceSchema = mongoose.Schema(
  {
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    invoiceType: {
      type: String,
      required: true,
    },
    invoiceID: {
      type: Number,
      required: true,
    },
    productId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dateIssue: {
      type: Date,
      required: true,
    },
    utility: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
productInvoiceSchema.statics.removeById = async function (productId) {
  return this.findByIdAndRemove(productId);
};
const ProductInvoice = mongoose.model('ProductInvoice', productInvoiceSchema);
export default ProductInvoice;
