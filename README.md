# Members Only

Members Only is a web application that allows users to join a private club where they can post messages. Only registered users can view the authors and date of each message. The application provides a platform for users to communicate within a trusted community without revealing their identities.

## Live demo [Here](https://members-only1.up.railway.app/)

## Features

- User Registration: Users can sign up for an account and become a member of the private club.
- Anonymous Messaging: Members can post messages anonymously, hiding their identities from non-registered users.
- Message Viewing: Only registered users can view the date and authors of each message.
- Error Handling: Proper validation and error handling are implemented to provide a smooth user experience.
- User Authentication: Members can log in and log out of their accounts to access the private club's features.
- Message Deletion: Admin users have the ability to delete messages if needed.

## Technologies Used

- Node.js: A JavaScript runtime environment used for server-side development.
- Express.js: A web application framework for Node.js used to build the server-side logic.
- MongoDB: A NoSQL database used to store user and message data.
- Mongoose: An Object Data Modeling (ODM) library for MongoDB used to interact with the database.
- EJS: A templating engine used for server-side rendering of dynamic HTML templates.
- Express Validator: A middleware for Express.js used for form validation.
- bcrypt: A library used for hashing passwords for secure storage.
- Passport.js: An authentication middleware for Node.js used to handle user authentication.

## Installation

1. Clone the repository: `git clone <repository-url>`
2. Install the dependencies: `npm install`
3. Set up the MongoDB connection: Update the MongoDB connection string in the `.env` file.
4. Start the server: `npm start`
5. Open your web browser and access the application at `http://localhost:3000`

## License

This project is licensed under the [MIT License](LICENSE).
