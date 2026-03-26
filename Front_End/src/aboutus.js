import React from 'react';
import checkIcon from './check.svg';

export default function AboutUs() {
  const styles = {
    page: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      width: '100vw',
      overflow: 'hidden',
      margin: 0,
      fontFamily: "'Roboto Slab', serif",
      // UPDATED: Matches Help and Login background
      background: "linear-gradient(135deg, #2b75a2 0%, #a291cf 50%, #f7a09d 100%)",
      backgroundAttachment: "fixed"
    },
    card: {
      // UPDATED: Gradient background for the card
      background: "linear-gradient(135deg, #2b75a2 0%, #a291cf 50%, #f7a09d 100%)",
      padding: '40px',
      borderRadius: '25px',
      border: '5px solid black',
      maxWidth: '650px',
      textAlign: 'center',
      boxShadow: '15px 15px 0px black',
      zIndex: 1, 
      position: 'relative'
    },
    listContainer: {
      display: 'inline-block',
      textAlign: 'left',
      marginTop: '20px'
    },
    checkItem: {
      display: 'flex',
      alignItems: 'center',
      margin: '15px 0',
      fontWeight: '700',
      fontSize: '1.1rem',
      color: 'black'
    },
    icon: {
      width: '24px',
      marginRight: '15px',
      // Optional: makes the check icon stand out against the gradient
      filter: 'brightness(0)' 
    },
    link: {
      display: 'inline-block',
      marginTop: '30px',
      color: 'black', // Changed to black to match the "Return to Home" in Help.js
      fontWeight: '900',
      textDecoration: 'none',
      fontSize: '1.4rem',
      cursor: 'pointer',
      position: 'relative', 
      zIndex: 10
    }
  };

  return (
    <div style={styles.page}>
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700;900&display=swap');`}
      </style>

      {/* Background div removed since it's now a CSS gradient on the page style */}

      <div style={styles.card}>
        <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '20px', color: 'black' }}>
          ABOUT BACK_2_U
        </h1>
        
        <p style={{ lineHeight: '1.6', fontSize: '1.2rem', fontWeight: 600, color: 'black' }}>
          Losing something valuable on campus can be stressful. <b>BACK_2_U</b> was created 
          to bridge the gap between finders and losers.
        </p>

        <div style={styles.listContainer}>
          <div style={styles.checkItem}><img src={checkIcon} style={styles.icon} alt="v"/> Easy Item Reporting</div>
          <div style={styles.checkItem}><img src={checkIcon} style={styles.icon} alt="v"/> Real-time Updates</div>
          <div style={styles.checkItem}><img src={checkIcon} style={styles.icon} alt="v"/> Secure Communication</div>
          <div style={styles.checkItem}><img src={checkIcon} style={styles.icon} alt="v"/> Built for Students</div>
        </div>

        <br />
        <a href="/home" style={styles.link}>
            ← RETURN TO HOME
        </a>
      </div>
    </div>
  );
}