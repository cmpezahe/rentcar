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
  // Create a container div element with the "box" class
  const container = document.createElement("div");
  container.classList.add("box");

  // Define icons for different fuel types

  // Set the HTML content of the container using template literals
  container.innerHTML = `
    <div class="box-img">
      <img src="${car.imageUrl}" width="400" alt="Car Image">
    </div>
    
    <div class="box-container">
      <h3 class="car_name">${car.make}</h3>
      <p>${car.year}</p>
    </div>

    <div class="box-content">
    <p class="capitalize-first-letter"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+ElEQVR4nO2YO2gUURSGPxVjJD4IYpqNReILFawMGIMWFmoXUUIEQe2EWKiFVcpgolglaGOKgGAhEoO4hqCIwZSCoojdmiZKUCPGkEJ8jFz4R67DzjKze2cm4Hxwir1z7zn/mfs6s5CTk5OTk5MdK4B9wCXgJjABvAVKwBeZJ/N/l9RnQmPM2HZgeRYJbAMGgQ+W0FptFhgG2tJIYDUwBPyyBLwDRoDzQCewG2gFNgKNwDJZo9pa1adTY8zY6UBSt4F1SSVhxNxXoJ/AHeCAQ//7gVvAD8V4ltRyO22tdbMvkmIPMKdYJ5II8FzOz5A85xRr0rXjNjn+CNSTPOuBRcXc4dLxsJz2kx4jinnN5Un1FfgNbCY9OpTIJ2CVC4en5PAJ6fNGsbtcOHsqZydJnwuK/TjOoCM6JRbK3LrfgTWkzwbFDupZkNbDwQHHA7d10Ipkx3gFXUbzMbvzSz3oA5rUtlLHrWm/TnbckIZp66ZvklbT/sLu7C+nFqvtqJW5ObV6gC1AQwriGxSrR7F9HYesPi3WMvvLZIXpKzmscKu1UoVn/9z+W4GHZTa6KQ4L2kNjqnT9GzdJW1SsMcUuSEtwwxc1c6FcVGeT3FJhXJrMkRyZV9ZFVAdcDfmI+gaMakarpRm4K19ewN4DA9LQpTajLTK+I1MaXImwFOY0/XHZbpXslaxfWvzfsRNBb8UL+QYpaJ16+tCKyz2NfRDyIjqsmQnqioQ9wF9SO0P6brKO6Lj4yylsNne5TGTIWj7djhOZ11izT4J0W8tusIyuSNgD1qpo89umgIP6wGrWyeZpw8ZlVGOL8lUv31NWvEdWnVdTIqg0OKu/bMI2e8XzPARz2n0O8TmrmPYfEDUn4mPeTC/wWpfWvGaimiR8CjoojK9F+e4NqbadJZI1XrWJ7GXp0F5LIkvVImNv4qxFe2W0xE6k2ufV4rmO65clpkQIKxtm4utMP+5AhKm+7E5/cnHr5NR/Q7bNyJnp45q6jOLm5OTk5Pzn/AGije2jBfuXTQAAAABJRU5ErkJggg==">${car.model}</p>
    <p class ="feul-type"><img width="50" height="50" src="https://img.icons8.com/ios/50/engine.png" alt="engine"/>${car.fuel_type}</p>

    <p class="capitalize-first-letter"><img width="80" height="80" src="https://img.icons8.com/dotty/80/car-door.png" alt="car-door"/>${car.class}</p>
    <p><img width="50" height="50" src="https://img.icons8.com/ios/50/speed--v1.png" alt="speed--v1"/>${car.highway_mpg} 6.1km</p>
  </div>
  
  <div class="card-price-wrapper">
  <p class="card-price"><strong>
  £200</strong> /Day</p>
  <div>
  <button class="btn fav-btn" aria-label="Add to favourite list">
  <ion-icon name="heart-outline"></ion-icon>
</button>
<button class="btn">Rent now</button></div>
  
</div>
  `;

  // Return the created container element
  return container;
}

// Call the getCarData function to fetch data from the API
getCarData();
