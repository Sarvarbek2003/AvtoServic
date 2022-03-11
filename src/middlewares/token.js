import jwt from 'jsonwebtoken'

export default (req, res, next) => { 
	try {
		const { adminId, username } = jwt.verify(req.headers.token, 'avtoservise')

		req.adminId = adminId
        req.username = username

		return next()

	} catch(err) {
		return res.status(401).json({status: 401, message: 'Invalid token'})
	}
}