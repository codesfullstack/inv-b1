import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Sequence from '../models/sequenceModel.js';

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility } = req.body;
  const userId = req.user._id;

  try {
    const updatedSequence = await Sequence.findOneAndUpdate(
      { _id: "sequenceProductId" },
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true }
    );
    const newCorrelative = updatedSequence.sequence_value;

    const newProduct = await Product.create({
      idUsuario: userId,
      productId: newCorrelative,
      name: name,
      description: description,
      price: price,
      amount: amount,
      utility: utility
    });

    if (newProduct) {
      res.status(201).json({ message: 'Product agregado con éxito', data: newProduct });
    } else {
      res.status(400);
      throw new Error('No se pudo agregar Product');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar Product', error: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { name, description, price, amount, utility } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.idUsuario.toString() === req.user._id.toString()) {
        product.name = name;
        product.description = description;
        product.price = price;
        product.amount = amount;
        product.utility = utility;
        const updatedProduct = await product.save();
        res.json({ message: 'Product actualizado con éxito', data: updatedProduct });
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este Product');
      }
    } else {
      res.status(404);
      throw new Error('Product no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar Product', error: error.message });
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const productId = req.params.id;
  const removedProduct = await Product.removeById(productId);
  if (removedProduct) {
    res.json({ message: 'Product eliminado con éxito' });
  } else {
    res.status(404);
    throw new Error('Product no encontrado');
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      if (product.idUsuario.toString() === req.user._id.toString()) {
        res.json(product);
      } else {
        res.status(403);
        throw new Error('No tienes permiso para acceder a este Product');
      }
    } else {
      res.status(404);
      throw new Error('Product no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el Product', error: error.message });
  }
});

const getProductByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;
  try {
    const product = await Product.find({ idUsuario: userId });
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      throw new Error('No se encontraron Product para este usuario');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los Product', error: error.message });
  }
});

const updateProductAmount = asyncHandler(async (req, res) => {
  const { amount, name, description, price, utility } = req.body;
  const productId = req.params.productId;
  const product = await Product.findOne({ productId });

  if (!product) {
    res.status(404);
    throw new Error('Producto no encontrado');
  }

  if (product.idUsuario.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('No tienes permiso para actualizar este producto');
  }

  if (amount !== undefined) {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      res.status(400);
      throw new Error('El valor de amount no es un número válido');
    }
    product.amount = numericAmount;
  }

  if (name !== undefined) product.name = name;
  if (description !== undefined) product.description = description;
  if (price !== undefined) {
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
      res.status(400);
      throw new Error('El valor de price no es un número válido');
    }
    product.price = numericPrice;
  }
  if (utility !== undefined) {
    const numericUtility = parseFloat(utility);
    if (isNaN(numericUtility)) {
      res.status(400);
      throw new Error('El valor de utility no es un número válido');
    }
    product.utility = numericUtility;
  }

  const updatedProduct = await product.save();
  res.json({
    message: 'Producto actualizado con éxito',
    data: {
      _id: updatedProduct._id,
      productId: updatedProduct.productId,
      amount: updatedProduct.amount,
      name: updatedProduct.name,
      description: updatedProduct.description,
      price: updatedProduct.price,
      utility: updatedProduct.utility,
    },
  });
});

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProductByUserId,
  updateProductAmount
};