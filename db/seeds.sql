/* This file will fill the tables in employee_info with rows of data to create a fake company */

INSERT INTO
    department (name)
VALUES
    ("Accounting"),
    ("Sanitation"),
    ("Gator Acquisition"),
    ("Gator Handling"),
    ("Gator Training"),
    ("Gator Cybernetics Installation"),
    ("Sales"),
    ("Gator Accident Management"),
    ("Public Relations"),
    ("Legal");

INSERT INTO
    role (title, salary, department_id)
VALUES
    ("CFO", 200000.00, 1),
    ("Treasurer", 190000.00, 1),
    ("Internal Auditor", 150000.00, 1),
    ("Managerial Accountant", 100000.00, 1),
    ("Financial Accountant", 100000.00, 1),
    ("Tax Accountant", 100000.00, 1),
    ("VP of Sanitation Affairs", 190000.00, 2),
    (
        "Assistant to the VP of Sanitation Affairs",
        120000.00,
        2
    ),
    ("Internal Sanitation Inspector", 150000.00, 2),
    ("Gator Pen Sanitation Specialist", 120000.00, 2),
    ("Electric Fence Scrubber", 130000.00, 2),
    (
        "Unintentional Animal Excursion Cleanup Technician",
        190000.00,
        2
    ),
    ("Sanitation Supervisor", 150000.00, 2),
    ("Covert 'Trash' Disposal Expert", 150000.00, 2),
    ("VP of Acquisitions", 190000.00, 3),
    ("Acquisitions Supervisor", 150000.00, 3),
    ("Gator Trapper", 90000.00, 3),
    ("Junior Gator Trapper", 50000.00, 3),
    ("Gator Onboarding Specialist", 120000.00, 4),
    ("Gator Wellbeing Facilitator", 100000.00, 4),
    ("Gator Behavior Enforcer", 110000.00, 5),
    ("Gator Behavioral Specialist", 150000.00, 5),
    ("Operant Conditioning Expert", 120000.00, 5),
    ("Reptile Augmentation Technician", 150000.00, 6),
    (
        "Senior Reptile Augmentation Technician",
        200000.00,
        6
    ),
    ("Augmentation Quality Auditor", 50000.00, 6),
    ("VP of Sales", 190000.00, 7),
    ("Sales Supervisor", 130000.00, 7),
    ("Sales Representative", 120000.00, 7),
    (
        "Business Developement Representative",
        120000.00,
        7
    ),
    (
        "Enhanced Animal Pacification Contractor",
        250000.00,
        8
    ),
    ("Reptile Conveyance Contractor", 190000.00, 8),
    ("Eyewitness Handling Contractor", 230000.00, 8),
    ("Public Relations Manager", 200000.00, 9),
    (
        "Unfavorable Event Disengagement Specialist",
        150000.00,
        9
    ),
    ("Social Media Suppression Expert", 150000.00, 9),
    ("General Counsel", 200000.00, 10),
    ("Assistant General Counsel", 150000.00, 10),
    ("Legal Counsel", 140000.00, 10),
    ("Compliance Manager", 120000.00, 10),
    ("Legal Practitioner of Swamp Law", 250000.00, 10),
    ("Paralegal", 80000.00, 10);

INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    ('Mable', 'Figueroa', 1, null),
    ('Otis', 'Carr', 2, 1),
    ('Ellis', 'Ortiz', 3, 1),
    ('Shelley', 'White', 3, 1),
    ('Jonathan', 'Higgins', 4, 1),
    ('Jasmine', 'Blake', 5, 1),
    ('Jana', 'Palmer', 5, 1),
    ('Salvador', 'Casey', 6, 1),
    ('Thelma', 'Williamson', 7, null),
    ('Casey', 'Vargas', 8, 9),
    ('Sherri', 'Schneider', 8, 9),
    ('Ora', 'Wilson', 9, 9),
    ('Mario', 'Ingram', 13, 9),
    ('Kelli', 'Banks', 13, 9),
    ('Timmy', 'West', 11, 13),
    ('Beth', 'Thompson', 11, 13),
    ('Melissa', 'Lane', 11, 14),
    ('Lonnie', 'Patrick', 11, 14),
    ('Laura', 'Lloyd', 11, 14),
    ('Dianne', 'Franklin', 12, 13),
    ('Sheila', 'Wolfe', 12, 13),
    ('Marian', 'Elliott', 12, 14),
    ('Wilbur', 'Watts', 12, 14),
    ('Suzanne', 'Ward', 12, 13),
    ('Bernice', 'Terry', 10, 13),
    ('Ryan', 'Hayes', 10, 14),
    ('Tyler', 'Ford', 10, 14),
    ('Beulah', 'Todd', 10, 13),
    ('Carlton', 'King', 14, 9),
    ('Bradley', 'Cooper', 14, 9),
    ('Shawn', 'Sandoval', 14, 9),
    ('Rogelio', 'Cross', 15, null),
    ('Crystal', 'Welch', 16, 32),
    ('Myron', 'Aguilar', 16, 32),
    ('Pearl', 'Harvey', 17, 33),
    ('John', 'Valdez', 17, 33),
    ('Pedro', 'Turner', 17, 34),
    ('Randy', 'Gibson', 17, 34),
    ('Oliver', 'Watkins', 17, 33),
    ('Jaime', 'Caldwell', 18, 34),
    ('Oscar', 'Rowe', 18, 33),
    ('Jeremiah', 'Moody', 19, null),
    ('Fernando', 'Soto', 20, 42),
    ('Juan', 'Edwards', 20, 42),
    ('Lucille', 'Garza', 21, 42),
    ('Terrell', 'Little', 22, 45),
    ('Dana', 'Rice', 22, 45),
    ('Ernestine', 'Garrett', 22, 45),
    ('Jodi', 'Jefferson', 23, 45),
    ('Juanita', 'Miller', 23, 45),
    ('Terri', 'Hines', 25, 42),
    ('Merle', 'Arnold', 25, 42),
    ('Luz', 'Keller', 24, 51),
    ('Erin', 'Castro', 24, 51),
    ('Emanuel', 'Stokes', 24, 52),
    ('Lee', 'Barnes', 24, 52),
    ('Willard', 'Stephens', 26, 42),
    ('Gladys', 'Casey', 26, 42),
    ('Antonia', 'Hart', 27, null),
    ('Blake', 'Holloway', 28, 59),
    ('Linda', 'Stone', 28, 59),
    ('Dustin', 'Garner', 28, 59),
    ('Wallace', 'Colon', 29, 60),
    ('Spencer', 'Chambers', 29, 60),
    ('Calvin', 'Blake', 29, 60),
    ('Gertrude', 'Carroll', 29, 61),
    ('Jack', 'Diaz', 29, 61),
    ('Cindy', 'Ramirez', 29, 61),
    ('Maggie', 'Schwartz', 29, 62),
    ('Derek', 'Reese', 29, 62),
    ('Cora', 'Knight', 29, 62),
    ('Tina', 'Poole', 30, 59),
    ('Alice', 'Chapman', 30, 59),
    ('Robert', 'Muldoon', 31, null),
    ('Katashi', 'Hamada', 31, 74),
    ('Bennie', 'Norton', 31, 74),
    ('Marty', 'Clark', 32, 74),
    ('Donald', 'Armstrong', 32, 74),
    ('Della', 'Walker', 33, 74),
    ('Roberta', 'Bradley', 33, 74),
    ('Felipe', 'Lawson', 34, null),
    ('Alex', 'Bates', 35, 81),
    ('Milton', 'Vega', 35, 81),
    ('Tom', 'Collier', 35, 81),
    ('Shawna', 'Neal', 36, 81),
    ('Cathy', 'Richards', 36, 81),
    ('Deborah', 'Mills', 36, 81),
    ('Christie', 'Holt', 37, null),
    ('Kirk', 'Perkins', 38, 88),
    ('Lowell', 'Dawson', 38, 88),
    ('Mae', 'Guzman', 38, 88),
    ('Dwight', 'Evans', 39, 89),
    ('Jane', 'Jimenez', 39, 90),
    ('Delia', 'Hall', 39, 91),
    ('Orlando', 'Rose', 40, 88),
    ('Opal', 'Burton', 40, 88),
    ('Roderick', 'Cummings', 41, 89),
    ('Aaron', 'Wilkins', 41, 89),
    ('Pat', 'Duncan', 41, 90),
    ('Gregory', 'Hubbard', 41, 90),
    ('Sylvia', 'Luna', 41, 91),
    ('Marvin', 'Crawford', 41, 91),
    ('Gilberto', 'James', 42, 88),
    ('Gwen', 'Tyler', 42, 89),
    ('Elizabeth', 'Schmidt', 42, 90),
    ('Margaret', 'Sims', 42, 91),
    ('Troy', 'Morris', 42, 92),
    ('Renee', 'Singleton', 42, 93),
    ('Shaun', 'Stewart', 42, 94),
    ('Evan', 'Barber', 42, 95),
    ('Rosemarie', 'Hudson', 42, 96),
    ('Justin', 'West', 42, 97),
    ('Woodrow', 'Chavez', 42, 98),
    ('Leland', 'Perkins', 42, 99),
    ('Wallace', 'Pierce', 42, 100),
    ('Maggie', 'Collier', 42, 101),
    ('Earl', 'Fuller', 42, 102)
;