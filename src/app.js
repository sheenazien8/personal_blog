// app.js
import express from 'express'
import dotenv from "dotenv"
const app = express()
import routes from "./routes"
import config from "./../config"
import path from "path"
import helper from "./helper"
import bodyParser from "body-parser"
import session from "express-session"
import cookieParser from "cookie-parser"

dotenv.config()
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "views"))
app.use(express.json())
app.set('trust proxy', 1) // trust first proxy
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
}))
routes.init(app)
const port = process.env.APP_PORT ? process.env.APP_PORT : 3000
app.listen(port)
console.log('app running on port ', port)
