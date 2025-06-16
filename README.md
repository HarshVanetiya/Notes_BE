# Notes Application

## Description
This is a simple Notes application built with Node.js, Express, and Prisma. It allows users to create, read, update, and delete notes. The application also includes user authentication and rate limiting for enhanced security.

## Features
- User authentication (signup, login, token validation)
- CRUD operations for notes
- Rate limiting for authentication endpoints
- CORS support with origin restrictions
- Prisma ORM for database management

## Technologies Used
- Node.js
- Express
- Prisma
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt
- dotenv

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/HarshVanetiya/Notes_BE.git
   ```
2. Navigate to the project directory:
   ```bash
   cd notes
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/<database>
     JWT_SECRET=<your_jwt_secret>
     PORT=3000
     ```

## Usage
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Access the API at `http://localhost:<PORT>`.

## API Endpoints
### Authentication
- `POST /api/auth/signup` - User signup
- `POST /api/auth/login` - User login
- `POST /api/auth/validate` - Validate token

### Notes
- `POST /api/notes/create` - Create a new note
- `GET /api/notes/get` - Fetch all notes
- `GET /api/notes/get/:id` - Fetch a single note by ID
- `PUT /api/notes/update/:id` - Update a note by ID
- `DELETE /api/notes/delete/:id` - Delete a note by ID

## Todos
- Add refresh tokens
- Implement password reset functionality
- Add account deletion endpoint
- Enable public sharing of notes
- Add `updated_at` field to models

## License
This project is licensed under the ISC License.
