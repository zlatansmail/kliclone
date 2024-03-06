import './App.css';
import Navigation from './components/molecules/Navigation.jsx';
import HomeBody from './components/organisms/HomeBody.jsx';
import Footer from './components/organisms/Footer.jsx'
import DropDownMenu from './components/molecules/DropDownMenu.jsx';
import { useState } from 'react';

const App = () => {

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  
  const handleDropDownClick = () => {
    setIsDropDownOpen(!isDropDownOpen); 
  };

  return (
    <div className="App">
      <header className="App-header">
      <Navigation handleDropDownClick={handleDropDownClick} isDropDownOpen={isDropDownOpen}/>
      {isDropDownOpen && <DropDownMenu />}
      </header>
      <div className='bellow-header'></div>
      <HomeBody />
      <Footer />
    </div>
  );
}

export default App;
