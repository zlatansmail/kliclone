import './App.css';
import Navigation from './organisms/Navigation.jsx';
import MainContent from './organisms/MainContent.js';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
      </header>
      <div>
      <MainContent/>
      </div>
    </div>
  );
}

export default App;
