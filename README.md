# Royal Feast — Restaurant Menu Manager

A full-stack MERN application for managing a restaurant menu, with a restaurant-themed homepage and a dashboard for managing dishes.

## Project Overview

Royal Feast is a restaurant website project built with React, Node.js, Express, and MongoDB. It combines a customer-facing homepage with menu management functionality.

## Features

- Restaurant-themed homepage
- Menu management dashboard
- Add, view, edit, and delete dishes
- Search and category filtering
- Dish availability management
- Food images and dish details
- REST API built with Express
- MongoDB database integration

## Technology Stack

- **Frontend:** React, Vite, CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **HTTP client:** Axios
- **Version control:** Git and GitHub

## Project Structure

```text
restaurant-menu-manager/
├── client/
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── Dashboard.jsx
│       ├── app.jsx
│       ├── App.css
│       └── index.css
├── server/
│   ├── models/
│   │   └── Dish.js
│   ├── routes/
│   │   └── dishRoutes.js
│   ├── server.js
│   └── package.json
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB connection
- Git

### 1. Clone the repository

```bash
git clone https://github.com/AgnaMariya/restaurent-menu-manager.git
cd restaurent-menu-manager
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open a second terminal from the project root and run:

```bash
cd server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside the `server` folder and add the environment variables required by your backend, such as your MongoDB connection string and server port.

Do not upload `.env` or expose database credentials in the repository.

### 5. Run the application

Start the backend in the server terminal using the start script defined in `server/package.json`.

Start the frontend in the client terminal using:

```bash
npm run dev
```

Open the local URL shown in the Vite terminal.

## Screenshots

Screenshots of the homepage and menu management dashboard will be added here.

## Future Improvements

- Deploy the frontend and backend
- Add robust form validation and error handling
- Improve responsive design and accessibility
- Add more automated testing

## Author

Agna Mariya Joseph

## License

This project was developed as a learning and capstone project.