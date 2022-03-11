import adminController from '../controllers/admin.js'
import token from '../middlewares/token.js'
import val from '../middlewares/validation.js'
import { Router } from "express"

const router = Router()

router.post('/login', adminController.AUTH)
    .post('/addservmaser',token, val.servicmaster, adminController.ADDSER)
    .post('/addsparepart',token, val.spareparts, adminController.SPARE)
    .post('/addservice',token, val.spareparts, adminController.SERVICE)
    .post('/settings',token, val.settings, adminController.SET)
    .put('/put/master',token, adminController.PUTSERVER)
    .put('/put/spare',token, adminController.PUTSPARE)
    .put('/put/master',token, adminController.PUTSER)
    .delete('/delete', token, adminController.DELETE)

export default router