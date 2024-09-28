const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const adminrouter = require('./routes/adminRoutes');
const userrouter = require('./routes/userRoutes');


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/', adminrouter);
app.use('/', userrouter);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:5000');
})