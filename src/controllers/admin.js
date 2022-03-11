import ClientError from '../utils/error.js'
import data from '../middlewares/postgres.js'
import path from 'path'
import  jwt  from 'jsonwebtoken'
let d = new Date()

const AUTH = async(req, res, next) => {
    try{   
        const { username, password } = req.body
        if(!username) throw new ClientError(400, 'Username is require')
        if(!password ) throw new ClientError(400, 'Passwort is require')

        let response = await data(req, res,`
            select 
                * 
            from admins as ad
            where ad.admin_login = $1 and ad.password = crypt($2, ad.password)
        `,username,password)

        if(!response) throw new ClientError(400,'Wrong username or password')
        let token = jwt.sign({ adminId: response.admin_id, username:response.username }, 'avtoservise',{ expiresIn: '5h' });

        res.status(200)
            .json({
                status: 200, 
                message: 'OK',
                token: token
            })

    }catch(err){
        return next(err)
    }
}

const SERVICE = async(req, res, next) => {
    try{
        const { imgUrl } = req.files
        const { service, info } = req.body

        const imgname = d.getTime() + imgUrl.name.replace(/\s/g, '')

        let ok = await data(req, res,`
            insert into services (service, info, photo) values
            ($1,$2,$3) 
            returning *
        `,service, info,'/service/'+imgname)

        if(ok) imgUrl.mv( path.join(process.cwd(), 'files', 'service', imgname))

        res.status(200)
            .json({
                status: 200, 
                message: 'Added',
                data: ok
            })
    }catch(err){
        return next(err)
    }
}

const ADDSER = async(req, res, next) => {
    try {
        const { imgUrl } = req.files
        const { service_id, info, phone_number } = req.body

        const imgname = d.getTime() + imgUrl.name.replace(/\s/g, '')
		

        let ok = await data(req, res,`
            insert into servicewizard (service_id, info, phone_number, photo) values
            ($1,$2,$3,$4) 
            returning *
        `,service_id, info, phone_number,'/servicewizard/'+imgname)

        if(ok) imgUrl.mv( path.join(process.cwd(), 'files', 'servicewizard', imgname))

        res.status(200)
            .json({
                status: 200, 
                message: 'Added',
                data: ok
            })
    }catch(err){
        return next(err)
    }
}

const SPARE = async(req, res, next) => {
    try {
        const { imgUrl } = req.files
        const { service_id, sparepart_name, info, phone_number  } = req.body

        const imgname = d.getTime() + imgUrl.name.replace(/\s/g, '')
        
        let ok = await data(req, res,`
            insert into spareparts (service_id, sparepart_name, info, phone_number, photo) values
            ($1,$2,$3,$4,$5) 
            returning *
        `,service_id, sparepart_name, info, phone_number,'/spareparts/'+imgname)

        if (ok) imgUrl.mv( path.join(process.cwd(), 'files', 'spareparts', imgname))

        res.status(200)
            .json({
                status: 200, 
                message: 'Added',
                data: ok
            })
    }catch(err){
        return next(err)
    }
}

const SET = async(req, res, next) => {
    try {
        const { email, phone_number, adress, adress_link, info, telegram, instagram, facebook } = req.body

        await data(req, res,`
            delete from spareparts 
        `)
        await data(req, res,`
            insert into spareparts (email, phone_number, adress, adress_link, info, telegram, instagram, facebook) values
            ($1,$2,$3,$4,$5,$6,$7,$8) 
            returning *
        `,email, phone_number, adress, adress_link, info, telegram, instagram, facebook)

        res.status(200)
            .json({
                status: 200, 
                message: 'Added'
            })
    }catch(err){
        return next(err)
    }
}

const PUTSER = async(req, res, next) => {
    try{
        const { imgUrl } = req.files || { imgUrl: false }
        const { user_id, service_id, info, phone_number } = req.body

        let imgname
        if(imgUrl) imgname = '/servicewizard/'+d.getTime() + imgUrl.name.replace(/\s/g, '')
		
        let ok = await data(req, res,`
            update servicewizard s set
                service_id = (
                    case
                        when length($1) > 0 then $1::smallint else s.service_id
                    end
                ),
                info = (
                    case
                        when length($2) > 0 then $2 else s.info
                    end
                ),
                phone_number = (
                    case
                        when length($3) > 0 then $3::bigint else s.phone_number
                    end
                ),
                photo = (
                    case
                        when length($4) > 0 then $4 else s.photo
                    end
                )
            where user_id = $5
            returning *
        `,service_id, info, phone_number, imgname, user_id)

        if(ok && imgUrl) imgUrl.mv( path.join(process.cwd(), 'files', 'servicewizard', imgname))

        res.status(200)
            .json({
                status: 200, 
                message: 'Updated',
                data: ok
            })
    }catch(err){
        return next(err)
    }
}

const PUTSPARE = async(req,res,next) => {
    try{
        const { imgUrl } = req.files || { imgUrl: false }
        const {sparepart_id, sparepart_name, service_id, info, phone_number } = req.body

        let imgname
        if(imgUrl) imgname = '/spareparts/'+d.getTime() + imgUrl.name.replace(/\s/g, '')
		
        let ok = await data(req, res,`
            update spareparts s set
                service_id = (
                    case
                        when length($1) > 0 then $1::smallint else s.service_id
                    end
                ),
                info = (
                    case
                        when length($2) > 0 then $2 else s.info
                    end
                ),
                phone_number = (
                    case
                        when length($3) > 0 then $3::bigint else s.phone_number
                    end
                ),
                photo = (
                    case
                        when length($4) > 0 then $4 else s.photo
                    end
                ),
                sparepart_name = (
                    case
                        when length($5) > 0 then $5 else s.sparepart_name
                    end
                )
            where sparepart_id = $6
            returning *
        `,service_id, info, phone_number, imgname, sparepart_name,sparepart_id)

        if(ok && imgUrl) imgUrl.mv( path.join(process.cwd(), 'files', 'spareparts', imgname))

        res.status(200)
            .json({
                status: 200, 
                message: 'Updated',
                data: ok
            })
    }catch(err){
        return next(err)
    }
}

const PUTSERVER = async(req,res,next) => {
    try{
        const { imgUrl } = req.files || { imgUrl: false }
        const { service_id, service, info } = req.body

        let imgname
        if(imgUrl) imgname = '/service/'+d.getTime() + imgUrl.name.replace(/\s/g, '')
		
        let ok = await data(req, res,`
            update services s set
                service = (
                    case
                        when length($1) > 0 then $1::smallint else s.service
                    end
                ),
                info = (
                    case
                        when length($2) > 0 then $2 else s.info
                    end
                ),
                photo = (
                    case
                        when length($3) > 0 then $3 else s.photo
                    end
                )
            where service_id = $4
            returning *
        `, service, info, imgname, service_id)

        if(ok && imgUrl) imgUrl.mv( path.join(process.cwd(), 'files', 'service', imgname))

        res.status(200)
            .json({
                status: 200, 
                message: 'Updated',
                data: ok
            })
    }catch(err){
        return next(err)
    }
}

const DELETE = async(req,res,next) => {
    try {
        let ok = null
        const { serviceId, sparepartId, userId } = req.query
        if (sparepartId) ok = await data(req,res,'delete from spareparts where sparepart_id = $1 returning *',sparepartId)
        if (serviceId) ok = await data(req,res,'delete from services where service_id = $1 returning *',serviceId)
        if (userId) ok = await data(req,res,'delete from servicewizard where user_id = $1 returning *',userId)
        
        res.status(200)
            .json({
                status: 200, 
                message: 'Deleted',
                data: ok
            })

    }catch(err){
        next(err)
    }
}

export default {
    PUTSERVER,
    PUTSPARE,
    SERVICE,
    ADDSER,
    DELETE,
    PUTSER,
    SPARE,
    AUTH,
    SET
}