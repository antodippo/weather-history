import "./App.css";
import { useState } from "react";
import ResultsTable from "./components/ResultsTable";
import SearchForm from "./components/SearchForm";

function App() {
  const [weatherHistory, setWeatherHistory] = useState([]);

  const searchHandler = (weatherHistory) => {
    setWeatherHistory(weatherHistory);
  }

  return (
    <div className="container mx-auto rounded shadow-xl bg-gray-200 mt-10 mb-10">
      <div className="mx-auto mb-5 mt-10">
        <div className="mx-auto w-3/4 font-serif font-semibold text-4xl mb-3">Weather history</div>
        <div className="mx-auto w-3/4">
        Try searching a location and a date, the system will retrieve what was the
        weather like from 3 days before to 3 days after that date, in the last 5 years.
        </div>
      </div>
      <SearchForm onSearch={searchHandler} />
      <ResultsTable weatherHistory={weatherHistory} />
    </div>
  );
}

export default App;
