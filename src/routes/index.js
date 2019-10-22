import reflection from "./reflection";
import sheenazienadmin from "./sheenazienadmin";
import express from 'express';
const app = express()
const router = express.Router()
import database from "./../../config/database"
import moment from "moment"

const init = (server) => {
  server.get('*', (req, res, next) => {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  })

  server.get('/', (req, res, next) =>{
    database.mysql().query("SELECT * FROM blogs where `status` = true", (error, results, fields) => {
      return res.render('index', {
        currentUrl: req.route.path,
        title: 'My Personal Blog',
        diaries: [
          {
            title: 'Error MySQL di awal install Ubuntu'
          },
          {
            title: 'Valet Not Found Ketika nyobain valet di linux'
          }
        ],
        blogs: results
      })
    })
  })

  server.get('/blog', (req, res, next) => {
    database.mysql().query("SELECT * FROM blogs where `status` = true", (error, results, fields) => {
      return res.render('blog/index', {
        currentUrl: req.route.path,
        title: 'List Blog',
        blogs: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })

  server.get('/blog/detail/:slug', (req, res, next) => {
    database.mysql().query("SELECT * FROM blogs where `slug` = ?",
      [req.params.slug], (error, results, fields) => {
      return res.render('blog/detail', {
        currentUrl: req.route.path,
        title: 'Detail',
        blog: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })

  server.get('/portfolio', (req, res, next) => {
    return res.render('portfolio/index', {
      currentUrl: req.route.path,
      title: 'List Portfolio',
      blogs: [
        {
          title: 'Mudahnya Menjadi Pekerja Yang Sering Bersyukur'
        },
        {
          title: 'Jangan Malu Jadi Karyawan'
        },
        {
          title: 'Jadilah Pekerja Yang Sadar Akan Kemampuan'
        },
        {
          title: 'Skill Lebih Utama'
        },
        {
          title: 'Permainan Ini Belum Selesai'
        }
      ]
    })
  })

  server.get('/portfolio/detail', (req, res, next) => {
    return res.render('portfolio/detail', {
      currentUrl: req.route.path,
      title: 'Detail'
    })
  })

  server.use('/reflection', reflection)
  server.use('/sheenazienadmin', sheenazienadmin)
}

export default {init}
