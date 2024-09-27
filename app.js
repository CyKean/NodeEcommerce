const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Server running on http://localhost:5000');
})