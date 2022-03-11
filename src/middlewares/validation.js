import ClientError from '../utils/error.js'
import Joi from 'joi'

const set = Joi.object({
    email: Joi.string().pattern(new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)),
    phone_number: Joi.number().required(),
    adress_link: Joi.string().max(300),
    instagram: Joi.string().max(200),
    telegram: Joi.string().max(100),
    facebook: Joi.string().max(200),
    adress: Joi.string().max(300),
    info: Joi.string().max(300)
}) 

const servic = Joi.object({
    phone_number: Joi.number().required(),
    service_id: Joi.number().integer().required(),
    info: Joi.string().max(200).required()
}) 

const spare = Joi.object({
    phone_number: Joi.number().required(),
    sparepart_name: Joi.string().max(100).required(),
    service_id: Joi.number().integer().required(),
    info: Joi.string().max(1000).required()
}) 

const service = Joi.object({
    service: Joi.string().max(100).required(),
    info: Joi.string().max(100).required()
})


const settings = (req, res, next) => {
    try{
        const { value, error } = set.validate(req.body)

        if (error) throw new ClientError(400, error.message) 

        let { imgUrl } = req.files
            if( !(['image/jpg', 'image/jpeg', 'image/png','image/svg'].includes(imgUrl.mimetype))) {
                throw new ClientError(400, 'Image mimetype must be jgp, svg or png!') 
            }
        return next()
    }catch(err){
        return next(err)
    }
}

const servicmaster = (req, res, next) => {
    try{
        const { value, error } = servic.validate(req.body)

        if (error) throw new ClientError(400, error.message) 

        let { imgUrl } = req.files
            if( !(['image/jpg', 'image/jpeg', 'image/png','image/svg'].includes(imgUrl.mimetype))) {
                throw new Error('Image mimetype must be jgp, svg or png!')
            }
        return next()
    }catch(err){
        return next(err)
    }
}

const services = (req, res, next) => {
    try{
        const { value, error } = service.validate(req.body)

        if (error) throw new ClientError(400, error.message) 

        let { imgUrl } = req.files
            if( !(['image/jpg', 'image/jpeg', 'image/png','image/svg'].includes(imgUrl.mimetype))) {
                throw new ClientError(400, 'Image mimetype must be jgp, svg or png!') 
            }
        return next()
    }catch(err){
        return next(err)
    }
}

const spareparts = (req, res, next) => {
    try{
        const { value, error } = spare.validate(req.body)

        if (error)  throw new ClientError(400, error.message) 

        let { imgUrl } = req.files
            if( !(['image/jpg', 'image/jpeg', 'image/png','image/svg'].includes(imgUrl.mimetype))) {
                throw new ClientError(400, 'Image mimetype must be jgp, svg or png!')
            }
        return next()
    }catch(err){
        return next(err)
    }
}

export default {
    servicmaster,
    spareparts,
    settings,
    services
    
}