-- יצירת מסד הנתונים
CREATE DATABASE IF NOT EXISTS mydb CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mydb;

-- יצירת טבלת Plants
CREATE TABLE IF NOT EXISTS Plants (
    ID INT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NULL,
    PRIMARY KEY (ID)
) ENGINE = InnoDB;

-- יצירת טבלת threes
CREATE TABLE IF NOT EXISTS threes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_plants INT UNSIGNED,
    date DATE NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (id_plants) REFERENCES Plants(ID) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

-- יצירת טבלת dataSensors
CREATE TABLE IF NOT EXISTS dataSensors (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    id_threes INT UNSIGNED,
    name_sensor VARCHAR(45) NOT NULL,
    avg DOUBLE UNSIGNED,
    date DATE NOT NULL,
    isRunning INT,
    PRIMARY KEY (id),
    FOREIGN KEY (id_threes) REFERENCES threes(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;
