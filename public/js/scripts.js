document.addEventListener('DOMContentLoaded', () => {
    fetchProfiles();
    fetchDoctors();
    fetchAppointmentTypes();
});

let profiles = [];

function fetchProfiles() {
    axios.get('/users')
        .then(response => {
            profiles = response.data.users;
            displayProfiles(profiles);
        })
        .catch(error => console.error('Error fetching profiles:', error));
}

function fetchDoctors() {
    axios.get('/doctors')
        .then(response => {
            
            const doctorSelect = document.getElementById('doctor');
            response.data.doctors.forEach(doctor => {
                const option = document.createElement('option');
                option.value = doctor._id;
                
                option.textContent = doctor.name;
                doctorSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching doctors:', error));
}

function fetchAppointmentTypes() {
    axios.get('/appointment-types')
        .then(response => {
            console.log(response)
            const appointmentTypeSelect = document.getElementById('appointmentType');
            response.data.forEach(type => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.name;
                appointmentTypeSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching appointment types:', error));
}

function displayProfiles(profiles) {
    const profileList = document.getElementById('profileList');
    profileList.innerHTML = '';
    profiles.forEach(profile => {
        const li = document.createElement('li');
        li.textContent = `Name:${profile.name} ,  Ph no: ${profile.phoneNumber}`;
        li.onclick = () => selectProfile(profile);
        profileList.appendChild(li);
    });
}

function selectProfile(profile) {
    document.getElementById('profileName').innerText = `Name: ${profile.name}`;
    document.getElementById('profileContact').innerText = `Contact: ${profile.phoneNumber}`;
    document.getElementById('selectedProfileName').innerText = profile.name;
    document.getElementById('profileLocation').innerText = `Location: ${profile.location || 'N/A'}`;
    document.getElementById('profileEmail').innerText = `Email Id: ${profile.email || 'N/A'}`;
    document.getElementById('patientId').innerText = profile._id;
}

function searchProfiles() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredProfiles = profiles.filter(profile =>
        profile.name.toLowerCase().includes(query) ||
        (profile.phoneNumber && profile.phoneNumber.toLowerCase().includes(query))
    );
    displayProfiles(filteredProfiles);
}


// Example code to handle form submission
// document.getElementById('appointmentForm').addEventListener('submit', function (event) {
//     event.preventDefault();
//     alert('Form submitted!');
// });

// Function to submit the form data using Axios
function submitForm() {
    // Retrieve all the input values

    const appointmentChannel = document.getElementById('appointmentChannel').value;
    const appointmentTitle = document.getElementById('appointmentTitle').value;
    const appointmentDate = document.getElementById('appointmentDate').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const appointmentType = document.getElementById('appointmentType').value;
    const bp = document.getElementById('bp').value;
    const temp = document.getElementById('temp').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const spo2 = document.getElementById('spo2').value;
    const pulseRate = document.getElementById('pulseRate').value;
    const reason = document.getElementById('reason').value;
    const noteForDoctor = document.getElementById('noteForDoctor').value;

    

    // Additional data provided
    const patientId = "66549dd7f3edb65e5259cc9e"; // Placeholder for patient ID
    const doctorId = "6654a47a0a3dabddcbbad1b3"; // Placeholder for doctor ID
    const vitalInfo = `BP: ${bp}, Temp: ${temp}, Height: ${height}, Weight: ${weight}, SPO2: ${spo2}, Pulse Rate: ${pulseRate}`;

    // Create a JavaScript object with the form data and additional data
    const formData = {
        patientId, // Additional patient ID
        doctorId,
        appointmentChannel,
        appointmentTitle,
        appointmentDate,
        appointmentTime,
        appointmentType,
         // Additional doctor ID
        vitalInfo,
        reason,
         noteForDoctor
    };
console.log(formData)

    axios.post("/appointment", formData)
        .then(() => {
            alert("Submitted");
        })
        .catch(() => {
            alert("please fill all the required feild ");
        });

    // Submit the form data using Axios

}
document.querySelector('.form-actions button[type="submit"]').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    submitForm(); // Call the submitForm() function
    setTimeout(()=>{
        window.location.href = "/booked"
    },1000)
});
