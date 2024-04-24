CREATE TABLE `Users` (
  `ID` bigint PRIMARY KEY,
  `JoinDate` bigint,
  `LastJoinDate` bigint,
  `Active` bool
);

CREATE TABLE `Levels` (
  `User` bigint PRIMARY KEY,
  `Points` integer,
  `Level` integer,
  `MonthPoints` integer,
  `MonthLevel` integer
);

CREATE TABLE `Dailies` (
  `User` bigint PRIMARY KEY,
  `LastDaily` bigint,
  `DailyCount` integer
);

CREATE TABLE `Credits` (
  `User` bigint PRIMARY KEY,
  `Credits` integer
);

ALTER TABLE `Levels` ADD FOREIGN KEY (`User`) REFERENCES `Users` (`ID`);

ALTER TABLE `Dailies` ADD FOREIGN KEY (`User`) REFERENCES `Users` (`ID`);

ALTER TABLE `Credits` ADD FOREIGN KEY (`User`) REFERENCES `Users` (`ID`);
