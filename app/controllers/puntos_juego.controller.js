// Solicitar recompensa por cada 100 puntos
exports.solicitarRecompensa = async (req, res) => {
  try {
    const { id_usuario, nombre_juego, tipo_recompensa } = req.body;
    // Sumar puntos del usuario en ese juego
    const total = await db.PuntosJuego.sum('puntos_obtenidos', { where: { id_usuario, nombre_juego } });
    if (total < 100) {
      return res.status(400).json({ error: 'No tienes suficientes puntos para canjear.' });
    }
    // Descontar 100 puntos (registrar un movimiento negativo en PuntosJuego)
    await db.PuntosJuego.create({
      id_usuario,
      nombre_juego,
      codigo_jugador: 'canje',
      codigo_puntos: 'canje',
      puntos_obtenidos: -100
    });
    // Registrar solicitud
    await db.SolicitudRecompensa.create({ id_usuario, nombre_juego, tipo_recompensa });
    res.json({ mensaje: 'Solicitud enviada. El admin la revisará.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar solicitudes de recompensa (admin)
exports.listarSolicitudes = async (req, res) => {
  try {
    const solicitudes = await db.SolicitudRecompensa.findAll({ where: { estado: 'pendiente' } });
    res.json(solicitudes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Obtener historial y suma de puntos por juego para un usuario
exports.historialPorJuego = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    // Historial detallado
    const historial = await db.PuntosJuego.findAll({
      where: { id_usuario },
      attributes: ['nombre_juego', 'puntos_obtenidos', 'fecha_registro'],
      order: [['fecha_registro', 'DESC']]
    });
    // Suma de puntos por juego
    const resumen = await db.PuntosJuego.findAll({
      where: { id_usuario },
      attributes: [
        'nombre_juego',
        [db.Sequelize.fn('SUM', db.Sequelize.col('puntos_obtenidos')), 'total_puntos']
      ],
      group: ['nombre_juego']
    });
    res.json({ historial, resumen });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const db = require('../config/db.config');
const PuntosJuego = require('../models/puntos_juego.model')(db.sequelize, db.Sequelize);

// Crear un nuevo registro de puntos de juego
exports.create = async (req, res) => {
  try {
    const puntos = await PuntosJuego.create(req.body);
    res.status(201).json(puntos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los registros de puntos de juego
exports.findAll = async (req, res) => {
  try {
    const puntos = await PuntosJuego.findAll();
    res.json(puntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un registro por ID
exports.findOne = async (req, res) => {
  try {
    const puntos = await PuntosJuego.findByPk(req.params.id);
    if (!puntos) return res.status(404).json({ error: 'No encontrado' });
    res.json(puntos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un registro por ID
exports.update = async (req, res) => {
  try {
    const [updated] = await PuntosJuego.update(req.body, { where: { id_puntos: req.params.id } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un registro por ID
exports.delete = async (req, res) => {
  try {
    const deleted = await PuntosJuego.destroy({ where: { id_puntos: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
