/*
Court seeds
*/
INSERT INTO courts (id, lat, lng, name, address, rating) VALUES (1, 43.649785, -79.364159, 'David Crombie Park', '115 Scadding Ave', 4.6);
INSERT INTO courts (id, lat, lng, name, address, rating) VALUES (2, 43.655862, -79.354595, 'Underpass Park', '29 Lower River Street', 4.5);
INSERT INTO courts (id, lat, lng, name, address, rating) VALUES (3, 43.664321, -79.420391, 'Christie Pitts Park', '750 Bloor St W', 4.5);
INSERT INTO courts (id, lat, lng, name, address, rating) VALUES (4, 43.746711, -79.473363, 'Hoopdome', '75 Carl Hall Rd', 3.8);
INSERT INTO courts (id, lat, lng, name, address, rating) VALUES (5, 43.656711, -79.432733, 'Dufferin Grove Park', '875 Dufferin St', 4.5);
INSERT INTO courts (id, lat, lng, name, address, rating) VALUES (6, 43.644200, -79.402207, 'Lighthouse Labs', '662 King St W', 4.5);


/*
Visits seeds
*/

INSERT INTO visits (id, court_id, times_stamp) VALUES (1, 1, '2019-12-20 18:00:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (2, 2, '2019-12-21 18:00:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (3, 1, '2019-12-20 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (4, 1, '2020-01-08 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (5, 1, '2020-01-08 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (6, 1, '2020-01-08 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (7, 1, '2020-01-08 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (8, 1, '2020-01-08 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (9, 3, '2020-01-01 18:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (10, 3, '2020-01-01 14:30:00');
INSERT INTO visits (id, court_id, times_stamp) VALUES (11, 3, '2020-01-01 15:30:00');
insert into visits (id, court_id, times_stamp) values (12, 5, '2019-05-02 09:59:20');
insert into visits (id, court_id, times_stamp) values (13, 4, '2019-09-25 1:43:03');
insert into visits (id, court_id, times_stamp) values (14, 2, '2019-06-11 0:00:19');
insert into visits (id, court_id, times_stamp) values (15, 5, '2019-05-14 21:22:27');
insert into visits (id, court_id, times_stamp) values (16, 5, '2019-03-17 23:52:07');
insert into visits (id, court_id, times_stamp) values (17, 4, '2019-09-04 6:12:32');
insert into visits (id, court_id, times_stamp) values (18, 4, '2019-12-10 9:11:37');
insert into visits (id, court_id, times_stamp) values (19, 4, '2019-07-04 21:25:42');
insert into visits (id, court_id, times_stamp) values (20, 4, '2019-04-27 10:52:03');
insert into visits (id, court_id, times_stamp) values (21, 1, '2019-10-11 13:02:18');
insert into visits (id, court_id, times_stamp) values (22, 3, '2019-07-06 5:50:07');
insert into visits (id, court_id, times_stamp) values (23, 2, '2019-07-26 17:11:22');
insert into visits (id, court_id, times_stamp) values (24, 5, '2019-01-20 7:42:46');
insert into visits (id, court_id, times_stamp) values (25, 2, '2019-08-14 19:41:20');
insert into visits (id, court_id, times_stamp) values (26, 5, '2019-03-01 18:26:30');
insert into visits (id, court_id, times_stamp) values (27, 1, '2019-08-20 21:43:12');
insert into visits (id, court_id, times_stamp) values (28, 4, '2019-01-23 05:12:00');
insert into visits (id, court_id, times_stamp) values (29, 5, '2019-02-21 08:12:00');
insert into visits (id, court_id, times_stamp) values (30, 2, '2019-03-18 11:30:00');
insert into visits (id, court_id, times_stamp) values (31, 4, '2019-09-01 14:21:32');
insert into visits (id, court_id, times_stamp) values (32, 3, '2019-08-13 17:43:21');
insert into visits (id, court_id, times_stamp) values (33, 4, '2019-04-29 21:43:20');
insert into visits (id, court_id, times_stamp) values (34, 1, '2019-04-12 01:12:11');
insert into visits (id, court_id, times_stamp) values (35, 3, '2019-08-17 02:13:13');
insert into visits (id, court_id, times_stamp) values (36, 4, '2019-06-25 03:21:21');
insert into visits (id, court_id, times_stamp) values (37, 1, '2019-03-01 04:32:12');
insert into visits (id, court_id, times_stamp) values (38, 5, '2019-05-23 05:32:32');
insert into visits (id, court_id, times_stamp) values (39, 1, '2019-08-25 06:32:33');
insert into visits (id, court_id, times_stamp) values (40, 5, '2019-10-22 07:32:21');
insert into visits (id, court_id, times_stamp) values (41, 3, '2020-01-14 08:23:32');
insert into visits (id, court_id, times_stamp) values (42, 5, '2019-04-07 09:23:23');
insert into visits (id, court_id, times_stamp) values (43, 1, '2019-07-14 10:32:43');
insert into visits (id, court_id, times_stamp) values (44, 1, '2019-08-19 11:32:43');
insert into visits (id, court_id, times_stamp) values (45, 5, '2019-11-24 12:32:54');
insert into visits (id, court_id, times_stamp) values (46, 2, '2019-05-07 13:12:23');
insert into visits (id, court_id, times_stamp) values (47, 4, '2019-05-23 14:32:32');
insert into visits (id, court_id, times_stamp) values (48, 2, '2019-08-23 15:32:32');
insert into visits (id, court_id, times_stamp) values (49, 4, '2019-12-15 16:32:32');
insert into visits (id, court_id, times_stamp) values (50, 3, '2019-08-17 17:32:54');
insert into visits (id, court_id, times_stamp) values (51, 3, '2019-11-28 18:34:43');
insert into visits (id, court_id, times_stamp) values (52, 4, '2019-05-20 19:32:43');
insert into visits (id, court_id, times_stamp) values (53, 2, '2019-10-17 20:21:32');
insert into visits (id, court_id, times_stamp) values (54, 1, '2019-04-19 21:32:54');
insert into visits (id, court_id, times_stamp) values (55, 2, '2019-06-02 22:21:21');
insert into visits (id, court_id, times_stamp) values (56, 4, '2019-08-30 23:32:32');
insert into visits (id, court_id, times_stamp) values (57, 3, '2019-09-10 24:00:00');
insert into visits (id, court_id, times_stamp) values (58, 2, '2020-01-13 01:21:13');
insert into visits (id, court_id, times_stamp) values (59, 4, '2019-08-17 02:21:32');
insert into visits (id, court_id, times_stamp) values (60, 1, '2019-09-24 03:21:53');
insert into visits (id, court_id, times_stamp) values (61, 1, '2019-08-05 04:21:43');
insert into visits (id, court_id, times_stamp) values (62, 2, '2019-06-06 05:21:32');
insert into visits (id, court_id, times_stamp) values (63, 5, '2019-04-03 06:21:32');
insert into visits (id, court_id, times_stamp) values (64, 5, '2019-03-05 07:00:00');
insert into visits (id, court_id, times_stamp) values (65, 1, '2019-10-26 08:00:00');
insert into visits (id, court_id, times_stamp) values (66, 5, '2019-12-20 09:00:00');
insert into visits (id, court_id, times_stamp) values (67, 2, '2019-11-23 10:00:00');
insert into visits (id, court_id, times_stamp) values (68, 2, '2019-11-02 11:00:00');
insert into visits (id, court_id, times_stamp) values (69, 2, '2019-09-14 12:00:00');
insert into visits (id, court_id, times_stamp) values (70, 4, '2019-06-16 13:00:00');
insert into visits (id, court_id, times_stamp) values (71, 4, '2019-08-11 14:00:00');
insert into visits (id, court_id, times_stamp) values (72, 3, '2019-10-12 15:00:00');
insert into visits (id, court_id, times_stamp) values (73, 1, '2019-01-29 16:00:00');
insert into visits (id, court_id, times_stamp) values (74, 3, '2019-01-06 17:00:00');
insert into visits (id, court_id, times_stamp) values (75, 3, '2019-02-14 18:00:00');
insert into visits (id, court_id, times_stamp) values (76, 2, '2019-07-15 19:00:00');
insert into visits (id, court_id, times_stamp) values (77, 3, '2019-04-06 20:00:00');
insert into visits (id, court_id, times_stamp) values (78, 5, '2019-10-04 21:00:00');
insert into visits (id, court_id, times_stamp) values (79, 3, '2019-10-10 22:00:00');
insert into visits (id, court_id, times_stamp) values (80, 1, '2019-04-03 23:00:00');
insert into visits (id, court_id, times_stamp) values (81, 1, '2019-11-28 24:00:00');
insert into visits (id, court_id, times_stamp) values (82, 4, '2019-10-17 01:00:00');
insert into visits (id, court_id, times_stamp) values (83, 4, '2019-03-04 02:00:00');
insert into visits (id, court_id, times_stamp) values (84, 2, '2019-06-16 03:00:00');
insert into visits (id, court_id, times_stamp) values (85, 3, '2019-08-23 04:00:00');
insert into visits (id, court_id, times_stamp) values (86, 2, '2019-01-27 05:00:00');
insert into visits (id, court_id, times_stamp) values (87, 3, '2019-09-21 06:00:00');
insert into visits (id, court_id, times_stamp) values (88, 4, '2019-01-21 07:00:00');
insert into visits (id, court_id, times_stamp) values (89, 3, '2019-06-14 08:00:00');
insert into visits (id, court_id, times_stamp) values (90, 3, '2019-03-11 09:00:00');
insert into visits (id, court_id, times_stamp) values (91, 2, '2019-11-06 10:00:00');
insert into visits (id, court_id, times_stamp) values (92, 5, '2019-04-13 11:00:00');
insert into visits (id, court_id, times_stamp) values (93, 3, '2019-12-26 12:00:00');
insert into visits (id, court_id, times_stamp) values (94, 5, '2019-11-01 13:00:00');
insert into visits (id, court_id, times_stamp) values (95, 3, '2019-06-06 14:00:00');
insert into visits (id, court_id, times_stamp) values (96, 1, '2019-04-15 15:00:00');
insert into visits (id, court_id, times_stamp) values (97, 2, '2019-09-21 16:00:00');
insert into visits (id, court_id, times_stamp) values (98, 3, '2019-08-14 17:00:00');
insert into visits (id, court_id, times_stamp) values (99, 5, '2019-09-07 18:00:00');
insert into visits (id, court_id, times_stamp) values (100, 4, '2019-09-23 19:00:00');





/*
courtVisits seeds
*/

INSERT INTO courtVisits (id, court_id, visit_id) VALUES (1,1,1);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (2,1,3);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (3,2,2);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (4,1,4);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (5,1,5);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (6,1,6);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (7,1,7);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (8,1,8);
INSERT INTO courtVisits (id, court_id, visit_id) VALUES (9,3,9);



