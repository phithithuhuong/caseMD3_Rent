create database CaseModule3;
use CaseModule3;
CREATE TABLE `rentMD3`
(
    `rID`      int      NOT NULL,
    `checkIn`  datetime NOT NULL,
    `checkout` datetime DEFAULT NULL,
    `duration` int      DEFAULT NULL,
    `total`    int      DEFAULT NULL,
    PRIMARY KEY (`rID`, `checkIn`),
    CONSTRAINT `rent_ibfk_1` FOREIGN KEY (`rID`) REFERENCES `roomMD3` (`rID`)
);
CREATE TABLE `roomMD3`
(
    `rID`         int                            NOT NULL AUTO_INCREMENT,
    `description` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci  DEFAULT NULL,
    `image`       varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
    `type`        enum ('single','double','vip') NOT NULL,
    `status`      enum ('available','rented')                                   DEFAULT 'available',
    `price`       int                            NOT NULL,
    `usable`      enum ('0','1')                 NOT NULL                       DEFAULT '1',
    PRIMARY KEY (`rID`)
);
CREATE TABLE `userMD3`
(
    `name`      varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    `birthday`  datetime                                                     NOT NULL,
    `email`     varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    `password`  varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    `telephone` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
    `avatar`    varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
    PRIMARY KEY (`email`)
) ;