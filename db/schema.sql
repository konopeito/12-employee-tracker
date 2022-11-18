DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

-- Department table
CREATE TABLE department (
     id INTEGER auto_increment NOT NULL,
     department_name VARCHAR (30) NULL,
     PRIMARY KEY (id)
);
-- Job table
CREATE TABLE job  (
    id INTEGER auto_increment NOT NULL,
    job_title VARCHAR (30),
    salary DECIMAL (10,4),
    PRIMARY KEY (id),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) references department(id)
);
-- Employee table
CREATE TABLE employee (
id INTEGER auto_increment NOT NULL, 
first_name VARCHAR(30), 
last_name VARCHAR(30),
job_id INT NOT NULL, 
manager_id INT,
job_title VARCHAR(30), 
FOREIGN KEY (manager_id) references employee(id),
FOREIGN KEY (job_id) references job(id),
PRIMARY KEY (id)
);
-- Department Options
INSERT INTO department 
    (department_name)
VALUES
('Video Game Design'),
('IT'),
('Retail'),
('Medical');

INSERT INTO job
    (job_title, salary, department_id)
VALUES 
('Game Developer', 91000, 1),
('HelpDesk Analyst', 41600, 2),
('GM Team Lead', 43700, 3),
('Consumables Products Manager', 122400, 3),
('Human Resources Manager', 116700, 3),
('Clinic RN Supervisor (CDS)', 87900, 4),
('Front Desk Clinic Rep', 29000, 4);

INSERT INTO employee 
    (first_name, last_name, job_title, job_id, manager_id)
VALUES
('Julia', 'Fritsch','Game Developer', 1, null),
('Logan', 'Tweet','HelpDesk Analyst', 2, 1),
('Jose', 'Sánchez','GM Team Lead', 3, null),
('Megan', 'McBrown', 'Consumables Products Manager', 4, 3),
('Jerry', 'Kost', 'Human Resources Manager', 6, null),
('Maddy', 'Halberg', 'Clinic RN Supervisor (CDS)', 5, 6),
('Sara', 'Mimkin', 'Front Desk Clinic Rep', 7, null);
