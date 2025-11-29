const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions:{
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle,
  }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Usuario = require('../models/usuarios.model.js')(sequelize, Sequelize);
db.PuntosJuego = require('../models/puntos_juego.model.js')(sequelize, Sequelize);
db.SaldoPuntos = require('../models/saldo_puntos.model.js')(sequelize, Sequelize);
db.CodigosPuntos = require('../models/codigos_puntos.model.js')(sequelize, Sequelize);
db.SolicitudRecompensa = require('../models/solicitud_recompensa.model.js')(sequelize, Sequelize);
// Relación opcional: un código puede ser usado por un usuario (usado_por)
//db.CodigoPuntos.belongsTo(db.Usuario, { foreignKey: 'usado_por', as: 'usuarioUsador' });

// Relaciones
db.Usuario.hasMany(db.PuntosJuego, { foreignKey: 'id_usuario' });
db.PuntosJuego.belongsTo(db.Usuario, { foreignKey: 'id_usuario' });

db.Usuario.hasOne(db.SaldoPuntos, { foreignKey: 'id_usuario' });
db.SaldoPuntos.belongsTo(db.Usuario, { foreignKey: 'id_usuario' });

module.exports = db;
