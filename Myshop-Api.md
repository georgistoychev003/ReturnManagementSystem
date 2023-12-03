API description template 

Table of Contents 

1. [***Class diagram 	 3*** ](#_page2_x69.00_y72.92)
1. [***GET requests 	 4*** ](#_page3_x69.00_y72.92)
1. [***POST requests 	 7*** ](#_page6_x69.00_y72.92)
1. [***PUT requests 	 9*** ](#_page8_x69.00_y72.92)
1. [***DELETE requests 	 11*** ](#_page10_x69.00_y72.92)
1. Class<a name="_page2_x69.00_y72.92"></a> diagram 

For the class diagram, it is seen that th 

![](Aspose.Words.d27d306d-6bc5-4cbf-a389-1c776bd6ebcb.001.png)

2. GET<a name="_page3_x69.00_y72.92"></a> requests 

GET table: 

<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/requests</b> </th></tr>
<tr><td colspan="5">Shows the list of return requests </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of requests is shown.  </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/requests/{requestId}</b> </th></tr>
<tr><td colspan="5">Shows the return request with the id passed in the params </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">requestId* </td><td colspan="1">path  </td><td colspan="1">The unique id of the return request </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1" valign="top">200 </td><td colspan="2">The request with the id passed in params is shown successfully </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The request with {requestId} is not found.  </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/users</b> </th></tr>
<tr><td colspan="5">Shows the list of users </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="4" valign="top"><p><i>* required</i> </p><p><i>parameters.</i> </p></td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
</table>


<table><tr><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of users is shown. </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/users/{userId}</b> </th></tr>
<tr><td colspan="5">Shows the user with the id passed in the params </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">userId* </td><td colspan="1">path  </td><td colspan="1">The unique id of the user. </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The user with {userId} is shown. </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The user is not found </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/products</b> </th></tr>
<tr><td colspan="5">Shows the list of products </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of the products will be shown </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/products/{productId}</b> </th></tr>
<tr><td colspan="5">Shows the product with id {productId} </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="2" valign="top"><i>* required parameters.</i> </td><td colspan="1">productId* </td><td colspan="1">path </td><td colspan="1">The unique id of the product </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
</table>


<table><tr><th colspan="1" rowspan="3"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The product with id {productId} is shown </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The product with id {productId} is not found </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/users/{userId}/orders</b> </th></tr>
<tr><td colspan="5">Shows the list of products </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">userId* </td><td colspan="1">path </td><td colspan="1">the unique id of the user </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of orders is shown </td></tr>
<tr><td colspan="1">404  </td><td colspan="2">User not found </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/url/users/userId/orders/{orderId}</b> </th></tr>
<tr><td colspan="5">Shows the order with the id {orderId} </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><p><i>* required</i> </p><p><i>parameters.</i> </p></td><td colspan="1">orderId* </td><td colspan="1">path </td><td colspan="1">The unique id of the order </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The order is shown </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The order is not found OR user not found </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>

6
3. POST<a name="_page6_x69.00_y72.92"></a> requests 

POST table: 
<table><tr><th colspan="1"><b>POST</b> </th><th colspan="4"><b>/url/users</b> </th></tr>
<tr><td colspan="5">New user is created </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1" valign="top">User* </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The user to add. Either plain or JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>name: ”test”, </p><p>email: “test”, </p><p>username: ”test”, </p><p>password: “123”, </p><p>address: “street123”, </p><p>role : “collector” </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">201 </td><td colspan="2">The user is created  </td></tr>
<tr><td colspan="1">400 </td><td colspan="2">The user is not created  </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>POST</b> </th><th colspan="4"><b>/url/requests</b> </th></tr>
<tr><td colspan="5">New request is created </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="2" valign="top"><i>* required parameters.</i> </td><td colspan="1" valign="top">Request* </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The Request to add. As JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>items: [] </p><p>comments: “test” </p><p>userId: 1 </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
</table>

7



<table><tr><th colspan="1" rowspan="3"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">201 </td><td colspan="2">The request  is created  </td></tr>
<tr><td colspan="1">400 </td><td colspan="2">The request is not created  </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>

8
4. PUT<a name="_page8_x69.00_y72.92"></a> requests 

PUT table: 
<table><tr><th colspan="1"><b>PUT</b> </th><th colspan="4"><b>/url/users/{userId}</b> </th></tr>
<tr><td colspan="5">User with the id passed in the params is updated </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">userId* </td><td colspan="1">path  </td><td colspan="1"></td></tr>
<tr><td colspan="1" valign="top">User*  </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The kit attributes values to. As a JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>name: ”test”, </p><p>email: “test”, </p><p>password: “123”, </p><p>address: “street123”, </p><p>role : “controller” </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The user is updated </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The user is not found. </td></tr>
<tr><td colspan="1">400 </td><td colspan="2">Invalid arguments </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>PUT</b> </th><th colspan="4"><b>/url/request/{userId}</b> </th></tr>
<tr><td colspan="5">User with the id passed in the params is updated </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="4" valign="top"><i>* required parameters.</i> </td><td colspan="1">requestId* </td><td colspan="1">path  </td><td colspan="1"></td></tr>
<tr><td colspan="1" valign="top">Request*  </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The kit attributes values to. As a JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>Status : “delivered” </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
</table>

9



<table><tr><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The user is updated </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The user is not found. </td></tr>
<tr><td colspan="1">400 </td><td colspan="2">Invalid arguments </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>PUT</b> </th><th colspan="4"><b>/url/products/{productId}</b> </th></tr>
<tr><td colspan="5">Product with the id passed in the params is updated </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">userId* </td><td colspan="1">path  </td><td colspan="1"></td></tr>
<tr><td colspan="1" valign="top">User*  </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The kit attributes values to. As a JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>amount : 50 </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The product is updated </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The product is not found. </td></tr>
<tr><td colspan="1">400 </td><td colspan="2">Invalid arguments </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>

10 

<a name="_page10_x69.00_y72.92"></a>5. DELETE requests 

DELETE tables: 

<table><tr><th colspan="1"><b>DELETE</b> </th><th colspan="4"><b>/url/users/{userId}</b> </th></tr>
<tr><td colspan="5">The user with the id passed in the params will be deleted  </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"><b>userId*</b> </td><td colspan="1">path </td><td colspan="1">The unique id of the user </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">204 </td><td colspan="2">The user is deleted successfully. </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The user is not found, so nothing was deleted. </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>DELETE</b> </th><th colspan="4"><b>/url/requests/{requestId}</b> </th></tr>
<tr><td colspan="5">The request with the id passed in the params will be deleted  </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"><b>requestId*</b> </td><td colspan="1">path </td><td colspan="1">The unique id of the request </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">204 </td><td colspan="2">The request is deleted successfully. </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The request is not found, so nothing was deleted. </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>

11 
