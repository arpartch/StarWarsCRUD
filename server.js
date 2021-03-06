const express = require('express');
const bodyParser = require('body-parser');
const app = express();



const MongoClient = require('mongodb').MongoClient;


const connectionString = process.env.DB_URL

MongoClient.connect('mongodb+srv://yoda:Thisisit4!@cluster0.kqa1w.mongodb.net/CRUDwars?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    // Middlewares
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static('public'))


client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.use(bodyParser.urlencoded({ extended: true}));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/quotes', (req, res) => {
    quotesCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
});

app.listen(3000, function () {
    console.log('listening on 3000')
})