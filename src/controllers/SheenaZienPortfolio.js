import database from "./../../config/database"
import moment from "moment"

const SheenaZienPortfolio = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  create(req, res) {
    let post = {
      title: req.body.title,
      slug: req.body.title.replace(/ /g, "-"),
      body: req.body.body,
      link: req.body.link,
      date: moment().format("YYYY-MM-DD"),
      status: false,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
      user_id: req.session.user.id
    }
    let query = database.mysql().query("INSERT INTO portfolios SET ?", post, (error, results, fields) => {
      if (error) throw error
      return res.redirect('/sheenazienadmin/portfolio')
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflections array
   */
  index(req, res) {
    database.mysql().query("SELECT * FROM portfolios", (error, results, fields) => {
      return res.render('sheenazienadmin/portfolio/index', {
        title: 'Admin Portfolio',
        portfolios: results
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
    database.mysql().query("SELECT * FROM portfolios where id = ?", [req.params.id],
      (error, results, fields) => {
        return res.send({
          portfolio: results[0]
        })
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated reflection
   */
  update(req, res) {
    let post = {
      title: req.body.title,
      slug: req.body.title.replace(/ /g, "-"),
      body: req.body.body,
      link: req.body.link,
      date: moment().format("YYYY-MM-DD"),
      status: false,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
      user_id: req.session.user.id
    }
    let query = database.mysql().query(`UPDATE portfolios SET ? where id = ${req.params.id}`, post,
      (error, results, fields) => {
      if (error) throw error
      return res.status(200).send('SUCCESS')
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  delete(req, res) {
    database.mysql().query('DELETE FROM portfolios WHERE id = ?', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send('SUCCESS')
    })
  }
}

export default SheenaZienPortfolio;
