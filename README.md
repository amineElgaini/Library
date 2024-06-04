# Library Management System

This is a web application for managing a library's book inventory and borrowing system. It allows users to browse books, borrow them, and return them. Administrators can manage books, users, and borrowing records through an admin dashboard.

## Technologies Used

- **Frontend:** React.js, React Router, Axios, Tailwind CSS
- **Backend:** Laravel, MySQL

## Features

- **User Authentication:** Users can register, login, and update their profiles.
- **Browsing Books:** Users can browse books with filters and search functionality.
- **Borrowing Books:** Users can borrow books for a specified duration.
- **Returning Books:** Users can return books after borrowing.
- **Admin Dashboard:** Admins can manage books, users, and borrowing records.
- **Statistics Page:** Admins can view statistics on popular books and users.

## Installation

1. Clone the repository: `git clone https://github.com/amineElgaini/Library.git`
2. Navigate to the project directory: `cd api`
3. Install PHP dependencies: `composer install`
4. Install JavaScript dependencies: `npm install`
5. Copy `.env.example` to `.env` and configure your database settings
6. Generate application key: `php artisan key:generate`
7. Run database migrations: `php artisan migrate`
8. Seed the database (optional): `php artisan db:seed`
9. Compile assets: `npm run dev`
10. Start the development server: `php artisan serve`

## Usage

- Access the application in your browser at `http://localhost:8000`
- Use the provided credentials to log in as an admin or user (look at the seeder)
- Explore the features and functionalities of the library management system
