import express from 'express';
import {
  addProductInvoice,
  updateProductInvoice,
  deleteProductInvoice,
  getProductInvoice,
  getProductByUserIdInvoice,
  deleteProductsByInvoiceID,
} from '../controllers/productInvoiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add-product-invoice', protect, addProductInvoice);
router.put('/update-product-invoice/:id', protect, updateProductInvoice);
router.delete('/delete-product-invoice/:invoiceID', protect, deleteProductInvoice);
router.get('/get-product-invoice/:id', protect, getProductInvoice);
router.get('/get-products-invoice/:idUsuario', protect, getProductByUserIdInvoice);
router.delete('/delete-products-invoice-id/:invoiceID', protect, deleteProductsByInvoiceID);
export default router;
