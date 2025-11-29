module.exports = (sequelize, Sequelize) => {
  const PuntosJuego = sequelize.define('puntos_juego', {
    id_puntos: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    nombre_juego: {
      type: Sequelize.ENUM('free_fire', 'blood_strike', 'cod_mobile', 'pubg_mobile'),
      allowNull: false
    },
    codigo_jugador: {
      type: Sequelize.STRING(100),
      allowNull: false // UID del jugador para la recarga
    },
    codigo_puntos: {
      type: Sequelize.STRING(50),
      allowNull: false // Código que el usuario ingresa para obtener puntos
    },
    puntos_obtenidos: {
      type: Sequelize.INTEGER,
      allowNull: false // Puntos aleatorios generados al usar el código
    },
    fecha_registro: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'puntos_juego',
    timestamps: false
  });

  return PuntosJuego;
};
