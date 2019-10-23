import sheenazienadmin from "./sheenazienadmin";
import express from 'express';
const app = express()
const router = express.Router()
import database from "./../../config/database"
import moment from "moment"
import dotenv from "dotenv"
dotenv.config()

const init = (server) => {
  server.get('*', (req, res, next) => {
    console.log('Request was made to: ' + req.originalUrl);
    return next();
  })

  server.get('/', (req, res, next) =>{
    database.mysql().query(
      "SELECT * FROM blogs where `status` = true LIMIT 10; " +
      "SELECT * FROM portfolios where `status` = true LIMIT 10;" +
      "SELECT * FROM diaries where `status` = true LIMIT 10;",
      (error, results, fields) => {
      if (error) throw error
      return res.render('index', {
        currentUrl: process.env.APP_URL + req.route.path,
        title: "My Personal Blog",
        meta_description: "",
        meta_keyword: "",
        blogs: results[0],
        portfolios: results[1],
        diaries: results[2]
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
        currentUrl: process.env.APP_URL + req.route.path,
        title: results[0].title,
        meta_description: results[0].meta_description,
        meta_keyword: results[0].meta_keyword,
        blog: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })

  server.get('/portfolio', (req, res, next) => {
    database.mysql().query("SELECT * FROM portfolios", (error, results, fields) => {
      return res.render('portfolio/index', {
        currentUrl: req.route.path,
        title: 'Detail',
        portfolios: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })

  server.get('/portfolio/detail/:slug', (req, res, next) => {
    database.mysql().query("SELECT * FROM portfolios where `slug` = ?",
      [req.params.slug], (error, results, fields) => {
      return res.render('portfolio/detail', {
        currentUrl: process.env.APP_URL + req.route.path,
        title: results[0].title,
        meta_description: results[0].meta_description,
        meta_keyword: results[0].meta_keyword,
        portfolio: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })
  server.get('/diary', (req, res, next) => {
    database.mysql().query("SELECT * FROM diaries", (error, results, fields) => {
      return res.render('diary/index', {
        currentUrl: req.route.path,
        title: 'Detail',
        diaries: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })

  server.get('/diary/detail/:slug', (req, res, next) => {
    database.mysql().query("SELECT * FROM diaries where `slug` = ?",
      [req.params.slug], (error, results, fields) => {
      return res.render('diary/detail', {
        currentUrl: process.env.APP_URL + req.route.path,
        title: results[0].title,
        meta_description: results[0].meta_description,
        meta_keyword: results[0].meta_keyword,
        diary: results,
        moment: (date) =>{
          return moment(String(date)).format('YYYY-MM-DD');
        }
      })
    })
  })

  server.use('/sheenazienadmin', sheenazienadmin)
}

export default {init}
