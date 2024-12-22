const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

mongoose.connect(process.env.MONGODB_LINK || "mongodb+srv://nampeeramanu99:emma247@patientrecords.wovfk.mongodb.net/", {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    ssl: true // Ensure SSL is enabled
})
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

app.listen(process.env.PORT || 4000, () => {
    console.log('connected to port', process.env.PORT || 4000);
});

// Create a schema for the patient
const patientSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientAge: { type: Number, required: true },
    patientGender: { type: String, required: true },
    patientLocation: { type: String, required: true },
    patientComplaint: { type: String, required: true },
});

// Create a model for the patient from the schema
const Patient = mongoose.model('Patient', patientSchema);

// POST method to insert patient data
app.post('/submit_patient_form', async (req, res) => {
    const patientData = req.body;

    try {
        const newPatient = new Patient(patientData);
        const result = await newPatient.save();
        console.log('Patient inserted successfully', result);
        res.status(201).send(result);
    } catch (error) {
        console.error('Error inserting patient:', error);
        res.status(500).send(error);
    }
});