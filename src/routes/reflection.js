import Reflection from "./../controllers/Reflection"
import express from 'express';
const app = express()
const router = express.Router()

router.get('/', Reflection.index)
router.post('/', Reflection.create)
router.get('/:id', Reflection.detail)
router.put('/:id', Reflection.update)
router.delete('/:id', Reflection.delete)

export default router
