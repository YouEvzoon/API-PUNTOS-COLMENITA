const env = {
  database: 'puntos',
  username: 'puntos_user',
  password: '341Lg7ehXlU3HrwouLJpkeU7UT2psX32',
  host: 'dpg-d4lia0je5dus73fqi7mg-a',   // host de Render
  port: 5432,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;
