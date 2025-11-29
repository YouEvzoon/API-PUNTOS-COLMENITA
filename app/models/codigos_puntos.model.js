module.exports = (sequelize, Sequelize) => {
  const CodigosPuntos = sequelize.define('codigos_puntos', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    codigo: {
      type: Sequelize.STRING(50),
      unique: true,
      allowNull: false
    },
    usado: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    id_usuario: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    fecha_uso: {
      type: Sequelize.DATE,
      allowNull: true
    }
  }, {
    tableName: 'codigos_puntos',
    timestamps: false
  });

  return CodigosPuntos;
};
