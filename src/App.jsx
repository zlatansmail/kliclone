import './App.css';
import Navigation from './components/molecules/Navigation.jsx';
import HomeBody from './components/organisms/HomeBody.jsx';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
      </header>
      <div>
      <HomeBody/> 
      </div>
    </div>
  );
}

export default App;
