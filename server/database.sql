CREATE DATABASE teebay;

CREATE TABLE products(
    p_id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    categories VARCHAR(100),
    description TEXT,
    price VARCHAR(20),
    rent VARCHAR(20),
    rent_type VARCHAR(20),
    product_unique_id VARCHAR(50),
    created_by VARCHAR(50),
    views VARCHAR(50),
    created_date TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users(
    u_id SERIAL PRIMARY KEY,
    user_unique_id VARCHAR(50),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    address TEXT,
    email VARCHAR(100),
    phone VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE buy (
    b_id SERIAL PRIMARY KEY,
    buyer_id VARCHAR(50),
    product_unique_id VARCHAR(50)
);

CREATE TABLE sell (
    s_id SERIAL PRIMARY KEY,
    seller_id VARCHAR(50),
    product_unique_id VARCHAR(50)
);

CREATE TABLE lent (
    l_id SERIAL PRIMARY KEY,
    lenter_id VARCHAR(50),
    product_unique_id VARCHAR(50),
    rental_period_starts VARCHAR(50),
    rental_period_ends VARCHAR(50)
);

CREATE TABLE borrowed (
    b_id SERIAL PRIMARY KEY,
    borrower_id VARCHAR(50),
    product_unique_id VARCHAR(50),
    rental_period_starts VARCHAR(50),
    rental_period_ends VARCHAR(50)
);