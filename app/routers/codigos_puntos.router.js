const express = require('express');
const router = express.Router();
const codigosPuntosController = require('../controllers/codigos_puntos.controller');

// Ruta para que el admin genere códigos
router.post('/generar', codigosPuntosController.generarCodigos);

// Ruta para que el usuario use un código
router.post('/usar', codigosPuntosController.usarCodigo);

module.exports = router;
