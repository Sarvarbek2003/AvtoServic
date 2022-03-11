import masterController from '../controllers/master.js'
import { Router } from "express"

const router = Router()

router.get('/',masterController.SPAR)
    .get('/:sparepartId',masterController.SPAR)

export default router