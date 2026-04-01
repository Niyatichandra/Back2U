import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forms.css'; 

const LostItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, description, photo } = formData;
    if (!name || !category || !description) {
      alert("Please fill required fields");
      return;
    }

    setLoading(true);

    try {
      let imageUrl = "";
      if (photo) {
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
        imageUrl = cloudData.secure_url;
        if (photo && !cloudData.secure_url) {
          alert("Image upload failed ❌");
          return;
        }
      }
      
      console.log("Email:", localStorage.getItem("email"));
      const res = await fetch("http://localhost:5000/api/lost", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: name,
          category: category,
          description: description,
          image_url: imageUrl,
        })
      });

      const data = await res.json();

      if (data.match) {
        alert("Match found 🎉");
        navigate(`/item/${data.item.id}`);
      } else {
        setShowSuccessModal(true);
      }

      setFormData({
        name: '',
        category: '',
        description: '',
        photo: null
      });

      e.target.reset();

    } catch (error) {
      console.error(error);
      alert("Error ❌");
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
            <div className="modal-icon">🔍</div>
            <h2>Report Saved!</h2>
            <p>We have saved your lost item details. We will notify you as soon as a match is found.</p>
            <button className="modal-button" onClick={handleModalClose}>
              Back to Home
            </button>
          </div>
        </div>
      )}
      <div className="form-container">
        <h2>LOST ITEM FORM</h2>
        <form onSubmit={handleSubmit}>
          { /*item name */}
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
          { /*item category */}
          <div className="form-group">
            <label>Category</label>
            <input 
              type="text" 
              name="category" 
              placeholder="eg.: Electronics,Accessories,etc..."
              value={formData.category}
              onChange={handleChange}
            />
          </div>
           { /*item description */}
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              placeholder="eg.: Pink Milton Bottle"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
           { /*item image */}
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

export default LostItem;