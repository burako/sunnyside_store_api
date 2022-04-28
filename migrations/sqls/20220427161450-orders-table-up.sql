CREATE TABLE orders (
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  order_status text NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);