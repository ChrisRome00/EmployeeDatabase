const inquirer = require('inquirer');
const { Pool } = require('pg');

// Connect to database
const pool = new Pool(
    {
      // TODO: Enter PostgreSQL username
      user: 'postgres',
      // TODO: Enter PostgreSQL password
      password: 'Lani@2014',
      host: 'localhost',
      database: 'employee_db'
    },
    console.log(`Connected to the employee database.`)
)

pool.connect();
  

//Generate questions arrays
const homeQuestions = [
    {
        name: ('homeChoice'),
        message: 'What would you like to do?',
        type: 'list',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department']
    }
];

function init() {
    inquirer
        .prompt(homeQuestions)
            .then((response) => {
                //console.log(response.homeChoice);
                if (response.homeChoice == 'View All Employees') {
                    pool.query(`SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role_title, role.salary AS role_salary, department.name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`, function (err, res) {
                        console.table(res.rows);
                        init();
                      });
                    
                } else if (response.homeChoice == 'Add Employee') {
                    // get all current roles
                    pool.query(`SELECT role.id, role.title FROM role;`, function(err, res) {
                        console.log('ROLES:')
                        console.log(res.rows);
                        const roleChoices = res.rows.map(({id, title}) => { return { value: id, name: title } });
                        // run another nested query to return manager name
                        pool.query(`SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS manager FROM employee WHERE manager_id IS NULL;`, function(err, results) {
                            console.log('MANAGERS:');
                            console.log(results.rows);
                            const managerChoices = results.rows.map(({ id, manager }) => { return { value: id, name: manager }});
                            inquirer.prompt([
                                {
                                    name: 'roleId',
                                    message: 'What role will this employee have?',
                                    type: 'list',
                                    choices: roleChoices
                                },
                                {
                                    name: 'managerId',
                                    message: `Who is this employee's manager?`,
                                    type: 'list',
                                    choices: managerChoices
                                },
                                // Prompt for first and last name
                                {
                                    name: 'empFName',
                                    message: `What is this employee's First Name?`,
                                },
                                {
                                    name: 'empLName',
                                    message: `What is this employee's Last Name?`
                                },
                            ]).then(({ roleId, managerId, empFName, empLName}) => {
                                //console.log(roleId, managerId);
                                // take the roleId, managerId, firstName, lastName, and run a query to insert the employee into the employee table
                                pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${empFName}', '${empLName}','${roleId}', '${managerId}');`, function (err, res) {
                                    console.log(`The employee ${empFName} ${empLName} was added to the database`);
                                    init();
                                })
                            });
                        })
                    })
                   
                } else if (response.homeChoice == 'Update Employee Role') {
                  // Get all employees
                    pool.query( `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee;`, function (err, res) {
                        const employeeChoices = res.rows.map(({ id, name }) => ({ value: id, name: name }));
                        // Get all roles
                        pool.query(`SELECT id, title FROM role;`, function (err, results) {
                            const roleChoices = results.rows.map(({ id, title }) => ({ value: id, name: title }));
                            inquirer.prompt([
                                {
                                    name: "empChoice",
                                    message: "Which employee's role do you want to update?",
                                    type: "list",
                                    choices: employeeChoices,
                                },
                                {
                                    name: "roleChoice",
                                    message: "What is the new role for this employee?",
                                    type: "list",
                                    choices: roleChoices,
                              },
                            ]).then(({ empChoice, roleChoice }) => {
                                pool.query(`UPDATE employee SET role_id = ${roleChoice} WHERE id = ${empChoice};`, function (err, res) {
                                    console.log(`Employee's role has been updated!`);
                                    init();
                                });
                            });
                        });
                    });
                } else if (response.homeChoice == 'View All Roles') {
                    pool.query(`SELECT * FROM role`, function (err, res) {
                        console.table(res.rows);
                        init();
                      });
                    
                } else if (response.homeChoice == 'Add Role') {
                    pool.query(`SELECT department.id, department.name FROM department;`, function (err, res) {
                        const departmentChoices = res.rows.map(({ id, name }) => ({ value: id, name: name }));
                        inquirer.prompt([
                            {
                                name: 'addedRole',
                                message: 'What is the title of the role you would like to add?'
                            },
                            {
                                name: 'roleIncome',
                                message: 'What is the salary of the role?'
                            },
                            {
                                name: 'belongsToDepo',
                                type: 'list',
                                choices: departmentChoices,
                                message: 'What department does this role belong to?'
                            }
                        ]).then(({ addedRole, roleIncome, belongsToDepo }) => {
                            pool.query(`INSERT INTO role (title, salary, department) VALUES ('${addedRole}', '${roleIncome}', '${belongsToDepo}');`, function (err, res) {
                                console.log(`${addedRole} has been added`);
                                init();
                            });
                        });
                    });
                    
                    
                } else if (response.homeChoice == 'View All Departments') {
                    pool.query(`SELECT * FROM department;`, function (err, res) {
                        console.log(res.rows);
                        console.table(res.rows);
                        init();
                    });
                    
                } else if (response.homeChoice == 'Add Department') {
                    inquirer.prompt([
                        {
                            name: "addedDepo",
                            message: "What is the name of the department you would like to add: ",
                        }
                    ]).then((response) => {
                        pool.query(`INSERT INTO department (name) VALUES ('${response.addedDepo}');`, function (err, res) {
                            console.log(`${response.addedRole} has been added to departments`);
                            init();
                        })
                    })
                
                }
                
            })
    
}


init();
  

