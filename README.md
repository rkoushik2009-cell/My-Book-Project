# Book Management System 📚

A full-stack web application for managing a collection of books with a REST API backend and interactive frontend.

## Features

- 📖 View all registered books
- ➕ Add new books to the collection
- 💾 SQLite database for persistent storage
- 🎨 Modern, responsive UI
- 🔄 Real-time updates

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite3** - Database
- **CORS** - Cross-origin resource sharing

### Frontend
- **HTML5** - Structure
- **CSS3** - Styling with gradient backgrounds
- **JavaScript (ES6+)** - Interactivity and API calls

## Database Schema

```sql
CREATE TABLE books (
    book_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price REAL NOT NULL
);
```

## API Endpoints

### GET /books
Retrieves all books from the database.

**Response:**
```json
{
    "message": "Success",
    "data": [
        {
            "book_id": 1,
            "title": "The Great Gatsby",
            "author": "F. Scott Fitzgerald",
            "price": 12.99
        }
    ]
}
```

### POST /books
Inserts a new book record.

**Request Body:**
```json
{
    "title": "Book Title",
    "author": "Author Name",
    "price": 19.99
}
```

**Response:**
```json
{
    "message": "Book added successfully",
    "data": {
        "book_id": 4,
        "title": "Book Title",
        "author": "Author Name",
        "price": 19.99
    }
}
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Step 1: Clone the Repository
```bash
git clone <your-repository-url>
cd book-management-app
```

### Step 2: Install Backend Dependencies
```bash
cd backend
npm install
```

### Step 3: Start the Backend Server
```bash
npm start
```

The server will start on `http://localhost:3000`

You should see:
```
Server is running on http://localhost:3000
API endpoints:
  GET  http://localhost:3000/books
  POST http://localhost:3000/books
Connected to SQLite database
Books table created successfully
Sample data inserted successfully
```

### Step 4: Open the Frontend
Open `frontend/index.html` in your web browser, or use a local server:

```bash
cd frontend
# Using Python
python -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000
```

Then navigate to `http://localhost:8000`

## Project Structure

```
book-management-app/
│
├── backend/
│   ├── server.js          # Express server with API endpoints
│   ├── database.js        # Database initialization and setup
│   ├── package.json       # Backend dependencies
│   └── books.db          # SQLite database (created automatically)
│
├── frontend/
│   ├── index.html        # Main HTML structure
│   ├── styles.css        # Styling and layout
│   └── script.js         # API interaction and DOM manipulation
│
└── README.md             # This file
```

## Usage

1. **View Books**: The homepage displays all books in your collection
2. **Add a Book**: Fill out the form with title, author, and price, then click "Add Book"
3. **Validation**: The form validates inputs to ensure all fields are filled and price is positive

## Sample Data

The application comes with 3 sample books:
- The Great Gatsby by F. Scott Fitzgerald ($12.99)
- To Kill a Mockingbird by Harper Lee ($14.99)
- 1984 by George Orwell ($13.99)

## Development

To run the backend in development mode with auto-reload:

```bash
npm install -g nodemon  # Install nodemon globally
cd backend
npm run dev
```

## Testing the API

### Using cURL

**Get all books:**
```bash
curl http://localhost:3000/books
```

**Add a new book:**
```bash
curl -X POST http://localhost:3000/books \
  -H "Content-Type: application/json" \
  -d '{"title":"New Book","author":"John Doe","price":15.99}'
```

### Using Postman
1. Import the API endpoints
2. Set the base URL to `http://localhost:3000`
3. Test GET and POST requests

## Troubleshooting

**Issue: Backend won't start**
- Ensure Node.js is installed: `node --version`
- Check if port 3000 is already in use
- Delete `books.db` and restart to reset the database

**Issue: Frontend can't connect to backend**
- Verify the backend server is running
- Check browser console for CORS errors
- Ensure API_URL in `script.js` matches your backend URL

**Issue: Books not displaying**
- Open browser developer tools (F12)
- Check the Network tab for API call status
- Verify the backend is returning data

## Future Enhancements

- 🗑️ Delete books functionality
- ✏️ Edit existing books
- 🔍 Search and filter books
- 📊 Sorting options
- 📱 Mobile app version
- 🔐 User authentication
- 📸 Book cover images

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.