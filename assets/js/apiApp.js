const unsplashAccessKey = "JxhTyVeQ_PCcYiolbN9CnDHwYZnTDv1M-pFc8GvkxBM"; // Replace with your Unsplash Access Key
const api_key = "OsUGNOpvFnJ8ZB3I3tY57A==Rhqy2uKdm0hss8iX";
const api_url = "https://api.api-ninjas.com/v1/cars";

// let carName = "Audi";

let searchName = document.getElementById("s_name");
let searchYear = document.getElementById("s_date");
let fuelType = document.getElementById("fuel_type");

// Add an event listener to the input elements
searchName.addEventListener("input", function () {
  updateParamsAndFetchData();
});

searchYear.addEventListener("input", function () {
  updateParamsAndFetchData();
});
fuelType.addEventListener("change", function () {
  updateParamsAndFetchData();
});
// Define the parameters for the API request
const params = {
  make: "", // Initial value for make
  year: "", // Initial value for year
  limit: 8,
  fuel_type: "gas", // Initial value for fuel_type
  // You can adjust the limit as needed
};

// Function to update params and fetch data
function updateParamsAndFetchData() {
  // Get the current values of the inputs
  let carName = searchName.value;
  let carYear = searchYear.value;
  let carFuel = fuelType.value;

  // Update the params object with the new values
  params.make = carName;
  params.year = carYear;
  params.fuel_type = carFuel;

  // Call the getCarData function to fetch data from the API with the updated parameters
  getCarData();
}

// Function to save input values to localStorage
function saveInputValues() {
  localStorage.setItem("carName", searchName.value);
  localStorage.setItem("carYear", searchYear.value);
  localStorage.setItem("carFuel", fuelType.value);
}

// Function to load input values from localStorage
function loadInputValues() {
  searchName.value = localStorage.getItem("carName") || "";
  searchYear.value = localStorage.getItem("carYear") || "";
  fuelType.value = localStorage.getItem("carFuel") || "";
}

// Function to clear input values from localStorage
function clearInputValues() {
  localStorage.removeItem("carName");
  localStorage.removeItem("carYear");
  localStorage.removeItem("carFuel");
}

// Event listener to clear input values from localStorage when the page is reloaded
window.addEventListener("beforeunload", clearInputValues);

// Load input values on page load
document.addEventListener("DOMContentLoaded", function () {
  loadInputValues();
  updateParamsAndFetchData(); // Call this to fetch data based on the loaded values
});
const options = {
  method: "GET",
  headers: {
    "X-API-Key": api_key,
  },
};

async function getCarData() {
  try {
    // Convert the params object into a query string
    const queryString = Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");

    // Append the query string to the API URL
    const apiUrlWithParams = `${api_url}?${queryString}`;

    const response = await fetch(apiUrlWithParams, options);
    const data = await response.json();

    // Assuming the API response has an array of cars
    const apiCars = data;

    console.log(apiCars);

    // Update the carContainer with the new API data
    updateCarContainer(apiCars);

    console.log("Success");
  } catch (e) {
    console.log("Something went wrong");
  }
}

// Helper function to update the carContainer with new data
// async function updateCarContainer(apiCars) {
//   const carContainer = document.getElementById("carContainer");
//   carContainer.innerHTML = ""; // Clear existing content

//   for (const car of apiCars) {
//     const imageUrl = await fetchPexelsImage(car.make);
//     const carElement = createCarElement({ ...car, imageUrl });
//     carContainer.appendChild(carElement);
//   }
// }

// Helper function to fetch an image from Unsplash based on make
const pexelsApiKey =
  "jamctTkMSQJkXNO604VYtsdn3gh9Byw90BaAhWJcD9USqg3zNMB7aWNy "; // Replace with your Pexels API key

async function fetchRandomPexelsImages(make, count = 1) {
  const pexelsUrl = `https://api.pexels.com/v1/search?query=${make}&per_page=${count}`;

  try {
    const response = await fetch(pexelsUrl, {
      headers: {
        Authorization: pexelsApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();

    // Extract and return an array of photo URLs
    return data.photos.map((photo) => photo.src.large);
  } catch (error) {
    console.error("Error fetching images from Pexels:", error);
    return [];
  }
}

// ...

// Helper function to update the carContainer with new data
async function updateCarContainer(apiCars) {
  const carContainer = document.getElementById("carContainer");
  carContainer.innerHTML = ""; // Clear existing content

  for (const car of apiCars) {
    // Fetch multiple random images for each car
    const imageUrls = await fetchRandomPexelsImages(car.make, 3); // Adjust count as needed

    // Use a different image URL for each card
    const imageUrl =
      imageUrls.length > 0
        ? imageUrls[Math.floor(Math.random() * imageUrls.length)]
        : "https://via.placeholder.com/400";

    const carElement = createCarElement({ ...car, imageUrl });
    carContainer.appendChild(carElement);
  }
}
// Helper function to create car HTML structure
function createCarElement(car) {
  const container = document.createElement("div");
  container.classList.add("box");

  container.innerHTML = `
    <div class="box-img">
      <img src="${car.imageUrl}" width="400" alt="Car Image">
    </div>
    <p>${car.fuel_type}</p>
    <h3>${car.make} ${car.model} ${car.year}</h3>
    <h2>${car.class}</h2>
    <h2>${car.highway_mpg} MPG (Highway)</h2>
    <a href="#" class="serive-btn">Rent Now</a>
  `;

  return container;
}

// Call the getCarData function to fetch data from the API
getCarData();
