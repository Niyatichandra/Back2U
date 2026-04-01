import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import bvImage from './bv.jpg'; 

const GetStarted = () => {
  const navigate = useNavigate(); //to automatically move to new page without refreshing the whole page

  useEffect(() => {
    const forceLogout = async () => {
      try {
        await fetch("http://localhost:5000/api/logout", {
          method: "POST",
          credentials: "include"
        });
        console.log("Logged out successfully");
      } catch (err) {
        console.error("Logout failed", err);
      }
    };
    forceLogout();//to move to getStarted page

    const handleBackButton = (event) => {
      forceLogout(); 
    };

    window.addEventListener('pageshow', handleBackButton);

    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=PT+Serif:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    return () => {
      window.removeEventListener('pageshow', handleBackButton);
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, []);

  const backgroundStyle = {
    ...styles.backgroundLayer,
    backgroundImage: `url(${bvImage})`,
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={backgroundStyle}></div>

      <main style={styles.hero}>
        <div style={styles.contentCard} className="fade-in">
          <h1 style={styles.mainHeading}>
            Welcome to Back2U <span role="img" aria-label="rocket">🚀</span>
          </h1>
          <p style={styles.subHeading}>
            REPORT...REMATCH...RECLAIM
          </p>

          <div style={styles.btnGroup}>
            <button 
              onClick={() => navigate('/home')} 
              style={styles.blackBtn}
            >
              Get Started
            </button>

            <button 
              onClick={() => navigate('/signup')} 
              style={styles.blackBtn}
            >
              Create Account
            </button>

            <button 
              onClick={() => navigate('/login')} 
              style={styles.blackBtn}
            >
              Login
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const styles = {
  pageWrapper: {
    position: 'relative',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    fontFamily: "'PT Serif', serif", 
  },
  backgroundLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(5px)', 
    transform: 'scale(1.1)', 
    zIndex: -1
  },
  hero: {
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'center'
  },
  contentCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    padding: '50px 40px',
    borderRadius: '15px',
    maxWidth: '600px',
    textAlign: 'center',
    boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
  },
  mainHeading: {
    fontSize: '36px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#000'
  },
  subHeading: {
    fontSize: '18px',
    color: '#444',
    marginBottom: '35px',
    letterSpacing: '1px'
  },
  btnGroup: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  blackBtn: {
    background: '#000',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    minWidth: '150px',
    transition: '0.3s ease',
  }
};

export default GetStarted;