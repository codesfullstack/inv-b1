import mongoose from 'mongoose';

const registerSchema = mongoose.Schema(
  {
    tipoRegistro: {
      type: String,
      required: true,
    },
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Hace referencia al modelo de usuario
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    monto: {
      type: Number,
      required: true,
    },
    idUsuario: {
      type: mongoose.Schema.Types.ObjectId, // AsegÃºrate de que sea ObjectId
      ref: 'User', // Esto establece una relaciÃ³n con el modelo de usuario
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
registerSchema.statics.removeById = async function (registerId) {
  return this.findByIdAndRemove(registerId);
};
const Register = mongoose.model('Register', registerSchema);
export default Register;
