CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email TEXT NOT NULL UNIQUE,
  birthdate DATE,
  gender VARCHAR(6),
  password TEXT NOT NULL
);

CREATE TABLE dentists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE slots (
  id SERIAL PRIMARY KEY,
  dentist_id INT NOT NULL,
  time_slot TIMESTAMP NOT NULL,
  FOREIGN KEY (dentist_id) REFERENCES dentists(id)
);

CREATE TABLE appointments (
  id SERIAL PRIMARY KEY,
  slot_id INT NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (slot_id) REFERENCES slots(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);



-- INSERT INTO users(name,email,password) VALUES ('John', 'john@gmail.com', '$2b$10$fjQKb4CUghISkYe59H.oD.0RC4TshDLWAUyW5eAb1OYCb4r8VVMYu');

INSERT INTO dentists(name) VALUES ('Dr. Melissa Carter');
INSERT INTO dentists(name) VALUES ('Dr. Jonathan Reyes');
INSERT INTO dentists(name) VALUES ('Dr. Amanda Liu');
INSERT INTO dentists(name) VALUES ('Dr. Eric Donovan');
INSERT INTO dentists(name) VALUES ('Dr. Priya Sharma');

INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-03T09:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-03T09:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-04T10:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-04T10:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-05T11:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-05T11:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-06T12:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (1, '2025-05-06T12:30');

INSERT INTO slots (dentist_id, time_slot) VALUES (2, '2025-05-03T14:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (2, '2025-05-03T14:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (2, '2025-05-06T15:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (2, '2025-05-06T15:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (2, '2025-05-06T16:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (2, '2025-05-06T16:30');

INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-03T11:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-03T11:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-05T12:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-05T12:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-05T13:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-05T13:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-05T14:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-07T14:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-07T15:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-07T15:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (3, '2025-05-07T16:00');

INSERT INTO slots (dentist_id, time_slot) VALUES (4, '2025-05-01T09:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (4, '2025-05-01T09:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (4, '2025-05-01T10:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (4, '2025-05-03T10:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (4, '2025-05-03T11:00');

INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-01T11:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-01T11:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-01T12:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-01T12:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-06T13:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-06T13:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-06T14:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-04T14:30');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-04T15:00');
INSERT INTO slots (dentist_id, time_slot) VALUES (5, '2025-05-04T15:30');