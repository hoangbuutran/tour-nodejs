-- DROP DATABASE IF EXISTS test_db;   
CREATE DATABASE IF NOT EXISTS tour;   

USE tour;

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(25) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('Admin', 'SuperUser', 'User') DEFAULT 'SuperUser',
    age INT(11) DEFAULT 0
);


CREATE TABLE IF NOT EXISTS duration (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    url_domain VARCHAR(250) NULL,
    title VARCHAR(250) NULL,
    short int NULL,
    is_show BOOLEAN DEFAULT TRUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;


CREATE TABLE IF NOT EXISTS header_top (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    phone_number VARCHAR(350) NULL,
    email VARCHAR(350) NULL,
    facebook_url VARCHAR(350) NULL,
    x_url VARCHAR(350) NULL,
    whatsap_url VARCHAR(350) NULL,
    zalo_url VARCHAR(350) NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;


CREATE TABLE IF NOT EXISTS banner (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(350) NULL,
    description VARCHAR(350) NULL,
    image_url VARCHAR(350) NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;


CREATE TABLE IF NOT EXISTS destination (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    is_show BOOLEAN DEFAULT TRUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS tour (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(250) NOT NULL,
    thumnail_url VARCHAR(250) NOT NULL,
    day_start VARCHAR(250) NOT NULL,
    short_detail_text MEDIUMTEXT NULL,
    price DECIMAL(20 , 10 ) NOT NULL,
    sale_price DECIMAL(20 , 10 ) NOT NULL,
    star_review DECIMAL(20 , 10 ),
    duration_id BIGINT,
    is_show BOOLEAN DEFAULT TRUE,
    transportation VARCHAR(150) NULL,
    is_populor BOOLEAN DEFAULT FALSE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT duration_fk FOREIGN KEY (duration_id)
        REFERENCES duration (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE IF NOT EXISTS tour_destination (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tour_id BIGINT,
    destination_id BIGINT,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT tour_td_fk FOREIGN KEY (tour_id)
        REFERENCES tour (id),
    CONSTRAINT destination_td_fk FOREIGN KEY (destination_id)
        REFERENCES destination (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;


CREATE TABLE IF NOT EXISTS tour_detail (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tour_id BIGINT,
    detail_text MEDIUMTEXT NOT NULL,
    tour_guide_text MEDIUMTEXT NOT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT tour_detail_fk FOREIGN KEY (tour_id)
        REFERENCES tour (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;


CREATE TABLE IF NOT EXISTS tour_expected_cost (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    tour_id BIGINT,
    rates_include_text MEDIUMTEXT NULL,
    price_not_included_text MEDIUMTEXT NULL,
    surcharge_text MEDIUMTEXT NULL,
    cancel_change_text MEDIUMTEXT NULL,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT tour_expected_cost_fk FOREIGN KEY (tour_id)
        REFERENCES tour (id)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;