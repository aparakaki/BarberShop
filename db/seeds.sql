INSERT INTO Users (name, username, password, admin) VALUES 
("Clark", "clark123", 123456, true),
("Peter", "peter123", 123456, true),
("John", "john123", 234567, false),
("Kevin", "kevin123", 234567, false),
("Mike", "mike123", 234567, false),
("Jack", "jack123", 234567, false),
("Josh", "josh123", 234567, false),
("Liam", "liam123", 234567, false),
("Brian", "brian123", 234567, false),
("Tom", "tom123", 234567, false),
("Alex", "alex123", 234567, false),
("Blake", "blake123", 234567, false),
("James", "james123", 234567, false);

INSERT INTO Services (style, time, price, description)
VALUES ("Basic Cut", 40, 21, "Scissor cut with shampoo and neck shave"), 
("Head Shave", 30, 25, "Razor head shave with neck shave"), 
("Razor Fade", 25, 30, "Traditional razor fade with neck shave"), 
("Buzz Cut", 30, 23, "Cut with clippers"), 
("Beard Trim", 15, 17, "Trim and clean up mustache and beard"),
("Child Cut", 20, 15, "Hair cut for children 12 and under");

INSERT INTO Appointments (date, start, end, UserId, completed, serviceLength) VALUES
("2018-07-07", "13:40", "14:20", 13, true, 46),
("2018-05-15", "09:45", "10:00", 12, true, 18),
("2018-01-12", "13:30", "14:00", 3, true, 25),
("2018-06-07", "11:30", "12:10", 3, true, 38);

INSERT INTO Appointments (date, start, end, UserId, completed) VALUES
("2018-10-11", "13:40", "14:15", 3, false),
("2018-10-13", "10:30", "11:10", 4, false),
("2018-10-13", "11:30", "11:50", 5, false),
("2018-10-13", "12:40", "13:20", 6, false),
("2018-10-13", "09:30", "10:15", 7, false),
("2018-10-12", "13:00", "13:15", 8, false),
("2018-10-11", "11:30", "12:10", 9, false),
("2018-10-11", "15:30", "15:50", 10, false),
("2018-10-12", "10:30", "11:00", 11, false),
("2018-10-15", "11:45", "12:05", 12, false),
("2018-10-15", "09:30", "10:15", 13, false),
("2018-10-15", "10:30", "10:50", 4, false);

INSERT INTO Details (AppointmentId, serviceId) VALUES
(1, 1), (2, 5), (3, 2), (4, 1), (5, 3), (6, 5), (6, 3), (7, 6), (8, 1), (9, 4), (9, 5),
(10, 5), (11, 1), (12, 6), (13, 4), (14, 3), (15, 1), (16, 6);
