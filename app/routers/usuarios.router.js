const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// Login usuario
router.post('/login', usuariosController.loginUsuario);
// Crear usuario
router.post('/', usuariosController.createUsuario);
// Obtener todos los usuarios
router.get('/', usuariosController.getUsuarios);
// Obtener usuario por ID
router.get('/:id', usuariosController.getUsuarioById);
// Actualizar usuario
router.put('/:id', usuariosController.updateUsuario);
// Eliminar usuario
router.delete('/:id', usuariosController.deleteUsuario);
// Restablecer contraseña (envía email)
router.post('/restablecer-contrasena', usuariosController.restablecerContrasena);
// Cambiar contraseña usando token
router.post('/cambiar-contrasena', usuariosController.cambiarContrasena);

module.exports = router;
