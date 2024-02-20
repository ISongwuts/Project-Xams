CREATE DATABASE IF NOT EXISTS xams;

-- CREATE TABLE IF IT NOT EXIST --

USE xams;
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(20) PRIMARY KEY NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE,
    prefix ENUM('นาย', 'นางสาว', 'นาง') NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    password TEXT NOT NULL,
    tel VARCHAR(50) NOT NULL,
    personal_id VARCHAR(20) NOT NULL,
    role ENUM('teacher', 'student', 'admin') NOT NULL,
    created_at DATETIME NOT NULL
);

CREATE TABLE IF NOT EXISTS subjects (
    subject_id VARCHAR(20) NOT NULL,
    subject_name VARCHAR(255) NOT NULL,
    description TEXT NULL,
    user_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    CONSTRAINT owner_id PRIMARY KEY (subject_id, user_id)
);

CREATE TABLE IF NOT EXISTS studies_on (
    class_id VARCHAR(20) NOT NULL,
    class_name VARCHAR(255) NOT NULL,
    subject_id VARCHAR(20) NOT NULL,
    password VARCHAR(20) NULL,
    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id),
    CONSTRAINT studies_on_id PRIMARY KEY (class_id, subject_id)
);

CREATE TABLE IF NOT EXISTS create_assignment_description (
    description_id VARCHAR(20) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    description_file BLOB NULL
);

CREATE TABLE IF NOT EXISTS create_assignments (
    assignment_id VARCHAR(20) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    score FLOAT,
    description_id VARCHAR(20) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    class_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (description_id) REFERENCES create_assignment_description(description_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (class_id) REFERENCES studies_on(class_id)
);

CREATE TABLE IF NOT EXISTS submit_assignment_description (
    description_id VARCHAR(20) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    description_file BLOB NULL
);

CREATE TABLE IF NOT EXISTS submit_assignments (
    assignment_id VARCHAR(20) PRIMARY KEY NOT NULL,
    submit_date DATETIME NOT NULL,
    description_id VARCHAR(20) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    create_assignment_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (create_assignment_id) REFERENCES create_assignments(assignment_id),
    FOREIGN KEY (description_id) REFERENCES submit_assignment_description(description_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS return_assignment (
    assignment_id VARCHAR(20) NOT NULL,
    comment TEXT NULL,
    score FLOAT NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES submit_assignments(assignment_id)
);

CREATE TABLE IF NOT EXISTS examination_set (
    examination_set_id VARCHAR(20) PRIMARY KEY NOT NULL,
    examination_set_name VARCHAR(255) NOT NULL,
    status ENUM('publish', 'private'),
    user_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE IF NOT EXISTS create_examination (
    examination_id VARCHAR(20) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    subject_id VARCHAR(20) NOT NULL,
    class_id VARCHAR(20) NOT NULL,
    examination_set_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (examination_set_id) REFERENCES examination_set(examination_set_id)
);

CREATE TABLE IF NOT EXISTS set_in_examination (
    examination_id VARCHAR(20) NOT NULL,
    examination_set_id VARCHAR(20) NOT NULL,
    questions_num INT NOT NULL,
    FOREIGN KEY (examination_id) REFERENCES create_examination(examination_id),
    FOREIGN KEY (examination_set_id) REFERENCES examination_set(examination_set_id),
    CONSTRAINT set_in_examination_id PRIMARY KEY (examination_id, examination_set_id)
);

CREATE TABLE IF NOT EXISTS questions (
    question_id VARCHAR(20) PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image BLOB NULL,
    examination_set_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (examination_set_id) REFERENCES examination_set(examination_set_id)
);

CREATE TABLE IF NOT EXISTS choices (
    choice_id VARCHAR(20) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL,
    image BLOB NULL,
    score FLOAT NOT NULL,
    question_id VARCHAR(10) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(question_id)
);

CREATE TABLE IF NOT EXISTS choices_in_question(
    question_id VARCHAR(20) NOT NULL,
    choice_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (choice_id) REFERENCES choices(choice_id),
    CONSTRAINT choices_in_question_id PRIMARY KEY (question_id, choice_id)
);

CREATE TABLE IF NOT EXISTS student_on_questions (
    student_on_question_id VARCHAR(20) PRIMARY KEY NOT NULL,
    score FLOAT NOT NULL,
    question_id VARCHAR(20) NOT NULL,
    choice_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (question_id) REFERENCES questions(question_id),
    FOREIGN KEY (choice_id) REFERENCES choices(choice_id)
);

CREATE TABLE IF NOT EXISTS open_examinations (
    examination_id VARCHAR(20) NOT NULL,
    class_id VARCHAR(20) NOT NULL,
    start DATETIME NOT NULL,
    end DATETIME NOT NULL,
    status ENUM('open', 'close'),
    isRandom BOOLEAN NOT NULL,
    FOREIGN KEY (examination_id) REFERENCES create_examination(examination_id),
    FOREIGN KEY (class_id) REFERENCES studies_on(class_id)
);

CREATE TABLE IF NOT EXISTS submit_examinations (
    total_score FLOAT NOT NULL,
    student_on_question_id VARCHAR(20) NOT NULL,
    user_id VARCHAR(20) NOT NULL,
    FOREIGN KEY (student_on_question_id) REFERENCES student_on_questions(student_on_question_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

