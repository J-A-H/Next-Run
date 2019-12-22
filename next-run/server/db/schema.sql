-- Drop table and recreate court table

Drop table if EXISTS courts cascade;

create table courts (
  id serial primary key NOT null,
  lat decimal NOT null, 
  lng decimal NOT null, 
  name varchar(255) NOT null, 
  address varchar(255) NOT null, 
  rating integer
);

Drop table if EXISTS visits cascade;
create table visits (
  id serial primary key NOT null,
  court_id integer references courts(id) on delete cascade,
  times_stamp TIMESTAMP not null
);

Drop table if EXISTS courtVisits cascade;
create table courtVisits (
  id serial primary key,
  court_id integer references courts(id) not null,
  visit_id integer references visits(id) not null,
  quantity integer default 0
);

