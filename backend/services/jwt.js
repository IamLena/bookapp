const {verify, sign} = require("jsonwebtoken");

module.exports = {
	getToken: (userid) => {
		return sign({userid: userid}, process.env.JWTKEY, {
			expiresIn: 360
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
					req.session.user_id = undefined;
					next();
				}
			})
		}
		else {
			res.status(403).json({msg: "unauthorized user"});
		}
	}
}
