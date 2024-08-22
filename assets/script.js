// API URL
const apiURL = 'https://fedskillstest.coalitiontechnologies.workers.dev/';

// Username and Password
const username = 'coalition';
const password = 'skills-test';

// Function to fetch and display the name list and a specific person's data
function fetchAndDisplayData() {
    // Create the basic authentication string
    const basicAuth = btoa(`${username}:${password}`);

    // Fetch data from the API
    fetch(apiURL, {
        headers: {
            'Authorization': 'Basic ' + basicAuth
        }
    })
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
        // Display the name list
        const list = document.getElementById('names-list');
        list.innerHTML = ''; // Clear the list before adding new items

        data.forEach((person) => {
            const listItem = document.createElement('div');
            listItem.className = 'person';
            listItem.innerHTML = `
           <div class="flex p-5 gap-3"> 
                <img src="${person.profile_picture}" alt="${person.name}'s profile picture">
                <div>  
                <h3>${person.name}</h3>
                <p>Gender: ${person.gender} ,${person.age} </p>
                </div>
                 <img style="height: 17px; width: 16px; margin-left: auto;" src="assets/images/icons/horizontal_dots.svg" alt="logo">

           </div>
            `;
            listItem.addEventListener('click', () => {
                displayPersonDetails(person);
                displayBloodPressureChart(person.diagnosis_history);
            }); // Add click event to show details
            list.appendChild(listItem);
        });

        // Display the details and chart for Jessica Taylor (index 3)
        displayPersonDetails(data[3]);
        displayBloodPressureChart(data[3].diagnosis_history);
    })
    .catch(error => console.error('Error fetching data:', error)); // Handle errors
}

// Function to display a specific person's details
function displayPersonDetails(person) {
    console.log(person);
    
    
    document.getElementById('person-name').textContent = person.name;
    // document.getElementById('age').textContent = person.age;
    document.getElementById('dob').textContent = person.date_of_birth;
    document.getElementById('gender').textContent = person.gender;
    document.getElementById('contact').textContent = person.phone_number;
    document.getElementById('emergency').textContent = person.emergency_contact;
    document.getElementById('profile-pic').src = person.profile_picture;
    document.getElementById('insurance-type').textContent = person.insurance_type;
    
    
    document.getElementById('respiratory-rate').textContent = person?.diagnosis_history[0]?.respiratory_rate?.value + " bpm";
    document.getElementById('respiratory-level').textContent = person?.diagnosis_history[0]?.respiratory_rate?.levels;

    document.getElementById('temperature-rate').textContent = person?.diagnosis_history[0]?.temperature?.value + " °F";
    document.getElementById('temperature-level').textContent = person?.diagnosis_history[0]?.temperature?.levels;
    
    document.getElementById('heart-rate').textContent = person?.diagnosis_history[0]?.heart_rate?.value + " bpm";
    document.getElementById('heart-level').textContent = person?.diagnosis_history[0]?.heart_rate?.levels;
    
    // Populate the diagnosis table
    const diagnosisList = document.getElementById('diagnosis-list');
    diagnosisList.innerHTML = ''; // Clear previous data
    
    person.diagnostic_list.forEach(diagnosis => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${diagnosis.name}</td>
            <td>${diagnosis.description}</td>
            <td>${diagnosis.status}</td>
        `;
        diagnosisList.appendChild(row);
    });
}

// Function to display blood pressure chart using Chart.js
function displayBloodPressureChart(diagnosisHistory) {
    // Extract the months, systolic, and diastolic values
    const months = diagnosisHistory.map(entry => `${entry.month} ${entry.year}`);
    const systolicValues = diagnosisHistory.map(entry => entry.blood_pressure.systolic.value);
    const diastolicValues = diagnosisHistory.map(entry => entry.blood_pressure.diastolic.value);

    // Create the chart
    const ctx = document.getElementById('bloodPressureChart').getContext('2d');
    const bloodPressureChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months, // X-axis labels
            datasets: [
                {
                    label: 'Systolic',
                    data: systolicValues,
                    borderColor: '#E35D9B', // Pink color for Systolic
                    backgroundColor: 'rgba(227, 93, 155, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#E35D9B',
                    pointRadius: 5,
                    tension: 0.4,
                    fill: true,
                },
                {
                    label: 'Diastolic',
                    data: diastolicValues,
                    borderColor: '#9577D7', // Purple color for Diastolic
                    backgroundColor: 'rgba(149, 119, 215, 0.2)',
                    borderWidth: 2,
                    pointBackgroundColor: '#9577D7',
                    pointRadius: 5,
                    tension: 0.4,
                    fill: true,
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false,
                    suggestedMin: 60,
                    suggestedMax: 180,
                    ticks: {
                        color: '#4F4F4F', // Gray tick color
                        font: {
                            family: 'Arial',
                            size: 12,
                        },
                    },
                    grid: {
                        display: true,
                        color: '#EDEDED', // Light gray grid lines
                    }
                },
                x: {
                    ticks: {
                        color: '#4F4F4F', // Gray tick color
                        font: {
                            family: 'Arial',
                            size: 12,
                        },
                    },
                    grid: {
                        display: false, // Hide X-axis grid lines
                    }
                }
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        boxWidth: 8,
                        padding: 20,
                        font: {
                            family: 'Arial',
                            size: 14,
                        },
                        color: '#4F4F4F', // Legend color
                    },
                },
            },
            responsive: true,
        }
    });
}

// Fetch and display data when the page loads
fetchAndDisplayData();
