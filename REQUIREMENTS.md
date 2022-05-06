# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : [GET] /products
- Show : [GET] /products/:id
- Create [token required] : [POST] /products
- [OPTIONAL] Top 5 most popular products : [GET] /products/popular
- [OPTIONAL] Products by category (args: product category) : [GET] /products/category/:category

#### Users
- Index [token required] : [GET] /users
- Show [token required] : [GET] /users/:id
- Create N[token required] [POST] /users

#### Orders
- Current Order by user (args: user id)[token required] : [GET] /orders/user/:id/open
- [OPTIONAL] Completed Orders by user (args: user id)[token required]  : [GET] /orders/user/:id/completed

## Data Shapes
#### Product
id serial PRIMARY KEY,
  name text NOT NULL,
  description text NOT NULL,
  price integer NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  category varchar(255)

#### Users
  id serial PRIMARY KEY,
  username varchar(255) NOT NULL,
  password_digest varchar(255) NOT NULL,
  first_name varchar(100),
  last_name varchar(100)

#### Orders
  id serial PRIMARY KEY,
  user_id integer NOT NULL,
  created_at timestamp with time zone NOT NULL,
  updated_at timestamp with time zone NOT NULL,
  order_status text NOT NULL, (open or closed)
  FOREIGN KEY (user_id) REFERENCES users (id)

#### orders_products
  order_id integer NOT NULL,
  product_id integer NOT NULL,
  quantity integer NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders (id),
  FOREIGN KEY (product_id) REFERENCES products (id)

