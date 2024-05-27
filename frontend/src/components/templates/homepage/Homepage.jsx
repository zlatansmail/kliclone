import './homepage.css';
import HomeBody from '../../organisms/HomeBody.jsx';
import Footer from '../../organisms/Footer.jsx'

const Homepage = () => {

  return (
    <div className="homepage">
      <div className='bellow-header'></div>
      <HomeBody />
      <Footer />
    </div>
  );
}

export default Homepage;
