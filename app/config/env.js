

const env = {
  database: 'postgres',
  username: 'postgres',
  password: 'Mago1996',
  host: 'db.nfeeykysrdlcbzyxycmr.supabase.co',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

module.exports = env;