# API description template

_Please see the template tables (for each verb) that you can use to create the API specification that fits the given API (posted on Blackboard). To see an example for each Verb, see the result for the Server-side homework week 1._

_Instead of this document and templates, you can use other tools to create the API specification as well. An example of such a tool is the Swagger Editor (_[_https://editor.swagger.io/_](https://editor.swagger.io/)_)._

# Table of Contents

_**[1.](#_Toc71106369)**__ **Class diagram 3** _

_**[2.](#_Toc71106370)**__ **GET requests 4** _

_**[3.](#_Toc71106371)**__ **POST requests 5** _

_**[4.](#_Toc71106372)**__ **PUT requests 6** _

_**[5.](#_Toc71106373)**__ **DELETE requests 7** _

1.
# Class diagram

For the class diagram, it is seen that th

![](RackMultipart20231203-1-u9gocl_html_7d804488f6595668.png)

1.
# GET requests

GET table:

| **GET** | **/url/requests** |
| --- | --- |
| Shows the list of return requests |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The list of requests is shown. |
|
|
|
|
|
|
|
|
|
|
|
|

| **GET** | **/url/requests/{requestId}** |
| --- | --- |
| Shows the return request with the id passed in the params |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | requestId\* | path | The unique id of the return request |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The request with the id passed in params is shown successfully |
| 404 | The request with {requestId} is not found. |
|
|
|
|
|
|
|
|
|

| **GET** | **/url/users** |
| --- | --- |
| Shows the list of users |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The list of users is shown. |
|
|
|
|
|
|
|
|
|
|
|
|

| **GET** | **/url/users/{userId}** |
| --- | --- |
| Shows the user with the id passed in the params |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | userId\* | path | The unique id of the user. |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The user with {userId} is shown. |
| 404 | The user is not found |
|
|
|
|
|
|
|
|
|

| **GET** | **/url/products** |
| --- | --- |
| Shows the list of products |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The list of the products will be shown |
|
|
|
|
|
|
|
|
|
|
|
|

| **GET** | **/url/products/{productId}** |
| --- | --- |
| Shows the product with id {productId} |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | productId\* | path | The unique id of the product |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The product with id {productId} is shown |
| 404 | The product with id {productId} is not found |
|
|
|
|
|
|
|
|
|

| **GET** | **/url/users/{userId}/orders** |
| --- | --- |
| Shows the list of products |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | userId\* | path | the unique id of the user |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The list of orders is shown |
| 404 | User not found |
|
|
|
|
|
|
|
|
|

| **GET** | **/url/users/userId/orders/{orderId}** |
| --- | --- |
| Shows the order with the id {orderId} |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | orderId\* | path | The unique id of the order |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 200 | The order is shown |
| 404 | The order is not found OR user not found |
|
|
|
|
|
|
|
|
|

1.
# POST requests

POST table:

| **POST**                                                                                                                            | **/url/users**          |
|-------------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| New user is created                                                                                                                 |                         |
|
|
| **Parameters:**                                                                                                                     | **Name**                | **Type** | **Description** |
| _\* required parameters._                                                                                                           | User\*                  | body | The user to add. Either plain or JSON, based on content-type header.
| Example: example of json body {name: "test",email: "test",username: "test",password: "123",address: "street123",role : "collector"} |                         |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:**                                                                                                                      | **Code**                | **Description / example if successful** |
|
| 201                                                                                                                                 | The user is created     |
| 400                                                                                                                                 | The user is not created |
|
|
|
|
|
|
|
|
|

| **POST**                                                           | **/url/requests**          |
|--------------------------------------------------------------------|----------------------------|
| New request is created                                             |                            |
|
|
| **Parameters:**                                                    | **Name**                   | **Type** | **Description** |
| _\* required parameters._                                          | Request\*                  | body | The Request to add. As JSON, based on content-type header.
| Example: example of json body {items: []comments: "test"userId: 1} |                            |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:**                                                     | **Code**                   | **Description / example if successful** |
|
| 201                                                                | The request is created     |
| 400                                                                | The request is not created |
|
|
|
|
|
|
|
|
|

1.
# PUT requests

PUT table:

| **PUT**                                                                                                             | **/url/users/{userId}** |
|---------------------------------------------------------------------------------------------------------------------|-------------------------|
| User with the id passed in the params is updated                                                                    |                         |
|
|
| **Parameters:**                                                                                                     | **Name**                | **Type** | **Description** |
| _\* required parameters._                                                                                           | userId\*                | path |
|
| User\*                                                                                                              | body                    | The kit attributes values to. As a JSON, based on content-type header.
| Example: example of json body {name: "test",email: "test",password: "123",address: "street123",role : "controller"} |                         |
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:**                                                                                                      | **Code**                | **Description / example if successful** |
|
| 200                                                                                                                 | The user is updated     |
| 404                                                                                                                 | The user is not found.  |
| 400                                                                                                                 | Invalid arguments       |
|
|
|
|
|
|

| **PUT**                                              | **/url/request/{userId}** |
|------------------------------------------------------|---------------------------|
| User with the id passed in the params is updated     |                           |
|
|
| **Parameters:**                                      | **Name**                  | **Type** | **Description** |
| _\* required parameters._                            | requestId\*               | path |
|
| Request\*                                            | body                      | The kit attributes values to. As a JSON, based on content-type header.
| Example: example of json body {Status : "delivered"} |                           |
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:**                                       | **Code**                  | **Description / example if successful** |
|
| 200                                                  | The user is updated       |
| 404                                                  | The user is not found.    |
| 400                                                  | Invalid arguments         |
|
|
|
|
|
|

| **PUT**                                             | **/url/products/{productId}** |
|-----------------------------------------------------|-------------------------------|
| Product with the id passed in the params is updated |                               |
|
|
| **Parameters:**                                     | **Name**                      | **Type** | **Description** |
| _\* required parameters._                           | userId\*                      | path |
|
| User\*                                              | body                          | The kit attributes values to. As a JSON, based on content-type header.
| Example: example of json body {amount : 50}         |                               |
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:**                                      | **Code**                      | **Description / example if successful** |
|
| 200                                                 | The product is updated        |
| 404                                                 | The product is not found.     |
| 400                                                 | Invalid arguments             |
|
|
|
|
|
|

1.
# DELETE requests

DELETE tables:

| **DELETE** | **/url/users/{userId}** |
| --- | --- |
| The user with the id passed in the params will be deleted |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | **userId\*** | path | The unique id of the user |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 204 | The user is deleted successfully. |
| 404 | The user is not found, so nothing was deleted. |
|
|
|
|
|
|
|
|
|

| **DELETE** | **/url/requests/{requestId}** |
| --- | --- |
| The request with the id passed in the params will be deleted |
|
|
| **Parameters:** | **Name** | **Type** | **Description** |
| _\* required parameters._ | **requestId\*** | path | The unique id of the request |
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
|
| **Responses:** | **Code** | **Description / example if successful** |
|
| 204 | The request is deleted successfully. |
| 404 | The request is not found, so nothing was deleted. |
|
|
|
|
|
|
|
|
|