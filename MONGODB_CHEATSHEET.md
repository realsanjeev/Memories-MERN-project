## Mongodb

#### Install Guideline
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
| `db.collec.find().skip(n)`               | Skip the first `n` entries                                                      |
| `db.collec.find({name: 'mongodb'})`      | Find documents with the given `name` query                                     |
| `db.collec.find({name: 'mongodb'}, {name: 1, type: 1, _id: 0})` | Show specific fields in the result            |
| `db.collec.find({name: {$ne: 'mongodb'}})`   | Find documents with the name not equal to 'mongodb'                             |
| `db.collec.find({rating: {$lt: 5}})`     | Find documents with `rating` less than 5                                       |
| `db.collec.find({$expr: {$gt: ['$field1', '$field2']}})` | Compare fields using an expression             |
| `db.collec.find({name: { $in: ['mongo', 'mongodb']}})` | Find documents where the name is 'mongo' or 'mongodb'                |
| `db.collec.countDocuments()`              | Get the total number of documents in the collection                            |
| `db.collec.updateOne({$age: 3}, {$set: {age: 21}})` | Update the first document matching the query to set the `age` field to 21      |
| `db.collec.updateMany({$age: 3}, {$set: {age: 21}})` | Update all documents matching the query to set the `age` field to 21           |
| `db.collec.updateMany({$unset: {owner: ''}})` | Remove the `owner` field from all documents                                  |
| `db.collec.updateMany({$push: {owner: 'elon'}})` | Add 'elon' to the `owner` array field of all documents                      |
| `db.collec.updateMany({$pop: {owner: 'elon'}})` | Remove the first occurrence of 'elon' from the `owner` array field of all documents |
| `db.getCollectionNames()`                 | Show all collections in a Database                                                  |
| `db.collec.find({name: {$regex: '^USS\\sE'}})` | Matching pattern in pearl-style                                             |
| `db.collec.createIndex({"name": 2})`     | Create single field index                                                         |
| `db.collec.createIndex({"name": 2, "date": 2})` | Create compound index                                                        |
| `db.collec.createIndex({foo: "text", bar: "text"})` | Create text index                                                |
| `db.collec.createIndex({"$**": "text"})`  | Create wildcard text index                                                          |
| `db.collec.createIndex({"userMetadata.$**": 1})` | Create wildcard index                                                            |
| `db.collec.dropIndex("field")`            | Drop Index                                                                           |
| `db.collec.hideIndex("field")`            | Hide index                                                                           |
| `db.collec.unhideIndex("field")`          | Unhide index                                                                         |
| `db.collec.aggregate([{$group : {_id : "$operator", num_docs : {$sum : "$value"}}}])` | Sum up values          |


Please replace `collec` with your actual collection name in these commands. Keep in mind that MongoDB syntax and behavior may evolve with different versions, so it's always a good idea to consult the official documentation for the most up-to-date information.

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

### Index


 An index in a database is a data structure that improves the speed of data retrieval operations on a database table or collection. It acts like a reference or a pointer that helps the database system locate the data more efficiently. Without indexes, the database would need to scan the entire collection to find the requested data, which can be very slow and resource-intensive, especially for large datasets.

Indexes are created on one or more fields of a collection and store a sorted representation of the data in those fields. This sorted structure allows the database to perform quicker searches, data filtering, sorting, and matching, resulting in faster query response times.

**Create Index**

Creating an index involves specifying one or more fields on which the index should be built. Here are a few examples of different types of indexes using the MongoDB shell:

1. **Single Field Index:**
   A single field index is created on a single field. It speeds up queries that filter, sort, or aggregate data based on that field.

   ```javascript
   db.docx.createIndex({"name": 1}) // 1 for ascending, -1 for descending
   ```

2. **Compound Index:**
   A compound index is created on multiple fields. It's useful for queries that involve multiple fields, such as filtering and sorting on multiple criteria.

   ```javascript
   db.docx.createIndex({"name": 1, "date": -1}) // Name ascending, Date descending
   ```

3. **Text Index:**
   A text index is used for full-text search operations on string content. It's suitable for searching for words or phrases in text fields.

   ```javascript
   db.docx.createIndex({foo: "text", bar: "text"})
   ```

4. **Wildcard Text Index:**
   A wildcard text index indexes all string fields in the collection, allowing you to perform text searches across all fields.

   ```javascript
   db.docx.createIndex({"$**": "text"})
   ```

5. **Wildcard Index:**
   A wildcard index indexes all fields of a subdocument. It's useful when you have a nested structure and want to index all fields within it.

   ```javascript
   db.docx.createIndex({"userMetadata.$**": 1})
   ```

Creating indexes comes with trade-offs. While they significantly improve query performance, they also introduce overhead during data insertion, updates, and deletion, as the index also needs to be maintained. Careful consideration should be given to the fields you choose to index, based on the types of queries you frequently perform.

Remember that index creation is a one-time operation. After creating an index, it's automatically used by the database system to optimize query performance. However, indexes should also be periodically reviewed and maintained to ensure optimal performance as data evolves over time.

### SOME INFOS

1. **Add Replica Set in MongoDB**
   - Command: `rs.add("<hostname>")`

2. **Command to Backup Database**
   - `mongodump`

3. **Flag for Importing JSON Array with MongodbImport**
   - `--jsonArray`

4. **Resolve Exceeded Memory Limit**
   - Set `allowDiskUse` to `true`

5. **Setup Kerberos when Starting MongoDB**
   - `--setParameter authenticationMechanism=GSSAPI`
   > Kerberos is a computer network authentication protocol that provides a secure way for clients and servers to authenticate each other in a network environment. It was developed by MIT in the 1980s and has become a widely adopted standard for secure authentication in many enterprise environments.

6. **Purpose of Arbiter in Replica Set**
   - Casts tie-breaking vote in election

7. **Example of Creating Geospatial Index**
   - `db.collection.createIndex({"location": "2dsphere"})`
   >"2dsphere" indicates that the index will be used for spherical geometry.

   > A geospatial index is used to optimize queries that involve spatial data, such as finding points within a certain radius or performing other geometric operations. This type of index is particularly useful when working with applications that involve location-based services or mapping.

8. **Ad-hoc Queries vs. Indexed Queries**
   - Ad-hoc queries run faster than indexed queries
   
|                   | Ad-hoc Queries                          | Indexed Queries                        |
|-------------------|----------------------------------------|---------------------------------------|
| **Definition**    | Queries executed without prior planning, | Queries executed using predefined      |
|                   | optimization, or specific structure.    | indexes to retrieve data efficiently.   |
|                   | They are not optimized for performance.  |                                       |
| **Speed**         | Generally slower due to full collection  | Faster, as they leverage pre-built      |
|                   | scans.                                   | indexes to quickly locate data.         |
| **Efficiency**    | Inefficient for large datasets or        | Efficient for large datasets or         |
|                   | complex queries.                         | complex queries.                        |
| **Resource Usage**| Consumes more CPU and memory resources.  | Utilizes less CPU and memory resources  |
|                   |                                          | as the index narrows down the search.   |
| **Examples**      | `db.collection.find({field: value})`      | `db.collection.find({field: value})`    |
|                   | `db.collection.aggregate([...])`          | `db.collection.find({field: value}).     |
|                   |                                          | sort({field: 1}).limit(10)`             |
| **When to Use**   | Suitable for ad-hoc, exploratory queries,| Preferred for frequently executed        |
|                   | or when specific data is not known in    | queries or queries on large datasets.   |
|                   | advance.                                 |                                       |
| **Considerations**| May not be suitable for production or     | Essential for production environments,   |
|                   | performance-critical applications.        | especially with large datasets.         |


9. **Replica Sends Heartbeat**
   - Every 2 seconds

10. **Speed Up Read Access and Slow Write Access**
    - Preferred format to store geospatial data: GeoJSON
    > GeoJSON is an open standard format for encoding geospatial data. It allows for the representation of geographic features, such as points, lines, polygons, and collections of these features, along with associated attributes.

11. **Using `mongoimport` to Import CSV in MongoDB**

12. **Get KB Instead of Bytes from `stats` Command**
    - `db.collection.stats(1024)`

13. **Remove Index from Description**
    - `db.collection.dropIndex("description_text")`

14. **Create a New Document in Collection**
    - `db.collection.save({name: "Document"})`

15. **MongoDB Has at Least Three Files**
    - `data`, `namespace`, `journal`

16. **Delete Single Document from Collection**
    - Deprecated: `db.collection.remove({_id: 1})`
    - Use: `db.collection.deleteOne()` or `db.collection.deleteMany()`

17. **Remove Collection**
    - `db.collection.drop()`

18. **Cleanly Shutdown MongoDB**
    - `db.shutdownServer()`

19. **Default `explain()` Mode**
    - Query Planner Mode

20. **File that Holds MongoDB Daemon**
    - `mongod`

21. **Option that can be Passed Without Connecting Database**
    - `-nodb`

22. **Execute JavaScript**
    - `load('list.js')`

23. **Create a New MongoDB User**
    - `db.createUser({})`
