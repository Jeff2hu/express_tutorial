const express = require('express');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const groceriesRouter = require('./routes/groceries');
const storesRouter = require('./routes/stores');
const authRouter = require('./routes/auth');

require('dotenv').config();
require('./database')

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json())
app.use(express.urlencoded())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))
app.use(cookieParser())

app.use((req, res, next) => {
    console.log(`${req.method}: ${req.url}`);
    next();
})

app.use('/api/v1/auth', authRouter)

app.use((req, res, next) => {
    if(req.session.user) next();
    else res.send(401)
}) 

app.use('/api/v1/groceries', groceriesRouter)
app.use('/api/v1/stores', storesRouter)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
