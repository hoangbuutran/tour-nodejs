-- DROP DATABASE IF EXISTS test_db;   
-- CREATE DATABASE IF NOT EXISTS test_db;   
USE test_db; 

DROP TABLE IF EXISTS user; 

CREATE TABLE IF NOT EXISTS user 
  ( 
     id         INT PRIMARY KEY auto_increment, 
     username   VARCHAR(25) UNIQUE NOT NULL, 
     password   CHAR(60) NOT NULL, 
     first_name VARCHAR(50) NOT NULL, 
     last_name  VARCHAR(50) NOT NULL, 
     email      VARCHAR(100) UNIQUE NOT NULL, 
     role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
     age        INT(11) DEFAULT 0 
  ); 


CREATE TABLE IF NOT EXISTS duration (
                id             bigint auto_increment primary key ,
                url_domain       varchar(250) null,
                title       varchar(250) null,
                short       varchar(250) null,
                created        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                modified       DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;