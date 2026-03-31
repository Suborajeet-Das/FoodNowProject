DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS food_orders CASCADE;
DROP TABLE IF EXISTS item CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS canteen CASCADE;

CREATE TABLE canteen (
    id BIGSERIAL PRIMARY KEY, 
    name VARCHAR(255), 
    location VARCHAR(255)
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY, 
    email VARCHAR(255) NOT NULL UNIQUE, 
    password VARCHAR(255) NOT NULL, 
    full_name VARCHAR(255) NOT NULL, 
    role VARCHAR(50) NOT NULL, 
    canteen_id BIGINT REFERENCES canteen(id)
);

CREATE TABLE item (
    id BIGSERIAL PRIMARY KEY, 
    name VARCHAR(255) NOT NULL, 
    description VARCHAR(255), 
    price DECIMAL(10,2) NOT NULL, 
    image_url VARCHAR(255), 
    quantity_available INTEGER NOT NULL, 
    is_active BOOLEAN, 
    canteen_id BIGINT NOT NULL REFERENCES canteen(id)
);

CREATE TABLE food_orders (
    id BIGSERIAL PRIMARY KEY, 
    status VARCHAR(50) NOT NULL, 
    total_price DECIMAL(10,2) NOT NULL, 
    created_at TIMESTAMP NOT NULL, 
    user_id BIGINT NOT NULL REFERENCES users(id), 
    canteen_id BIGINT NOT NULL REFERENCES canteen(id)
);

CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY, 
    quantity INTEGER NOT NULL, 
    unit_price DECIMAL(10,2) NOT NULL, 
    item_id BIGINT NOT NULL REFERENCES item(id), 
    order_id BIGINT NOT NULL REFERENCES food_orders(id)
);
