const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const fs = require("fs");

function welcomeScreen() {
  console.log(`
  ______                 _                         _____        __        _____       _             __               
 |  ____|               | |                       |_   _|      / _|      |_   _|     | |           / _|              
 | |__   _ __ ___  _ __ | | ___  _   _  ___  ___    | |  _ __ | |_ ___     | |  _ __ | |_ ___ _ __| |_ __ _  ___ ___ 
 |  __| | '_ ' _ \\| '_ \\| |/ _ \\| | | |/ _ \\/ _ \\   | | | '_ \\|  _/ _ \\    | | | '_ \\| __/ _ \\ '__|  _/ _' |/ __/ _ \\
 | |____| | | | | | |_) | | (_) | |_| |  __/  __/  _| |_| | | | || (_) |  _| |_| | | | ||  __/ |  | || (_| | (_|  __/
 |______|_| |_| |_| .__/|_|\\___/ \\__, |\\___|\\___| |_____|_| |_|_| \\___/  |_____|_| |_|\\__\\___|_|  |_| \\__,_|\\___\\___|
                  | |             __/ |                                                                              
                  |_|            |___/                                                                               
    `);
}
function init() {
  welcomeScreen();
  centralPrompt();
}

function centralPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Departments",
          "View All Roles",
          "Add Employee",
          "Add Department",
          "Add Role",
          "Change Employee's Role",
          "Change Employee's Direct Manager",
          "Change Employee's Name",
          "I'm done",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Role":
          addRole();
          break;
        case "Change Employee's Role":
          changeEmployeeRole();
          break;
        case "Change Employee's Direct Manager":
          changeEmployeeDirectManager();
          break;
        case "Change Employee's Name":
          changeEmployeeName();
          break;
        default:
          process.exit;
      }
    });
}

function dbQuery(queryString, tableHeaderString) {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tarnishedParrot1@3",
    database: "employee_info",
  });
  conn.query(queryString, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`\n\n ${tableHeaderString} \n`);
      console.table(result);
    }
    conn.end();
    centralPrompt();
  });
}

function dbAction(queryString, actionDescription, insertedType) {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tarnishedParrot1@3",
    database: "employee_info",
  });
  conn.query(queryString, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(
        `\n\n You successfully ${actionDescription} a${insertedType}! \n`
      );
    }
    conn.end();
    centralPrompt();
  });
}

async function dbQueryReturnBoolean(queryString, whereClauseParam) {
  let query = new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "tarnishedParrot1@3",
      database: "employee_info",
    });
    conn.query(queryString, whereClauseParam, (err, result) => {
      conn.end();
      if (err) {
        console.log(err);
      } else if (result.length) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
  const value = await query;
  return value;
}

async function createRoleList() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tarnishedParrot1@3",
    database: "employee_info",
  });
  let parsedResult = [];
  conn.query(
    `SELECT role.title AS "name", role.id AS "value" FROM employee_info.role;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((element) => {
          {
            parsedResult.push({ name: element.name, value: element.value });
          }
        });
      }
    }
  );
  conn.end();
  return parsedResult;
}

async function createManagerList() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tarnishedParrot1@3",
    database: "employee_info",
  });
  let parsedResult = [];
  conn.query(
    `SELECT concat(first_name, " ", last_name) AS "name", id AS "value" FROM employee_info.employee;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((element) => {
          {
            parsedResult.push({ name: element.name, value: element.value });
          }
        });
      }
    }
  );
  conn.end();
  parsedResult.unshift({ name: "None", value: "null" });
  return parsedResult;
}

async function createDepartmentList() {
  const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "tarnishedParrot1@3",
    database: "employee_info",
  });
  let parsedResult = [];
  conn.query(
    `SELECT name AS "name", id AS "value" FROM department;`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        result.forEach((element) => {
          {
            parsedResult.push({ name: element.name, value: element.value });
          }
        });
      }
    }
  );
  conn.end();
  return parsedResult;
}

async function createEmployeeList() {
  const promise = new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "tarnishedParrot1@3",
      database: "employee_info",
    });
    let parsedResult = [];
    conn.query(
      `SELECT CONCAT(last_name,", ", first_name) AS "name", id AS "value" FROM employee;`,
      (err, result) => {
        conn.end();
        if (err) {
          console.log(err);
          reject(err);
        } else {
          result.forEach((element) => {
            {
              parsedResult.push({ name: element.name, value: element.value });
            }
          });
          resolve(parsedResult);
        }
      }
    );
  });
  const finalResult = await promise;
  return finalResult;
}

function viewAllEmployees() {
  dbQuery(
    `SELECT em.id AS "ID", concat(em.last_name,", ", em.first_name) AS "Name", department.name AS "Department", role.title AS "Position Title", concat("$",role.salary) AS "Salary", concat(ma.last_name,", ", ma.first_name) AS "Direct Manager"
FROM employee em
LEFT JOIN role ON em.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee ma ON ma.id = em.manager_id
ORDER BY department.id ASC,role.id ASC, em.manager_id ASC;`,
    "Table of All Employees"
  );
}

function viewAllDepartments() {
  dbQuery(
    `SELECT department.id AS "ID", department.name AS "Department",count(deptIDSalaryTotals.deptID) AS "Number of Roles in Department", sum(deptIDSalaryTotals.total_employees) AS "Number of Employees in Department", CONCAT("$",SUM(deptIDSalaryTotals.role_total)) AS "Total Salary Committed to Department"
FROM (SELECT role.department_id AS deptID, (count(employee.id)*role.salary) AS role_total, count(employee.id) AS total_employees
from employee
INNER JOIN role on employee.role_id = role.id
group by role.title) AS deptIDSalaryTotals
LEFT JOIN department ON deptIDSalaryTotals.deptID = department.id
GROUP BY deptIDSalaryTotals.deptID;`,
    "Table of All Departments"
  );
}

function viewAllRoles() {
  dbQuery(
    `SELECT 
    role.id AS 'ID',
    role.title AS 'Title',
    role.salary AS 'Salary',
    COUNT(employee.id) AS 'Number of Employees in Role',
    department.name AS 'Department'
    FROM role 
    LEFT JOIN employee ON role.id = employee.role_id
    LEFT JOIN department ON role.department_id = department.id
    GROUP BY role.id;`,
    `Table of All Roles`
  );
}

async function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What's the employee's first name?",
        validate(answer) {
          if (!answer) {
            return "You must enter a first name here.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "What's the employee's last name?",
        validate(answer) {
          if (!answer) {
            return "You must enter a last name here.";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "role_id",
        message: "What is the employee's role?",
        choices: await createRoleList(),
      },
      {
        type: "list",
        name: "manager_ID",
        message: "Who is the employee's direct manager?",
        choices: await createManagerList(),
      },
    ])
    .then((answers) => {
      dbAction(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("${answers.first_name}", "${answers.last_name}", ${answers.role_id} , ${answers.manager_ID});`,
        "added",
        "n employee"
      );
    });
}

async function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add?",
        validate: async function (answer) {
          const result = await dbQueryReturnBoolean(
            `SELECT name FROM department WHERE name = ?;`,
            answer
          );
          if (result) {
            return "This department name has already been created!";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      dbAction(
        `INSERT INTO department (name) 
VALUES ("${answers.name}");`,
        "added",
        " department"
      );
    });
}

async function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role would you like to add?",
        validate: async function (answer) {
          const result = await dbQueryReturnBoolean(
            `SELECT title FROM role WHERE title = ?;`,
            answer
          );
          if (result) {
            return "This role has already been created!";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What salary should this new role have?",
        validate: function (answer) {
          if (isNaN(parseInt(answer)) || answer < 50000) {
            return "You must input an integer above 50000";
          }
          return true;
        },
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department is this role in?",
        choices: await createDepartmentList(),
      },
    ])
    .then((answers) => {
      dbAction(
        `INSERT INTO role (title,salary,department_id) VALUES ("${
          answers.title
        }", "${parseInt(answers.salary)}", ${answers.department_id});`,
        "added",
        " role"
      );
    });
}

async function changeEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "What is the employee's name?",
        choices: await createEmployeeList(),
      },
      {
        type: "list",
        name: "role_id",
        message: "What do you want the employee's new role to be?",
        choices: await createRoleList(),
      },
    ])
    .then((answers) => {
      dbAction(
        `UPDATE employee SET role_id = ${answers.role_id} WHERE id = ${answers.employee_id};`,
        "updated",
        " role"
      );
    });
}

async function changeEmployeeDirectManager() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "What is the employee's name?",
        choices: await createEmployeeList(),
      },
      {
        type: "list",
        name: "manager_id",
        message: "Who do you want the employee's new manager to be?",
        choices: await createEmployeeList(),
      },
    ])
    .then((answers) => {
      dbAction(
        `UPDATE employee SET manager_id = ${answers.employee_id} WHERE id = ${answers.employee_id};`,
        "updated",
        " manager"
      );
    });
}

async function changeEmployeeName() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "employee_id",
        message: "What is the employee's current name?",
        choices: await createEmployeeList(),
      },
      {
        type: "input",
        name: "first_name",
        message: "What's the employee's new first name?",
        validate(answer) {
          if (!answer) {
            return "You must enter a first name here.";
          }
          return true;
        },
      },
      {
        type: "input",
        name: "last_name",
        message: "What's the employee's new last name?",
        validate(answer) {
          if (!answer) {
            return "You must enter a last name here.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      dbAction(
        `UPDATE employee SET first_name = "${answers.first_name}", last_name = "${answers.last_name}" WHERE id = ${answers.employee_id};`,
        "updated",
        "n employee's name"
      );
    });
}

// need to add placeholders (?) to all queries
init();
