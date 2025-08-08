# 🛠️ Knowledge Sharing Platform - Server Side

This is the **backend server** of the **Knowledge Sharing Platform**, a web application for students to share knowledge through articles and comments. Built using **Node.js**, **Express.js**, and **MongoDB**, this API handles authentication, article management, comments, likes, and category filtering. It also implements **JWT-based authentication** for securing private routes.

---

## 🌐 Live Server URL

🔗 https://server-three-red-77.vercel.app

---

## 🚀 Purpose

The goal is to build a secure and scalable backend for a MERN stack project where authenticated users can:
- Post, edit, and delete articles
- Comment on articles
- Like articles
- Filter by categories

Unauthenticated users can:
- View all articles and article details

---

## ⚙️ Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** (JSON Web Token) for authentication
- **Dotenv** for environment configuration
- **Cors** for Cross-Origin Resource Sharing
- **Cookie-parser**

---

## 🧩 Folder Structure

server/
│
├── controllers/ # Logic for handling requests
├── routes/ # All API routes (auth, articles, comments, likes)
├── models/ # Mongoose schemas
├── middlewares/ # Auth middleware and error handling
├── config/ # MongoDB connection
├── .env # Environment variables
├── index.js # Entry point of the application
└── package.json