import './App.css';
import Navigation from './molecules/Navigation.jsx';
import HeroSection from './molecules/HeroSection.jsx';
import Body from './organisms/Body.jsx';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
      </header>
      <div>
      <Body/> 
      </div>
    </div>
  );
}

export default App;
