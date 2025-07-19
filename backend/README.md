# Toy Collection Sales Backend

This is a simple Node.js + Express backend for handling Excel uploads and product management for the Toy Collection Sales app.

## Features
- Upload Excel files to update product inventory
- CORS enabled for frontend integration

## Usage
1. Install dependencies:
   npm install
2. Start the server:
   node index.js
3. POST /upload with an Excel file (fields: id, name, price, quantity)

---

This backend is designed to work with the React frontend in the parent directory.
