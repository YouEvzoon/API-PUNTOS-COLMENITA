module.exports = (sequelize, Sequelize) => {
  return sequelize.define('solicitud_recompensa', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    id_usuario: { type: Sequelize.INTEGER, allowNull: false },
    nombre_juego: { type: Sequelize.STRING, allowNull: false },
    tipo_recompensa: { type: Sequelize.ENUM('diamante', 'oro', 'cps'), allowNull: false },
    estado: { type: Sequelize.ENUM('pendiente', 'aprobada', 'rechazada'), defaultValue: 'pendiente' },
    fecha_solicitud: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }, {
    tableName: 'solicitud_recompensa',
    timestamps: false
  });
};
