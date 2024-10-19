// Home.jsx
import React from "react";
import "../Styles/Home.css"; // Import the CSS file for styling
import "./Carlist";
import AboutUs from './AboutUs';

const Home = () => {
  return (
  <div>
        <div className="home">
        <div className="main-sec">
          <div className="left">
            <p className="txt1">
              Find the Perfect Car With DriveNow
            </p>

            <div className="btn">
              <button>
                <a href="/Carlist">Rent car</a>
              </button>
            </div>
          </div>

          <div className="right">
            <img src="\images\bmw-22428 copy.png" alt="Car" />
          </div>
          <AboutUs />
          </div><br/>
          <div className="start-sec">
           <div className="main-sec1">
            <div className="left1">
            <h1 class="txt4">Ready To Get Start?</h1>
              Let's start your journey! Contact us today for personalized assistance and support.
             <div className="btn1">
              <button>
                <a style={{ textDecoration: "none" }} href="/contact">Contact Us</a>
              </button>
             </div>
            </div>
          <div className="right1">
            <img src="images\verna.png" alt="Car" />
          </div>
          </div>
          </div>

        </div>
    
  </div>
      
 

  );
};

export default Home;
