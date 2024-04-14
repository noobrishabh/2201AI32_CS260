-- 1. Create a trigger that automatically increases the salary by 10% for employees whose salary is below ?60000 when a new record is inserted into the employees table.
Delimiter //
CREATE TRIGGER salary_increase
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
  IF NEW.salary < 60000 THEN
    UPDATE employees
    SET salary = NEW.salary * 1.1
    WHERE emp_id = NEW.emp_id;
  END IF;
END;//
Delimiter ;

Delimiter //
-- 2. Create a trigger that prevents deleting records from the departments table if there are employees assigned to that department.
CREATE TRIGGER prevent_department_delete_trigger
BEFORE DELETE ON departments
FOR EACH ROW
BEGIN
    DECLARE employee_count INT Default 0;
    SELECT COUNT(*) INTO employee_count FROM employees WHERE department_id = OLD.department_id;
    IF employee_count > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cannot delete department with assigned employees';
    END IF;
END;//
Delimiter ;

-- 3. Write a trigger that logs the details of any salary updates (old salary, new salary, employee name, and date) into a separate audit table.
Delimiter //
CREATE TRIGGER salary_audit
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO audit_table (emp_id, old_salary, new_salary, employee_name, update_date)
  VALUES (OLD.emp_id, OLD.salary, NEW.salary, CONCAT(OLD.first_name, ' ', OLD.last_name), CURRENT_DATE);
END;
//
Delimiter ;


-- 4. Create a trigger that automatically assigns a department to an employee based on their salary range (e.g., salary <= ?60000 -> department_id = 3).
Delimiter //
CREATE TRIGGER department_assignment
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
  IF NEW.salary <= 60000 THEN
    UPDATE employees
    SET department_id = 3
    WHERE emp_id = NEW.emp_id;
  END IF;
END;
//
Delimiter ;

-- 5. Write a trigger that updates the salary of the manager (highest-paid employee) in each department whenever a new employee is hired in that department.
Delimiter //
CREATE TRIGGER update_manager_salary
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
  DECLARE manager_id INT;
  DECLARE max_salary DECIMAL(10,2);

  -- Find department of new employee
  SELECT department_id INTO manager_id
  FROM employees
  WHERE emp_id = NEW.emp_id;

  -- Find highest paid employee in that department
  SELECT MAX(salary) INTO max_salary
  FROM employees
  WHERE department_id = manager_id;

  -- Update manager salary if new employee has higher salary
  UPDATE employees
  SET salary = NEW.salary
  WHERE emp_id = manager_id AND salary = max_salary;
END;
//
Delimiter ;

-- 6. Create a trigger that prevents updating the department_id of an employee if they have worked on projects.
Delimiter //
CREATE TRIGGER prevent_department_change
BEFORE UPDATE ON employees
FOR EACH ROW
BEGIN
	Declare temp_count INT;
  SELECT COUNT(*) INTO temp_count
  FROM works_on
  WHERE emp_id = OLD.emp_id;

  IF temp_count > 0 AND OLD.department_id <> NEW.department_id THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT= 'Employee has project history. Cannot change department';
  END IF;
END;
//
Delimiter ;

-- 7. Write a trigger that calculates and updates the average salary for each department whenever a salary change occurs.
Delimiter //
CREATE TRIGGER update_department_average
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  DECLARE total_salary DECIMAL(10,2);
  DECLARE employee_count INT;

  -- Calculate total salary and employee count for department
  SELECT SUM(salary), COUNT(*)
  INTO total_salary, employee_count
  FROM employees
  WHERE department_id = OLD.department_id;

  -- Update department table with average salary
  UPDATE departments
  SET average_salary = total_salary / employee_count
  WHERE department_id = OLD.department_id;
END;
//
Delimiter ;

-- 8. Create a trigger that automatically deletes all records from the works_on table for an employee when that employee is deleted from the employees table.
Delimiter //
CREATE TRIGGER delete_works_on
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
  DELETE FROM works_on
  WHERE emp_id = OLD.emp_id;
END;
//
Delimiter ;

-- 9. Write a trigger that prevents inserting a new employee if their salary is less than the minimum salary set for their department.
Delimiter //
CREATE TRIGGER check_min_salary_trigger
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    DECLARE min_salary DECIMAL(10,2);
    SELECT MIN_salary INTO min_salary FROM departments WHERE department_id = NEW.department_id;
    IF NEW.salary < min_salary THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Employee salary is less than department minimum salary';
    END IF;
END;
//
Delimiter ;

-- 10. Create a trigger that automatically updates the total salary budget for a department whenever an employee's salary is updated.
Delimiter //
CREATE TRIGGER update_budget_trigger
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    DECLARE total_salary DECIMAL(10,2);
    SELECT SUM(salary) INTO total_salary FROM employees WHERE department_id = NEW.department_id;
    UPDATE departments SET budget = total_salary WHERE department_id = NEW.department_id;
END;//
Delimiter ;

-- 11. Write a trigger that sends an email notification to HR whenever a new employee is hired.
Delimiter //
CREATE TRIGGER send_email_notification_trigger
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    -- Code to send email notification to HR
END;
//
Delimiter ;

-- 12. Create a trigger that prevents inserting a new department if the location is not specified.
Delimiter //
CREATE TRIGGER check_location_trigger
BEFORE INSERT ON departments
FOR EACH ROW
BEGIN
    IF NEW.location IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Location must be specified for the department';
    END IF;
END;
//
Delimiter ;

-- 13. Write a trigger that updates the department_name in the employees table when the corresponding department_name is updated in the departments table.
Delimiter //
CREATE TRIGGER update_department_name_trigger
AFTER UPDATE ON departments
FOR EACH ROW
BEGIN
    UPDATE employees SET department_name = NEW.department_name WHERE department_id = NEW.department_id;
END;
//
Delimiter ;

-- 14. Create a trigger that logs all insert, update, and delete operations on the employees table into a separate audit table.
Delimiter //
CREATE TRIGGER LogEmployeeInserts
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
  INSERT INTO employee_audit (action, emp_id, first_name, last_name, salary, department_id, audit_time)
  VALUES ('INSERT', NEW.emp_id, NEW.first_name, NEW.last_name, NEW.salary, NEW.department_id, NOW());
END;
//
Delimiter ;

Delimiter //
CREATE TRIGGER LogEmployeeUpdates
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO employee_audit (action, emp_id, first_name, last_name, salary_before, salary_after, department_id_before, department_id_after, audit_time)
  VALUES ('UPDATE', OLD.emp_id, OLD.first_name, OLD.last_name, OLD.salary, NEW.salary, OLD.department_id, NEW.department_id, NOW());
END;//
Delimiter ;

Delimiter //
CREATE TRIGGER LogEmployeeDeletes
AFTER DELETE ON employees
FOR EACH ROW
BEGIN
  INSERT INTO employee_audit (action, emp_id, first_name, last_name, salary, department_id, audit_time)
  VALUES ('DELETE', OLD.emp_id, OLD.first_name, OLD.last_name, OLD.salary, OLD.department_id, NOW());
END; //
Delimiter ;

-- 15. Write a trigger that automatically generates an employee ID using a sequence whenever a new employee

Create table myseq(
	id int auto_increment primary key,
    name varchar(30)
);
Delimiter //
CREATE TRIGGER GenerateEmpID
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
  IF NEW.emp_id IS NULL THEN
	insert into myseq (name) values ("a");
    SET NEW.emp_id = Last_insert_id();
  END IF;
END;
//
Delimiter ;

