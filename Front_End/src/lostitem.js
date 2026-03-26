import React, { useState } from 'react';
import './forms.css'; 

// Changed from LostItemForm to LostItem to match your Route and Export
const LostItem = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const { name, category, description, photo } = formData;
    if (!name || !category || !description || !photo) {
      alert("Please fill in all fields and upload a photo.");
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Lost Item reported successfully!");
    
    // Reset form
    setFormData({ name: '', category: '', description: '', photo: null });
    e.target.reset();
  };

  return (
    <div className="page-wrapper">
      <div className="form-container">
        <h2>LOST ITEM FORM</h2>
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
              name="category" 
              placeholder="eg.: Electronics,Accessories,etc..."
              value={formData.category}
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

export default LostItem;