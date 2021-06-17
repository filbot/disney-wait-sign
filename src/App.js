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
      setAttractions(JSON.stringify(responseJson));
    }

    getApiData();
  }, []);

  return (
    <div className="App">
      <Header />
      <ParkHours />
      <AttractionsHeader />
      <Attraction />
      <div id="data">{attractions}</div>
    </div>
  );
}

export default App;