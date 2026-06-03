import Usuario from "../models/Usuario.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const crearAdmin = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await Usuario.findOne({ email });

    if (existe) {
      return res.status(400).json({
        mensaje: "El usuario ya existe"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const admin = new Usuario({
      nombre,
      email,
      password: passwordHash,
      rol: "admin"
    });

    await admin.save();

    res.status(201).json({
      mensaje: "Administrador creado correctamente"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
};

// 🔑 LOGIN DE USUARIO
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Usuario no encontrado" });
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
      return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    }

    // Crear token
    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token,
      usuario
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};