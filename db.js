const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  password: 'pass',
  host: 'localhost',
  database: 'work_db'
});

pool.connect();

function viewDepartments() {
    const query = 'SELECT id, name FROM department';
    return pool.query(query);
}

function viewRoles() {
    const query = 'SELECT id, title, department_id, salary FROM role';
    return pool.query(query);
}

function viewEmployees() {
    const query = `
        SELECT 
            e.id AS employee_id,
            e.first_name,
            e.last_name,
            r.title AS job_title,
            d.name AS department,
            r.salary,
            CONCAT(m.first_name, ' ', m.last_name) AS manager
        FROM 
            employee e
        LEFT JOIN 
            role r ON e.role_id = r.id
        LEFT JOIN 
            department d ON r.department_id = d.id
        LEFT JOIN 
            employee m ON e.manager_id = m.id;
    `;
    return pool.query(query);
}
function addDepartment(departmentName) {
    const query = 'INSERT INTO department (name) VALUES ($1)';
    return pool.query(query, [departmentName]);
}
function addRole(title, salary, departmentId) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    return pool.query(query, [title, salary, departmentId]);
}
function addEmployee(firstName, lastName, roleId, managerId) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    return pool.query(query, [firstName, lastName, roleId, managerId]);
}
function updateEmployeeRole(employeeId, roleId) {
    const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    return pool.query(query, [roleId, employeeId]);
}
function getAllEmployees() {
    const query = 'SELECT id, first_name, last_name FROM employee';
    return pool.query(query);
}
function getAllRoles() {
    const query = 'SELECT id, title FROM role';
    return pool.query(query);
}

module.exports = {
  viewDepartments,
  viewRoles,
  viewEmployees,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
  getAllEmployees,
  getAllRoles
};