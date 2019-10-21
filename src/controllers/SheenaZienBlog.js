import database from "./../../config/database"

const SheenaZienBlog = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  create(req, res) {
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflections array
   */
  index(req, res) {
    database.mysql().query("SELECT * FROM blogs", (error, results, fields) => {
      console.log(results)
      return res.render('sheenazienadmin/blog/index', {
        title: 'Admin Blog',
        blogs: results
      })
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  detail(req, res) {
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated reflection
   */
  update(req, res) {
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  delete(req, res) {
  }
}

export default SheenaZienBlog;
