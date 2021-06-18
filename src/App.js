import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import ParkHours from './Components/ParkHours';
import AttractionsHeader from './Components/AttractionsHeader';
import Attraction from './Components/Attraction';

function App() {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const getApiData = async () => {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.themeparks.wiki/preview/parks/DisneylandResortMagicKingdom/waittime');
      const responseJson = await response.json();
      setAttractions(responseJson);
    }

    getApiData();
  }, []);

  return (
    <div className="App">
      <Header />
      <ParkHours />
      <AttractionsHeader />
      {attractions.filter(attraction => attraction.waitTime && attraction.meta.type === 'ATTRACTION').map((attraction) => <Attraction key={attraction.id} name={attraction.name} time={attraction.waitTime} />)}
    </div>
  );
}

export default App;