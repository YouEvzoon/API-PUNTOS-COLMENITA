// Login de usuario
exports.loginUsuario = async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
    // Comparar contraseñas (sin hash por simplicidad)
    if (usuario.password !== password) {
      return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
    }
    res.json({ message: 'Login exitoso', usuario: { id_usuario: usuario.id_usuario, nombre: usuario.nombre, correo: usuario.correo } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const db = require('../config/db.config');
const Usuario = db.Usuario;

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Restablecer contraseña: generar token y enviar email
const nodemailer = require('nodemailer');
exports.restablecerContrasena = async (req, res) => {
  const { correo } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.json({ success: false, message: 'Correo no registrado.' });
    }
    // Generar token aleatorio
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    usuario.resetToken = token;
    await usuario.save();

    // Configurar transporte de nodemailer (ajusta con tus credenciales reales)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tucorreo@gmail.com', // Cambia por tu correo
        pass: 'tu_contraseña' // Cambia por tu contraseña o usa app password
      }
    });

    // Enlace de restablecimiento (ajusta la URL a tu frontend)
    const resetUrl = `http://localhost:8080/restablecer/${token}`;
    const mailOptions = {
      from: 'tucorreo@gmail.com',
      to: correo,
      subject: 'Restablecimiento de contraseña',
      html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`
    };

    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: 'Se ha enviado un enlace de restablecimiento a su correo electrónico.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al enviar el correo.', error: error.message });
  }
};

// Cambiar contraseña usando el token
exports.cambiarContrasena = async (req, res) => {
  const { token, nuevaPassword } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { resetToken: token } });
    if (!usuario) {
      return res.status(400).json({ success: false, message: 'Token inválido o expirado.' });
    }
    usuario.password = nuevaPassword;
    usuario.resetToken = null;
    await usuario.save();
    return res.json({ success: true, message: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error al actualizar la contraseña.', error: error.message });
  }
};
