DROP DATABASE IF EXISTS travluxe_db;

CREATE DATABASE travluxe_db;

\connect travluxe_db

CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY, 
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT NOT NULL CHECK (position('@' IN email) > 1)
);

CREATE TABLE city (
    id SERIAL PRIMARY KEY,
    city_name TEXT NOT NULL,
    country TEXT NOT NULL,
    timezone TEXT NOT NULL,
    timeofday TEXT NOT NULL,
    user_username VARCHAR REFERENCES users(username) ON DELETE CASCADE
);

CREATE TABLE weather (
    id SERIAL PRIMARY KEY,
    temperature TEXT NOT NULL,
    conditions TEXT NOT NULL,
    wind_speed DECIMAL,
    user_username VARCHAR REFERENCES users(username) ON DELETE CASCADE,
    city_id INTEGER REFERENCES city(id)
);

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    restaurant_name TEXT NOT NULL,
    rating TEXT NOT NULL,
    restaurant_address TEXT NOT NULL,
    phone TEXT NOT NULL,
    image_url TEXT NOT NULL,
    user_username VARCHAR REFERENCES users(username) ON DELETE CASCADE,
    city_id INTEGER REFERENCES city(id)
);

CREATE TABLE touristic_sites (
    id SERIAL PRIMARY KEY,
    tour_name TEXT NOT NULL,
    website TEXT NOT NULL,
    rating TEXT NOT NULL,
    tour_address TEXT NOT NULL,
    phone TEXT NOT NULL,
    image_url TEXT NOT NULL,
    city_id INTEGER REFERENCES city(id) ON DELETE CASCADE
);

-- Insert sample users
INSERT INTO users (username, password, first_name, last_name, email)
VALUES ('OllieBoop', 'Travel2023', 'Ollie', 'Boop', 'ollieboop@example.com'),
       ('GaetanJR', 'Travel2023', 'Gaetan', 'Mandeng', 'GaetanM@example.com');

-- Insert sample cities
INSERT INTO city (city_name, country, timezone, timeofday, user_username)
VALUES ('Paris', 'France', 'Europe/Paris', 7200, 'OllieBoop'),
       ('Barcelona', 'Spain', 'Europe/Madrid', 7200, 'GaetanJR');

-- Insert sample weather data
INSERT INTO weather (temperature, conditions, wind_speed, user_username, city_id)
VALUES (23.5, 'Sunny', 15.6, 'OllieBoop', 1),
       (17.8, 'Cloudy', 8.3, 'GaetanJR', 2);

-- Insert sample restaurants
INSERT INTO restaurants (restaurant_name, rating, restaurant_address, phone, image_url, user_username, city_id)
VALUES ('Chez Pierre', 4.5, '12 Rue de la Paix, 75002 Paris', '+33 1 42 61 68 29', 'https://example.com/chez-pierre.jpg', 'OllieBoop', 1),
       ('El Xampanyet', 4.3, 'Carrer de Montcada, 22, 08003 Barcelona', '+34 933 19 30 33', 'https://example.com/el-xampanyet.jpg', 'GaetanJR', 2);

-- Insert sample touristic sites
INSERT INTO touristic_sites (tour_name, website, rating, tour_address, phone, image_url, city_id)
VALUES ('Eiffel Tower', 'https://www.toureiffel.paris/', 4.7, '5 Avenue Anatole France, 75007 Paris', '+33 892 70 12 39', 'https://example.com/eiffel-tower.jpg', 1),
       ('La Sagrada Familia', 'https://sagradafamilia.org/en', 4.6, 'Carrer de Mallorca, 401, 08013 Barcelona', '+34 932 08 04 14', 'https://example.com/sagrada-familia.jpg', 2);