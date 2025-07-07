import asyncHandler from 'express-async-handler';
import Invoice from '../models/invoiceModel.js';
import Sequence from '../models/sequenceModel.js';

const addInvoice = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    invoiceType,
    dateIssue,
    subTotal,
    taxes,
    customer,
    paymentSell,
    provider,
    paymentBuy,
  } = req.body;

  try {
    let purchaseId;
    let saleId;
    let invoiceID;

    if (invoiceType === "Purchase") {
      const purchaseSeq = await Sequence.findOneAndUpdate(
        { _id: "sequencePurchaseId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      invoiceID = purchaseSeq.sequence_value;
    } else if (invoiceType === "Sales") {
      const saleSeq = await Sequence.findOneAndUpdate(
        { _id: "sequenceSaleId" },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
      );
      invoiceID = saleSeq.sequence_value;
    }

    const newInvoice = await Invoice.create({
      invoiceID: invoiceID,
      invoiceType: invoiceType,
      idUsuario: userId,
      dateIssue: dateIssue,
      subTotal: subTotal,
      taxes: taxes,
      customer: customer,
      paymentSell: paymentSell,
      provider: provider,
      paymentBuy: paymentBuy,
    });

    if (newInvoice) {
      res.status(201).json({ message: 'Factura agregada con éxito', data: newInvoice });
    } else {
      res.status(400);
      throw new Error('No se pudo agregar la factura');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la factura', error: error.message });
  }
});

const updateInvoice = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const {
    dateIssue,
    subTotal,
    taxes,
    customer,
    paymentSell,
    provider,
    paymentBuy
  } = req.body;

  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice) {
      if (invoice.idUsuario.toString() === req.user._id.toString()) {
        invoice.dateIssue = dateIssue;
        invoice.subTotal = subTotal;
        invoice.taxes = taxes;
        invoice.customer = customer;
        invoice.paymentSell = paymentSell;
        invoice.provider = provider;
        invoice.paymentBuy = paymentBuy;
        const updatedInvoice = await invoice.save();
        res.json({ message: 'Invoice actualizado con éxito', data: updatedInvoice });
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este Invoice');
      }
    } else {
      res.status(404);
      throw new Error('Invoice no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar Invoice', error: error.message });
  }
});

const deleteInvoice = asyncHandler(async (req, res) => {
  const invoiceId = req.params.id;
  const removedInvoice = await Invoice.findByIdAndDelete(invoiceId);
  if (removedInvoice) {
    res.json({ message: 'Factura eliminada con éxito' });
  } else {
    res.status(404);
    throw new Error('Factura no encontrada');
  }
});

const getInvoice = asyncHandler(async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (invoice) {
      res.json(invoice);
    } else {
      res.status(404);
      throw new Error('Factura no encontrada');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
  }
});

const getInvoicesByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;
  try {
    const invoices = await Invoice.find({ 'idUsuario': userId });
    if (invoices) {
      res.json(invoices);
    } else {
      res.status(404);
      throw new Error('No se encontraron facturas para este usuario');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
  }
});

const generateId = asyncHandler(async (req, res) => {
  const { invoiceType } = req.params;
  try {
    let sequenceId;
    if (invoiceType === "Purchase") {
      sequenceId = "sequencePurchaseId";
    } else if (invoiceType === "Sales") {
      sequenceId = "sequenceSaleId";
    } else {
      res.status(400);
      throw new Error('Tipo de factura no válido');
    }
    const sequence = await Sequence.findById(sequenceId);
    if (sequence) {
      res.json({ sequence_value: sequence.sequence_value + 1 });
    } else {
      res.status(404);
      throw new Error('Secuencia no encontrada');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la secuencia', error: error.message });
  }
});

export {
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  getInvoicesByUserId,
  generateId
};