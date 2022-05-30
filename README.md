# Employee Management System
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This is a command line interface CMS that allows an unskilled user to create and manipulate employee data in a database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

    
## Installation:

Before use, from the command line the user must run "npm i" to install the packages necessary for function, then they must log into their mySQL terminal to source db/schema.sql(Note that if you have a local database named "employee_info", its contents will be deleted upon running schema.sql). If the user wishes to fill the database with data to test its functions, they should source db/seeds.sql. The user will then be ready to start the program by running "node app" from the command line.

## Usage

The user will be prompted to select a function to view or modify different elements of a database with tables full of employees, roles, and departments.

Video of the app functioning:

https://drive.google.com/file/d/1YI0yIb6SdugDDjXA-Fa04TQ0tBgN3B57/view?usp=sharing

Screenshot of the app during function:
![Screenshot](Assets/Images/Screenshot1.jpg?raw=true "Screenshot")

## Credits
The following npm packages were used to create this project:
Inquirer: https://www.npmjs.com/package/inquirer?.com
MySQL2: https://www.npmjs.com/package/mysql2
console.table: https://www.npmjs.com/package/console.table

I used http://random-name-generator.info/ to randomly generate most of the names in db/seeds.sql

I used a W3 schools tutorial to learn more about how async and await work: https://www.w3schools.com/js/js_async.asp

## License
      
Copyright 2022 Adam Brock
      
This software is licensed using the MIT license: https://opensource.org/licenses/MIT.

## Questions

Feel free to reach out to me with questions at a.paulbrock@gmail.com.

My GitHub profile is at https://github.com/abrock3.