# Deployment Manual

This manual provides instructions on how to run the software, including both the Backend and Frontend components.

## Running the Software

To start the system:

1. **Backend and Frontend Setup:**
    - Navigate to the `package.json` files in both the client and server directories.
    - Run the 'dev' scripts found in these files.
        - The 'dev' script for the client is on line 7.
        - The 'dev' script for the server is on line 10.
    - This process will set up both the database and the website.

2. **Accessing the Website:**
    - After starting the client, a link will appear in the console.
    - Click on this link or manually enter `http://localhost:5173/` into your web browser to access the website.

## User Accounts

The system includes four pre-set accounts for different roles:

1. **Customer Account:**
    - Email: `customer@email.com`
    - Password: `password`

2. **Collector Account:**
    - Email: `collector@email.com`
    - Password: `password`

3. **Controller Account:**
    - Email: `controller@email.com`
    - Password: `password`

4. **Admin Account:**
    - Email: `admin@email.com`
    - Password: `admin`

## Optimal Flow for Testing

To fully experience the system's functionality, it is recommended to use the accounts in the following order:
1. Customer
2. Collector
3. Controller
4. Admin