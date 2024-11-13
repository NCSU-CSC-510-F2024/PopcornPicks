-- Copyright (c) 2023 Nathan Kohen, Nicholas Foster, Brandon Walia, Robert Kenney
-- This code is licensed under MIT license (see LICENSE for details)

-- @author: PopcornPicks

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(45) NOT NULL UNIQUE,
  password VARCHAR(64) NOT NULL
);

-- Create the Movies table
CREATE TABLE IF NOT EXISTS Movies (
  idMovies SERIAL PRIMARY KEY,
  name VARCHAR(128) NOT NULL,
  imdb_id VARCHAR(45) NOT NULL UNIQUE
);

-- Create the Ratings table
CREATE TABLE IF NOT EXISTS Ratings (
  idRatings SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  movie_id INT NOT NULL,
  score double precision NOT NULL,
  review TEXT,
  time TIMESTAMP NOT NULL,
  FOREIGN KEY (user_id) REFERENCES Users (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (movie_id) REFERENCES Movies (idMovies) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- Create the Friends table
CREATE TABLE IF NOT EXISTS Friends (
  idFriendship SERIAL PRIMARY KEY,
  idUsers INT NOT NULL,
  idFriend INT NOT NULL,
  FOREIGN KEY (idUsers) REFERENCES Users (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  FOREIGN KEY (idFriend) REFERENCES Users (id) ON DELETE NO ACTION ON UPDATE NO ACTION
);
