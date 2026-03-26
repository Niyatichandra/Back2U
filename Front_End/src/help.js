import React from 'react';
import './App.css'; 
import workingImage from './how_it_works.png';

export default function Help() {
  const teamMembers = [
    { name: "NIYATI CHANDRA", email: "niyati@gmail.com" },
    { name: "PRAVARA BHARADWAJ", email: "pbharadwaj@gmail.com" },
    { name: "RISHIKA MOHTA", email: "mohtarishika@gmail.com" },
    { name: "SHRADDHA PALIWAL", email: "shraddhap@gmail.com" }
  ];

  const styles = {
    page: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', 
      width: '100vw',
      // UPDATED BACKGROUND
      background: "linear-gradient(135deg, #2b75a2 0%, #a291cf 50%, #f7a09d 100%)",
      backgroundAttachment: "fixed",
      margin: 0,
      overflow: 'hidden',
      fontFamily: "'Roboto Slab', serif"
    },
    
    card: {
      // UPDATED BACKGROUND (Matches the page background)
      background: "linear-gradient(135deg, #2b75a2 0%, #a291cf 50%, #f7a09d 100%)",
      padding: '20px 50px', 
      borderRadius: '25px',
      border: '5px solid black',
      width: '92%',
      maxWidth: '1250px',
      height: '96vh', 
      textAlign: 'center',
      boxShadow: '20px 20px 0px black',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between', 
      boxSizing: 'border-box',
      position: 'relative',
      zIndex: 1
    },
    
    imageContainer: {
      flex: '1', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 0 
    },
    mainImage: {
      width: 'auto',
      height: '55vh', 
      maxHeight: '500px', 
      borderRadius: '15px',
      border: '5px solid black',
      objectFit: 'contain',
      background: 'white' // Optional: keeps the actual image area clean if transparent
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
      marginTop: '15px'
    },
    memberBox: {
      background: '#fff',
      padding: '15px',
      border: '3px solid black',
      textAlign: 'center',
      boxShadow: '5px 5px 0px rgba(0,0,0,0.2)' 
    },
    link: {
      display: 'inline-block',
      marginTop: '15px',
      marginBottom: '15px',
      color: 'black', 
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

      <div style={styles.card}>
        <div style={styles.imageContainer}>
          <img 
            src={workingImage} 
            alt="How it works" 
            style={styles.mainImage} 
          />
        </div>

        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, margin: '10px 0', color: 'black' }}>
          FOR QUERIES & SUPPORT:
        </h2>
        
        <div style={styles.grid}>
          {teamMembers.map((member, index) => (
            <div key={index} style={styles.memberBox}>
              <h3 style={{ margin: '0', fontSize: '1rem', fontWeight: 700 }}>{member.name}</h3>
              <p style={{ fontSize: '0.8rem', fontWeight: 400, color: '#333', margin: '5px 0 0 0' }}>
                {member.email}
              </p>
            </div>
          ))}
        </div>

        <a href="/home" style={styles.link}>
          ← RETURN TO HOME
        </a>
      </div>
    </div>
  );
}