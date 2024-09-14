// API URL
const apiURL = "https://fedskillstest.coalitiontechnologies.workers.dev/";

// Username and Password
const username = "coalition";
const password = "skills-test";

// Function to fetch and display the name list and a specific person's data
function fetchAndDisplayData() {
  // Create the basic authentication string
  const basicAuth = btoa(`${username}:${password}`);

  // Fetch data from the API
  fetch(apiURL, {
    headers: {
      Authorization: "Basic " + basicAuth,
    },
  })
    .then((response) => response.json()) // Convert response to JSON
    .then((data) => {
      // Display the name list
      const list = document.getElementById("names-list");
      list.innerHTML = "";

      data.forEach((person) => {
        const listItem = document.createElement("div");
        listItem.className = "person";
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
        listItem.addEventListener("click", () => {
          displayPersonDetails(person);
          displayBloodPressureChart(person.diagnosis_history);
        });
        list.appendChild(listItem);
      });

      // Display default data
      displayPersonDetails(data[3]);
      displayBloodPressureChart(data[3].diagnosis_history);
    })
    .catch((error) => console.error("Error fetching data:", error));
}

// Function to display a specific person's details
function displayPersonDetails(person) {
  console.log(person);

  document.getElementById("person-name").textContent = person.name;
  // document.getElementById('age').textContent = person.age;
  document.getElementById("dob").textContent = person.date_of_birth;
  document.getElementById("gender").textContent = person.gender;
  document.getElementById("contact").textContent = person.phone_number;
  document.getElementById("emergency").textContent = person.emergency_contact;
  document.getElementById("profile-pic").src = person.profile_picture;
  document.getElementById("insurance-type").textContent = person.insurance_type;

  document.getElementById("respiratory-rate").textContent =
    person?.diagnosis_history[0]?.respiratory_rate?.value + " bpm";
  document.getElementById("respiratory-level").textContent =
    person?.diagnosis_history[0]?.respiratory_rate?.levels;

  document.getElementById("temperature-rate").textContent =
    person?.diagnosis_history[0]?.temperature?.value + " °F";
  document.getElementById("temperature-level").textContent =
    person?.diagnosis_history[0]?.temperature?.levels;

  document.getElementById("heart-rate").textContent =
    person?.diagnosis_history[0]?.heart_rate?.value + " bpm";
  document.getElementById("heart-level").textContent =
    person?.diagnosis_history[0]?.heart_rate?.levels;

  // Populate the diagnosis table
  const diagnosisList = document.getElementById("diagnosis-list");
  diagnosisList.innerHTML = ""; // Clear previous data

  person.diagnostic_list.forEach((diagnosis) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${diagnosis.name}</td>
            <td>${diagnosis.description}</td>
            <td>${diagnosis.status}</td>
        `;
    diagnosisList.appendChild(row);
  });

  // Populate the Lab Results table
  const labResults = document.getElementById("lab-result");
  labResults.innerHTML = ""; // Clear previous data

  person.lab_results.forEach((item) => {
    console.log(item);

    const row = document.createElement("tr");
    row.innerHTML = `
                <td>${item}   <img style="height: 20px; width: 20px;" src="assets/images/icons/download_logo.svg" alt="logo">  </td>
       
            `;
    labResults.appendChild(row);
  });
}

// Function to display blood pressure chart using Chart.js
function displayBloodPressureChart(diagnosisHistory) {
  const months = diagnosisHistory.map(
    (entry) => `${entry.month} ${entry.year}`
  );
  const systolicValues = diagnosisHistory.map(
    (entry) => entry.blood_pressure.systolic.value
  );
  const diastolicValues = diagnosisHistory.map(
    (entry) => entry.blood_pressure.diastolic.value
  );

  const ctx = document.getElementById("bloodPressureChart").getContext("2d");
  const bloodPressureChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: months, // X-axis labels
      datasets: [
        {
          label: "Systolic",
          data: systolicValues,
          borderColor: "#E35D9B",
          backgroundColor: "rgba(227, 93, 155, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#E35D9B",
          pointRadius: 5,
          tension: 0.4,
          fill: true,
        },
        {
          label: "Diastolic",
          data: diastolicValues,
          borderColor: "#9577D7",
          backgroundColor: "rgba(149, 119, 215, 0.2)",
          borderWidth: 2,
          pointBackgroundColor: "#9577D7",
          pointRadius: 5,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
          suggestedMin: 60,
          suggestedMax: 180,
          ticks: {
            color: "#4F4F4F",
            font: {
              family: "Arial",
              size: 12,
            },
          },
          grid: {
            display: true,
            color: "#EDEDED",
          },
        },
        x: {
          ticks: {
            color: "#4F4F4F",
            font: {
              family: "Arial",
              size: 12,
            },
          },
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "right",
          labels: {
            usePointStyle: true,
            boxWidth: 8,
            padding: 20,
            font: {
              family: "Arial",
              size: 14,
            },
            color: "#4F4F4F",
          },
        },
      },
      responsive: true,
    },
  });
}

fetchAndDisplayData();

// mobile toggler
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
