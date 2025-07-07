import asyncHandler from 'express-async-handler';
import Register from '../models/registerModel.js';

const addRegister = asyncHandler(async (req, res) => {
  const { tipoRegistro, descRegistro, fecha, monto } = req.body;
  const userId = req.user._id;
  try {
    const newRegister = await Register.create({
      tipoRegistro,
      descRegistro,
      fecha,
      monto,
      idUsuario: userId, // Asocia el registro con el usuario autenticado
    });
    if (newRegister) {
      res.status(201).json({ message: 'Registro agregado con Ã©xito', data: newRegister });
    } else {
      res.status(400);
      throw new Error('No se pudo agregar el registro');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar el registro', error: error.message });
  }
});
const updateRegister = asyncHandler(async (req, res) => {
  const { tipoRegistro, descRegistro, fecha, monto } = req.body;
  try {
    const register = await Register.findById(req.params.id);
    if (register) {
      if (register.idUsuario.toString() === req.user._id.toString()) {
        register.tipoRegistro = tipoRegistro;
        register.descRegistro = descRegistro;
        register.fecha = fecha;
        register.monto = monto;
        const updatedRegister = await register.save();
        res.json({ message: 'Registro actualizado con Ã©xito', data: updatedRegister });
      } else {
        res.status(403);
        throw new Error('No tienes permiso para actualizar este registro');
      }
    } else {
      res.status(404);
      throw new Error('Registro no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro', error: error.message });
  }
});
const deleteRegister = asyncHandler(async (req, res) => {
  const registerId = req.params.id;
  const removedRegister = await Register.removeById(registerId);
  if (removedRegister) {
    res.json({ message: 'Registro eliminado con Ã©xito' });
  } else {
    res.status(404);
    throw new Error('Registro no encontrado');
  }
});
const getRegister = asyncHandler(async (req, res) => {
  try {
    const register = await Register.findById(req.params.id);
    if (register) {
      if (register.idUsuario.toString() === req.user._id.toString()) {
        res.json(register);
      } else {
        res.status(403);
        throw new Error('No tienes permiso para acceder a este registro');
      }
    } else {
      res.status(404);
      throw new Error('Registro no encontrado');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el registro', error: error.message });
  }
});
const getRegistersByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.idUsuario;
  try {
    const registers = await Register.find({ idUsuario: userId });
    if (registers) {
      res.json(registers);
    } else {
      res.status(404);
      throw new Error('No se encontraron registros para este usuario');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los registros', error: error.message });
  }
});
export {
  addRegister,
  updateRegister,
  deleteRegister,
  getRegister,
  getRegistersByUserId,
};
