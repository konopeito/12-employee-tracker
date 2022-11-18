
const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

// My SQL Connection 
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'cat123',
    database: 'employee_tracker',
});
connection.connect((err) => {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt([{
            type: "list",
            name: "main",
            message: "Select an action to proceed.",
            choices: [
                "View Departments",
                "View Roles",
                "View All Employees",
                "Add Role",
                "Add Department",
                "Add Employee",
                "Update Role",
                "Quit",
            ],
        }, ])
      
        .then((answers) => {
            if (answers.main === "View Departments") {
                viewDept();

            } else if (answers.main === "View All Employees") {
                viewEmployee();

            } else if (answers.main === "View Roles") {
                viewRole();

            } else if (answers.main === "Add Employee") {
                addEmployee();

            } else if (answers.main === "Add Role") {
                addRole();

            } else if (answers.main === "Add Department") {
                addDept();

            } else if (answers.main === "Update Role") {
                updateRole();

            } else if (answers.main === "Quit") {
                process.exit(1);
            }
        });
}

function viewDept() {
    const query =
        `SELECT * FROM department`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.log(` ALL DEPARMENTS:`);
        console.log(' ');
        console.table(res);
        start();
    });
}

function viewEmployee() {
    const query =
        `SELECT employee.id,
        employee.first_name,
        employee.last_name,
        job.id,
        job.job_title,
        job.salary,
        department.id,
        department.department
        FROM employee INNER JOIN job ON employee.job_id = job.id
        INNER JOIN department ON job.department_id = department.id`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.log(` ALL EMPLOYEES:`);
        console.log(' ');
        console.table(res);
        start();
    });
}

function viewRole() {
    const query =
        `SELECT * FROM job`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(' ');
        console.log(` ALL ROLES:`);
        console.log(' ');
        console.table(res);
        start();
    });
}

function addEmployee() {
    inquirer
        .prompt([{
                name: "first_name",
                message: "Provide a First Name.",
                type: "input",
            },
            {
                name: "last_name",
                message: "Provide a Last Name.",
                type: "input",
            },
        ])

        .then((answers) => {
            const query =
                "SELECT * FROM job"
            connection.query(
                query,
                (err, res) => {
                    console.log(res)
                    jobChoices = res.map((job) => {
                        return {
                            value: job.id,
                            name: job.job_title,
                        }
                    })
                    inquirer
                        .prompt([{
                            name: "job",
                            message: "Assign which role?",
                            type: "list",
                            choices: jobChoices,
                            
                        }]).then((jobAnswers) => {
                            const query =
                                "INSERT INTO employee (first_name, last_name, job_id, manager_id) VALUES (?,?,?,?)"
                            connection.query(
                                query,
                                [
                                    answers.first_name,
                                    answers.last_name,
                                    jobAnswers.job,
                                    null,
                                ],
                                (err, res) => {
                                    if (err) throw err;

                                    const query = "SELECT * FROM employee";
                                    connection.query(query, (err, res) => {
                                        if (err) throw err;

                                        console.log(' ');
                                        console.log(` Employee Added Successfully!:`);
                                        console.log(' ');
                                        console.table(res);
                                        start();
                                    });
                                }
                            );
                        })
                }
            )
        });
}

function addDept() {
    inquirer
        .prompt([{
            name: "department",
            message: "Type a Department to add",
            type: "input",
        }, ])
        .then((answers) => {
            const query =
                "INSERT INTO department (department) VALUES (?)"
            connection.query(
                query,
                [answers.department],
                (err, res) => {
                    if (err) throw err;

                    const query = "SELECT * FROM department";
                    connection.query(query, (err, res) => {
                        if (err) throw err;

                        console.log(' ');
                        console.log(` Department Assigned!:`);
                        console.log(' ');

                        console.table(res);
                        start();
                    });
                }
            );
        });
    }

function addRole() {
    inquirer
        .prompt([{
                name: "job_title",
                message: "Enter job name.",
                type: "input",
            },
            {
                name: "salary",
                message: "Enter a salary.",
                type: "number",
            },

            {
                name: "department_id",
                message: "Add a Department ID",
                type: "list",
                choices: [
                    'Department ID will be 1',
                    'Department has to be 1',
                    'Click here for 1',
                ],
            },
            {
                name: "job_department_name",
                message: "Pick a Department for new job name.",
                type: "list",
                choices: ['Video Game Design',
                    'IT',
                    'Retail',
                    'Medical'
                ],
            },

        ])
        .then((answers) => {
            const query =
                `INSERT INTO job (job_title, salary, department_id) VALUES (?,?, 1)`;
            connection.query(
                query,
                [answers.job_title, answers.salary, answers.job_department_name],
                (err, res) => {
                    if (err) throw err

                    const query = "SELECT * FROM job";
                    connection.query(query, (err, res) => {
                        if (err) throw err;

                        console.log(' ');
                        console.log(` Role has been added.:`);
                        console.log(' ');

                        console.table(res);
                        start();
                    });
                }
            );
        });
    }

function updateRole() {
    inquirer
        .prompt([{
                name: "first_name",
                message: "Enter first name.",
                type: "input",
            },
            {
                name: "last_name",
                message: "Enter last name.",
                type: "input",
            },
            {
                name: "update_role",
                message: "Update which role?",
                type: "list",
                choices: [
                    'Sales Lead',
                    'Salesperson',
                    'Lead Engineer',
                    'Software Engineer',
                    'Accountant',
                    'Legal Team Lead',
                    'Lawyer'
                ],
            },
        ])
        .then((answers) => {
            console.log(answers);
            const query =
                "UPDATE employee SET job_title=? WHERE first_name=? AND last_name=?";
            connection.query(
                query,
                [answers.update_role, answers.first_name, answers.last_name],
                (err, res) => {
                    if (err) throw err;
                    const query = "SELECT * FROM employee";
                    connection.query(query, (err, res) => {
                        if (err) throw err;
                        console.table(res);
                        start();
                    });
                }
            );
        });
    }