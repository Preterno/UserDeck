# UserDeck

## Overview
UserDeck is a React-based application for user management that integrates with the Reqres API. It allows users to log in, view a list of users with pagination, and edit or delete user details.

## Deployment
Currently, the site is hosted at https://userdeckapp.netlify.app/.

## Features
- **Secure Authentication**: Login with predefined credentials. The login token is stored in localStorage for session persistence, ensuring the user remains logged in across page reloads.
- **Dynamic User Management**: 
  - View paginated list of users
  - Edit user profiles 
  - Delete user accounts
- **Advanced Filtering**: Search and filter users by name
- **Responsive Design**: Fully responsive interface using Tailwind CSS
- **State Management**: Efficient state handling with React hooks
- **Form Validation**: Robust form validation using Formik and Yup

## Technologies & Libraries
- **React**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **React Router**: Declarative routing for React
- **Axios**: Promise-based HTTP client
- **Formik**: Form library for React
- **Yup**: JavaScript schema builder for value parsing and validation
- **React Toastify**: Elegant notifications for React

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Preterno/UserDeck.git
cd userdeck
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the project root with the following variables:
```
VITE_API_EMAIL=your_login_email
VITE_API_PASSWORD=your_login_password
VITE_API_BASE_URL=https://reqres.in/api
```

### 4. Run the Application
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

## Connect with Me
Feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/aslam8483).