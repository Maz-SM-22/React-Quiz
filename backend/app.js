const express = require('express');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const passport = require('passport');
const initializePassport = require('./config/passport-config');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config/config.env' });
const authRoutes = require('./routes/authRouter');
const resultsRoutes = require('./routes/resultsRouter');
const errorHander = require('./middleware/errorHandler');

const port = process.env.PORT || 5000;

initializePassport(passport);
const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const sessionStore = new MongoStore({
    mongoUrl: process.env.MONGO_DB,
    collection: 'sessions'
})
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, sameSite: 'none', secure: true },
    store: sessionStore
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/results', resultsRoutes);

app.use(errorHander);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Successfully connected to the DB');
        app.listen(port, 'localhost', (err) => {
            if (err) console.error(err);
            else console.log(`Server is running on port ${port}`)
        })
    })
    .catch((err) => {
        console.error('Database connection error');
        console.error(err);
    })