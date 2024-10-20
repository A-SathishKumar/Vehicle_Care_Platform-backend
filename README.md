# Vehicle Care Platform

## Project Title
**Vehicle Care Platform**

## Project Description
The Vehicle Care Platform is a comprehensive web application designed to enhance the vehicle maintenance experience for users. This platform enables users to manage their vehicle servicing needs effectively, providing features such as service details, appointment scheduling, and user reviews. The application is built with a strong emphasis on user experience, security, and functionality, making it an invaluable tool for vehicle owners.

## Design Phase
During the design phase, a user-centric approach was employed to sketch the layout of the application's interface. Key considerations included:

- **Usability**: Ensuring the application is intuitive and easy to navigate.
- **Responsive Design**: Utilizing CSS frameworks like Bootstrap to create a responsive design that adapts seamlessly to various screen sizes and devices.

## Development Phase
### Frontend Development
- **Framework**: The frontend is built using **React**, enabling a dynamic and interactive user interface.
- **Component Structure**: 
  - Created separate components for the login and registration forms to ensure modularity and reusability.
- **State Management**: 
  - Implemented **React Router** for handling client-side routing, allowing for smooth navigation between different application views.
  - Utilized **Redux** (or the Context API) for managing application-wide state, ensuring consistent data flow throughout the application.
  
### Backend Development
- **Server Setup**: Established a backend using **Node.js** and **Express.js** to create RESTful APIs that handle client requests and responses efficiently.
- **Database**: Integrated **MongoDB** as the database for storing and managing user data, service details, and authentication information.
- **Security**: Implemented **JSON Web Tokens (JWT)** and **Bcrypt** for secure user authentication and access control.
- **Middleware**: Integrated middleware for user permissions and role-based access control, ensuring that users can only access features relevant to their roles.

## Functionality Development
The application includes a variety of functionalities designed to enhance the user experience:

- **Service Details**: Users can view detailed information about all available services, including pricing and categories.
- **Appointment Scheduling**: Users can conveniently schedule appointments for vehicle servicing through a user-friendly form.
- **Service History**: Users can maintain records of past maintenance and service history for each vehicle, helping them keep track of their vehicle’s care.
- **Reminders**: The platform sends timely email reminders for upcoming service appointments to ensure users perform timely maintenance.
- **Secure Payments**: Integrated secure payment processing through services like **Stripe Pay** for convenient transactions.

### Additional Features
- **Email Notifications**: Users receive email notifications after booking, including details of their appointments.
- **Push Notifications**: Admins can send push notifications to users from the front end, keeping them updated on important information and reminders.
- **User Records and Booking List**: Admins can maintain records of users and view a list of bookings directly from the front end, enabling effective management of the platform's user base.

## Tech Stack
- **Front-end**: React.js
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB

### Demo Login Credentials
For demonstration purposes, you can use the following login credentials:

**Website URL** : https://vehiclescareplatform.netlify.app/
## For Admin
- **Email**: admin@admin.com
- **Password**: admin123

## For User
- **Email**: demo@example.com
- **Password**: demo123

## Conclusion
The Vehicle Care Platform aims to simplify vehicle maintenance for users through an intuitive interface and comprehensive functionality. By leveraging modern web technologies, this application ensures a secure, efficient, and user-friendly experience for all vehicle owners.
