import express from 'express';
import {
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getInvoice,
  getInvoicesByUserId,
  generateId
} from '../controllers/invoiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add-invoice', protect, addInvoice);
router.put('/update-invoice/:id', protect, updateInvoice);
router.delete('/delete-invoice/:id', protect, deleteInvoice);
router.get('/get-invoice/:id', protect, getInvoice);
router.get('/get-invoices/:idUsuario', protect, getInvoicesByUserId);
router.get('/generate-id/:invoiceType', protect, generateId);
export default router;
