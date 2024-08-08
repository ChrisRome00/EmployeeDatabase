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

const addEmp = [
    // prompt for first name, last name, role, and manager
    {

    }
]

const updateEmpRole = [
    // Ask them to select a role (display all roles from database)
    // grab roles from database and make them selectable
    {

    }
]


function init() {
    inquirer
        .prompt(homeQuestions)
            .then((response) => {
                console.log(response.homeChoice);
                if (response.homeChoice == 'View All Employees') {
                    console.log('displaying all emps');
                    pool.query(`SELECT employee.id AS employee_id, employee.first_name, employee.last_name, role.title AS role_title, role.salary AS role_salary, department.name AS department_name, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id;`, function (err, {rows}) {
                        console.table(rows);
                        init();
                      });
                    
                } else if (response.homeChoice == 'Add Employee') {
                    // add employee questions
                    // run init
                    
                } else if (response.homeChoice == 'Update Employee Role') {
                    // update employee questions
                    //run init
                    
                } else if (response.homeChoice == 'View All Roles') {
                    // display all roles
                    // run init
                    
                } else if (response.homeChoice == 'Add Role') {
                    // add role question 
                    // run init
                    
                } else if (response.homeChoice == 'View All Departments') {
                    // display all depts
                    // run init
                    
                } else if (response.homeChoice == 'Add Department') {
                    // Add dept questions
                    // run init
                    
                }
                
            })
    
}


init();
  

