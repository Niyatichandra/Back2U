import React from 'react';
import './ItemDetails.css';

const ItemDetails = () => {
  // Dummy Data (In future, fetch this using item ID from MongoDB)
  const item = {
    name: "Apple AirPods Pro",
    category: "Electronics",
    status: "Lost", // or "Found"
    description: "White color AirPods with a black silicone case. It has a small scratch on the right side. Last seen near the IT Building stairs.",
    location: "New Market / IT Building",
    date: "March 24, 2026",
    photo: "https://images.unsplash.com/photo-1588423770574-910ae27c859f?q=80&w=1000&auto=format&fit=crop", // Placeholder
    postedBy: "Aditi Verma"
  };

  return (
    <div className="details-page-wrapper">
      <div className="details-container">
        
        {/* Left Side: Image Section */}
        <div className="image-section">
          <div className={`status-tag ${item.status.toLowerCase()}`}>
            {item.status}
          </div>
          <img src={item.photo} alt={item.name} className="item-image" />
        </div>

        {/* Right Side: Info Section */}
        <div className="info-section">
          <header className="info-header">
            <span className="category-label">{item.category}</span>
            <h1>{item.name}</h1>
            
          </header>

          <div className="detail-group">
            <h3>📍 Location</h3>
            <p>{item.location}</p>
          </div>

          <div className="detail-group">
            <h3>📝 Description</h3>
            <p className="description-text">{item.description}</p>
          </div>

          

          <div className="action-buttons">
            <button className="btn-claim">Claim</button>
            <button className="btn-back">Go Back</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;