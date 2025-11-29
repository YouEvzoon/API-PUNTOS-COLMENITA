const db = require("../config/db.config");
const CodigosPuntos = require("../models/codigos_puntos.model");
const PuntosJuego = require("../models/puntos_juego.model");

// Generar códigos únicos (admin)
exports.generarCodigos = async (req, res) => {
  try {
    const { cantidad } = req.body;
    const codigos = [];
    for (let i = 0; i < cantidad; i++) {
      const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
      await db.CodigosPuntos.create({ codigo });
      codigos.push(codigo);
    }
    res.json({ codigos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Validar y usar código (usuario)
exports.usarCodigo = async (req, res) => {
  try {
    const { codigo, id_usuario, nombre_juego, codigo_jugador } = req.body;
    const codigoObj = await db.CodigosPuntos.findOne({ where: { codigo } });
    if (!codigoObj || codigoObj.usado) {
      return res.status(400).json({ error: "Código inválido o ya usado" });
    }
    // Marcar como usado
    codigoObj.usado = true;
    codigoObj.id_usuario = id_usuario;
    codigoObj.fecha_uso = new Date();
    await codigoObj.save();
    // Asignar puntos aleatorios
    const puntos = Math.floor(Math.random() * 3) + 1;
    // Registrar en puntos_juego
    await db.PuntosJuego.create({
      id_usuario,
      nombre_juego,
      codigo_jugador,
      codigo_puntos: codigo,
      puntos_obtenidos: puntos
    });
    res.json({ puntos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
