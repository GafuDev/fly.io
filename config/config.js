require('dotenv').config();


module.exports = {
  port: process.env.PORT || 3000,
  dbConfig: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root', //'cgr93262_usuario',
    password: process.env.DB_PASSWORD || '',//'BgkSBKQJDhNPbvCrzOBW', //'', nqK_L@omRPe&
    database: process.env.DB_NAME || 'bdgriinvest' //'cgr93262_bdprueba2'
  }
};