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
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(parsedDate);
  }

  function filterAttractionsByNames(attractions, names) {
    return attractions.filter(attraction =>
      names.some(name => attraction.name.toLowerCase().includes(name.toLowerCase()))
    ).map(attraction => ({
      ...attraction,
      waitTime: attraction.waitTime === null ? '∞' : attraction.waitTime
    }));
  }

  const filteredAttractions = filterAttractionsByNames(attractions, ["Haunted", "Space Mountain", "Indiana Jones", "Pirates of the Caribbean"]);

  // alternating attraction background colors array
  const backgroundColors = ['light', 'dark'];

  return (
    <div className="App">
      <Header />
      <ParkHours hours={parkHours} />
      <AttractionsHeader />
      {filteredAttractions
        .filter(attraction => attraction.waitTime && attraction.meta.type === 'ATTRACTION')
        .map((attraction, index) => <Attraction key={attraction.id} name={attraction.name} time={attraction.waitTime} color={backgroundColors[index % backgroundColors.length]} />)
      }
    </div>
  );
}

export default App;