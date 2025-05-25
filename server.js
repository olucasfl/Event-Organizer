const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const routes = require('./routes');
const dotenv = require('dotenv');
const path = require('path');
const authMiddleware = require('./src/middlewares/authMiddleware');


// Loading ambient variables
dotenv.config();

// MongoDB Conection
mongoose.connect(process.env.DB_URI, {
  
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro de conexão ao MongoDB:', err));

// Configuration session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.DB_URI }),
  cookie: { 
    maxAge: 1000 * 60 * 60 * 24, // 1 day
    httpOnly: true
  }
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(authMiddleware)

// Middleware for user disponibilization on all views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

// Routes
app.use('/', routes);

// Errors Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});