import './App.css';
import { useState, useEffect } from 'react';
import Header from './Components/Header';
import ParkHours from './Components/ParkHours';
import AttractionsHeader from './Components/AttractionsHeader';
import Attraction from './Components/Attraction';

function App() {
  const [attractions, setAttractions] = useState([]);
  const [parkHours, setParkHours] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attractionResponse, parkHoursResponse] = await Promise.all([
          fetch('https://corsproxy.io/?https://api.themeparks.wiki/preview/parks/DisneylandResortMagicKingdom/waittime'),
          fetch('https://corsproxy.io/?https://api.themeparks.wiki/preview/parks/DisneylandResortMagicKingdom/calendar')
        ]);

        const attractionData = await attractionResponse.json();
        const parkHoursData = await parkHoursResponse.json();

        setAttractions(attractionData);

        const todaysParkHours = {
          opening: formatAMPM(parkHoursData[0].openingTime),
          closing: formatAMPM(parkHoursData[0].closingTime)
        };
        setParkHours(todaysParkHours);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    // Set up interval to fetch data every minute
    const intervalId = setInterval(fetchData, 60000); // 60000 ms = 1 minute

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  function formatAMPM(date) {
    const parsedDate = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(parsedDate);
  }

  // function filterAttractionsByNames(attractions, names) {
  //   return attractions.filter(attraction =>
  //     names.some(name => attraction.name.toLowerCase().includes(name.toLowerCase()))
  //   ).map(attraction => ({
  //     ...attraction,
  //     waitTime: attraction.waitTime === null ? '∞' : attraction.waitTime
  //   }));
  // }

  // const filteredAttractions = filterAttractionsByNames(attractions, ["Haunted", "Space Mountain", "Indiana Jones", "Pirates of the Caribbean", "Peter Pan"]);

  function getAttractions(attractions, count = 7, collection = null) {
    let filtered = attractions.filter(attraction => attraction.waitTime !== null && attraction.waitTime !== '∞');

    if (collection) {
      filtered = filtered.filter(attraction =>
        collection.some(name => attraction.name.toLowerCase().includes(name.toLowerCase()))
      );
    }

    return filtered
      .sort((a, b) => b.waitTime - a.waitTime)
      .slice(0, count);
  }

  const displayedAttractions = getAttractions(attractions);

  // alternating attraction background colors array
  const backgroundColors = ['light', 'dark'];

  return (
    <div className="App">
      <Header />
      <ParkHours hours={parkHours} />
      <AttractionsHeader />
      {displayedAttractions.map((attraction, index) => (
        <Attraction key={attraction.id} name={attraction.name} time={attraction.waitTime} color={backgroundColors[index % backgroundColors.length]} />
      ))}
    </div>
  );
}

export default App;