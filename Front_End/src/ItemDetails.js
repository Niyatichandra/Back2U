import React from 'react';
import './itemdetails.css';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
//FLow -> get ID from URL, check if user is logged in, get item details from DB, show img, loc, desc. ,
// user clicks CLAIM -> backend updates item status -> user returns home.
//useParams to extract ID from URL ; useNavigate to move to a diff. page ;
const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
//session guard
  useEffect(() => {
    fetch("http://localhost:5000/api/check-session", {
      credentials: "include"
    }).then(res => {
      if (!res.ok) {
        window.location.href = `/login?redirect=/item/${id}`;
      }
    });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/item/${id}`)
      .then(res => res.json())
      .then(data => setItem(data));
  }, [id]);

  if (!item) return <h2>Loading...</h2>;
//status allows CSS to color-code it (e.g., Red for Lost, Green for Found) ; itemImage to display photo
//header shows the category; details organized into groups for location & description
  return (
    <div className="details-page-wrapper">
      <div className="details-container">
        <div className="image-section">
          <div className={`status-tag ${item.status.toLowerCase()}`}>
            {item.status}
          </div>
          <img src={item.image_url} alt={item.title} className="item-image" />
        </div>

        <div className="info-section">
          <header className="info-header">
            <span className="category-label">{item.category}</span>
            <h1>{item.title}</h1>
            
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
            <button 
              className="btn-claim"
              onClick={async () => {
                await fetch(`http://localhost:5000/api/claim/${item._id}`, {
                  method: "PUT",
                  credentials: "include"
                });

                alert("Item claimed successfully ✅");
                navigate("/home");
              }}
            >
              Claim
            </button>
            <button 
              className="btn-back"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ItemDetails;
