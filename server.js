const express = require('express');
const app = express();
const routes = require('./routes');
const dotenv = require('dotenv');

dotenv.config();

// Middleware for interpret JSON
app.use(express.json());

// Routes of aplication
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Acessar http://localhost:${PORT}`);
});
