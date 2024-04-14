-- 1. Write a query to display the first name and last name of all students.
SELECT first_name, last_name FROM students;

-- 2. List all course names along with their credit hours.
SELECT course_name, credit_hours FROM courses;

-- 3. Display the first name, last name, and email of all instructors.
SELECT first_name, last_name, email FROM instructors;

-- 4. Show the course names and grades of all students.
SELECT c.course_name, e.grade 
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id;

-- 5. List the first name, last name, and city of all students.
SELECT first_name, last_name, city FROM students;

-- 6. Display the course names and instructor names for all courses.
SELECT c.course_name, CONCAT(i.first_name, ' ', i.last_name) AS instructor_name
FROM courses c
JOIN instructors i ON c.instructor_id = i.instructor_id;

-- 7. Show the first name, last name, and age of all students.
SELECT first_name, last_name, age FROM students;

-- 8. List the course names and enrollment dates of all students.
SELECT c.course_name, e.enrollment_date
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id;

-- 9. Display the instructor names and email addresses for all instructors.
SELECT first_name, last_name, email FROM instructors;

-- 10. Show the course names and credit hours for all courses.
SELECT course_name, credit_hours FROM courses;

-- 11. List the first name, last name, and email of the instructor for 'Mathematics' course.
SELECT i.first_name, i.last_name, i.email 
FROM instructors i
JOIN courses c ON i.instructor_id = c.instructor_id
WHERE c.course_name = 'Mathematics';

-- 12. Display the course names and grades for all students with a grade of 'A'.
SELECT c.course_name, e.grade 
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
WHERE e.grade = 'A';

-- 13. Show the first name, last name, and state of students enrolled in 'Computer Science' course.
SELECT s.first_name, s.last_name, s.state 
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id
WHERE c.course_name = 'Computer Science';

-- 14. List the course names and enrollment dates for all students with a grade of 'B+'.
SELECT c.course_name, e.enrollment_date 
FROM enrollments e
JOIN courses c ON e.course_id = c.course_id
WHERE e.grade = 'B+';

-- 15. Display the instructor names and email addresses for instructors teaching courses with more than 3 credit hours.
SELECT i.first_name, i.last_name, i.email 
FROM instructors i
JOIN courses c ON i.instructor_id = c.instructor_id
WHERE c.credit_hours > 3;
