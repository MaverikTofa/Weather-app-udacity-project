/*Comments from commentsOnlyJs folder*/
////// Personal API Key for OpenWeatherMap API -->done
////// Event listener to add function to existing HTML DOM element --> done
/////* Function called by event listener */ --> done
/////* Function to GET Web API Data*/ --> done
/////* Function to POST data */ --> done
/////* Function to GET Project Data */ --> done

// Create a new date instance dynamically with JS
let d = new Date();
// getMonth +1 as getMonth() zero indexed
let newDate = `${d.getMonth() + 1}.${d.getDate()}.${d.getFullYear()}`;

/* Global Variables */
const myApi = "9156f42a7c81b86e91b7602ab6d457b9";
const button = document.getElementById("generate");

//adding Event Listener to button when clicked
button.addEventListener("click", updateUI);

async function updateUI() {
    //get zip code entered by the user and check if it is valid
    const zip = document.getElementById("zip").value;
    if (zip.length < 5)
        return alert(
            "Please enter a valid zip code\n Zip code has minimum of 5 numbers"
        );

    //get feelings entered by the user and check if left empty
    const feelings = document.getElementById("feelings").value;
    if (!feelings) return alert("Kindly, answer How are you feeling today?");

    //formatting the api URL to pass it as an argument for fetchWeather function
    const openWeatherURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=metric&appid=${myApi}`;

    //chaining functions
    fetchWeather(openWeatherURL)
        .then((temp) => saveData(temp, feelings))
        .then(() => userInterface())
        .catch((err) => console.log("Error", err));
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);

        //zip code not found by openWeather api status:404
        if (response.status === 404)
            return alert("Can't find City associated with Zip code");

        const weatherData = await response.json();
        const temprature = weatherData.main.temp;
        return temprature;
    } catch (err) {
        console.log("Error", err);
    }
}

async function saveData(temp, feelings) {
    try {
        await fetch("/save", {
            method: "POST",
            credentials: "same-origin",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                date: newDate,
                temprature: temp,
                feelings: feelings,
            }),
        });
    } catch (err) {
        console.log("Error", err);
    }
}

async function userInterface() {
    try {
        const request = await fetch("/all");
        const requestedData = await request.json();

        const userDate = document.getElementById("date");
        userDate.textContent = `Today: ${requestedData.date}`;

        const todayTemp = document.getElementById("temp");
        todayTemp.textContent = `Temprature: ${requestedData.temprature} °C`;

        const userFeeling = document.getElementById("content");
        userFeeling.textContent = `Feeling: ${requestedData.feelings}`;
    } catch (err) {
        console.log("Error", err);
    }
}
