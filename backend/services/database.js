const Database = require('./mysqlcon');

module.exports = {
	async generateUuid() {
		const db = new Database();
		let uuid;
		try {
			const idresults = await db.query("SELECT uuid() as id");
			uuid = idresults[0].id;
			await db.close();
			return uuid;
		}
		catch(err) {
			await db.close();
			throw err;
		}
	}
};
