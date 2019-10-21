import path from "path"
import express from 'express'
import dd from 'dump-die'
const app = express()
require('express-dynamic-helpers-patch')(app)
const router = express.Router()
app.dynamicHelpers({
    session: function (req, res) {
        return req.session
    }
})

