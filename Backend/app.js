require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db.js');
const app = express();
const cookieparser = require('cookie-parser')
const userRouter = require('./routes/user.routes.js')
const captainRouter = require('./routes/captain.routes.js')

app.use(express.json());
app.use(cookieparser());

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use('/users', userRouter)
app.use('/captains', captainRouter)


connectDB()
    .then(() => {
        console.log('Connected to database');
        app.listen(3000, () => {
            console.log('server is running on port 3000');
        });
    })
    .catch((err) => {
        console.error("Database is not connected! : " + err.message);
    })
