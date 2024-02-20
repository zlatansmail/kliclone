import logo from './logo.svg';
import './App.css';
import navigation from '/components/Navigation.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className='navigation'>
          <div className='nav-list'>
            <li className='nav-item'>Vijesti</li>
            <li className='nav-item'>Biznis</li>
            <li className='nav-item'>Sport</li>
            <li className='nav-item'>Magazin</li>
            <li className='nav-item'>Lifestyle</li>
            <li className='nav-item'>Scitech</li>
            <li className='nav-item'>Auto</li>
            <li className='nav-item'>Križaljka</li>
            <li className='nav-item'>Posao</li>
            <li className='nav-item'>Forum</li>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
