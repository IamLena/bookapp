class Author {
	constructor(id, firstname, lastname) {
		this.id = id;
		this.firstname = firstname;
		this.lastname = lastname;
	}
}

class Book {
	constructor(id, title, annotation, rating, theme, author) {
		this.id = id;
		this.title = title;
		this.annotation = annotation;
		this.rating = rating;
		this.theme = theme;
		this.author = author;
	}
};

class User {
	constructor(id, name, email, password, read, wanttoread) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.read = read;
		this.wanttoread = wanttoread;
	}
}

class Rating {
	constructor(book, user, rating) {
		this.book = book;
		this.user = user;
		this.rating = rating;
	}
}
