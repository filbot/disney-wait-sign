import './App.css';
import Header from './Components/Header';
import ParkHours from './Components/ParkHours';
import AttractionsHeader from './Components/AttractionsHeader';
import Attraction from './Components/Attraction';

function App() {
  return (
    <div className="App">
      <Header />
      <ParkHours />
      <AttractionsHeader />
      <Attraction />
    </div>
  );
}

export default App;
