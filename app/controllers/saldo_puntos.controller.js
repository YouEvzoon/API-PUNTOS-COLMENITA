const db = require('../config/db.config');
const SaldoPuntos = require('../models/saldo_puntos.model')(db.sequelize, db.Sequelize);

// Crear o actualizar saldo de puntos para un usuario
exports.upsert = async (req, res) => {
  try {
    const { id_usuario, puntos_totales } = req.body;
    const [saldo, created] = await SaldoPuntos.upsert({
      id_usuario,
      puntos_totales,
      ultima_actualizacion: new Date()
    });
    res.status(created ? 201 : 200).json(saldo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener saldo de puntos de todos los usuarios
exports.findAll = async (req, res) => {
  try {
    const saldos = await SaldoPuntos.findAll();
    res.json(saldos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener saldo de puntos por id_usuario
exports.findOne = async (req, res) => {
  try {
    const saldo = await SaldoPuntos.findByPk(req.params.id_usuario);
    if (!saldo) return res.status(404).json({ error: 'No encontrado' });
    res.json(saldo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar saldo de puntos por id_usuario
exports.update = async (req, res) => {
  try {
    const [updated] = await SaldoPuntos.update(req.body, { where: { id_usuario: req.params.id_usuario } });
    if (!updated) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar saldo de puntos por id_usuario
exports.delete = async (req, res) => {
  try {
    const deleted = await SaldoPuntos.destroy({ where: { id_usuario: req.params.id_usuario } });
    if (!deleted) return res.status(404).json({ error: 'No encontrado' });
    res.json({ message: 'Eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
