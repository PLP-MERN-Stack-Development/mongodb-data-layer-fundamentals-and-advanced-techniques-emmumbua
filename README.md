# PLP MongoDB Assignment

##  Project Overview
This repository contains MongoDB scripts for the **Power Learn Project (PLP) MongoDB Assignment**.  
It demonstrates the use of **MongoDB fundamentals**, including database creation, inserting sample book data, performing CRUD operations, executing advanced queries, running aggregation pipelines, and implementing indexing for performance optimization.

The database used is **`plp_bookstore`**, and the main collection is **`books`**.

---

##  Files Included

| File | Description |
|------|--------------|
| `insert_books.js` | JavaScript script that connects to MongoDB, creates the `books` collection, and inserts multiple book documents. |
| `queries.js` | Contains MongoDB shell commands for CRUD operations, advanced queries, aggregations, and indexing. |
| `README.md` | Documentation explaining setup, functionality, and execution of the project. |

---

##  Setup Instructions

### 1️ Prerequisites
Ensure you have the following installed:
- **MongoDB** (Community Edition or [MongoDB Atlas](https://cloud.mongodb.com))
- **VS Code**
- **MongoDB for VS Code** extension *(recommended)*
- **Node.js** (v16 or later)

---

### 2️. Connecting to MongoDB

#### Option A — Local MongoDB
If running MongoDB locally, use:
```bash
mongodb://localhost:27017/
mongodb+srv://<username>:<password>@cluster0.mongodb.net
node insert_books.js
Connected to MongoDB server
Collection dropped successfully
12 books were successfully inserted into the database
Connection closed
db.books.find({ genre: "Fiction" })

Tasks Implemented
Task 1 & 2: Basic CRUD Operations
Operation	Example Command
Find all books in a specific genre	db.books.find({ genre: "Fiction" })
Find books published after a certain year	db.books.find({ published_year: { $gt: 1950 } })
Find books by a specific author	db.books.find({ author: "George Orwell" })
Update the price of a specific book	db.books.updateOne({ title: "The Alchemist" }, { $set: { price: 12.99 } })
Delete a book by its title	db.books.deleteOne({ title: "Moby Dick"

Task 3: Advanced Queries
Requirement	Query
Find books in stock and published after 2010	db.books.find({ in_stock: true, published_year: { $gt: 2010 } })
Projection (return only title, author, price)	db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })
Sort by price ascending	db.books.find().sort({ price: 1 })
Sort by price descending	db.books.find().sort({ price: -1 })
Pagination (first 5 books)	db.books.find().limit(5)
Pagination (next 5 books)	db.books.find().skip(5).limit(5)

Task 4: Aggregation Pipelines
Purpose	Query
Average price of books by genre	js db.books.aggregate([{ $group: { _id: "$genre", average_price: { $avg: "$price" } } }, { $sort: { average_price: -1 } }])
Author with most books	js db.books.aggregate([{ $group: { _id: "$author", total_books: { $sum: 1 } } }, { $sort: { total_books: -1 } }, { $limit: 1 }])
Group books by publication decade	js db.books.aggregate([{ $project: { decade: { $concat: [ { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } }, "s" ] } } }, { $group: { _id: "$decade", total_books: { $sum: 1 } } }, { $sort: { _id: 1 } }])

Task 5: Indexing
Operation	Command
Create index on title	db.books.createIndex({ title: 1 })
Create compound index on author and published_year	db.books.createIndex({ author: 1, published_year: -1 })
Analyze performance using explain()	db.books.find({ title: "1984" }).explain("executionStats")

Indexes enhance performance by allowing MongoDB to quickly locate specific fields instead of scanning all documents.

Sample Data Inserted

The insert_books.js script inserts 12 book documents, including:

Title	Author	Genre	Year	In Stock
To Kill a Mockingbird	Harper Lee	Fiction	1960	
1984	George Orwell	Dystopian	1949	
The Great Gatsby	F. Scott Fitzgerald	Fiction	1925	
Brave New World	Aldous Huxley	Dystopian	1932	
The Hobbit	J.R.R. Tolkien	Fantasy	1937	
The Alchemist	Paulo Coelho	Fiction	1988	
Moby Dick	Herman Melville	Adventure	1851	

…and more.

Key Learning Outcomes

Through this assignment, I learned to:

Connect MongoDB with Node.js and perform CRUD operations programmatically.

Use Mongo shell commands for direct database manipulation.

Apply projections, sorting, and pagination effectively.

Build and use aggregation pipelines for data analysis.

Create and analyze indexes to improve query performance.