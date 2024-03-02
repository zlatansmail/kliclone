import './App.css';
import Navigation from './components/molecules/Navigation.jsx';
import HomeBody from './components/organisms/HomeBody.jsx';
import Footer from './components/organisms/Footer.jsx'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
      </header>
      <div className='bellow-header'></div>
      <HomeBody/> 
      <Footer />
    </div>
  );
}

export default App;
