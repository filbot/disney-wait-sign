import './App.css';
import Header from './Components/Header';
import ParkHours from './Components/ParkHours';
import AttractionsHeader from './Components/AttractionsHeader';
import Attraction from './Components/Attraction';
import { useDisneyData } from './hooks/useDisneyData';
import { getAttractions } from './utils/attractionUtils';
import { MY_ATTRACTIONS, BACKGROUND_COLORS } from './constants/attractions';

function App() {
  const { attractions, parkHours, loading } = useDisneyData();

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  const displayedAttractions = getAttractions(attractions, 8, MY_ATTRACTIONS, 'collection');

  return (
    <div className="App">
      <Header />
      <ParkHours hours={parkHours} />
      <AttractionsHeader />
      {displayedAttractions.map((attraction, index) => (
        <Attraction
          key={attraction.id}
          name={attraction.name}
          time={attraction.waitTime}
          color={BACKGROUND_COLORS[index % BACKGROUND_COLORS.length]}
        />
      ))}
    </div>
  );
}

export default App;