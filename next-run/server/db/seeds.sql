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


