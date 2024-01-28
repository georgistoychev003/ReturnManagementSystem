# RMA System Implementation Testing - MyShop

This document maps the user requirements from the Functional Design Document with the test cases executed for the RMA system on MyShop. The testing includes both good and bad weather tests to ensure robustness and error handling.

## User Requirements and Test Cases Mapping

| Requirement ID | Requirement Description | Good Weather Test Case | Bad Weather Test Case |
|----------------|-------------------------|------------------------|-----------------------|
| U1             | Administrator creates accounts for all users. | Create new user successfully | Create a User with Existing Email |
| U2             | Administrator assigns roles to any user. | Update user information | Attempt to Update User Information with Invalid User ID |
| U3             | Administrator retrieves RMA history and staff who processed it. | Get list of RMA successfully | Get list of RMA failure |
| U4             | Customer creates and tracks an RMA. | Get list of RMA successfully | Get RMA by non-existent ID |
| U8             | Customer sees a list of placed orders. | Get all orders successfully | Get orders for non-existent user ID |
| U9             | Collector scans the barcode of an RMA package. | Get RMA by barcode successfully | - |
| U10            | Collector adds images of damaged goods. | Get list of return products successfully | - |
| U11            | Controller picks an RMA for processing and decides on refunds or notifications for damaged/missing products. | Update product by ID successfully | - |
| U12            | Controller places a product back in stock. | Update product by ID successfully | - |
| U13            | Controller views the RMA history of a customer. | Get RMA by ID successfully | - |
| U14            | User logs into the system using username and password. | Get all users successfully | Get user with non-existent email |
| U15            | User changes password if forgotten. | Reset password successfully | Attempt to Reset Password with Invalid Token |
| U17            | Customer receives email notifications at key stages of the return process. | Send forgot password email successfully | - |
| U18            | User changes password if forgotten. | Reset password successfully | Attempt to Reset Password with Invalid Token |
| U19            | Customer tracks the status of an RMA. | Get RMA by ID successfully | Get RMA by non-existent ID |
| U20            | Controller views the stock of all products. | Get all products successfully | Get all non-existent product |
| U21            | Controller sees a list of all the current RMAs processed by the collector. | Get list of RMA successfully | Get list of RMA failure |
| U22            | Collector sees a list of all the RMAs. | Get list of RMA successfully | Get list of RMA failure |
| U23            | Collector adds a description of each product received. | Get list of return products successfully | - |
| U24            | Administrator views a list of all the users. | Get all users successfully | Get user with non-existent email |
| U25            | Administrator views daily, weekly, monthly, and yearly graphs of several returns. | Get RMAs per month successfully | Get RMAs per month failure |
| U26            | Administrator overrules the status of all the RMAs. | Update product by ID successfully | - |
| U28            | Admin accesses and sees the list of available products(stock) for constraints. | Get all products successfully | Get product by non-existent ID |

This table aligns the functional requirements with the respective test cases, ensuring that all aspects of the RMA system are thoroughly validated under various scenarios.
