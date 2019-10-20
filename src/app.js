// app.js
import express from 'express'
import dotenv from "dotenv";
const app = express()
import routes from "./routes"
import config from "./../config";

dotenv.config()
app.use(express.json())

routes.init(app)
const port = process.env.APP_PORT ? process.env.APP_PORT : 3000
app.listen(port)
console.log('app running on port ', port)
