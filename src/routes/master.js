import masterController from '../controllers/master.js'
import { Router } from "express"

const router = Router()

router.get('/', masterController.MASTER)
    .get('/:userId', masterController.MASTER)

export default router