// import ReflectionModel from '../models/Blog';
import database from "./../../config/database"
import bcrypt from "bcrypt";

const SheenaZienAuth = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated reflection
   */
  login(req, res) {
    return res.render('sheenazienadmin/auth/login', {
      title: 'Login Page'
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async loginAction(req, res) {
    const query = database.mysql().query("SELECT * from `user` where `username` = ?",
      [req.body.username], (error, results, fields) => {
      if (results.length > 0) {
        let hash = results[0].password
        if (bcrypt.compareSync(req.body.password, hash)) {
          req.session.logedIn = true
          req.session.user = results[0]

          return res.redirect('/sheenazienadmin')
        }else {
          const errorMessage = req.session.errorMessage = [
            {message: 'Username or Password is not match'}
          ]
          return res.redirect('/sheenazienadmin/login')
        }
      }else {
        const errorMessage = req.session.errorMessage = [
          {message: 'Username Not Found'}
        ]
        return res.redirect('/sheenazienadmin/login')
      }
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  logout(req, res) {
  }
}

export default SheenaZienAuth;
