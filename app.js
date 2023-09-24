const { TOKEN_SECRET, origin, methods } = require('./config/default.json');
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use('/images', express.static('images'));
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use(morgan('dev'));

//Import routes
const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');

//Route middleware
app.use('/api/users', usersRoutes);
app.use('/api/posts', postsRoutes);

module.exports = app;