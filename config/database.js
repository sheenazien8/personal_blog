import dotenv from "dotenv"
import mysql from "mysql"
import Sequelize from "sequelize"
dotenv.config()
const connection = {
  // connection to mysql library
  mysql(){
    let connection = mysql.createConnection({
      host     : process.env.DB_HOST,
      user     : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_DATABASE,
      multipleStatements: true
    })
    // mysql.createConnection({multipleStatements: true})
    connection.connect(function(err) {
      if (err) {
        console.error('error connecting: ' + err.stack)
        return
      }

      console.log('connected as id ' + connection.threadId)
    })

    return connection
  },
  // connection to sequelize
  sequelize(){
    const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: process.env.DB_CONNECTION,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    })

    sequelize.authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
  }
}

export default connection
