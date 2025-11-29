const express = require('express');
const router = express.Router();
const puntosJuegoController = require('../controllers/puntos_juego.controller');
// Solicitar recompensa por cada 100 puntos
router.post('/solicitar-recompensa', puntosJuegoController.solicitarRecompensa);
// Listar solicitudes de recompensa (admin)
router.get('/solicitudes-recompensa', puntosJuegoController.listarSolicitudes);
// Historial y resumen de puntos por juego para un usuario
router.get('/historial/:id_usuario', puntosJuegoController.historialPorJuego);

// Crear
router.post('/', puntosJuegoController.create);
// Obtener todos
router.get('/', puntosJuegoController.findAll);
// Obtener uno por ID
router.get('/:id', puntosJuegoController.findOne);
// Actualizar por ID
router.put('/:id', puntosJuegoController.update);
// Eliminar por ID
router.delete('/:id', puntosJuegoController.delete);

module.exports = router;
