const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5500;

// Serve static files
app.use(express.static(path.join(__dirname, 'Web Form')));
app.get('/',(req,res) => {
  res.sendFile(__dirname + '/Web Form/index.html')
})

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb://localhost:27017', {
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
}

connectDB(); // connectDB function to establish the MongoDB connection

// Define a schema for the data
const Schema = mongoose.Schema
const dataSchema = new Schema({
  name: String,
  plan: String,
  address: String,
  contactNumber: String,
  IDNumber: String,
});

// model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Parse JSON bodies for POST requests
app.use(bodyParser.urlencoded({ extended: false }));

// Store data from the form
app.post('/', (req, res) => { 
  console.log(req.body);
  const { name, plan, address, contactNumber, IDNumber } = req.body;
  const newData = new Data({ 
    name: name, 
    plan: plan, 
    address: address, 
    contactNumber: contactNumber, 
    IDNumber: IDNumber 
  });
  newData.save()
    .then(() => {
      console.log('Data saved successfuly');
    })
    .catch(err => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});