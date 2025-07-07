import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema(
  {
    invoiceID: {
      type: Number,
      required: true,
    },
    invoiceType: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dateIssue: {
      type: Date,
      required: true,
    },
    subTotal: {
      type: Number,
      required: false,
    },
    taxes: {
      type: Number,
      required: false,
    },
    customer: {
      type: String,
      required: false,
    },
    paymentSell: {
      type: String,
      required: false,
    },
    provider: {
      type: String,
      required: false,
    },
    paymentBuy: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice = mongoose.model('Invoice', invoiceSchema);

export default Invoice;