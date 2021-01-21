const {verify, sign, decode} = require("jsonwebtoken");

module.exports = {
	getToken: (userid) => {
		return sign({userid: userid}, process.env.JWTKEY, {
			expiresIn: "1h"
		});
	},
	checkToken: (req, res, next) => {
		let token = req.get("authorization");
		if (token) {
			token = token.slice(7); // 'Bearer <token>'
			verify(token, process.env.JWTKEY, (err, decoded) => {
				if (err)
					res.status(403).json({msg: "expired token"});
				else {
					req.session.user_id = decoded.userid;
					next();
				}
			})
		}
		else {
			res.status(403).json({msg: "unauthorized user"});
		}
	},
	setUser: (req, res, next) => {
		let token = req.get("authorization");
		if (token) {
			token = token.slice(7); // 'Bearer <token>'
			verify(token, process.env.JWTKEY, (err, decoded) => {
				if (!err)
					req.session.user_id = decoded.userid;
			});
		}
		next();
	}
}
