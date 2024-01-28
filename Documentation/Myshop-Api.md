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

<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/rma</b> </th></tr>
<tr><td colspan="5">Shows the list of return requests </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of requests is shown.<p> example :  </p>
<pre> [
{"RMAId":1,"barcode":"barcode","statusRma":"Returned","credit":80,"controllerId":null,"lockTimestamp":null,"totalRefundAmount":0},
{"RMAId":2,"barcode":"barcode101","statusRma":"Returned","credit":29.02,"controllerId":null,"lockTimestamp":null,"totalRefundAmount":0},
{"RMAId":3,"barcode":"barcode102","statusRma":"Returned","credit":85.76,"controllerId":null,"lockTimestamp":null,"totalRefundAmount":0},
{"RMAId":4,"barcode":"barcode103","statusRma":"Returned","credit":91.36,"controllerId":null,"lockTimestamp":null,"totalRefundAmount":0},
{"RMAId":5,"barcode":"barcode104","statusRma":"Returned","credit":25.47,"controllerId":null,"lockTimestamp":null,"totalRefundAmount":0},
{"RMAId":6,"barcode":"barcode105","statusRma":"Returned","credit":40.04,"controllerId":null,"lockTimestamp":null,"totalRefundAmount":0}
] 
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>/localhost:3000/rma/{RMAId}</b> </th></tr>
<tr><td colspan="5">Shows the return request with the id passed in the params </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">RMAId* </td><td colspan="1">path  </td><td colspan="1">The unique id of the return request </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1" valign="top">200 </td><td colspan="2">The rma with the id passed in params is shown successfully, it shows the list of returned products attached to rma<p> example :  </p>
<pre>
{"returnedProductId":1,"orderedProductId":1,"RMAId":1,"returnedDate":"2023-01-01","description":"Defective item","weight":1.2,"statusProduct":"Returned","quantityToReturn":2,"collectorImage":null,"collectorDescription":null,"customerImage":null,"orderId":1,"productId":2,"quantity":2,"unitPrice":40,"priceAtTimeOfOrder":40,"type":"Clothing","price":40,"name":"T-shirt","imageURL":"https://media.idkids.fr/media/productstorage/images/okaidi/0702494/thumbs/0474699_500.jpg","productWeight":0.3,"inventoryStock":100}</pre></td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The request with {RMAId} is not found.  </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/rma/monthly</b> </th></tr>
<tr><td colspan="5">Shows how many rma each month </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1" valign="top">200 </td><td colspan="2">The amount of rma each month is shown<p> example :  </p>
<pre>[
{"monthYear":"2023-01","RMACount":1},{"monthYear":"2024-01","RMACount":14},{"monthYear":"2024-02","RMACount":2}]</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/rma/{RMAId}/refund</b> </th></tr>
<tr><td colspan="5">Shows the total refund amount of an rma </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1" valign="top">200 </td><td colspan="2">The amount of refund of an rma is shown<p> example :  </p>
<pre>
{"totalRefundAmount":0}</pre></td></tr>
<tr><td colspan="1">404</td><td colspan="2">the rma with id provided is not found {"error":"RMA not found"}</td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/rma/{RMAId}/status</b> </th></tr>
<tr><td colspan="5">Shows the status of an rma </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1" valign="top">200 </td><td colspan="2">the status of rma is shown<p> example :  </p>
<pre>
{"statusRma":"Returned"}</pre></td></tr>
<tr><td colspan="1">404</td><td colspan="2">the rma with id provided is not found {"error":"RMA not found"}</td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>




<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/users</b> </th></tr>
<tr><td colspan="5">Shows the list of users </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="4" valign="top"><p><i>* required</i> </p><p><i>parameters.</i> </p></td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>

<tr><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of users is shown. <p> example :  </p>
<pre>[
{"userID":1,"userName":"Pablo","email":"customer@email.com","userRole":"customer"},
{"userID":2,"userName":"Georgi","email":"collector@email.com","userRole":"collector"},
{"userID":3,"userName":"Desmond","email":"controller@email.com","userRole":"controller"}
]
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/users/{userId}</b> </th></tr>
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


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/users/count</b> </th></tr>
<tr><td colspan="5">Shows the amount of users registered in the system </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="4" valign="top"><p><i>* required</i> </p><p><i>parameters.</i> </p></td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>

<tr><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The number of users is shown. <p> example :  </p>
<pre>
{"statusRma":"Returned"}
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>





<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/product</b> </th></tr>
<tr><td colspan="5">Shows the list of products </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of the products will be shown <p> example :  </p>
<pre>[
{"productId":1,"type":"Electronics","price":599.99,"name":"Smartphone","imageURL":"https://c8.alamy.com/comp/DH80YG","productWeight":0.2,"inventoryStock":50},
{"productId":2,"type":"Clothing","price":40,"name":"T-shirt","imageURL":"https://images/image.jpg","productWeight":0.3,"inventoryStock":100}
]
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/product/{productId}</b> </th></tr>
<tr><td colspan="5">Shows the product with id {productId} </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="2" valign="top"><i>* required parameters.</i> </td><td colspan="1">productId* </td><td colspan="1">path </td><td colspan="1">The unique id of the product </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>

<tr><th colspan="1" rowspan="3"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The product with id {productId} is shown <p> example :  </p>
<pre>
{"productId":1,"type":"Electronics","price":599.99,"name":"Smartphone","imageURL":"https://c8.alamy.com/comp/DH80YG/iphone-5-smartphone-DH80YG.jpg","productWeight":0.2,"inventoryStock":50}
</pre></td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The product with id {productId} is not found
<pre>
{"error":"Product not found."}
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/product/mostReturned</b> </th></tr>
<tr><td colspan="5">Shows the list of most returned products </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of the most returned products will be shown <p> example :  </p>
<pre>[
{"productName":"T-shirt","totalTimesReturned":18},
{"productName":"Keyboard","totalTimesReturned":5},
{"productName":"Smartphone","totalTimesReturned":2}]
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/product/{productId}/price</b> </th></tr>
<tr><td colspan="5">Shows the price of the product with id {productId} </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="2" valign="top"><i>* required parameters.</i> </td><td colspan="1">productId* </td><td colspan="1">path </td><td colspan="1">The unique id of the product </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>

<tr><th colspan="1" rowspan="3"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The price product with id {productId} is shown <p> example :  </p>
<pre>
{"unitPrice":40}
</pre></td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The product with id {productId} is not found
<pre>
{"error":"Product not found."}
</pre></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>



<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/orders</b> </th></tr>
<tr><td colspan="5">Shows the list of products </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1">userId* </td><td colspan="1">path </td><td colspan="1">the unique id of the user </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The list of orders is shown<p> example :  </p>
<pre>[
{"orderId":1,"userId":1,"orderDate":"2024-01-01","totalPrice":209.99},
{"orderId":2,"userId":1,"orderDate":"2024-01-22","totalPrice":80},
{"orderId":3,"userId":1,"orderDate":"2024-01-22","totalPrice":944.98}
]
</pre> </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/orders/{orderId}</b> </th></tr>
<tr><td colspan="5">Shows the order with the id {orderId} </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><p><i>* required</i> </p><p><i>parameters.</i> </p></td><td colspan="1">orderId* </td><td colspan="1">path </td><td colspan="1">The unique id of the order </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The order with desired Id is shown 
<pre>
{"orderId":1,"userId":1,"orderDate":"2024-01-01","totalPrice":209.99}
</pre></td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The order is not found </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>GET</b> </th><th colspan="4"><b>localhost:3000/orders/myOrders/{userId}</b> </th></tr>
<tr><td colspan="5">Shows the list of orders placed by user with the id {userId} </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><p><i>* required</i> </p><p><i>parameters.</i> </p></td><td colspan="1">userId* </td><td colspan="1">path </td><td colspan="1">The unique id of the user </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">200 </td><td colspan="2">The order with desired Id is shown 
<pre>[
[{"userID":1,"orderId":1,"totalPrice":209.99,"orderDate":"2024-01-01","productCount":3,"totalReturnedQuantity":2,"statusRma":"Returned","credit":80},{"userID":1,"orderId":2,"totalPrice":80,"orderDate":"2024-01-22","productCount":1,"totalReturnedQuantity":null,"statusRma":null,"credit":null},
{"userID":1,"orderId":3,"totalPrice":944.98,"orderDate":"2024-01-22","productCount":4,"totalReturnedQuantity":1,"statusRma":"pending","credit":0},{"userID":1,"orderId":4,"totalPrice":944.98,"orderDate":"2023-12-22","productCount":4,"totalReturnedQuantity":null,"statusRma":null,"credit":null}]
]
</pre></td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The order is not found </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


3. POST<a name="_page6_x69.00_y72.92"></a> requests 

POST table: 
<table><tr><th colspan="1"><b>POST</b> </th><th colspan="4"><b>localhost:3000/users</b> </th></tr>
<tr><td colspan="5">New user is created </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1" valign="top">User* </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The user to add. Either plain or JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>name: ”test”, </p><p>email: “test”, </p><p>username: ”test”, </p><p>password: “123”, </p><p>address: “street123”, </p><p>role : “collector” </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">201 </td><td colspan="2">The user is created.  {"message :" "User created successfully"} </td></tr>
<tr><td colspan="1">400 </td><td colspan="2">The user is not created  {"error" :"Failed to create user."}</td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>POST</b> </th><th colspan="4"><b>localhost:3000/requests</b> </th></tr>
<tr><td colspan="5">New request is created </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="2" valign="top"><i>* required parameters.</i> </td><td colspan="1" valign="top">Request* </td><td colspan="1" valign="top">body </td><td colspan="1"><p>The Request to add. As JSON, based on content-type header. </p><p>Example: example of json body  { </p><p>items: [] </p><p>comments: “test” </p><p>userId: 1 </p><p>} </p></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>


<tr><th colspan="1" rowspan="3"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="1" rowspan="5"></td><td colspan="1">201 </td><td colspan="2">The request  is created. {"message": "rma Created"}</td></tr>
<tr><td colspan="1">400 </td><td colspan="2">The request is not created  </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>

<table>
<tr>
    <th>POST</th>
    <th colspan="4">localhost:3000/products/</th>
  </tr>
  <tr>
    <td colspan="5">Creates a new product</td>
  </tr>
  <tr>
    <td colspan="5"></td>
  </tr>
  <tr>
    <td colspan="2"><b>Parameters:</b></td>
    <td colspan="1"><b>Name</b></td>
    <td colspan="1"><b>Type</b></td>
    <td colspan="1"><b>Description</b></td>
  </tr>
  <tr>
    <td colspan="2" rowspan="4" valign="top"><i>* required parameters.</i></td>
    <td colspan="1">Product*</td>
    <td colspan="1">body</td>
    <td colspan="1">
      <p>The product to add. As JSON, based on content-type header.</p>
      <p>Example:</p>
      <pre>
      {
        "name": "New Product",
        "description": "Description of the new product",
        "price": 29.99,
        "quantity": 100
      }
      </pre>
    </td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="1"></td>
    <td colspan="1"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="1"></td>
    <td colspan="1"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="1"></td>
    <td colspan="1"></td>
  </tr>
  <tr>
    <td colspan="2"><b>Responses:</b></td>
    <td colspan="1"><b>Code</b></td>
    <td colspan="2"><b>Description / example if successful</b></td>
  </tr>
  <tr>
    <td colspan="2" rowspan="5"></td>
    <td colspan="1">201</td>
    <td colspan="2">The product is created successfully</td>
  </tr>
  <tr>
    <td colspan="1">400</td>
    <td colspan="2">The product is not created due to invalid arguments</td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="2"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="2"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="2"></td>
  </tr>

</table>


<table>
<tr>
    <th>POST</th>
    <th colspan="4">localhost:3000/tokens/</th>
  </tr>
  <tr>
    <td colspan="5">Creates a new session token</td>
  </tr>
  <tr>
    <td colspan="5"></td>
  </tr>
  <tr>
    <td colspan="2"><b>Parameters:</b></td>
    <td colspan="1"><b>Name</b></td>
    <td colspan="1"><b>Type</b></td>
    <td colspan="1"><b>Description</b></td>
  </tr>
  <tr>
    <td colspan="2" rowspan="4" valign="top"><i>* required parameters.</i></td>
    <td colspan="1">Token*</td>
    <td colspan="1">body</td>
    <td colspan="1">
      <p>The token to create. As JSON, based on content-type header.</p>
      <p>Example:</p>
      <pre>
      {
        "email": "collector@email.com",
        "password": "password"
      }
      </pre>
    </td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="1"></td>
    <td colspan="1"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="1"></td>
    <td colspan="1"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="1"></td>
    <td colspan="1"></td>
  </tr>
  <tr>
    <td colspan="2"><b>Responses:</b></td>
    <td colspan="1"><b>Code</b></td>
    <td colspan="2"><b>Description / example if successful. <pre>
{"token" : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJjb2xsZWN0b3JAZW1haWwuY29tIiwicm9sZSI6ImNvbGxlY3RvciIsInVzZXJOYW1lIjoiR2VvcmdpIiwiaWF0IjoxNzA2NDM4OTY4LCJleHAiOjE3MDY0NDI1Njh9._0Sqx8jwXHZj7pAbHOUl5ViFxR-QU2QzqKo6HUhHNf8
</pre>
</b></td>
  </tr>
  <tr>
    <td colspan="2" rowspan="5"></td>
    <td colspan="1">201</td>
    <td colspan="2">The product is created successfully</td>
  </tr>
  <tr>
    <td colspan="1">400</td>
    <td colspan="2">The product is not created due to invalid arguments</td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="2"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="2"></td>
  </tr>
  <tr>
    <td colspan="1"></td>
    <td colspan="2"></td>
  </tr>

</table>





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






<tr><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th><th colspan="1"></th></tr>
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



<a name="_page10_x69.00_y72.92"></a>5. DELETE requests 

DELETE tables: 

<table><tr><th colspan="1"><b>DELETE</b> </th><th colspan="4"><b>/localhost:3000/users/{userId}</b> </th></tr>
<tr><td colspan="5">The user with the id passed in the params will be deleted  </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"><b>userId*</b> </td><td colspan="1">path </td><td colspan="1">The unique id of the user </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">204 </td><td colspan="2">The user is deleted successfully. <pre>{
    "message": "User deleted successfully."
}</pre> </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The user is not found, so nothing was deleted. </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


<table><tr><th colspan="1"><b>DELETE</b> </th><th colspan="4"><b>/localhost:3000/rma/{RMAId}</b> </th></tr>
<tr><td colspan="5">The rma with the id passed in the params will be deleted  </td></tr>
<tr><td colspan="5"></td></tr>
<tr><td colspan="2"><b>Parameters:</b> </td><td colspan="1"><b>Name</b> </td><td colspan="1"><b>Type</b> </td><td colspan="1"><b>Description</b> </td></tr>
<tr><td colspan="2" rowspan="5" valign="top"><i>* required parameters.</i> </td><td colspan="1"><b>RMAId*</b> </td><td colspan="1">path </td><td colspan="1">The unique id of the rma </td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="1"></td><td colspan="1"></td><td colspan="1"></td></tr>
<tr><td colspan="2"><b>Responses:</b> </td><td colspan="1"><b>Code</b> </td><td colspan="2"><b>Description / example if successful</b> </td></tr>
<tr><td colspan="2" rowspan="5"></td><td colspan="1">204 </td><td colspan="2">The rma is deleted successfully.
<pre>{
    "message": "RMA deleted successfully."
}</pre> </td></tr>
<tr><td colspan="1">404 </td><td colspan="2">The rma is not found, so nothing was deleted. </td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
<tr><td colspan="1"></td><td colspan="2"></td></tr>
</table>


