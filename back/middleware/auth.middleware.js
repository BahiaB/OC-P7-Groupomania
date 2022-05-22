const jwt = require('jsonwebtoken');

module.exports= (req, res, next) => {
	//console.log(req.headers.authorization);
	try {
		const token = req.headers.authorization.split(' ')[1];
		//console.log("ici2")
		const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
		const userId = decodedToken.userId;
		req.auth = {userId};
		
		console.log("Token decoder", decodedToken);
		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID';
		} else {
			console.log('ici')
			next();
		}
	} catch {
		res.status(401).json({
			error: new Error('Invalid request!')
		});
	}
};