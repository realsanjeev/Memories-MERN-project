
```
npm nit -y
```
```
 npm install nodemon body-parser cors express mongoose
 ```

 For workinng with codespace and mongodb atlas
 ```
 npm i ngrok --save-dev
 ```
Here's a breakdown of the code in Index.js:

1. Import required modules:
   - `express`: Express.js framework for building the server
   - `mongoose`: MongoDB object modeling tool for interacting with the database
   - `body-parser`: Middleware for parsing incoming request bodies
   - `cors`: Middleware for enabling Cross-Origin Resource Sharing
   - `postRoutes`: Custom routes defined in a separate file for handling posts

2. Create an instance of the Express application: `const app = express();`

3. Set up middleware:
   - `bodyParser`: Parse request bodies as JSON and handle URL-encoded data
   - `cors`: Enable CORS for cross-origin resource sharing
   - `app.use("/posts", postRoutes)`: Use the custom routes defined in `postRoutes` for paths starting with "/posts"

4. Define the MongoDB connection URL and the server's port number.

5. Connect to the MongoDB database using Mongoose:
   - `mongoose.connect`: Establish a connection to the database using the provided connection URL and options

6. Start the server and listen for incoming requests:
   - `app.listen`: Start the server on the specified port and log a message when the server is running

# JWT retrived from GoogleLogin
 JWT is an encoded JSON object used for securely transmitting information between parties. Let's go through the key-value pairs in the provided JWT payload:

- `aud`: Audience. This represents the intended audience for the token, i.e., the unique identifier of the recipient of the token.

- `azp`: Authorized Party. This indicates the client ID of the OAuth 2.0 client, which is authorized to use this token.

- `email`: The email address associated with the user.

- `email_verified`: A boolean indicating whether the email has been verified.

- `exp`: Expiration Time. This is a UNIX timestamp that represents when the token will expire. It is the number of seconds since January 1, 1970 (UTC).

- `family_name`: The family name (last name) of the user.

- `given_name`: The given name (first name) of the user.

- `iat`: Issued At. This is a UNIX timestamp that represents when the token was issued.

- `iss`: Issuer. This represents the issuer of the token. In this case, it is "https://accounts.google.com," indicating that the token was issued by Google's account service.

- `jti`: JWT ID. A unique identifier for the JWT.

- `name`: The full name of the user.

- `nbf`: Not Before. This is a UNIX timestamp that represents the time before which the token should not be accepted for processing.

- `picture`: The URL of the user's picture or avatar.

- `sub`: Subject. This is the subject of the token, typically a unique identifier for the user.