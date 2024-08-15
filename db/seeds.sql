
-- Insert pre data into department
INSERT INTO department (name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department) VALUES
('Sales Lead',        100000,  1),
('Salesperson',        80000,  1),
('Lead Engineer',     150000,  2),
('Software Engineer', 120000,  2),
('Account Manager',   160000,  3),
('Accountant',        125000,  3),
('Legal Team Lead',   250000,  4),
('Lawyer',            190000,  4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John',    'Doe', 1, NULL),      -- Sales Lead
('Mike',     'Chan', 2, 1),       -- Salesperson, manager is John
('Ashley', 'Rodriguez', 3, NULL), -- Lead Engineer
('Kevin',   'Tupic', 4, 3),       -- Software Engineer, manager is Ashley
('Kunal',     'Singh', 5, NULL),  -- Account Manager
('Malia',   'Brown', 6, 5),       -- Accountant, manager is Kunal
('Sarah',   'Lourd', 7, NULL),    -- Legal Team lead
('Tom',    'Allen', 8, 7);        -- Lawyer, manager is Sarah


-- This will be a table to display all employees
-- SELECT
--     employee.id AS employee_id,
--     employee.first_name,
--     employee.last_name,
--     role.title AS role_title,
--     role.salary AS role_salary,
--     department.name AS department_name,
--     CONCAT(manager.first_name, ' ', manager.last_name) AS manager
-- FROM
--     employee
-- JOIN
--     role ON employee.role_id = role.id
-- JOIN
--     department ON role.department = department.id
-- LEFT JOIN
--     employee AS manager ON employee.manager_id = manager.id;

-- // pool.query('SELECT id, name FROM department')
--                     //     .then(res => res.rows)
--                     //         .then(departments => {
--                     //         let departmentChoices = departments.map(department => ({
--                     //             name: department.name,
--                     //             value: department.id
--                     //     }));

--                     //     return inquirer.prompt([
--                     //         {
--                     //             name: 'addedRole',
--                     //             message: 'What is the title of the role you would like to add?'
--                     //         },
--                     //         {
--                     //             name: 'roleIncome',
--                     //             message: 'What is the salary of the role?'
--                     //         },
--                     //         {
--                     //             name: 'belongsToDepo',
--                     //             type: 'list',
--                     //             choices: departmentChoices,
--                     //             message: 'What department does this role belong to?'
--                     //         }
--                     //     ]);
--                     // }).then((response) => {
--                     //     pool.query(`INSERT INTO role (title, salary, department) VALUES ('${response.addedRole}', '${response.roleIncome}', '${response.belongsToDepo}')`, function (err, res) {
--                     //         console.log(`${response.addedRole} has been added`);
--                     //         init();
--                     //     })
--                     // })