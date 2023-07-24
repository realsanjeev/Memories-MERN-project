# MERN project - Memories

This is a MERN (MongoDB, Express, React, Node.js) project called "Memories." It is a web application that allows users to create and store their memories. The project is divided into front-end and back-end components, and it leverages React for the user interface, Express for the server-side, MongoDB for the database, and Node.js for the runtime environment.

## Getting Started

To set up the project, follow these steps:

1. Clone the repository to your local machine:

```bash
git clone <repository-url>
cd memories-project
```

2. Install the required dependencies for the front-end:

```bash
cd client
npm install
```

3. Create the React client application:

```bash
npx create-react-app .
```

4. Retrieve the IP address of your Codespace or server for connecting to mongodb atlas:

```bash
curl icanhazip.com
```


5. Set up the back-end by installing the required dependencies:

```bash
cd ..
npm install
```

6. Start the development server for both front-end and back-end:

```bash
npm run dev
```

Now, the application should be running on your local machine, with the front-end accessible on `http://localhost:3000` and the back-end running on `http://localhost:5000`.

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

## License

This project is licensed under the [MIT License](LICENSE).

---

Feel free to modify and enhance this `README.md` as needed to match your specific project details. The provided steps are generic, and you should customize them according to the actual setup and configuration of your "Memories" project.