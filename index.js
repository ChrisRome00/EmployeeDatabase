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
                    // add employee questions
                    // run init
                    // inquirer.prompt([
                    //     {
                    //         name: "fName",
                    //         message: "What is the employees First Name: ",
                    //     },
                    //     {
                    //         name:"lName",
                    //         message: "What is the employees Last Name"
                    //     },
                    //     {
                    //         name: "newEmpRole",
                    //         message: "What is the employees Role: "
                    //     }
                    // ]).then((response) => {
                    //     
                    //     })
                    // })
                    
                } else if (response.homeChoice == 'Update Employee Role') {
                    // update employee questions
                    //run init
                    
                } else if (response.homeChoice == 'View All Roles') {
                    pool.query(`SELECT * FROM role`, function (err, res) {
                        console.table(res.rows);
                        init();
                      });
                    
                } else if (response.homeChoice == 'Add Role') {
                    pool.query('SELECT id, name FROM department')
                        .then(res => res.rows)
                            .then(departments => {
                            const departmentChoices = departments.map(department => ({
                                name: department.name,
                                value: department.id
                        }));

                        return inquirer.prompt([
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
                        ]);
                    }).then((response) => {
                        pool.query(`INSERT INTO role (title, salary, department) VALUES ('${response.addedRole}', '${response.roleIncome}', '${response.belongsToDepo}')`, function (err, res) {
                            console.log(`${response.addedRole} has been added`);
                            init();
                        })
                    })
                    
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
  

