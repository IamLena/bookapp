const Database = require('./mysqlcon');

module.exports = {
	async getThemes() {
		const db = new Database();
		try {
			sql = `SELECT * FROM themes`;
			const themes = await db.query(sql);
			await db.close();
			return themes;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getThemeById(id) {
		const db = new Database();
		try {
			sql = `SELECT * FROM themes WHERE id = '${id}'`;
			const themes = await db.query(sql);
			let theme = undefined;
			if (themes.length > 0)
				theme = themes[0];
			await db.close();
			return theme;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getThemeByName(name) {
		const db = new Database();
		try {
			sql = `SELECT * FROM themes WHERE name = '${name}'`;
			const themes = await db.query(sql);
			let theme = undefined;
			if (themes.length > 0)
				theme = themes[0];
			await db.close();
			return theme;

		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async getThemeByNameLike(substr) {
		const db = new Database();
		try {
			sql = `SELECT * FROM Themes WHERE name like '${substr}'`;
			const themes = await db.query(sql);
			await db.close();
			return themes;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	},
	async createTheme(id, name) {
		const db = new Database();
		try {
			await db.query("INSERT into themes SET ?", {
				id : id,
				name : name
			});
		}
		catch(err) {
			throw err;
		}
		finally{
			await db.close();
		}
	}
}
