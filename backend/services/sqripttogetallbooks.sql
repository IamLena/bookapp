select distinct ratings.rating, id, title, annotation, author, theme, user_id, favorite, status_id, user_rating
from (select book_id, AVG(rating) as rating
from userbookinfo
where rating != 0
group by book_id) as ratings
right join
(select authors_themes_books.id, title, annotation, author, theme, user_id, favorite, status_id, rating as user_rating
from
(select *
from userbookinfo
where user_id = ?) as curentuserbookinfo
right join
(select themes_books.id, title, annotation, authors.name as author, theme
from authors
inner join
(select books.id, title, annotation, author_id, themes.name as theme
from themes
inner join books
on themes.id = books.theme_id) as themes_books
on authors.id = themes_books.author_id) as authors_themes_books
on curentuserbookinfo.book_id = authors_themes_books.id) as authors_themes_books_users
on ratings.book_id = authors_themes_books_users.id
