const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const connectDb = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

connectDb();

app.use('/api', require('./routes/auth'));
app.use('/api/student', require('./routes/student'));
app.use('/api/university', require('./routes/university'));
app.use('/api/verifier', require('./routes/verifier'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/settings', require('./routes/settings'));

app.get('/', (_, res) => res.send('API running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


