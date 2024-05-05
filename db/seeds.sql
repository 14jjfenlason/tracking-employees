INSERT INTO department (name)
VALUES
('Animal Caretakers'),
('Veterinarians'),
('Kibble Chefs');

INSERT INTO role (title, salary, department_id)
VALUES
('Big Cat Tamer', 75000, 1),
('Lizard Whisperer', 95000, 1),
('Big Cat Doctor', 80000, 2),
('Lizard Doctor', 100000, 2),
('Big Cat Chef', 55000, 3),
('Lizard Chef', 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Gregory', 'Animalman', 1, 2),
('Victoria', 'Winner', 2, null),
('Jennifer', 'Cats', 3, 4),
('Cornelius', 'Bread', 4, null),
('Joshua', 'Smoshua', 5, 6),
('Yuna', 'Tenshi', 6, null);