-- 1. Create a procedure to calculate the average salary of employees in a given department.
DELIMITER //
CREATE PROCEDURE CalculateAverageSalary (IN department_id_param INT)
BEGIN
    SELECT AVG(salary) AS average_salary
    FROM employees
    WHERE department_id = department_id_param;
END //
DELIMITER ;

-- CALL CalculateAverageSalary(1);

-- 2. Write a procedure to update the salary of an employee by a specified percentage.
DELIMITER //
CREATE PROCEDURE UpdateSalaryByPercentage (IN emp_id_param INT, IN percentage DECIMAL(5,2))
BEGIN
    UPDATE employees
    SET salary = salary * (1 + percentage/100)
    WHERE emp_id = emp_id_param;
END //
DELIMITER ;

-- 3. Create a procedure to list all employees in a given department.
DELIMITER //
CREATE PROCEDURE ListEmployeesInDepartment (IN department_id_param INT)
BEGIN
    SELECT *
    FROM employees
    WHERE department_id = department_id_param;
END //
DELIMITER ;

-- 4. Write a procedure to calculate the total budget allocated to a specific project.
DELIMITER //
CREATE PROCEDURE CalculateTotalBudgetForProject (IN project_id_param INT)
BEGIN
    SELECT SUM(budget) AS total_budget
    FROM projects
    WHERE project_id = project_id_param;
END //
DELIMITER ;

-- 5. Create a procedure to find the employee with the highest salary in a given department.
DELIMITER //
CREATE PROCEDURE FindEmployeeWithHighestSalary (IN department_id_param INT)
BEGIN
    SELECT *
    FROM employees
    WHERE department_id = department_id_param
    ORDER BY salary DESC
    LIMIT 1;
END //
DELIMITER ;

-- 6. Write a procedure to list all projects that are due to end within a specified number of days.
DELIMITER //
CREATE PROCEDURE ListProjectsEndingWithinDays (IN num_days INT)
BEGIN
    SELECT *
    FROM projects
    WHERE end_date <= DATE_ADD(CURRENT_DATE(), INTERVAL num_days DAY);
END //
DELIMITER ;

-- Call ListProjectsEndingWithinDays(-500);

-- 7. Create a procedure to calculate the total salary expenditure for a given department.
DELIMITER //
CREATE PROCEDURE CalculateTotalSalaryExpenditure (IN department_id_param INT)
BEGIN
    SELECT SUM(salary) AS total_salary_expenditure
    FROM employees
    WHERE department_id = department_id_param;
END //
DELIMITER ;

-- 8. Write a procedure to generate a report listing all employees along with their department and salary details.
DELIMITER //
CREATE PROCEDURE GenerateEmployeeReport ()
BEGIN
    SELECT e.emp_id, e.first_name, e.last_name, d.department_name, e.salary
    FROM employees e
    JOIN departments d ON e.department_id = d.department_id;
END //
DELIMITER ;

-- 9. Create a procedure to find the project with the highest budget.
DELIMITER //
CREATE PROCEDURE FindProjectWithHighestBudget ()
BEGIN
    SELECT *
    FROM projects
    ORDER BY budget DESC
    LIMIT 1;
END //
DELIMITER ;

-- 10. Write a procedure to calculate the average salary of employees across all departments.
DELIMITER //
CREATE PROCEDURE CalculateOverallAverageSalary ()
BEGIN
    SELECT AVG(salary) AS overall_average_salary
    FROM employees;
END //
DELIMITER ;


-- 11. Create a procedure to assign a new manager to a department and update the manager_id in the departments table.
DELIMITER //
CREATE PROCEDURE AssignNewManagerToDepartment (IN department_id_param INT, IN new_manager_id INT)
BEGIN
    UPDATE departments
    SET manager_id = new_manager_id
    WHERE department_id = department_id_param;
END //
DELIMITER ;

-- 12. Write a procedure to calculate the remaining budget for a specific project.
DELIMITER //
CREATE PROCEDURE CalculateRemainingBudget (IN project_id_param INT)
BEGIN
    SELECT budget remaining_budget
    FROM projects p;
END //
DELIMITER ;

call CalculateRemainingBudget(101);

-- 13. Create a procedure to generate a report of employees who joined the company in a specific year.
DELIMITER //
CREATE PROCEDURE GenerateEmployeeJoinYearReport (IN join_year INT)
BEGIN
    SELECT *
    FROM employees
    ;
END //
DELIMITER ;

call GenerateEmployeeJoinYearReport(1997);

-- 14. Write a procedure to update the end date of a project based on its start date and duration.
DELIMITER //
CREATE PROCEDURE UpdateEndDateBasedOnDuration (IN project_id_param INT, IN duration INT)
BEGIN
    UPDATE projects
    SET end_date = DATE_ADD(start_date, INTERVAL duration DAY)
    WHERE project_id = project_id_param;
END //
DELIMITER ;

call UpdateEndDateBasedOnDuration(101,22);


-- 15. Create a procedure to calculate the total number of employees in each department.
DELIMITER //
CREATE PROCEDURE CalculateTotalEmployeesInEachDepartment ()
BEGIN
    SELECT department_id, COUNT(*) AS total_employees
    FROM employees
    GROUP BY department_id;
END //
DELIMITER ;

call CalculateTotalEmployeesInEachDepartment();
