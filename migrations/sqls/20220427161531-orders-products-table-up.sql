CREATE TABLE orders_products (
  order_id integer NOT NULL,
  product_id integer NOT NULL,
  quantity integer NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);