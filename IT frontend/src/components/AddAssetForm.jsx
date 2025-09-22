

// const AddAssetForm = () => {
//   const [form, setForm] = useState({
//     type: '',
//     // name: '',
//     manufacturer: '',
//     configuration: '',
//     serialNumber: '',
//     invoiceNumber: '',
//     location: '',
//     status: '',
//     dateAdded: ''
//   });

//   const assetTypes = ['CPU', 'Desktop', 'Keyboard', 'Laptop', 'Mouse', 'Printer', 'TV', 'Ups', 'Wireless Mouse', 'Wireless Keyboard', 'Wlkbmc'];

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
//         // name: '',
//         manufacturer: '',
//         configuration: '',
//         serialNumber: '',
//         invoiceNumber: '',
//         location: '',
//         // status: '',
//         dateAdded: ''
//       });
//     } catch (error) {
//       alert('Failed to add asset');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
//       <h3>Add Asset</h3>

//       {/* Type Dropdown */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="type">Asset Type:</label>
//         <select name="type" id="type" value={form.type} onChange={handleChange}>
//           <option value="">Select Asset Type</option>
//           {assetTypes.map((t, idx) => (
//             <option key={idx} value={t}>{t}</option>
//           ))}
//         </select>
//       </div>

//       {/* Text Inputs with Placeholder and Labels */} 
//       {[ 'manufacturer', 'configuration', 'serialNumber', 'invoiceNumber'].map((key) => (
//         <div key={key} style={{ marginBottom: '1rem' }}>
//           <label htmlFor={key}>
//             {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
//           </label>
//           <input
//             type="text"
//             id={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
//           />
//         </div>
//       ))}

//        {/* Status Display (Fixed) */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Status:</label>
//         <input type="text" value="In Stock" disabled readOnly />
//       </div>

      
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="location">Location:</label>
//         <select name="location" id="location" value={form.location} onChange={handleChange}>
//           <option value="">Select Location</option>
//           <option value="HO">HO</option>
//           <option value="Bagru">Bagru</option>
//           <option value="R.C.Pura">R.C.Pura</option>
//           <option value="Hyderabad">Hyderabad</option>
//         </select>
//       </div>

//       {/* Date Input */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="dateAdded">Date Received:</label>
//         <input
//           type="date"
//           id="dateAdded"
//           name="dateAdded"
//           value={form.dateAdded}
//           onChange={handleChange}
//           max={new Date().toISOString().split('T')[0]} // Prevent future dates
//         />
//       </div>

//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default AddAssetForm;




// import React, { useState } from 'react';
// import { addAsset } from '../api';

// const AddAssetForm = () => {
//   const [form, setForm] = useState({
//     type: '',
//     manufacturer: '',
//     configuration: '',
//     serialNumber: '',
//     invoiceNumber: '',
//     location: '',
//     status: 'In Stock',
//     dateAdded: '',
//     warranty: '',
//     price: '',
//     partyName: ''
//   });

//   const assetTypes = ['CPU', 'Desktop', 'Keyboard', 'Laptop', 'Mouse', 'Printer', 'TV', 'Ups', 'Wireless Mouse', 'Wireless Keyboard', 'Wlkbmc'];

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
//         manufacturer: '',
//         configuration: '',
//         serialNumber: '',
//         invoiceNumber: '',
//         location: '',
//         status: 'In Stock',
//         dateAdded: '',
//         warranty: '',
//         price: '',
//         partyName: ''
//       });
//     } catch (error) {
//       alert('Failed to add asset');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '500px', margin: 'auto', padding: '1rem' }}>
//       <h3>Add Asset</h3>

//       {/* Type Dropdown */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="type">Asset Type:</label>
//         <select name="type" id="type" value={form.type} onChange={handleChange}>
//           <option value="">Select Asset Type</option>
//           {assetTypes.map((t, idx) => (
//             <option key={idx} value={t}>{t}</option>
//           ))}
//         </select>
//       </div>

//       {/* Text Inputs */}
//       {['manufacturer', 'configuration', 'serialNumber', 'invoiceNumber', 'warranty', 'price', 'partyName'].map((key) => (
//         <div key={key} style={{ marginBottom: '1rem' }}>
//           <label htmlFor={key}>
//             {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:
//           </label>
//           <input
//             type={key === 'price' ? 'number' : 'text'}
//             id={key}
//             name={key}
//             value={form[key]}
//             onChange={handleChange}
//             placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1')}`}
//           />
//         </div>
//       ))}

//       {/* Status Display (Fixed) */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label>Status:</label>
//         <input type="text" value="In Stock" disabled readOnly />
//       </div>

//       {/* Location Dropdown */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="location">Location:</label>
//         <select name="location" id="location" value={form.location} onChange={handleChange}>
//           <option value="">Select Location</option>
//           <option value="HO">HO</option>
//           <option value="Bagru">Bagru</option>
//           <option value="R.C.Pura">R.C.Pura</option>
//           <option value="Hyderabad">Hyderabad</option>
//         </select>
//       </div>

//       {/* Date Input */}
//       <div style={{ marginBottom: '1rem' }}>
//         <label htmlFor="dateAdded">Date Received:</label>
//         <input
//           type="date"
//           id="dateAdded"
//           name="dateAdded"
//           value={form.dateAdded}
//           onChange={handleChange}
//           max={new Date().toISOString().split('T')[0]} // Prevent future dates
//         />
//       </div>

//       <button onClick={handleSubmit}>Submit</button>
//     </div>
//   );
// };

// export default AddAssetForm;


// import React, { useState } from 'react';
// import { addAsset } from '../api';

// const AddAssetForm = () => {
//   const [form, setForm] = useState({
//     type: '',
//     manufacturer: '',
//     configuration: '',
//     serialNumber: '',
//     invoiceNumber: '',
//     location: '',
//     status: 'In Stock',
//     dateAdded: '',
//     warranty: '',
//     price: '',
//     partyName: ''
//   });

//   const assetTypes = ['CPU', 'Desktop', 'Keyboard', 'Laptop', 'Mouse', 'Printer', 'TV', 'Ups', 'Wireless Mouse', 'Wireless Keyboard', 'Wlkbmc'];

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
//         manufacturer: '',
//         configuration: '',
//         serialNumber: '',
//         invoiceNumber: '',
//         location: '',
//         status: 'In Stock',
//         dateAdded: '',
//         warranty: '',
//         price: '',
//         partyName: ''
//       });
//     } catch (error) {
//       alert('Failed to add asset');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '10px' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Asset</h2>

//       {/* Group 1: Basic Info */}
//       <fieldset style={{ marginBottom: '1.5rem' }}>
//         <legend><strong>Basic Asset Info</strong></legend>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="type">Asset Type:</label>
//           <select name="type" id="type" value={form.type} onChange={handleChange}>
//             <option value="">Select Asset Type</option>
//             {assetTypes.map((t, idx) => (
//               <option key={idx} value={t}>{t}</option>
//             ))}
//           </select>
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="manufacturer">Manufacturer:</label>
//           <input
//             type="text"
//             id="manufacturer"
//             name="manufacturer"
//             value={form.manufacturer}
//             onChange={handleChange}
//             placeholder="Enter Manufacturer"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="configuration">Configuration:</label>
//           <input
//             type="text"
//             id="configuration"
//             name="configuration"
//             value={form.configuration}
//             onChange={handleChange}
//             placeholder="Enter Configuration"
//           />
//         </div>
//       </fieldset>

//       {/* Group 2: Identification */}
//       <fieldset style={{ marginBottom: '1.5rem' }}>
//         <legend><strong>Identification Details</strong></legend>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="serialNumber">Serial Number:</label>
//           <input
//             type="text"
//             id="serialNumber"
//             name="serialNumber"
//             value={form.serialNumber}
//             onChange={handleChange}
//             placeholder="Enter Serial Number"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="invoiceNumber">Invoice Number:</label>
//           <input
//             type="text"
//             id="invoiceNumber"
//             name="invoiceNumber"
//             value={form.invoiceNumber}
//             onChange={handleChange}
//             placeholder="Enter Invoice Number"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="partyName">Party Name:</label>
//           <input
//             type="text"
//             id="partyName"
//             name="partyName"
//             value={form.partyName}
//             onChange={handleChange}
//             placeholder="Enter Party Name"
//           />
//         </div>
//       </fieldset>

//       {/* Group 3: Purchase Info */}
//       <fieldset style={{ marginBottom: '1.5rem' }}>
//         <legend><strong>Purchase Details</strong></legend>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="warranty">Warranty:</label>
//           <input
//             type="text"
//             id="warranty"
//             name="warranty"
//             value={form.warranty}
//             onChange={handleChange}
//             placeholder="e.g. 1 Year, 2 Years"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="price">Price (₹):</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Enter Price"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="location">Location:</label>
//           <select name="location" id="location" value={form.location} onChange={handleChange}>
//             <option value="">Select Location</option>
//             <option value="HO">HO</option>
//             <option value="Bagru">Bagru</option>
//             <option value="R.C.Pura">R.C.Pura</option>
//             <option value="Hyderabad">Hyderabad</option>
//           </select>
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="dateAdded">Date Received:</label>
//           <input
//             type="date"
//             id="dateAdded"
//             name="dateAdded"
//             value={form.dateAdded}
//             onChange={handleChange}
//             max={new Date().toISOString().split('T')[0]} // Prevent future dates
//           />
//         </div>
//       </fieldset>

//       {/* Group 4: Status */}
//       <div style={{ marginBottom: '1.5rem' }}>
//         <label>Status:</label>
//         <input type="text" value="In Stock" disabled readOnly />
//       </div>

//       <button onClick={handleSubmit} style={{ padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>Submit</button>
//     </div>
//   );
// };

// export default AddAssetForm;


// import React, { useState } from 'react';
// import { addAsset } from '../api';

// const AddAssetForm = () => {
//   const [form, setForm] = useState({
//     type: '',
//     name: '', // Changed from manufacturer to name
//     configuration: '',
//     serialNumber: '',
//     invoiceNumber: '',
//     location: '',
//     status: 'In Stock',
//     dateAdded: '',
//     warranty: '',
//     price: '',
//     partyName: ''
//   });

//   const assetTypes = ['CPU', 'Desktop', 'Keyboard', 'Laptop', 'Mouse', 'Printer', 'TV', 'Ups', 'Wireless Mouse', 'Wireless Keyboard', 'Wlkbmc'];

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
//         configuration: '',
//         serialNumber: '',
//         invoiceNumber: '',
//         location: '',
//         status: 'In Stock',
//         dateAdded: '',
//         warranty: '',
//         price: '',
//         partyName: ''
//       });
//     } catch (error) {
//       alert('Failed to add asset');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="form" style={{ maxWidth: '600px', margin: 'auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '10px' }}>
//       <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Add New Asset</h2>

//       {/* Group 1: Basic Info */}
//       <fieldset style={{ marginBottom: '1.5rem' }}>
//         <legend><strong>Basic Asset Info</strong></legend>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="type">Asset Type:</label>
//           <select name="type" id="type" value={form.type} onChange={handleChange}>
//             <option value="">Select Asset Type</option>
//             {assetTypes.map((t, idx) => (
//               <option key={idx} value={t}>{t}</option>
//             ))}
//           </select>
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             placeholder="Enter Asset Name"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="configuration">Configuration:</label>
//           <input
//             type="text"
//             id="configuration"
//             name="configuration"
//             value={form.configuration}
//             onChange={handleChange}
//             placeholder="Enter Configuration"
//           />
//         </div>
//       </fieldset>

//       {/* Group 2: Identification */}
//       <fieldset style={{ marginBottom: '1.5rem' }}>
//         <legend><strong>Identification Details</strong></legend>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="serialNumber">Serial Number:</label>
//           <input
//             type="text"
//             id="serialNumber"
//             name="serialNumber"
//             value={form.serialNumber}
//             onChange={handleChange}
//             placeholder="Enter Serial Number"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="invoiceNumber">Invoice Number:</label>
//           <input
//             type="text"
//             id="invoiceNumber"
//             name="invoiceNumber"
//             value={form.invoiceNumber}
//             onChange={handleChange}
//             placeholder="Enter Invoice Number"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="partyName">Party Name:</label>
//           <input
//             type="text"
//             id="partyName"
//             name="partyName"
//             value={form.partyName}
//             onChange={handleChange}
//             placeholder="Enter Party Name"
//           />
//         </div>
//       </fieldset>

//       {/* Group 3: Purchase Info */}
//       <fieldset style={{ marginBottom: '1.5rem' }}>
//         <legend><strong>Purchase Details</strong></legend>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="warranty">Warranty:</label>
//           <input
//             type="text"
//             id="warranty"
//             name="warranty"
//             value={form.warranty}
//             onChange={handleChange}
//             placeholder="e.g. 1 Year, 2 Years"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="price">Price (₹):</label>
//           <input
//             type="number"
//             id="price"
//             name="price"
//             value={form.price}
//             onChange={handleChange}
//             placeholder="Enter Price"
//           />
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="location">Location:</label>
//           <select name="location" id="location" value={form.location} onChange={handleChange}>
//             <option value="">Select Location</option>
//             <option value="HO">HO</option>
//             <option value="Bagru">Bagru</option>
//             <option value="R.C.Pura">R.C.Pura</option>
//             <option value="Hyderabad">Hyderabad</option>
//           </select>
//         </div>

//         <div style={{ marginBottom: '1rem' }}>
//           <label htmlFor="dateAdded">Date Received:</label>
//           <input
//             type="date"
//             id="dateAdded"
//             name="dateAdded"
//             value={form.dateAdded}
//             onChange={handleChange}
//             max={new Date().toISOString().split('T')[0]}
//           />
//         </div>
//       </fieldset>

//       {/* Group 4: Status */}
//       <div style={{ marginBottom: '1.5rem' }}>
//         <label>Status:</label>
//         <input type="text" value="In Stock" disabled readOnly />
//       </div>

//       <button onClick={handleSubmit} style={{ padding: '0.5rem 1.5rem', fontWeight: 'bold' }}>Submit</button>
//     </div>
//   );
// };

// export default AddAssetForm;
// import React, { useState } from 'react';
// import { addAsset } from '../api';
// import './AddDepartment'; // ✅ Import custom CSS

// const AddAssetForm = () => {
//   const [form, setForm] = useState({
//     type: '',
//     name: '',
//     configuration: '',
//     serialNumber: '',
//     invoiceNumber: '',
//     location: '',
//     status: 'In Stock',
//     dateAdded: '',
//     warranty: '',
//     price: '',
//     partyName: ''
//   });

//   const assetTypes = ['CPU', 'Desktop', 'Keyboard', 'Laptop', 'Mouse', 'Printer', 'TV', 'UPS', 'Wireless Mouse', 'Wireless Keyboard', 'Wlkbmc'];

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
//         configuration: '',
//         serialNumber: '',
//         invoiceNumber: '',
//         location: '',
//         status: 'In Stock',
//         dateAdded: '',
//         warranty: '',
//         price: '',
//         partyName: ''
//       });
//     } catch (error) {
//       alert('Failed to add asset');
//       console.error(error);
//     }
//   };

//   return (
//     <div className="add-asset-wrapper">
//       <div className="glass-form">
//         <h2>Add New Asset</h2>

//         <fieldset>
//           <legend>Basic Asset Info</legend>

//           <label>Asset Type:</label>
//           <select name="type" value={form.type} onChange={handleChange}>
//             <option value="">Select Asset Type</option>
//             {assetTypes.map((t, idx) => (
//               <option key={idx} value={t}>{t}</option>
//             ))}
//           </select>

//           <label> Manufacturer:</label>
//           <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter Asset Name" />

//           <label>Configuration:</label>
//           <input type="text" name="configuration" value={form.configuration} onChange={handleChange} placeholder="Enter Configuration" />
//         </fieldset>

//         <fieldset>
//           <legend>Identification Details</legend>

//           <label>Serial Number:</label>
//           <input type="text" name="serialNumber" value={form.serialNumber} onChange={handleChange} placeholder="Enter Serial Number" />

//           <label>Invoice Number:</label>
//           <input type="text" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} placeholder="Enter Invoice Number" />

//           <label>Party Name:</label>
//           <input type="text" name="partyName" value={form.partyName} onChange={handleChange} placeholder="Enter Party Name" />
//         </fieldset>

//         <fieldset>
//           <legend>Purchase Details</legend>

//           <label>Warranty:</label>
//           <input type="text" name="warranty" value={form.warranty} onChange={handleChange} placeholder="e.g. 1 Year" />

//           <label>Price (₹):</label>
//           <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Enter Price" />

//           <label>Location:</label>
//           <select name="location" value={form.location} onChange={handleChange}>
//             <option value="">Select Location</option>
//             <option value="HO">HO</option>
//             <option value="Bagru">Bagru</option>
//             <option value="R.C.Pura">R.C.Pura</option>
//             <option value="Hyderabad">Hyderabad</option>
//           </select>

//           <label>Date Received:</label>
//           <input type="date" name="dateAdded" value={form.dateAdded} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
//         </fieldset>

//         <div className="status-field">
//           <label>Status:</label>
//           <input type="text" value="In Stock" disabled readOnly />
//         </div>

//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     </div>
//   );
// };

// export default AddAssetForm;

import React, { useState } from 'react';
import axios from 'axios';

const AddAssetForm = () => {
  const [form, setForm] = useState({
    // assetCode: '',
    type: '',
    name: '',
    configuration: '',
    serialNumber: '',
    invoiceNumber: '',
    location: '',
    status: 'In Stock',
    dateAdded: '',
    warranty: '',
    price: '',
    partyName: ''
  });

  const [invoiceFile, setInvoiceFile] = useState(null); // ✅ store uploaded PDF

  const assetTypes = [
    'CPU',
    'Keyboard',
    'Laptop',
    'Monitor',
    'Mouse',
    'Printer',
    'TV',
    'UPS',
    'Wireless Mouse',
    'Wireless Keyboard',
    'Wlkbmc'
  ];

  // ✅ Handle input changes
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle PDF selection
  const handleFileChange = (e) => {
    setInvoiceFile(e.target.files[0]);
  };

  // ✅ Handle form submit
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // append all text fields
      Object.keys(form).forEach(key => formData.append(key, form[key]));

      // append file if selected
      if (invoiceFile) {
        formData.append("invoiceFile", invoiceFile);
      }

      await axios.post("http://localhost:5000/api/assets", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert('✅ Asset added with invoice PDF');

      // reset form
      setForm({
        // assetCode: '',
        type: '',
        name: '',
        configuration: '',
        serialNumber: '',
        invoiceNumber: '',
        location: '',
        status: 'In Stock',
        dateAdded: '',
        warranty: '',
        price: '',
        partyName: ''
      });
      setInvoiceFile(null);

    } catch (error) {
      alert('❌ Failed to add asset');
      console.error(error);
    }
  };

  return (
    <div className="add-asset-wrapper">
      <div className="glass-form">
        <h2>Add New Asset</h2>

        <fieldset>
          <legend>Basic Asset Info</legend>
          <label>Asset Type:</label>
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="">Select Asset Type</option>
            {assetTypes.map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>

          {/* <label>Asset Code:</label>
          <input type="text" name="assetCode" value={form.assetCode} onChange={handleChange} placeholder="Enter Asset Code" /> */}

          <label>Manufacturer:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Enter Asset Name" />

          <label>Configuration:</label>
          <input type="text" name="configuration" value={form.configuration} onChange={handleChange} placeholder="Enter Configuration" />
        </fieldset>

        <fieldset>
          <legend>Identification Details</legend>
          <label>Serial Number:</label>
          <input type="text" name="serialNumber" value={form.serialNumber} onChange={handleChange} placeholder="Enter Serial Number" />

          <label>Invoice Number:</label>
          <input type="text" name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} placeholder="Enter Invoice Number" />

          <label>Party Name:</label>
          <input type="text" name="partyName" value={form.partyName} onChange={handleChange} placeholder="Enter Party Name" />
        </fieldset>

        <fieldset>
          <legend>Purchase Details</legend>
          <label>Warranty:</label>
          <input type="text" name="warranty" value={form.warranty} onChange={handleChange} placeholder="e.g. 1 Year" />

          <label>Price (₹):</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} placeholder="Enter Price" />

          <label>Location:</label>
          <select name="location" value={form.location} onChange={handleChange}>
            <option value="">Select Location</option>
            <option value="HO">HO</option>
            <option value="Bagru">Bagru</option>
            <option value="R.C.Pura">R.C.Pura</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <label>Date Received:</label>
          <input type="date" name="dateAdded" value={form.dateAdded} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
        </fieldset>

        <div className="status-field">
          <label>Status:</label>
          <input type="text" value="In Stock" disabled readOnly />
        </div>

        <fieldset>
          <legend>Invoice Upload</legend>
          <label>Upload Invoice (PDF):</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          {invoiceFile && <p>📄 {invoiceFile.name}</p>}
        </fieldset>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddAssetForm;
