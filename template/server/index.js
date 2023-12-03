import express from 'express';

import cors from 'cors';

const app = express()

import userRouter from "./routers/user-router.js";

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.use(cors);
const port = 3000

app.get('/', (req, res) => {
    console.log(req);
    // res.send('Hello World!')
    res.json({ msg: "hello world"});
})

app.use('/users', userRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})