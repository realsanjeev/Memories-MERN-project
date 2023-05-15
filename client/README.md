## Create React App
```
npx create-rect-app <project_name>
cd <project_name>
npm start
```

## Solving problem of redux-thunk 
npm install --save redux-thunk

## React Redux
![Redux-Architecture](https://static.javatpoint.com/tutorial/reactjs/images/react-redux-architecture.png)

Redux is a predictable state container for JavaScript applications, commonly used with React. It follows a unidirectional data flow pattern and helps manage the application state in a centralized manner. The architecture diagram demonstrates the flow of data and actions within a Redux-powered React application.

Here are the key components and their interactions shown in the diagram:

React Components: These are the UI components of your application, responsible for rendering the views and handling user interactions.

Actions: Actions represent events or user interactions that trigger a change in the application state. They are plain JavaScript objects with a type property indicating the type of action and additional data as needed.

Action Creators: Action creators are functions that create and return action objects. They encapsulate the logic of creating actions with the required data.

Reducers: Reducers are pure functions responsible for handling the state changes based on the dispatched actions. They take the current state and an action as input and return a new state object. Reducers should not modify the existing state; instead, they create a new state object.

Store: The store is the central place that holds the application state. It is created using the createStore function provided by Redux. The store provides methods to dispatch actions, access the current state, and subscribe to state changes.

Middleware: Middleware sits between the dispatching of an action and the moment it reaches the reducer. It can intercept actions, modify them, or execute additional logic. Popular middleware examples include redux-thunk for handling asynchronous actions and redux-logger for logging actions and state changes.

Store Subscription: Components can subscribe to the store to receive updates whenever the state changes. This enables components to react to state changes and update their UI accordingly.