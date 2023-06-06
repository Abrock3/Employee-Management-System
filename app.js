const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tarnishedParrot1@3",
  database: "employee_info",
});
// this gets called at the bottom of the page and will kick off the program, displaying a title and bringing the user
// to the central prompt
function init() {
  welcomeScreen();
  centralPrompt();
}

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

// All other functions lead back to this one
// this function uses inquirer to give the user options to view and manipulate the database
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
          process.exit(0);
      }
    });
}

// this was used in all functions that are simply calling for and displaying a table of data
async function dbSelectQuery(queryString, tableHeaderString) {
  conn
    .promise()
    .query(queryString)
    .then(([rows]) => {
      console.log(`\n\n ${tableHeaderString} \n`);
      console.table(rows);
    })
    .catch(console.log)
    .then(() => {
      centralPrompt();
    });
}

// This is called whenever the user wants to update or insert data into a table.
function dbAction(
  queryString,
  actionDescription,
  insertedType,
  firstPlaceholder,
  p2,
  p3,
  p4
) {
  // We use placeholders to heighten database security; this can prevent SQL injections
  conn.query(queryString, [firstPlaceholder, p2, p3, p4], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        console.log("\nThe entry you tried to input already exists!\n");
      } else {
        console.log(err);
      }
    } else {
      console.log(
        `\n\n You successfully ${actionDescription} a${insertedType}! \n`
      );
    }
    centralPrompt();
  });
}

// this was used to create a list of roles in the choice list for two inquirer prompts
async function createRoleList() {
  // I needed to use promises in all of the "Create" functions to ensure that the db query was given time to resolve
  // There are other ways to create a promise-wrapped db query (see dbSelectQuery), but this works similarly
  const promise = new Promise((resolve, reject) => {
    conn.query(
      `SELECT role.title AS "name", role.id AS "value" FROM employee_info.role ORDER BY role.title;`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          resolve(result);
        }
      }
    );
  });
  return await promise;
}

// this was used to create a list of possible managers in the choice list for two inquirer prompts
async function createManagerList() {
  const promise = new Promise((resolve, reject) => {
    conn.query(
      `SELECT concat(first_name, " ", last_name) AS "name", id AS "value" FROM employee_info.employee ORDER BY first_name;`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          resolve(result);
        }
      }
    );
  });
  const result = await promise;
  result.unshift({ name: "None", value: null });
  return result;
}

// this was used to create a list of possible departments in the choice list for an inquirer prompt
async function createDepartmentList() {
  const promise = new Promise((resolve, reject) => {
    conn.query(
      `SELECT name AS "name", id AS "value" FROM department ORDER BY name;`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          resolve(result);
        }
      }
    );
  });
  return await promise;
}

// this was used to create a list of possible employees in the choice list for three inquirer prompts
async function createEmployeeList() {
  const promise = new Promise((resolve, reject) => {
    conn.query(
      `SELECT CONCAT(last_name,", ", first_name) AS "name", id AS "value" FROM employee ORDER BY last_name;`,
      (err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
  return await promise;
}

// uses dbSelectQuery to print all employees and their relevant info
async function viewAllEmployees() {
  await dbSelectQuery(
    `SELECT em.id AS "ID", concat(em.last_name,", ", em.first_name) AS "Name", department.name AS "Department", role.title AS "Position Title", concat("$",role.salary) AS "Salary", concat(ma.last_name,", ", ma.first_name) AS "Direct Manager"
FROM employee em
LEFT JOIN role ON em.role_id = role.id
LEFT JOIN department ON role.department_id = department.id
LEFT JOIN employee ma ON ma.id = em.manager_id
ORDER BY department.id ASC, role.id ASC, em.manager_id ASC;`,
    "Table of All Employees"
  );
}

// uses dbSelectQuery to print all departments and their relevant info
async function viewAllDepartments() {
  await dbSelectQuery(
    `SELECT department.id AS "ID", department.name AS "Department",count(deptIDSalaryTotals.deptID) AS "Number of Roles in Department", sum(deptIDSalaryTotals.total_employees) AS "Number of Employees in Department", CONCAT("$",SUM(deptIDSalaryTotals.role_total)) AS "Total Salary Committed to Department"
FROM (SELECT role.department_id AS deptID, (count(employee.id)*role.salary) AS role_total, count(employee.id) AS total_employees
from employee
CROSS JOIN role on employee.role_id = role.id
group by role.title) AS deptIDSalaryTotals
CROSS JOIN department ON deptIDSalaryTotals.deptID = department.id
GROUP BY deptIDSalaryTotals.deptID;`,
    "Table of All Departments"
  );
}

// uses dbSelectQuery to print all roles and their relevant info
async function viewAllRoles() {
  await dbSelectQuery(
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

// uses inquirer to gather information about a new employee, validate it, then insert it into the employee table
async function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first_name",
        message: "What's the employee's first name?",
        validate: (answer) => {
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
        validate: (answer) => {
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
        // these choices require a db query to generate them, so I called them with await; otherwise no choices would be displayed, as the query wasn't complete yet
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
      // dbAction is called to accomplish the insertion
      dbAction(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES (?,?,?,?);`,
        "added",
        "n employee",
        answers.first_name,
        answers.last_name,
        answers.role_id,
        answers.manager_ID
      );
    });
}

// this function uses inquirer to get a new department name from the user, validates it, and inserts it into the department table
async function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What department would you like to add?",
        validate: (answer) => {
          if (!answer) {
            return "You must input a Department name.";
          } else {
            return true;
          }
        },
      },
    ])
    .then((answers) => {
      // dbAction will handle the insertion and succes message (if applicable) for us
      dbAction(
        `INSERT INTO department (name) 
VALUES (?);`,
        "added",
        " department",
        answers.name
      );
    });
}

// this function uses inquirer to get a new role name from the user, validates it, gets the department
// and inserts it into the department table
async function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What role would you like to add?",
        validate: (answer) => {
          // this ensures that the user cannot enter a falsy value (such as a blank string)
          if (!answer) {
            return "You must input a Department name.";
          } else {
            return true;
          }
        },
      },
      {
        type: "input",
        name: "salary",
        message: "What salary should this new role have?",
        validate: (answer) => {
          // this ensures that the user cannot enter a falsy value, and that they can't enter a value under 50,000
          if (isNaN(parseInt(answer)) || parseInt(answer) < 50000) {
            return "You must input an integer above 50000, with no commas or other symbols.";
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
      // dbAction will handle the insertion and succes message (if applicable) for us
      dbAction(
        `INSERT INTO role (title,salary,department_id) VALUES (?, ?, ?);`,
        "added",
        " role",
        answers.title,
        parseInt(answers.salary),
        answers.department_id
      );
    });
}

// this function will use inquirer to prompt the user to select an employee and a role, then updates their role using that info
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
        `UPDATE employee SET role_id = ? WHERE id = ?;`,
        "updated",
        " role",
        answers.role_id,
        answers.employee_id
      );
    });
}

// this function will use inquirer to prompt the user to select an employee, select another employee to be their manager then updates their row using that info
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
        choices: await createManagerList(),
      },
    ])
    .then((answers) => {
      dbAction(
        `UPDATE employee SET manager_id = ? WHERE id = ?;`,
        "updated",
        " manager",
        answers.manager_id,
        answers.employee_id
      );
    });
}
// this function will use inquirer to prompt the user to select an employee, input a valid name, then updates their row using that info
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
        validate: (answer) => {
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
        validate: (answer) => {
          if (!answer) {
            return "You must enter a last name here.";
          }
          return true;
        },
      },
    ])
    .then((answers) => {
      dbAction(
        `UPDATE employee SET first_name = ?, last_name = ? WHERE id = ?;`,
        "updated",
        "n employee's name",
        answers.first_name,
        answers.last_name,
        answers.employee_id
      );
    });
}

init();
