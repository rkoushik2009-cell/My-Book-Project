const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  const sql = 'SELECT * FROM books ORDER BY book_id DESC';
  
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Success',
      data: rows
    });
  });
});

// POST /books - Insert a new book
app.post('/books', (req, res) => {
  const { title, author, price } = req.body;
  
  // Validation
  if (!title || !author || !price) {
    res.status(400).json({ error: 'All fields (title, author, price) are required' });
    return;
  }
  
  if (isNaN(price) || price <= 0) {
    res.status(400).json({ error: 'Price must be a positive number' });
    return;
  }
  
  const sql = 'INSERT INTO books (title, author, price) VALUES (?, ?, ?)';
  const params = [title, author, parseFloat(price)];
  
  db.run(sql, params, function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.status(201).json({
      message: 'Book added successfully',
      data: {
        book_id: this.lastID,
        title,
        author,
        price: parseFloat(price)
      }
    });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET  http://localhost:${PORT}/books`);
  console.log(`  POST http://localhost:${PORT}/books`);
});