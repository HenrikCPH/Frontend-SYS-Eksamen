import React, { useState, useEffect } from "react"
import URL, {localURL, dropletURL} from './settings';

function App() {

  function handleHttpErrors(res) {
    if (!res.ok) {
      return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json();
   }
    
   function urlFetchFromBackend (plateInput) {
    return fetch(dropletURL + "/api/car/" + plateInput)
    .then(handleHttpErrors)
  }

  function LicensePlateSearchApp() { 
    const [plateInput, setPlateInput] = useState("");
    const [data, setData] = useState([]);
    
      useEffect(() => {
        urlFetchFromBackend().then(data=> setData(data));
      }, [])

    const handleChange = event => {
       setPlateInput(event.target.value);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      urlFetchFromBackend(plateInput);
    }
    const mappedData = data.map((tag) =>
    <li key={tag.registration_number}>
      registration_number: {tag.registration_number} -  
      status: {tag.status} -
      status_date: {tag.status_date}
      type: {tag.type}
      use: {tag.use}
      first_registration: {tag.first_registration}
      vin: {tag.vin}
      total_weight: {tag.total_weight}
      axels: {tag.axels}
      seats: {tag.seats}
      coupling: {tag.coupling}
      make: {tag.make}
      model: {tag.model}
      variant: {tag.variant}
      model_type: {tag.model_type}
      model_year: {tag.model_year}
      color: {tag.color}
      engine_cylinders: {tag.engine_cylinders}
      engine_volume: {tag.engine_volume}
      engine_power: {tag.engine_power}
      fuel_type: {tag.fuel_type}
      registration_zipcode: {tag.registration_zipcode}
      vehicle_id: {tag.vehicle_id}
      batch_id: {tag.batch_id}
    </li>
    )

      return (
        <div>
          <h2>License plate search app</h2><br></br>
          <form>
            <input
              value ={plateInput}
              placeholder="Enter the license plate"
              type="text"
              onChange={handleChange}
            /><br></br>
            <button onClick={handleSubmit}>Confirm</button>
            </form>
            {mappedData}
        </div>
      );
    }   

  return (
    <div>
      {LicensePlateSearchApp()}
    </div>
  );
}                                   

export default App;
 
