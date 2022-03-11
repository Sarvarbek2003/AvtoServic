import timeConverter from './utils/timeConverter.js'
import fileUpload from 'express-fileupload'
import express from 'express'
import cors from 'cors'
import path from 'path'
import fs from 'fs'

const PORT = process.env.PORT || 7000
const app = express()

import masterRout from './routes/master.js'
import spareRout from './routes/spare.js'
import adminRout from './routes/admin.js'

app.use(express.static(path.join(process.cwd(), 'files')))
app.use(express.json())
app.use(fileUpload())
app.use(cors())

app.use('/spareparts',spareRout)
app.use('/master',masterRout)

app.use('/admin',adminRout)

app.use((error, req, res, next) => {
	if([400, 401, 404, 413, 415].includes(error.status)) {
		return res.status(error.status).send(error)
	} 
    else {
        let { year, month, date, hour, minute } = timeConverter(new Date())
        fs.appendFileSync(
            path.join(process.cwd(), 'log.txt'),
            `${date+'/'+month+'/'+year+' | '+hour+':'+minute}  ${req.method}  ${req.url}  "${error.message}"\n`
        )
        res.status(500).json({status: 500, message: "Inernal server error"})
    }
})


app.listen(PORT, () => console.log('server is running http://localhost:'+PORT))