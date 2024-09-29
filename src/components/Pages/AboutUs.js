import React from 'react';
import '../Styles/aboutus.css';
// import logoImage from './wbimage/logo.jpg';

const AboutUs = ({ user }) => {
 

  const closeNav = () => {
    document.getElementById("myNav").style.width = "0%";
  };

  return (
    <div>
      <nav className="nav">
        {/* <div className="logo">
          <img src={logoImage} alt="logo" />
        </div> */}
        {/* <div className="item">
          {user ? (
            <a className="welcome">Welcome, {user.username}!</a>
          ) : (
            <a className="welco" href="/login">Login</a>
          )}
        </div> */}
        {/* <div className="custom_menu-btn">
          <button onClick={openNav}>
            <span className="s-1"></span>
            <span className="s-2"></span>
            <span className="s-3"></span>
          </button>
        </div> */}
        <div id="myNav" className="overlay">
          <button onClick={closeNav} className="closebtn">&times;</button>
          <div className="overlay-content">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/cars">Cars</a>
            <a href="/contact">Contact Us</a>
            {user ? (
              <>
                <a href="/profile">Profile</a>
                <a href="/logout">Logout</a>
              </>
            ) : (
              <a href="/login">Login</a>
            )}
          </div>
        </div>
      </nav>

      <section className="support-sec">
        <div className="txt">
          <p className="txt1"><span>About</span> Us</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. At, cupiditate!</p>
        </div>

        <div className="main-sec">
          <div className="box">
            <i className="fa-solid fa-phone"></i>
            <div className="txt-sec">
              <p className="txt1">24 Hour Support</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore doloremque sequi animi ab corporis, necessitatibus eum cum vel rerum nisi.</p>
            </div>
          </div>
          <div className="box">
            <i className="fa-solid fa-flag-checkered"></i>
            <div className="txt-sec">
              <p className="txt1">Best Price</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore doloremque sequi animi ab corporis, necessitatibus eum cum vel rerum nisi.</p>
            </div>
          </div>

          <div className="box">
            <i className="fa-solid fa-certificate"></i>
            <div className="txt-sec">
              <p className="txt1">Verified License</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore doloremque sequi animi ab corporis, necessitatibus eum cum vel rerum nisi.</p>
            </div>
          </div>

          <div className="box">
            <i className="fa-solid fa-user-shield"></i>
            <div className="txt-sec">
              <p className="txt1">Safe cars</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore doloremque sequi animi ab corporis, necessitatibus eum cum vel rerum nisi.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="achie-sec">
        <div className="txt">
          <p className="txt1">Our <span>Achievement</span></p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, provident.</p>
        </div>

        <div className="main-sec">
          <div className="box">
            <p className="txt1">40+</p>
            <p>Active Member</p>
          </div>

          <div className="box">
            <p className="txt1">30+</p>
            <p>Car Color</p>
          </div>

          <div className="box">
            <p className="txt1">60+</p>
            <p>Car Model</p>
          </div>

          <div className="box">
            <p className="txt1">10k</p>
            <p>Positive Rating</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
