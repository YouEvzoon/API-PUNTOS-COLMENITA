module.exports = (sequelize, Sequelize) => {
  const SaldoPuntos = sequelize.define('saldo_puntos', {
    id_usuario: { type: Sequelize.INTEGER, primaryKey: true },
    puntos_totales: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
    ultima_actualizacion: { type: Sequelize.DATE, defaultValue: Sequelize.NOW }
  }, {
    tableName: 'saldo_puntos',
    timestamps: false
  });
  return SaldoPuntos;
};
