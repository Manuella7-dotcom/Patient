document.getElementById('patientForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const patientData = {
        patientName: document.getElementById('patientName').value,
        patientAge: document.getElementById('patientAge').value,
        patientGender: document.getElementById('patientGender').value,
        patientLocation: document.getElementById('patientLocation').value,
        patientComplaint: document.getElementById('patientComplaint').value,
    };

    try {
        const response = await fetch('/submit_patient_form', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientData),
        });

        if (response.ok) {
            console.log('Patient data submitted successfully');
        } else {
            console.error('Error submitting patient data');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Function to fetch and display all patients
async function fetchPatients() {
    try {
        const response = await fetch('/patients');
        const patients = await response.json();
        console.log('Patients:', patients);
        // Code to display patients on the page
    } catch (error) {
        console.error('Error fetching patients:', error);
    }
}

// Call fetchPatients to load patients data when the page loads
fetchPatients();