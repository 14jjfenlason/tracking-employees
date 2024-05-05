const inquirer = require("inquirer");
const { viewDepartments, viewRoles, viewEmployees, addDepartment, addRole, addEmployee, updateEmployeeRole, getAllEmployees, getAllRoles } = require('./db');

function mainPrompt() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'choices',
                message: "What would you like to do?",
                choices: [
                    "View all departments",
                    "View all roles",
                    "View all employees",
                    "Add a department",
                    "Add a role",
                    "Add an employee",
                    "Update an employee role"
                ]
            }
        ])
        .then((answers) => {
            const selectedChoice = answers.choices;
            switch (selectedChoice) {
                case "View all departments":
                    viewDepartments()
                    .then(result => {
                        const departments = result.rows;
                        console.log('Departments:');
                        console.table(departments);
                        mainPrompt(); 
                    })
                        .catch(error => {
                            console.error('Error viewing departments:', error);
                            mainPrompt(); 
                        });
                    break;
                case "View all roles":
                    viewRoles()
                    .then(result => {
                        const roles = result.rows;
                        console.log('Roles:');
                        console.table(roles);
                        mainPrompt();
                    })
                        .catch(error => {
                            console.error('Error viewing roles:', error);
                            mainPrompt();
                        });
                    break;
                case "Add a department":
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'departmentName',
                                message: 'Enter the name of the new department:'
                            }
                        ])
                        .then((answers) => {
                            const departmentName = answers.departmentName;
                            addDepartment(departmentName)
                                .then(() => {
                                    console.log(`Department '${departmentName}' added successfully.`);
                                    mainPrompt();
                                })
                                .catch(error => {
                                    console.error('Error adding department:', error);
                                    mainPrompt();
                                });
                        });
                    break;
                case "View all employees":
                    viewEmployees()
                    .then(result => {
                        const employees = result.rows.map(row => ({
                            employee_id: row.employee_id,
                            first_name: row.first_name,
                            last_name: row.last_name,
                            job_title: row.job_title,
                            department: row.department,
                            salary: row.salary,
                            manager: row.manager
                        }));
                        console.table(employees);
                        mainPrompt();
                    })
                    .catch(error => {
                        console.error('Error viewing employees:', error);
                        mainPrompt();
                    });
                    break;
                case "Add a role":
                    inquirer
                        .prompt([
                            {
                                type: 'input',
                                name: 'title',
                                message: 'Enter the name of the new role:'
                            },
                            {
                                type: 'input',
                                name: 'salary',
                                message: 'Enter the salary for the new role:'
                            },
                            {
                                type: 'input',
                                name: 'departmentId',
                                message: 'Enter the department ID for the new role:'
                            }
                        ])
                        .then((answers) => {
                            const { title, salary, departmentId } = answers;
                            addRole(title, salary, departmentId)
                                .then(() => {
                                    console.log(`Role '${title}' added successfully.`);
                                    mainPrompt();
                                })
                                .catch(error => {
                                    console.error('Error adding role:', error);
                                    mainPrompt();
                                });
                        });
                    break;
                
                    case "Add an employee":
                        inquirer
                            .prompt([
                                {
                                    type: 'input',
                                    name: 'firstName',
                                    message: 'Enter the employee\'s first name:'
                                },
                                {
                                    type: 'input',
                                    name: 'lastName',
                                    message: 'Enter the employee\'s last name:'
                                },
                                {
                                    type: 'input',
                                    name: 'roleId',
                                    message: 'Enter the role ID for the employee:'
                                },
                                {
                                    type: 'input',
                                    name: 'managerId',
                                    message: 'Enter the manager ID for the employee (leave empty if none):'
                                }
                            ])
                            .then((answers) => {
                                const { firstName, lastName, roleId, managerId } = answers;
                                addEmployee(firstName, lastName, roleId, managerId)
                                    .then(() => {
                                        console.log(`Employee '${firstName} ${lastName}' added successfully.`);
                                        mainPrompt();
                                    })
                                    .catch(error => {
                                        console.error('Error adding employee:', error);
                                        mainPrompt();
                                    });
                            });
                        break;

                        case "Update an employee role":
                        getAllEmployees()
                            .then(result => {
                                const employeeChoices = result.rows.map(row => ({
                                    name: `${row.first_name} ${row.last_name}`,
                                    value: row.id
                                }));
                        getAllRoles()
                            .then(roleResult => {
                                const roleChoices = roleResult.rows.map(row => ({
                                    name: row.title,
                                    value: row.id
                                }));
                                inquirer
                                    .prompt([
                                        {
                                            type: 'list',
                                            name: 'employeeId',
                                            message: 'Select the employee you want to update:',
                                            choices: employeeChoices
                                        },
                                        {
                                            type: 'list',
                                            name: 'roleId',
                                            message: 'Select the new role for the employee:',
                                            choices: roleChoices
                                        }
                                    ])
                                    .then((answers) => {
                                        const { employeeId, roleId } = answers;
                                        updateEmployeeRole(employeeId, roleId)
                                            .then(() => {
                                                console.log('Employee role updated successfully.');
                                                mainPrompt();
                                            })
                                            .catch(error => {
                                                console.error('Error updating employee role:', error);
                                                mainPrompt();
                                            });
                                    });
                            })
                            .catch(error => {
                                console.error('Error fetching roles:', error);
                                mainPrompt();
                            });
                            })
                            .catch(error => {
                                console.error('Error fetching employees:', error);
                                mainPrompt();
                            });
                        break;
                    default:
                    console.log("Invalid choice");
                    mainPrompt(); 
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

mainPrompt();