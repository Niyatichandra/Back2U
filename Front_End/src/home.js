import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';

// ICONS IMPORT (Purane waale hi hain)
import logo from './logo.jpeg'; 
import searchIcon from './search.svg'; 
import menuOpenIcon from './menu_open.svg'; 
import menuClosedIcon from './menu.svg'; 
import bellIcon from './notifications.svg'; 
import profileIcon from './person.svg'; 
import helpIcon from './help.svg';
import logoutIcon from './logout.svg'; 
import loginIcon from './login.svg'; 
import signupIcon from './signup.svg';
import accountIcon from './account.svg';

// IMAGES IMPORT
import img1 from './img1.jpg'; 
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';
import img6 from './img6.jpg';
import img7 from './img7.jpg';
import img8 from './img8.jpg';

export default function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = (e) => {
    if (e) e.preventDefault();
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      if (setIsLoggedIn) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
      setShowProfileMenu(false);
      navigate('/');
    }
  };

  const scatterImages = [
    { src: img1, className: 'pos-1' },
    { src: img2, className: 'pos-2' },
    { src: img3, className: 'pos-3' },
    { src: img4, className: 'pos-4' },
    { src: img5, className: 'pos-5' }, 
    { src: img6, className: 'pos-6' },
    { src: img7, className: 'pos-7' },
    { src: img8, className: 'pos-8' },
  ];

  return (
    <div className="home-editorial-container">
      <nav className="navbar">
        {/* SIDE MENU - Wrapping in a div with no gap */}
        <div 
          className="nav-left" 
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseLeave={() => setShowSideMenu(false)}
        >
          <button 
            className="menu-btn" 
            onClick={() => setShowSideMenu(!showSideMenu)}
            onMouseEnter={() => setShowSideMenu(true)} // Hover par bhi khul jaye
          >
            <img src={showSideMenu ? menuOpenIcon : menuClosedIcon} alt="menu" />
          </button>
          
          {showSideMenu && (
            <div className="dropdown side-dropdown" style={{ top: '100%', left: 0, marginTop: '0px' }}>
              <Link to="/about" className="dropdown-link" onClick={() => setShowSideMenu(false)}>
                <img src={profileIcon} alt="About" className="dropdown-icon" />
                ABOUT US
              </Link>
              <Link to="/help" className="dropdown-link" onClick={() => setShowSideMenu(false)}>
                <img src={helpIcon} alt="Help" className="dropdown-icon" />
                HELP
              </Link>
            </div>
          )}
        </div>

        <div className="nav-right">
          <button className="icon-btn">
            <img src={bellIcon} alt="notifications" />
          </button>

          {/* PROFILE SECTION - Wrapping carefully */}
          <div 
            className="profile-section" 
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button 
              className="profile-btn" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              onMouseEnter={() => setShowProfileMenu(true)} // Ease of use
            >
              <img src={isLoggedIn ? profileIcon : logo} alt="Profile" />
            </button>
            
            {showProfileMenu && (
              <div className="dropdown profile-dropdown" style={{ top: '100%', right: 0, marginTop: '0px' }}>
                {isLoggedIn ? (
                  <>
                    <Link to="/profile" className="dropdown-link profile-link-item" onClick={() => setShowProfileMenu(false)}>
                      <img src={accountIcon} alt="" className="dropdown-icon-svg" />
                      MY PROFILE
                    </Link>
                    <Link to="#" className="logout-link dropdown-link" onClick={handleLogout}>
                      <img src={logoutIcon} alt="" className="logout-icon-svg" />
                      LOGOUT
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="dropdown-link" onClick={() => setShowProfileMenu(false)}>
                      <img src={loginIcon} alt="" className="dropdown-icon" />
                      LOGIN
                    </Link>
                    <Link to="/signup" className="dropdown-link" onClick={() => setShowProfileMenu(false)}>
                      <img src={signupIcon} alt="" className="dropdown-icon" />
                      SIGN UP
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Baaki content same rahega... */}
      <div className="scatter-layer">
        {scatterImages.map((img, index) => (
          <div key={index} className={`scatter-card ${img.className}`}>
            <img src={img.src} alt={`scatter-${index}`} />
          </div>
        ))}
      </div>

      <main className="central-content">
        <h1 className="editorial-title">
          LOST BY ONE,<br />
          FOUND BY OTHER,<br />
          RETURNED BY BACK2U.
        </h1>
        <p className="editorial-subtitle">
          BECAUSE EVERY ITEM DESERVES A WAY BACK HOME!
        </p>

        <div className="search-container">
          <img src={searchIcon} className="search-icon-img" alt="search" />
          <input 
            type="text" 
            className="main-search-bar" 
            placeholder="Search for lost items..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="action-links">
          <Link to="/found" className="action-btn">Found an Item?</Link>
          <Link to="/lost" className="action-btn">Lost an Item?</Link>
        </div>
      </main>

      <footer className="footer-fixed">
        <div style={{ color: 'white', opacity: 0.8, fontSize: '0.7rem', letterSpacing: '2px' }}>
          © 2026 BACK2U. ALL RIGHTS RESERVED.
        </div>
      </footer>
    </div>
  );
}