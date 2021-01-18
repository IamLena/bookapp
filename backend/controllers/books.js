const bcrypt  = require('bcryptjs')
const {getToken} = require("../services/jwt");
const {generateUuid} =  require('../services/database');
const {createBook} = require('../services/books');

exports.post = async (req, res) => {
	let {title, theme, author, annotation} = req.body;
	if (!title || !author || !theme || !annotation)
		res.status(400).json({msg: "provide title, theme, author, annotation"});
	else
	{
		try {
			let author_uuid;
			const authorobject = await getAuthorByName(author);
			const themeobject = await getThemeByName(theme);
			if (!authorobject)
			{
				author_uuid = await generateUuid();
				await creteAuthor(author_uuid, author);
			}
			else
				author_uuid = authorobject.id;
			let theme_uuid;
			if (!themeobject)
			{
				theme_uuid = await generateUuid();
				await creteTheme(theme_uuid, theme);
			}
			else
				theme_uuid = themeobject.id;
			const uuid = await generateUuid();
			await createBook(uuid, title, theme_uuid, author_uuid, annotation);
		}
		catch(err) {
			console.log(err)
			res.status(500).send(err)
		}
	}
};
