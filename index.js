const inquirer = require('inquirer');

//Generate questions arrays

const homeQuestions = [
    {
        name: ('homeChoice'),
        message: 'What would you like to do? \n ("control" + "c" to exit)',
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
                    //display all employees
                    console.log('displaying all emps');
                    // run init again
                    init();
                } else if (response.homeChoice == 'Add Employee') {
                    // add employee questions
                    // run init
                    init();
                } else if (response.homeChoice == 'Update Employee Role') {
                    // update employee questions
                    //run init
                    init();
                } else if (response.homeChoice == 'View All Roles') {
                    // display all roles
                    // run init
                    init();
                } else if (response.homeChoice == 'Add Role') {
                    // add role question 
                    // run init
                    init();
                } else if (response.homeChoice == 'View All Departments') {
                    // display all depts
                    // run init
                    init();
                } else if (response.homeChoice == 'Add Department') {
                    // Add dept questions
                    // run init
                    init();
                }

            })
}


// Start the program
init();