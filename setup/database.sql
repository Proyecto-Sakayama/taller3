DROP DATABASE IF EXISTS Milla200;
CREATE DATABASE Milla200;
USE Milla200;
CREATE TABLE if not exists partidas
(idPartida int(8) NOT NULL AUTO_INCREMENT,
datosPartida TEXT,
primary key (idPartida));