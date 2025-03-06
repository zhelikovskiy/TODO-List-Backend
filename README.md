# TODO-List-Backend

Hosted version: https://todo-list-backend-2hu0.onrender.com

TODO-List-Backend is a backend application for managing tasks and users. It provides APIs for user authentication, task management, and user management. The application is built using Node.js, Express, Sequelize, and SQLite.

## Features

- User registration and login
- JWT-based authentication
- Task creation, retrieval, update, and deletion
- User management
- Middleware for authentication and error handling

## Technologies Used

- Node.js
- Express
- Sequelize
- SQLite
- JWT (JSON Web Token)
- Jest (for testing)
- Supertest (for API testing)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/TODO-List-Backend.git
cd TODO-List-Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a .env file in the root directory and add the following environment variables:

```
JWT_SECRET=your_jwt_secret
PORT=3000
DB_STORAGE=memory # or 'file'
DB_FILE_PATH=./database.sqlite # if using file storage
```

### Running the Application

To start the application, run:

```bash
npm run dev
```

The application will be available at http://localhost:3000.

### Running Tests

To run the tests, use the following command:

```bash
npm run test
```

## API Endpoints

- Authentication

* `POST /api/auth/register: Register a new user`
* `POST /api/auth/login: Login an existing user`

- User

* `PATCH /api/user/password: Update user password (requires authentication)`

- Task

* `POST /api/task/: Create a new task (requires authentication)`
* `GET /api/task/:taskId: Get a task by ID (requires authentication)`
* `PATCH /api/task/:taskId: Update a task by ID (requires authentication)`
* `DELETE /api/task/:taskId: Delete a task by ID (requires authentication)`

## Project Structure

```
TODO-List-Backend/
├── src/
│ ├── auth/
│ │ ├── auth.controller.js
│ │ ├── auth.router.js
│ │ ├── auth.service.js
│ ├── user/
│ │ ├── user.controller.js
│ │ ├── user.router.js
│ │ ├── user.service.js
│ ├── task/
│ │ ├── task.controller.js
│ │ ├── task.router.js
│ │ ├── task.service.js
│ ├── middleware/
│ │ ├── auth.middleware.js
│ │ ├── error.middleware.js
│ ├── db.js
│ ├── app.js
├── **tests**/
│ ├── auth.test.js
│ ├── user.test.js
│ ├── task.test.js
├── .env
├── .babelrc
├── jest.config.js
├── package.json
└── README.md
```
