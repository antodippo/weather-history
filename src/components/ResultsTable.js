import _uniqueId from "lodash/uniqueId";

function ResultsTable(props) {
  return (
    <div className="flex flex-col mx-auto">
      {props.weatherHistory.map((year) => (
        <div className="flex flex-row" key={_uniqueId("year-")}>
          <div className="font-serif font-semibold text-xl p-3 align-middle">{year.year}</div>
          {year.yearWeather.map((day) => (
            <div
              className="bg-gray-100 rounded shadow-md h-50 min-h-50 w-32 min-w-0 m-1 text-xs text-center"
              key={_uniqueId("day-")}
            >
              <div className="font-bold text-sm">
                {day.date.substring(8, 10)}/{day.date.substring(5, 7)}
              </div>
              <div>Min: {day.minTemp}°C</div>
              <div>Max: {day.maxTemp}°C</div>
              <div>{day.description}</div>
              <div>Wind: {day.wind}km/h</div>
              <div>Rain: {day.rain}mm</div>
              <img
                className="rounded shadow-md mx-auto mt-0.5"
                src={day.iconUrl}
                alt={day.description}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ResultsTable;
