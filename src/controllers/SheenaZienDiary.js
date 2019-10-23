import database from "./../../config/database"
import moment from "moment"

const SheenaZienDiary = {
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflection object
   */
  create(req, res) {
    let post = {
      title: req.body.title,
      slug: req.body.title.toLowerCase().replace(/ /g, "-"),
      body: req.body.body,
      date: moment().format("YYYY-MM-DD"),
      status: false,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
      user_id: req.session.user.id
    }
    let query = database.mysql().query("INSERT INTO diaries SET ?", post, (error, results, fields) => {
      if (error) throw error
      return res.redirect('/sheenazienadmin/diary')
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} reflections array
   */
  index(req, res) {
    database.mysql().query("SELECT * FROM diaries", (error, results, fields) => {
      return res.render('sheenazienadmin/diary/index', {
        title: 'Admin Portfolio',
        diaries: results
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
    database.mysql().query("SELECT * FROM diaries where id = ?", [req.params.id],
      (error, results, fields) => {
        return res.send({
          diary: results[0]
        })
    })
  },
  /**
   *
   * @param {object} req
   * @param {object} res
   * @returns {object} updated reflection
   */
  updateStatus(req, res) {
    let post = {
      status: req.body.status == 'true' ? 1 : 0,
    }
    let query = database.mysql().query(`UPDATE diaries SET ? where id = ${req.params.id}`, post,
      (error, results, fields) => {
      if (error) throw error
      return res.status(200).send('SUCCESS')
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
      date: moment().format("YYYY-MM-DD"),
      status: false,
      meta_keyword: req.body.meta_keyword,
      meta_description: req.body.meta_description,
      user_id: req.session.user.id
    }
    let query = database.mysql().query(`UPDATE diaries SET ? where id = ${req.params.id}`, post,
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
    database.mysql().query('DELETE FROM diaries WHERE id = ?', [req.params.id], function (error, results, fields) {
      if (error) throw error;
      return res.status(200).send('SUCCESS')
    })
  }
}

export default SheenaZienDiary;
