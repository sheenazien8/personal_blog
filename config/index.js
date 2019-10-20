import database from "./database"
switch (process.env.APP_DB_LIBRARY) {
  case 'mysql':
    database.mysql()
    break
  case 'sequelize':
    database.sequelize()
    break
  default:
    break
}
export default {
  database
}
