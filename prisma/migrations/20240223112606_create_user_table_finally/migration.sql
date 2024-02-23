-- CreateTable
CREATE TABLE `users` (
    `user_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `prefix` ENUM('นาย', 'นาง', 'นางสาว', 'Mr.', 'Mrs.', 'Ms.', 'Miss') NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `tel` VARCHAR(10) NOT NULL,
    `personal_id` VARCHAR(20) NOT NULL,
    `role` ENUM('student', 'teacher', 'admin') NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_username_key`(`username`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
