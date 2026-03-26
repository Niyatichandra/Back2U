import React, { useState } from 'react';
import './forms.css';

// Changed name from FoundItemForm to FoundItem to match your Route
const FoundItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    item: '',
    description: '',
    photo: null,
    location: ''
  });
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      // Logic to handle both file uploads and text inputs
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, item, description, photo, location } = formData;
    
    if (!name || !item || !description || !photo || !location) {
      alert("Please fill in all the fields");
      return;
    }

    // In a real app, you'd use FormData() here to send the file to your Flask backend
    console.log("Found Item Data:", formData);
    alert("Found Item reported successfully!");
    
    // Reset form state
    setFormData({ 
      name: '', 
      item: '', 
      description: '', 
      photo: null, 
      location: '' 
    });
    e.target.reset();
  };

  return (
    <div className="page-wrapper">
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

          <button type="submit" className="submit-btn">
            SUBMIT REPORT
          </button>
        </form>
      </div>
    </div>
  );
};

// Ensure export matches the component name
export default FoundItem;