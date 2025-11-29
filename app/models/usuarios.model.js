module.exports = (sequelize, Sequelize) => {
  const Usuario = sequelize.define('usuarios', {
    id_usuario: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    correo: {
      type: Sequelize.STRING(150),
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    telefono: {
      type: Sequelize.STRING(20),
      allowNull: true
    },
    fecha_registro: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    estado: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    tableName: 'usuarios',
    timestamps: false
  });
  return Usuario;
}
