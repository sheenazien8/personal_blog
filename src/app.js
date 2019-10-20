// app.js
import express from 'express'
import dotenv from "dotenv"
const app = express()
import routes from "./routes"
import config from "./../config"
import path from "path"

dotenv.config()
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "views"))
app.use(express.json())

routes.init(app)
const port = process.env.APP_PORT ? process.env.APP_PORT : 3000
app.listen(port)
console.log('app running on port ', port)
