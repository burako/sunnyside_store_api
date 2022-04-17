CREATE TABLE users (
  id serial PRIMARY KEY,
  username varchar(255) NOT NULL,
  password_digest varchar(255) NOT NULL
);