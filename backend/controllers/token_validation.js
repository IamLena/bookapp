const {verify} = require("jsonwebtoken");

module.exports = {
	checkToken: (req, res, next) => {
		let token = req.get("authorization");
		if (token) {
			token = token.slice(7); // 'Bearer <token>'
			verify(token, process.env.JWTKEY, (err, decoded) => {
				if (err)
				{
					return res.json({
						success: 0,
						message: "invalid token"
					});
				}
				else {
					next();
				}
			})
		}
		else {
			res.json({
				success: 0,
				message: "access denied! unauthorized user"
			})
		}
	}
}
