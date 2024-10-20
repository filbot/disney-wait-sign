import './App.css';
import { useState } from 'react';
import Header from './Components/Header';
import ParkHours from './Components/ParkHours';
import AttractionsHeader from './Components/AttractionsHeader';
import Attraction from './Components/Attraction';
import dummyParkHours from './dummy-park-hours.json';
import dummyWaitTimes from './dummy-wait-times.json';

function App() {
  const [attractions, setAttractions] = useState(dummyWaitTimes);
  const [parkHours, setParkHours] = useState({
    opening: formatAMPM(dummyParkHours[0].openingTime),
    closing: formatAMPM(dummyParkHours[0].closingTime)
  });

  function formatAMPM(date) {
    const parsedDate = new Date(date);
    var hours = parsedDate.getHours();
    var minutes = parsedDate.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ampm;
    return strTime;
  } 

  // alternating attraction background colors array
  const backgroundColors = ['light', 'dark'];

  return (
    <div className="App">
      <Header />
      <ParkHours hours={parkHours} />
      <AttractionsHeader />
      {attractions
        .filter(attraction => attraction.waitTime && attraction.meta.type === 'ATTRACTION')
        .map((attraction, index) => <Attraction key={attraction.id} name={attraction.name} time={attraction.waitTime} color={backgroundColors[index % backgroundColors.length]} />)
      }
    </div>
  );
}

export default App;