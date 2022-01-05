import { useState } from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

function SearchForm(props) {
  const [enteredLocation, setEnteredLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [fetchedLocation, setFetchedLocation] = useState("");

  const locationChangeHandler = (event) => {
    setEnteredLocation(event.target.value);
  };

  const dateChangeHandler = (date) => {
    setStartDate(date);
  };

  function submitHandler(event) {
    event.preventDefault();
    return fetchWeatherHandler(enteredLocation);
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const fetchWeatherHandler = async (enteredLocation) => {
    const start = addDays(startDate, -3).toISOString();
    const end = addDays(startDate, 3).toISOString();
    const currentYear = new Date().getFullYear();
    const initialYear = currentYear - 5;
    var weatherHistory = [];

    for (let year = initialYear; year < currentYear; year++) {
      const response = await fetch(
        `https://api.worldweatheronline.com/premium/v1/past-weather.ashx` +
          //TODO Put the key somewhere better
          `?key=${process.env.REACT_APP_AUTH_TOKEN}` +
          `&q=${enteredLocation}` +
          `&date=${year}-${start.substring(5, 7)}-${start.substring(8, 10)}` +
          `&enddate=${year}-${end.substring(5, 7)}-${end.substring(8, 10)}` +
          `&format=json&tp=24`
      );
      if (!response.ok) {
        setFetchedLocation(`Error: ${response.error}`);
      }
      try {
        const jsonResponse = await response.json();
        setFetchedLocation(
          `Retrieved location: ${jsonResponse.data.request[0].query} (${jsonResponse.data.request[0].type})`
        );

        const yearWeather = jsonResponse.data.weather.map((result) => {
          return {
            date: result.date,
            minTemp: result.mintempC,
            maxTemp: result.maxtempC,
            description: result.hourly[0].weatherDesc[0].value,
            wind: result.hourly[0].WindGustKmph,
            rain: result.hourly[0].precipMM,
            iconUrl: result.hourly[0].weatherIconUrl[0].value,
          };
        });

        weatherHistory.push({ year: year, yearWeather: yearWeather });
      } catch (error) {
        setFetchedLocation(`Error retrieving weather or location`);
      }
    }

    props.onSearch(weatherHistory);
  };

  return (
    <div className="mx-auto max-w-max">
      <form onSubmit={submitHandler}>
        <div className="flex flex-row mx-auto min-w-min mb-3">
          <div className="mr-1">Location:</div>
          <div className="mr-5">
            <input
              className="border rounded shadow"
              type="text"
              required
              value={enteredLocation}
              onChange={locationChangeHandler}
            />
          </div>
          <div className="mr-1">Date:</div>
          <div className="rounded shadow-md mr-5">
            <DayPickerInput onDayChange={dateChangeHandler} />
          </div>
          <div className="min-w-min">
            <button
              type="submit"
              className="bg-gray-200 rounded shadow-md text-xs p-0.5 "
            >
              Search
            </button>
          </div>
        </div>
      </form>
      <div className="mb-5">{fetchedLocation}</div>
    </div>
  );
}

export default SearchForm;
