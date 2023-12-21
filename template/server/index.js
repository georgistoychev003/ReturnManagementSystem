import express from 'express';

import cors from 'cors';

const app = express()

import userRouter from "./routers/user-router.js";
import tokenRouter from "./routers/token-router.js";
import orderRouter from "./routers/order-router.js";
import rmaRouter from "./routers/rma-router.js";

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));
const port = 3000

app.get('/', (req, res) => {
    console.log(req);
    // res.send('Hello World!')
    res.json({ msg: "hello world"});
})

app.use('/users', userRouter);
app.use('/token', tokenRouter);
app.use('/orders', orderRouter);
app.use('/rma', rmaRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
