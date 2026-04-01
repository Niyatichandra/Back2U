import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './App.css';
import './search.css';
import './notif.css';
import { useEffect } from "react";
import { useRef } from "react";

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

import img1 from './img1.jpg'; 
import img2 from './img2.jpg';
import img3 from './img3.jpg';
import img4 from './img4.jpg';
import img5 from './img5.jpg';
import img6 from './img6.jpg';
import img7 from './img7.jpg';
import img8 from './img8.jpg';
//isLoggedIn->if user is signed in or not
export default function Home({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const notifRef = useRef();
  const [showOverlay, setShowOverlay] = useState(false);
  const overlayRef = useRef();
  const [showLogoutModal, setShowLogoutModal] = useState(false); // Modal state
//step1 fetch user's notifications from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/notifications", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setNotifications(data);
        setNotifCount(data.length);  
      });
  }, []);
//checks whether user is logged in or not
  useEffect(() => {
    fetch("http://localhost:5000/api/check-session", { credentials: "include" })
      .then(res => {
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false); 
        }
      });
  }, [setIsLoggedIn]); 
//close the dropdowns if the user clicks outside anywhere
  useEffect(() => {
    const handleClickOutside = (event) => {

      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowOverlay(false);
        setSearchResults([]);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutUser = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include"
    });
    setIsLoggedIn(false);
    window.location.href = "/getstarted";
  };

  
  const handleLogoutClick = (e) => {
    if (e) e.preventDefault();
    setShowLogoutModal(true); 
    setShowProfileMenu(false); 
  };
  
  const confirmLogout = async () => {
    await logoutUser();
    setShowLogoutModal(false);
  };

  const handleSearch = async (value) => {
    setSearchQuery(value);

    if (value.trim() === "") {
      setSearchResults([]);  
      setShowOverlay(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${value}`);
      const data = await res.json();

      setSearchResults(data);
      setShowOverlay(true);
    } catch (err) {
      console.error(err);
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
     {showLogoutModal && (
       <div className="modal-overlay">
         <div className="custom-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout from BACK2U?</p>
                <div className="modal-actions">
                    <button className="cancel-btn" onClick={() => setShowLogoutModal(false)}>
                       Cancel
                    </button>
                    <button className="confirm-btn" onClick={confirmLogout}>
                        Logout
                    </button>
                </div>
           </div>
        </div>
        )}
      <nav className="navbar">
        <div 
          className="nav-left" 
          style={{ position: 'relative', display: 'inline-block' }}
          onMouseLeave={() => setShowSideMenu(false)}
        >
          <button 
            className="menu-btn" 
            onClick={() => setShowSideMenu(!showSideMenu)}
            onMouseEnter={() => setShowSideMenu(true)} 
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
          <div style={{ position: "relative" }}>
            <button 
              className="icon-btn"
              onClick={() => {
                setShowNotif(!showNotif);
                setNotifCount(0);   
              }}
            >
              <img src={bellIcon} alt="notifications" />

              {notifCount > 0 && (
                <span className="notif-badge">{notifCount}</span>
              )}
            </button>

            {showNotif && (
              <div className="notif-dropdown" ref={notifRef}>
                {notifications.length === 0 ? (
                  <p className="no-results">No notifications</p>
                ) : (
                  notifications.map((item) => (
                    <div
                      key={item._id}
                      className="dropdown-item"
                      onClick={() => {
                        setShowNotif(false);
                        navigate(`/item/${item._id}`);
                      }}
                    >
                      <img src={item.image_url} alt={item.title} />
                      <span>{item.title}</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div 
            className="profile-section" 
            style={{ position: 'relative', display: 'inline-block' }}
            onMouseLeave={() => setShowProfileMenu(false)}
          >
            <button 
              className="profile-btn" 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              onMouseEnter={() => setShowProfileMenu(true)} 
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
                    <Link to="#" className="logout-link dropdown-link" onClick={handleLogoutClick}>
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

        <div 
          className="search-container" 
          style={{ position: "relative"}}
        >
          <img src={searchIcon} className="search-icon-img" alt="search" />
          <input 
            type="text" 
            className="main-search-bar" 
            placeholder="Search for lost items..." 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => {
              if (searchQuery.trim() !== "" && searchResults.length > 0) {
                setShowOverlay(true);
              }
            }}
          />
          {showOverlay && (
            <div className="search-dropdown" ref={overlayRef}>
              {searchResults.length === 0 ? (
                <p className="no-results">No items found</p>
              ) : (
                searchResults.map((item) => (
                  <div
                    key={item._id}
                    className="dropdown-item"
                    onClick={() => {
                      setShowOverlay(false);
                      navigate(`/item/${item._id}`);
                    }}
                  >
                    <img src={item.image_url} alt={item.title} />
                    <span>{item.title}</span>
                  </div>
                ))
              )}
            </div>
          )}
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