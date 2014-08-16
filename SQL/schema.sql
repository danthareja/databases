CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  username varchar(25),
  ID int(11) NOT NULL auto_increment,
  PRIMARY KEY (ID)
);

CREATE TABLE messages (
  messageText text,
  roomname varchar(30),
  createdAt datetime,
  username_id int(11),
  ID int(11) NOT NULL auto_increment,
  FOREIGN KEY (username_id) REFERENCES users (ID),
  PRIMARY KEY (ID)
);


CREATE TABLE friends (
  username_id int(11),
  friend_id int(11),
  ID int(11) NOT NULL auto_increment,
  FOREIGN KEY (username_id) REFERENCES users (ID),
  FOREIGN KEY (friend_id) REFERENCES users (ID),
  PRIMARY KEY (ID)
);

/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




