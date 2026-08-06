<h1 align="center">Inventory Management System</h1>

<p align="center">
  A full-stack inventory management application for organising and managing items through a category-based system.
</p>

<p align="center">
  <img width="1920" height="913" alt="Inventory Management System Screenshot" src="https://github.com/user-attachments/assets/641e6d87-aa8e-4f48-a961-6920ff1ca082" />
</p>

A full-stack inventory management application for managing items and categories. The application allows users to create, view, update, and delete inventory items, organise products into categories, and keep track of stock information.

This project was built using Node.js, Express, PostgreSQL, and EJS as part of my full-stack web development practice.

## Live Demo
[View Website](https://odin-inventory-application-1.onrender.com/)

## Features

- Create, view, edit, and delete inventory items
- Organise inventory items into different categories
- View item details including stock information
- Store and retrieve data using a PostgreSQL database

## Built With

- Node.js
- Express.js
- EJS
- PostgreSQL
- CSS
- JavaScript

## Installation

Clone the repository:

```bash
git clone https://github.com/ThousandDucks/odin-inventory-application.git
```

Navigate into the project directory:

```bash
cd odin-inventory-application
```

Install dependencies:

```bash
npm install
```

Create a `.env` file and add your environment variables:

```env
DATABASE_URL=your_database_url
ADMIN_PASSWORD=your_admin_password
```

To get a live demo:

```bash
node app
```

## Future Improvements

- Add user authentication and authorisation
- Add proper image uploads for inventory items
- Add search and filtering functionality
- Add stock alerts for low inventory
- Adjust UI to adapt for different screen sizes
