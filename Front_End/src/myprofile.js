import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoutIcon from './logout.svg'; 
import { useEffect } from "react";

const MyProfile = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    lostItems: [],
    foundItems: []
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwords, setPasswords] = useState({ old: "", new: "" });
  const [error, setError] = useState(""); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const mainPageStyle = {
    background: "linear-gradient(135deg, #2b75a2 0%, #a291cf 50%, #f7a09d 100%)",
    minHeight: "100vh",
    width: "100vw",        
    margin: "0",
    padding: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif", 
    position: "relative",
    top: 0,
    left: 0,
    overflowX: "hidden",
    boxSizing: "border-box"
  };

  const centeredContentWrapper = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "95%",         
    maxWidth: "1300px",   
    padding: "40px 20px",
    boxSizing: "border-box"
  };

  const glassCardCommon = {
    background: "rgba(255, 255, 255, 0.35)", 
    backdropFilter: "blur(12px)",            
    border: "1px solid rgba(255, 255, 255, 0.15)", 
    borderRadius: "20px", 
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.25)", 
    boxSizing: "border-box"
  };

  const glassHeaderStyle = {
    ...glassCardCommon,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%", 
    padding: "25px 40px",
    marginBottom: "30px",
  };

  const glassItemSectionStyleDynamic = (cardId) => {
    const base = {
      ...glassCardCommon,
      padding: "30px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };
    if (hoveredCard === cardId) {
      return {
        ...base,
        transform: "translateY(-10px)", 
        boxShadow: "0 20px 50px 0 rgba(0, 0, 0, 0.3)", 
      };
    }
    return base;
  };
//to get initials as logo on myProfile page
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };
//check whether user is unauthorized or authorized
  useEffect(() => {
    fetch("http://localhost:5000/api/check-session", {
      credentials: "include"
    }).then(res => {
      if (!res.ok) {
        window.location.href = "/getstarted";
      }
    });
  }, []);
//profile fetching
  useEffect(() => {
    fetch("http://localhost:5000/api/profile", {
      credentials: "include"
    }).then(res => {
      if (!res.ok) {
        window.location.href = "/getstarted";
      }
      return res.json();
    })
    .then(data => {
      if (data) {
        setUser({
          name: data.name,
          email: data.email,
          lostItems: data.lost_items || [], 
          foundItems: data.found_items || []
        });
      }
    })
    .catch(err => console.error("Error fetching user data:", err));
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to logout?")) {
      await fetch("http://localhost:5000/api/logout", {
        method: "POST",
        credentials: "include"
      });

      window.location.href = "/getstarted";
    }
  };

  return (
    <div style={mainPageStyle}>
      <div style={centeredContentWrapper}>
        <header style={glassHeaderStyle}>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
          <button 
              onClick={() => navigate('/home')}
              style={{
                background: 'rgba(255,255,255,0.5)', 
                border: 'none', 
                borderRadius: '50%', 
                width: '40px', 
                height: '40px', 
                cursor: 'pointer',
                fontSize: '1.2rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
              title="Back to Home"
            >
              ←
            </button>
            <div style={{width: '70px', height: '70px', background: '#553c7b', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.8rem', fontWeight: 'bold'}}>{getInitials(user.name)}</div>
            <div>
              <h1 style={{margin: 0, fontSize: '1.8rem', color: '#333'}}>{user.name}</h1>
              <p style={{margin: '5px 0 0', color: '#555', fontSize: '1rem'}}>{user.email}</p>
            </div>
          </div>
          <div style={{display: 'flex', alignItems: 'center', gap: '20px'}}>
            <button className="btn outline" style={{padding: '10px 20px', background: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}} onClick={() => setShowPasswordForm(!showPasswordForm)}>
              {showPasswordForm ? "Cancel" : "Change Password"}
            </button>
            <Link to="#" style={{display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: '#ff4d4d', fontWeight: 'bold', fontSize: '1.1rem'}} onClick={handleLogout}>
              <img src={logoutIcon} alt="" style={{width: '20px'}} />
              Logout
            </Link>
          </div>
        </header>

        <main style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', width: '100%'}}>
          <section 
            style={glassItemSectionStyleDynamic('lost')}
            onMouseEnter={() => setHoveredCard('lost')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2 style={{margin: 0, fontSize: '1.5rem'}}>📂 Reported Lost Items</h2>
              <span style={{padding: '5px 12px', background: '#ffcccc', color: '#ff4d4d', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold'}}>{user.lostItems.length}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {user.lostItems && user.lostItems.length > 0 ? (
                user.lostItems.map((item, index) => (
                  <div key={index} style={{padding: '18px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '12px', borderLeft: '6px solid #ff4d4d', fontSize: '1.1rem', fontWeight: '500'}}>
                    {item.title}
                  </div>
                ))
              ) : (
                <p style={{textAlign: 'center', color: '#555'}}>No lost items reported yet. 🔍</p>
              )}
            </div>
          </section>

          <section 
            style={glassItemSectionStyleDynamic('found')}
            onMouseEnter={() => setHoveredCard('found')}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2 style={{margin: 0, fontSize: '1.5rem'}}>✅ Reported Found Items</h2>
              <span style={{padding: '5px 12px', background: '#ccffcc', color: '#4CAF50', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold'}}>{user.foundItems.length}</span>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {user.foundItems && user.foundItems.length > 0 ? (
                user.foundItems.map((item, index) => (
                  <div key={index} style={{padding: '18px', background: 'rgba(255, 255, 255, 0.4)', borderRadius: '12px', borderLeft: '6px solid #4CAF50', fontSize: '1.1rem', fontWeight: '500'}}>
                    {item.title}
                  </div>
                ))
              ) : (
                <p style={{textAlign: 'center', color: '#555'}}>No found items reported yet. ✨</p>
              )}
            </div>
          </section>
        </main>
      </div>

      {/* Password Overlay Section */}
      {showPasswordForm && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000}}>
           <div style={{background: 'white', padding: '40px', borderRadius: '20px', width: '400px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>
              <h2 style={{marginTop: 0}}>Update Password</h2>
              <input 
                type="password"
                placeholder="Old Password"
                value={passwords.old}
                onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                style={{width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '2px solid pink'}}
              />
              <input 
                type="password"
                placeholder="New Password"
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                style={{width: '100%', padding: '12px', margin: '10px 0', borderRadius: '8px', border: '2px solid pink'}}
              />
              <div className='btn-grp' style={{ 
                  display: 'flex',      
                  gap: '15px',          
                  marginTop: '20px',    
                  width: '100%' 
              }}>
              <button 
                style={{
                  flex:1,
                   width: '50%', 
                   padding: '12px', 
                   background: '#f1f1f1', 
                   color: 'White', 
                   border: 'none', 
                   borderRadius: '8px', 
                   cursor: 'pointer', 
                   marginTop: '10px',
                   fontWeight: '600',
                   background: '#553c7b'
                  }}
                onClick={() => {
                   setShowPasswordForm(false); 
                   navigate('/profile');       
                  }}
                >
                    CANCEL
               </button>
              <button style={{flex:1,width: '50%', padding: '12px', background: '#553c7b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '10px'}} 
                onClick={async () => {
                  if (!passwords.old || !passwords.new) {
                  alert("Please fill both fields ❌");
                  return;
                  }

                  try { 
                    const res = await fetch("http://localhost:5000/api/change-password", {
                      method: "POST",
                      credentials: "include",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify({
                        old: passwords.old,
                        new: passwords.new
                      })
                    });

                    const data = await res.json();

                    if (res.ok) {
                      setShowSuccessModal(true);
                      setShowPasswordForm(false);
                      setPasswords({ old: "", new: "" });
                    } else {
                      alert(data.message);
                    }

                  } catch (error) {
                    console.error(error);
                    alert("Error ❌");
                  }
                }}
              >
                UPDATE
              </button>
              </div>
           </div>
        </div>
      )}

      {showSuccessModal && (
        <div style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 3000}}>
          <div style={{background: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', width: '300px'}}>
            <div style={{fontSize: '50px', color: '#4CAF50'}}>✓</div>
            <h2>Success!</h2>
            <p>Password updated successfully.</p>
            <button style={{padding: '10px 30px', background: '#553c7b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer'}} onClick={() => setShowSuccessModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;