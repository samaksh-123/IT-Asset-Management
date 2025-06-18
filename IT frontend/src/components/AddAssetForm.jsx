// import React, { useState } from 'react';
// import { addAsset } from '../api';

// const AddAssetForm = () => {
//   const [form, setForm] = useState({
//     type: '',
//     name: '',
//     manufacturer: '',
//     configuration: '',
//     serialNumber: '',
//     invoiceNumber: '',
//     location:'',
//     status: '',
//     dateAdded:''
//   });

//   const assetTypes = ['CPU', 'Desktop', 'Keyboard','Laptop','Mouse', 'Printer','TV','Ups','Wireless Mouse','Wireless Keyboard','Wlkbmc'];

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     const assetWithIssuedFlag = { ...form, issued: false };
//     try {
//       await addAsset(assetWithIssuedFlag);
//       alert('Asset added');
//       setForm({
//         type: '',
//         name: '',
//         manufacturer: '',
//         configuration: '',
//         serialNumber: '',
//         invoiceNumber: '',
//         location:'',
//         status: '',
//         dateAdded: '',
//       });
//     } catch (error) {
//       alert('Failed to add asset');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Add Asset</h3>

//       {/* Dropdown for Type */}
//       <label>Asset Type:</label>
//       <select name="type" value={form.type} onChange={handleChange}>
//         <option value="">Select Asset Type</option>
//         {assetTypes.map((t, idx) => (
//           <option key={idx} value={t}>{t}</option>
//         ))}
//       </select>
      
// {Object.keys(form).filter(k => !['type', 'dateAdded', 'status','location','name'].includes(k)).map(key => (
//   <input
//     key={key}
//     name={key} 
//     placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//     value={form[key]}
//     onChange={handleChange}
//   />
// ))}

// {/* Dropdown for Status */}
// <label>Status:</label>
// <select name="status" value={form.status} onChange={handleChange}>
//   <option value="">Select Status</option>
//   <option value="In Stock">In Stock</option>
 
  
// </select>
// {/* Dropdown for Loaction */}
// <label>Location:</label>
// <select name="location" value={form.location} onChange={handleChange}>
//   <option value="">Select location</option>
//   <option value="HO">HO</option>
//   <option value="Bagru">Bagru</option>
//   <option value="R.C.Pura">R.C.Pura</option>
//     <option value="Hyderabad">Hyderabad</option>
// </select>
// <label>Date Received:</label>
// <input
//   type="date"
//   name="dateAdded"
//   value={form.dateAdded}
//   onChange={handleChange}
//   max={new Date().toISOString().split('T')[0]} // prevents future dates
//   placeholder='Date Received'
// />


//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default AddAssetForm;

import React, { useState } from 'react';
import { addAsset } from '../api';

const AddAssetForm = () => {
  const [form, setForm] = useState({
    type: '',
    name: '',
    manufacturer: '',
    configuration: '',
    serialNumber: '',
    invoiceNumber: '',
    location: '',
    status: '',
    dateAdded: ''
  });

  const assetTypes = ['CPU', 'Desktop', 'Keyboard', 'Laptop', 'Mouse', 'Printer', 'TV', 'Ups', 'Wireless Mouse', 'Wireless Keyboard', 'Wlkbmc'];

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const assetWithIssuedFlag = { ...form, issued: false };
    try {
      await addAsset(assetWithIssuedFlag);
      alert('Asset added');
      setForm({
        type: '',
        name: '',
        manufacturer: '',
        configuration: '',
        serialNumber: '',
        invoiceNumber: '',
        location: '',
        status: '',
        dateAdded: ''
      });
    } catch (error) {
      alert('Failed to add asset');
      console.error(error);
    }
  };

  return (
    <div className="form" style={{ maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
      <h3>Add Asset</h3>

      {/* Type Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="type">Asset Type:</label>
        <select name="type" id="type" value={form.type} onChange={handleChange}>
          <option value="">Select Asset Type</option>
          {assetTypes.map((t, idx) => (
            <option key={idx} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Text Inputs with Placeholder and Labels */}
      {['name', 'manufacturer', 'configuration', 'serialNumber', 'invoiceNumber'].map((key) => (
        <div key={key} style={{ marginBottom: '1rem' }}>
          <label htmlFor={key}>
            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
          </label>
          <input
            type="text"
            id={key}
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
          />
        </div>
      ))}

      {/* Status Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="status">Status:</label>
        <select name="status" id="status" value={form.status} onChange={handleChange}>
          <option value="">Select Status</option>
          <option value="In Stock">In Stock</option>
        </select>
      </div>

      {/* Location Dropdown */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="location">Location:</label>
        <select name="location" id="location" value={form.location} onChange={handleChange}>
          <option value="">Select Location</option>
          <option value="HO">HO</option>
          <option value="Bagru">Bagru</option>
          <option value="R.C.Pura">R.C.Pura</option>
          <option value="Hyderabad">Hyderabad</option>
        </select>
      </div>

      {/* Date Input */}
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="dateAdded">Date Received:</label>
        <input
          type="date"
          id="dateAdded"
          name="dateAdded"
          value={form.dateAdded}
          onChange={handleChange}
          max={new Date().toISOString().split('T')[0]} // Prevent future dates
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AddAssetForm;




