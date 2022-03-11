import ClientError  from '../utils/error.js'
import data from '../middlewares/postgres.js'

const MASTER = async(req, res, next) => {
    try{    
        
        let { userId } = req.params
        if(userId && isNaN(userId)) throw new ClientError(401, "Invalid params")

        let response = await data(req, res,`
            select 
                s.service_id,
                se.info,
                se.phone_number,
                se.photo,
                json_agg(sp.sparepart_id) as spareparts
            from services as s
            left join servicewizard as se on se.service_id = s.service_id
            left join spareparts as  sp on sp.service_id = s.service_id
            where
                case
                    when $1 > 0 then user_id = $1
                    else true
                end
            group by s.service_id,se.info,se.phone_number,se.photo
        `,userId)

        res.send(response)
    }catch(err){
        next(err)
    }
}

const SPAR = async(req, res, next) => {
    try{

        let { sparepartId } = req.params
        if(sparepartId && isNaN(sparepartId)) throw new ClientError(401,"Invalid params")

        let response = await data(req, res,`
            select 
                * 
            from spareparts
            where
                case
                    when $1 > 0 then sparepart_id = $1
                    else true
                end
        `,sparepartId)

        res.send(response)
    }catch(err){
        next(err)
    }
}

export default {
    MASTER,
    SPAR
}