// Basic CRUD Operations

db.books.find({ genre: "Fiction" })

db.books.find({ published_year: { $gt: 1950 } })

db.books.find({ author: "George Orwell" })

db.books.updateOne(
  { title: "The Alchemist" },
  { $set: { price: 12.99 } }
)

db.books.deleteOne({ title: "Moby Dick" })


// Advanced queries

db.books.find({
  in_stock: true,
  published_year: { $gt: 2010 }
})


db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 })

db.books.find().sort({ price: 1 })
db.books.find().sort({ price: -1 })

db.books.find().limit(5)
db.books.find().skip(5).limit(5)


// Aggregation Pipelines

db.books.aggregate([
  {
    $group: {
      _id: "$genre",
      average_price: { $avg: "$price" }
    }
  },
  {
    $sort: { average_price: -1 }
  }
])

db.books.aggregate([
  {
    $group: {
      _id: "$author",
      total_books: { $sum: 1 }
    }
  },
  {
    $sort: { total_books: -1 }
  },
  {
    $limit: 1
  }
])

db.books.aggregate([
  {
    $project: {
      decade: {
        $concat: [
          { $toString: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] } },
          "s"
        ]
      }
    }
  },
  {
    $group: {
      _id: "$decade",
      total_books: { $sum: 1 }
    }
  },
  {
    $sort: { _id: 1 }
  }
])


// Indexing
db.books.createIndex({ title: 1 })

db.books.createIndex({ author: 1, published_year: -1 })

db.books.find({ title: "1984" }).explain("executionStats")