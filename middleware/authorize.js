const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (role = '') => {
    return (req, res, next) => {
		const token = req.header('x-auth-token');

		if (!token) {
			return res.status(401).json({ msg: 'No token; authorization denied.' })		
		}

		// verify token
		try {
			const decoded = jwt.verify(token, config.get('jwtSecret'));

			req.user = decoded.user;

			// check for role match
			if (role.length > 0 && req.user.role !== role) {
				return res.status(401).json({ msg: 'Authorization denied.' })
			}

			next();
		} catch (err) {
			return res.status(401).json({msg: 'Token is not valid.'});
		}
	}
}