import reflection from "./reflection";
import express from 'express';
const app = express()
const router = express.Router()

const init = (server) => {
    server.get('*', (req, res, next) => {
        console.log('Request was made to: ' + req.originalUrl);
        return next();
    })

    server.get('/', (req, res, next) => {
        return res.status(200).send({'message': 'YAY! Congratulations! Your first endpoint is working'});
    })

    server.use('/reflection', reflection)
}

export default {init}
