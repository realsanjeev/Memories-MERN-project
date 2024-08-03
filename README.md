# MERN project - Memories

This is a MERN (MongoDB, Express, React, Node.js) project called "Memories." It is a web application that allows users to create and store their memories. The project is divided into front-end and back-end components, and it leverages React for the user interface, Express for the server-side, MongoDB for the database, and Node.js for the runtime environment.

To work with same project using python as backend checkout [Memories in flask](https://github.com/realsanjeev/Memories-flask-api-project).

## Getting Started

To set up the project, follow these steps:

1. **Clone the Repository to Your Local Machine:**
    ```bash
    git clone https://github.com/realsanjeev/Memories-MERN-project.git memories-project
    cd memories-project
    ```

2. **Install Front-End Dependencies:**
    - Navigate to the client directory:
    ```bash
    cd client
    npm install
    ```
    - Update the `.env` file with your `GOOGLE_CLIENT_ID` under the `REACT_APP_CLIENT_ID` key to enable Google Sign-In.

3. **Retrieve Your Server's IP Address:**
    ```bash
    curl icanhazip.com
    ```
    - Use this IP address for connecting to MongoDB Atlas(for allowing only that IP access to cluster).

4. **Set Up the Back-End:**
    - Navigate to the server directory and install dependencies:
    ```bash
    cd ../server/
    npm install
    ```
    - Configure the `.env` file to connect the MongoDB database to the server.

5. **Start the Development Servers:**
    ```bash
    npm start
    ```

Now, the application should be running on your local machine, with the front-end accessible at `http://localhost:3000` and the back-end at `http://localhost:5000`.


## Features

- Create, edit, and delete memories with ease.
- View a list of existing memories and search for specific memories.
- Add tags and categories to organize memories efficiently.
- User authentication and authorization to secure user data.

## Technologies Used

- React: A JavaScript library for building user interfaces.
- Express: A web application framework for Node.js.
- MongoDB: A NoSQL database for storing application data.
- Node.js: A JavaScript runtime environment for server-side development.
- Material-UI: A UI component library for React, following Material Design principles.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## Contact Me

<table>
  <tr>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/instagram.png" alt="Instagram" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/twitter.png" alt="Twitter" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/github.png" alt="GitHub" width="50" height="50"></td>
    <td><img src="https://github.com/realsanjeev/protfolio/blob/main/src/assets/images/linkedin-logo.png" alt="LinkedIn" width="50" height="50"></td>
  </tr>
</table>

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to modify and enhance this `README.md` as needed to match your specific project details. The provided steps are generic, and you should customize them according to the actual setup and configuration of your "Memories" project.
