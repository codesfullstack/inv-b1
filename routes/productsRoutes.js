import express from 'express';
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
  updateProductAmount,
} from '../controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add-product', protect, addProduct);
router.put('/update-product/:id', protect, updateProduct);
router.delete('/delete-product/:id', protect, deleteProduct);
router.get('/get-product/:id', protect, getProduct);
router.get('/get-products/:idUsuario', protect, getProductByUserId);
router.put('/update-product-amount/:productId', protect, updateProductAmount);
export default router;
