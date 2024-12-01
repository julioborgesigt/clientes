CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(10) DEFAULT 'user'
);

CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    expiration_date DATE NOT NULL,
    chosen_date DATE NOT NULL,
    service VARCHAR(100) NOT NULL,
    whatsapp VARCHAR(15) NOT NULL,
    status VARCHAR(20) DEFAULT 'normal'
);

CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL
);
