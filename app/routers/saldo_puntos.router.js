const express = require('express');
const router = express.Router();
const saldoPuntosController = require('../controllers/saldo_puntos.controller');

// Crear o actualizar saldo
router.post('/', saldoPuntosController.upsert);
// Obtener todos los saldos
router.get('/', saldoPuntosController.findAll);
// Obtener saldo por id_usuario
router.get('/:id_usuario', saldoPuntosController.findOne);
// Actualizar saldo por id_usuario
router.put('/:id_usuario', saldoPuntosController.update);
// Eliminar saldo por id_usuario
router.delete('/:id_usuario', saldoPuntosController.delete);

module.exports = router;
