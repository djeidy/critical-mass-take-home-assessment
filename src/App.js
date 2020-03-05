import React, {useState} from 'react';

import Json from "./navigation";
import Tabs from "./Tabs";


const cities = Json.cities;

function App() {
  const [active, setActive] = useState(cities[0].section);
  const renderedCities = cities.map(city=>{
    return <div key={city.section}>{city.label}</div>
  });
  return (
    <Tabs
      active={active}
      onChange={active=> setActive(active)}
    >
      {renderedCities}
    </Tabs>
  );
}

export default App;
