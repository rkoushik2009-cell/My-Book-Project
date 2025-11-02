const API_URL = 'http://localhost:3000';

// DOM Elements
const addBookForm = document.getElementById('addBookForm');
const toast = document.getElementById('toast');
const toastIcon = document.getElementById('toast-icon');
const toastMessage = document.getElementById('toast-message');
const booksListDiv = document.getElementById('booksList');
const loadingDiv = document.getElementById('loading');
const totalBooksSpan = document.getElementById('totalBooks');

// Fetch and display all books
async function fetchBooks() {
    try {
        loadingDiv.style.display = 'flex';
        booksListDiv.innerHTML = '';
        
        const response = await fetch(`${API_URL}/books`);
        const result = await response.json();
        
        loadingDiv.style.display = 'none';
        
        if (result.data && result.data.length > 0) {
            totalBooksSpan.textContent = result.data.length;
            displayBooks(result.data);
        } else {
            booksListDiv.innerHTML = `
                <div class="no-books glass-card">
                    <div class="no-books-icon">📚</div>
                    <h3>Your library is empty</h3>
                    <p>Add your first book to get started!</p>
                </div>
            `;
            totalBooksSpan.textContent = '0';
        }
    } catch (error) {
        loadingDiv.style.display = 'none';
        console.error('Error fetching books:', error);
        booksListDiv.innerHTML = `
            <div class="no-books glass-card">
                <div class="no-books-icon">⚠️</div>
                <h3>Connection Error</h3>
                <p>Unable to connect to the server. Please make sure the backend is running on port 3000.</p>
            </div>
        `;
        totalBooksSpan.textContent = '0';
    }
}

// Display books with glassmorphism cards
function displayBooks(books) {
    booksListDiv.innerHTML = books.map(book => `
        <div class="book-card" onclick="bookCardClick(${book.book_id})">
            <div class="book-id">📖 ID: ${book.book_id}</div>
            <div class="book-title">${escapeHtml(book.title)}</div>
            <div class="book-author">✍️ ${escapeHtml(book.author)}</div>
            <div class="book-price">
                <span class="price-label">Price:</span>
                $${parseFloat(book.price).toFixed(2)}
            </div>
        </div>
    `).join('');
}

// Book card click handler
function bookCardClick(bookId) {
    showToast(`📖 Book ID: ${bookId}`, '✨');
}

// Handle form submission
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const priceInput = document.getElementById('price');
    
    const formData = {
        title: titleInput.value.trim(),
        author: authorInput.value.trim(),
        price: parseFloat(priceInput.value)
    };
    
    try {
        const response = await fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            showToast('Book added successfully! ✨', '✅');
            addBookForm.reset();
            
            // Add a small animation effect
            setTimeout(() => {
                fetchBooks();
            }, 300);
        } else {
            showToast(result.error || 'Error adding book', '❌');
        }
    } catch (error) {
        console.error('Error adding book:', error);
        showToast('Connection error. Please check if the backend is running.', '⚠️');
    }
});

// Show toast notification
function showToast(message, icon = '✨') {
    toastIcon.textContent = icon;
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Load books when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
    
    // Add entrance animations
    setTimeout(() => {
        document.querySelectorAll('.glass-card').forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    }, 100);
});