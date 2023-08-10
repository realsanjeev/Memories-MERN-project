## Mongodb
### Sharding

Sharding is a data distribution process that involves splitting a single dataset across multiple databases.
It is commonly used for managing large volumes of data, such as in the case of big data, where storing all 
the information in a single database becomes impractical. 

When using MongoDB sharding, a cluster is created,
comprising at least three server nodes. Each node holds a portion of the data, known as a shard. 
As data grows, additional shards can be added to the cluster to maintain performance and scalability.
### Data Relationship

                                                    Data Relationship
                        _____________________________________|_____________________________________
                        |                                                                         |
                 Embedded Method                                                      Document Reference Method    
                 a. One-to-one relationship                                           Many-to-many relationship                         
                 b. One-to-many relationship                                                                              

### GridFS
**GridFS** is a file storage specification designed for handling large files that exceed the maximum document size (64MB) in MongoDB.
It breaks down large files into smaller chunks, typically 255kB in size, and stores them as separate documents in the database.

To implement GridFS, MongoDB uses two collections: `fs.files` and `fs.chunks`.
The `fs.files` collection contains metadata about the files, such as the filename, content type,
and other relevant information. On the other hand, the actual file data is stored in the `fs.chunks` collection,
where each chunk is a separate document representing a piece of the original file.

```
// Upload the file using GridFS
> mongofiles --db test put 1.jpg

// To see if the file is added or not in the fs.files collection
> use test
> db.fs.files.find()
```

The first command selects the `test` database, assuming that's where you uploaded the file.
The second command retrieves the metadata about the uploaded file from the `fs.files` collection.


### MapReduce Functions

MapReduce functions in MongoDB are used to perform complex data processing tasks and aggregations on large datasets.

```
// Define the Map function
var map = function() {
  emit(this.subject, this.marks);
};

// Define the Reduce function
var reduce = function(subject, marks) {
  return Array.sum(marks);
};

// Register the MapReduce functions using the 'mapReduce' method on the collection
db.collection.mapReduce(map, reduce, { out: "resultCollection" });
```
Explanation:

1. The `map` function takes each document in the collection and emits a key-value pair. In this case, it emits the subject as the key and the marks as the value.

2. The `reduce` function takes the key (subject) and an array of associated values (marks) and performs an aggregation. Here, it uses `Array.sum()` to calculate the sum of the marks for each subject.

3. To execute the MapReduce operation, you use the `mapReduce` method on the MongoDB collection. The result will be stored in a new collection named `resultCollection` (you can choose any name for the output collection).

**`<mongodb_query>.explain()`** -> returns the performance of query

##### Install Guideline
1. Install `mongodB`
2. Install `mongosh` for command line interface
#### MongoDB CheatSheet

| Command/Action                           | Description                                                                      |
|------------------------------------------|----------------------------------------------------------------------------------|
| `show dbs`                               | Show all databases                                                              |
| `db`                                     | Show current database                                                           |
| `use mydb`                               | Switch or create database                                                       |
| `db.dropDatabase()`                      | Drop a database                                                                 |
| `cls` or `clear screen`                  | Clear the screen                                                                |
| `exit()`                                 | Exit the MongoDB shell                                                          |
| `db.collec.insertOne({})`                | Insert one document into a collection                                          |
| `db.collec.find()`                       | Find all documents in a collection                                             |
| `db.collec.insertMany({}, {})`           | Insert multiple documents into a collection                                    |
| `db.collec.find().limit(2)`              | Limit the document findings to 2                                               |
| `db.collec.find().sort({name: 1})`       | Sort the documents based on the `name` field in ascending order (1 for ascending, -1 for descending) |
Sure, here's an updated markup table that includes the additional MongoDB commands:

| `db.collec.find().skip(n)`                   | Skip the first `n` entries                                                                            |
| `db.collec.find({name: 'mongodb'})`          | Find documents with the given `name` query                                                           |
| `db.collec.find({name: 'mongodb'}, {name: 1, type: 1, _id: 0})` | Show specific fields in the result                                                                   |
| `db.collec.find({name: {$ne: 'mongodb'}})`   | Find documents with the name not equal to 'mongodb'                                                 |
| `db.collec.find({rating: {$lt: 5}})`         | Find documents with `rating` less than 5                                                             |
| `db.collec.find({$expr: {$gt: ['$field1', '$field2']}})` | Compare fields using an expression                                                       |
| `db.collec.find({name: { $in: ['mongo', 'mongodb']}})` | Find documents where the name is 'mongo' or 'mongodb'                                   |
| `db.collec.countDocuments()`                  | Get the total number of documents in the collection                                                |
| `db.collec.updateOne({$age: 3}, {$set: {age: 21}})` | Update the first document matching the query to set the `age` field to 21                  |
| `db.collec.updateMany({$age: 3}, {$set: {age: 21}})` | Update all documents matching the query to set the `age` field to 21                       |
| `db.collec.updateMany({$unset: {owner: ''}})` | Remove the `owner` field from all documents                                                       |
| `db.collec.updateMany({$push: {owner: 'elon'}})` | Add 'elon' to the `owner` array field of all documents                                       |
| `db.collec.updateMany({$pop: {owner: 'elon'}})` | Remove the first occurrence of 'elon' from the `owner` array field of all documents           |

Please replace `collec` with your actual collection name in these commands. Keep in mind that MongoDB syntax and behavior may evolve with different versions, so it's always a good idea to consult the official documentation for the most up-to-date information.