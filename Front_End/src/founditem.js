import React, { useState } from 'react';
import './forms.css';
import { useNavigate } from 'react-router-dom';

const FoundItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    item: '',
    description: '',
    photo: null,
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, item, description, photo, location } = formData;
    if (!name || !item || !description || !photo || !location) {
      alert("Please fill in all the fields");
      return;
    }
    setLoading(true);

    try {
     //step-1: upload image to cloudinary
      const form = new FormData();
      form.append("file", photo);
      form.append("upload_preset", "back2u");

      const cloudRes = await fetch("https://api.cloudinary.com/v1_1/dzzfc8qkv/image/upload",
      {
        method: "POST",
        body: form
      }
      );

      const cloudData = await cloudRes.json();
      console.log("Cloudinary response:", cloudData);
      const imageUrl = cloudData.secure_url;
      if (!cloudData.secure_url) {
        alert("Image upload failed ❌");
        return;
      }
//uploading to backend: sending data and image URL received from cloudinary using POST
      const res = await fetch("http://localhost:5000/api/found", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: name,
          category: item,
          description: description,
          location: location,
          image_url: imageUrl,
        })
      });

      const data = await res.json();

      if (res.ok) {
        setModalMessage(data.message || "Item reported successfully!");
        setShowSuccessModal(true); 
        
        // Form reset
        setFormData({
          name: '',
          item: '',
          description: '',
          photo: null,
          location: ''
        });
        e.target.reset();
      } else {
        alert(data.message || "Something went wrong ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server Error ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/home'); 
  };

  return (
    <div className="page-wrapper">
      {showSuccessModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon">🎁</div>
            <h2>Thank You!</h2>
            <p>{modalMessage}</p>
            <button className="modal-button" onClick={handleModalClose}>
              Go to Home
            </button>
          </div>
        </div>
      )}
      <div className="form-container">
        <h2>FOUND ITEM FORM</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Item Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <input 
              type="text" 
              name="item" 
              placeholder="eg.: Electronics, Accessories etc."
              value={formData.item}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              placeholder="eg.: Hostel Dham, Room no.100"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description"
              placeholder="eg.: Pink Milton Bottle"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Photo</label>
            <input 
              type="file" 
              name="photo" 
              accept="image/*"
              onChange={handleChange}
            />
          </div>
          <div className="btn-btn">
          <button type="button" className="back-btn" onClick={() => navigate('/home')}>
           ← BACK
          </button>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading}
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Submitting..." : "SUBMIT REPORT"}
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};


export default FoundItem;