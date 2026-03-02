# personal-bookmanager-Thumbstack.


A full-stack book management application built using Next.js (App Router), TypeScript, MongoDB, and Tailwind CSS.

This application allows users to manage their personal reading collection with full CRUD functionality, tagging, filtering, and responsive design.




---
# 🚀 Features

- ✅ Add new books  
- ✅ Edit book details (Title, Author, Tags)  
- ✅ Delete books with confirmation  
- ✅ Update reading status (Want to Read, Reading, Completed)  
- ✅ Filter books by reading status  
- ✅ Filter books by tags  
- ✅ Combined filtering (Status + Tag)  
- ✅ Responsive mobile-friendly layout  
- ✅ Type-safe implementation with TypeScript
- ✅ protected routes and jwt authentication

---

# Tech Stack

- Frontend: Next.js (App Router)
- Language: TypeScript
- Database: MongoDB
-Styling: Tailwind CSS
- API Handling: Next.js API Routes
- State Management: React Hooks (useState)
- Routing: Next.js Navigation

---
## Installation

#1️⃣ Clone the repository
```bash
git clone personal-bookmanager-Thumbstack
cd personal-book-manager
```

2️⃣ Install dependencies
```bash
npm install
```


🔐 Environment Variables

Create a .env.local file in the root directory:

MONGODB_URI=your_mongodb_connection_string

---
▶️ Running the Application

Start development server:
```bash
npm run dev
```
Open your browser and visit:
```bash
http://localhost:3000
```

---

# API Endpoints

##Method	Endpoint	Description
- GET	/api/books	Fetch all books
- POST	/api/books	Add new book
- PUT	/api/books/:id	Update book
- DELETE	/api/books/:id	Delete book

---

# UI Highlights

- Glassmorphism card design
- Inline editing functionality
- Dynamic tag badges
- Status dropdown with emoji indicators
- Mobile responsive layout (iPhone optimized)


---

# Future Improvements

- Toast notifications
- Authentication system
- Dark/Light mode toggle
- Pagination support
- Dashboard analytics

---
# Author

- Rahul J Raj
- Self-learned MERN Stack Developer
- This project demonstrates strong understanding of:
- Full CRUD operations
- REST API design
- State management
- TypeScript usage
- Responsive UI development
- Clean component architecture

