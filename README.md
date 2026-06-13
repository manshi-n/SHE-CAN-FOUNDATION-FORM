# She Can Foundation - Full Stack Volunteer Management System

A full-stack web application built as part of the She Can Foundation Full Stack Development Internship Task.

## Live Features

### User Side

* Responsive landing page
* NGO information section
* Dark Mode / Light Mode toggle
* Volunteer & Contact Form
* Client-side form validation
* Success/Error feedback messages

### Admin Side

* Secure Admin Login
* JWT-based Authentication
* View all submitted volunteer/contact requests
* Delete submitted messages
* Protected Dashboard

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript (ES6)

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Tokens (JWT)

---

## Project Structure

```text
public/
│
├── index.html
├── admin.html
├── dashboard.html
├── style.css
├── script.js
├── admin.js
└── dashboard.js

server.js
package.json
.env
```

---

## Features Implemented

✅ Responsive Design

✅ Form Validation

✅ MongoDB Database Integration

✅ REST APIs

✅ JWT Authentication

✅ Admin Dashboard

✅ View Form Submissions

✅ Delete Form Submissions

✅ Dark Mode Toggle

✅ Backend Integration

---

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/manshi-n/SHE-CAN-FOUNDATION-FORM.git
cd SHE-CAN-FOUNDATION-FORM
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_ATLAS_CONNECTION_STRING

JWT_SECRET=YOUR_SECRET_KEY

ADMIN_EMAIL=youradmin@gmail.com

ADMIN_PASSWORD=your_admin_password
```

### 4. Run Application

```bash
npm start
```

### 5. Open Browser

```text
http://localhost:5000
```

---

## Admin Access

Open:

```text
http://localhost:5000/admin.html
```

Login using the admin credentials configured in the `.env` file.

---

## Database

All volunteer/contact form submissions are stored in MongoDB Atlas and can be viewed through the Admin Dashboard.

---

## Internship Task Enhancements

The original task required only a simple form submission page.

Additional features implemented:

* MongoDB Atlas Integration
* Express Backend APIs
* JWT Authentication
* Admin Dashboard
* Submission Management
* Message Deletion
* Form Validation
* Responsive UI
* Dark Mode Support

---

## Author

**Manshi**

B.Tech CSE (AI & Data Science)

Graphic Era Hill University, Dehradun

GitHub: https://github.com/manshi-n
