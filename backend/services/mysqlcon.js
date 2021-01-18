const mysql = require( 'mysql' );

class Database {
	constructor() {
		this.pool = mysql.createPool({
			host			: process.env.DATABASE_HOST,
			user			: process.env.MYSQL_USER,
			password		: process.env.MYSQL_PASSWORD,
			database		: process.env.MYSQL_DATABASE,
			connectionLimit	: 10
		})
	}
	query( sql, args ) {
		return new Promise( ( resolve, reject ) => {
			this.pool.query( sql, args, ( err, rows ) => {
				if ( err )
					return reject( err );
				resolve( rows );
			} );
		} );
	}
	close() {
		return new Promise( ( resolve, reject ) => {
			this.pool.end( err => {
				if ( err )
					return reject( err );
				resolve();
			} );
		} );
	}
}

module.exports = Database;
