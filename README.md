# 🎓 Student Record Manager

A full-stack web application built for managing student data. This project uses **Node.js**, **Express**, and **MongoDB** (via Mongoose) to perform CRUD operations.

## 📁 Project Structure
- `controller/`: Business logic for handling requests.
- `models/`: Database schemas (studentSchema.js).
- `routes/`: Express route definitions.
- `views/`: EJS templates for the user interface.
- `db/`: Database connection setup.

## 🚀 Features
* **Add Record:** Create new student entries.
* **View Dashboard:** See all students in a table.
* **Update:** Edit existing student information.
* **Delete:** Remove student records.
* **Search:** Quickly filter students by name/city.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Frontend:** EJS, Bootstrap, CSS
* **Database:** MongoDB
* **Environment:** VS Code

## 💻 How to Run
1. Clone this repository.
2. Open terminal in the project folder.
3. Run `npm install` to get the dependencies.
4. Run `npm start` (or `nodemon app.js`) to launch the server.
5. Open `http://localhost:3000` in your browser.