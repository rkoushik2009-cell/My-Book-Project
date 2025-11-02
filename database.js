const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const db = new sqlite3.Database(path.join(__dirname, 'books.db'), (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    process.exit(1);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Create Books table
const createTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS books (
      book_id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price REAL NOT NULL
    )
  `;

  db.run(sql, (err) => {
    if (err) {
      console.error('❌ Error creating table:', err.message);
    } else {
      console.log('✅ Books table created successfully');
      
      // Insert sample data if table is empty
      db.get('SELECT COUNT(*) as count FROM books', (err, row) => {
        if (err) {
          console.error('❌ Error checking table:', err.message);
        } else if (row.count === 0) {
          insertSampleData();
        } else {
          console.log('📚 Database already has', row.count, 'books');
        }
      });
    }
  });
};

// Insert sample data
const insertSampleData = () => {
  const sampleBooks = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 12.99 },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 14.99 },
    { title: '1984', author: 'George Orwell', price: 13.99 }
  ];

  const insertSql = 'INSERT INTO books (title, author, price) VALUES (?, ?, ?)';
  
  let insertedCount = 0;
  sampleBooks.forEach(book => {
    db.run(insertSql, [book.title, book.author, book.price], (err) => {
      if (err) {
        console.error('❌ Error inserting sample data:', err.message);
      } else {
        insertedCount++;
        if (insertedCount === sampleBooks.length) {
          console.log('✅ Sample data inserted successfully');
        }
      }
    });
  });
};

// Initialize database
createTable();

module.exports = db;