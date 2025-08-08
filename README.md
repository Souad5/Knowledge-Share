# 🎓 Knowledge Sharing Platform

A full-stack MERN project for students to share knowledge, write articles, and engage in meaningful discussions.

---

## 🔗 Live Links

- **Client**: https://assignment-11-d2902.web.app
- **Server**: https://server-three-red-77.vercel.app

---

## 📚 Project Purpose

This platform allows users to:
- Read public articles
- Write, edit, and delete their own articles
- Comment and like articles
- Browse by category or tag
- Engage in academic and professional discussions

---

## 🧠 Key Features

### ✅ General
- Fully responsive design
- Firebase Authentication (Email/Password, Google)
- Secure environment using `.env` variables
- Clean UI with conditional rendering
- JWT-protected private routes and APIs

### 🔐 Authentication
- Register/Login with validation
- Social login (Google)
- Logout & token removal
- Profile-based navigation

### 📝 Articles
- Create, read, update, delete articles
- Add category, tags, thumbnail, and metadata
- Filter by category or tag
- Article details page with likes & comments

### 💬 Comments & Likes
- Authenticated users can comment and like
- Comments & likes stored in MongoDB

### 🎨 UI/UX
- Theme toggle (light/dark)
- Animations (Framer Motion / AOS)
- Custom 404 page
- Navigation bar and footer on all pages

---

## 🧪 Tech Stack

### Client (Frontend)
- React
- React Router DOM
- Firebase Auth
- Tailwind CSS + DaisyUI
- Axios
- Jodit React (Rich Text Editor)
- Framer Motion / AOS
- React Icons
- React Hot Toast

### Server (Backend)
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- CORS
- Dotenv
- Cookie-Parser

---

## ⚙️ Setup Instructions

### 🔧 Client
```bash
git clone https://github.com/yourusername/knowledge-platform-client.git
cd knowledge-platform-client
npm install
npm run dev
