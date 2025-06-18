// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedId) return alert('Select an asset to return');

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     try {
//       // 1. Save to returns
//       await axios.post('http://localhost:5000/api/returns', {
//         assetId: assetToReturn.assetId,
//         employeeId: assetToReturn.employeeId,
//         departmentId: assetToReturn.departmentId,
//         issuedDate: assetToReturn.issuedDate,
//         returnDate: new Date().toISOString()
//       });

//       // 2. Remove from issued
//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
//           <option value="">Select Issued Asset</option>
//           {issuedAssets.map(item => (
//             <option key={item._id} value={item._id}>
//               {item.assetId?.name || 'Unnamed Asset'} - {item.employeeId?.name || 'Unknown Employee'}
//             </option>
//           ))}
//         </select>
//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedId) return alert('Select an asset to return');

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     try {
//       // 1. Save to returns
//       await axios.post('http://localhost:5000/api/returns', {
//         assetId: assetToReturn.assetId,
//         employeeId: assetToReturn.employeeId,
//         departmentId: assetToReturn.departmentId,
//         issuedDate: assetToReturn.issuedDate,
//         returnDate: new Date().toISOString()
//       });

//       // 2. Remove from issued
//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
//           <option value="">Select Issued Asset</option>
//           {issuedAssets.map(item => (
//             <option key={item._id} value={item._id}>
//               {item.assetId?.name || 'Unnamed'} - 
//               {item.assetId?.serialNumber || 'No Serial'} - 
//               {item.assetId?.modelNumber || 'No Model'} - 
//               {item.employeeId?.name || 'Unknown Employee'}
//             </option>
//           ))}
//         </select>
//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedId) return alert('Select an asset to return');

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     try {
//       await axios.post('http://localhost:5000/api/returns', {
//   assetId: assetToReturn.assetId,
//   employeeId: assetToReturn.employeeId,
//   departmentId: assetToReturn.departmentId,
//   issuedDate: assetToReturn.issuedDate,
//   returnDate: returnDate ? new Date(returnDate) : new Date()

// });

      

//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       setReturnDate(new Date().toISOString().split('T')[0]);
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }

    
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.modelNumber || 'No Model'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />
//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             onChange={(e) => setReturnDate(e.target.value)}
//           />
//         </label>
//         <br />
//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
//   const [location, setLocation] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const locations = ['IT Department'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!selectedId || !location || !returnReason) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     try {
//       // Save to return records
//       await axios.post('http://localhost:5000/api/returns', {
//         assetId: assetToReturn.assetId,
//         employeeId: assetToReturn.employeeId,
//         departmentId: assetToReturn.departmentId,
//         issuedDate: assetToReturn.issuedDate,
//         returnDate: returnDate ? new Date(returnDate) : new Date(),
//         location,
//         returnReason
//       });

//       // Delete from issued records
//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       setReturnDate(new Date().toISOString().split('T')[0]);
//       setLocation('');
//       setReturnReason('');
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.configuration || 'No Configuration'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return Location:
//           <select value={location} onChange={(e) => setLocation(e.target.value)} required>
//             <option value="">Select Location</option>
//             {locations.map((loc, idx) => (
//               <option key={idx} value={loc}>{loc}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
//   const [returned, setReturned] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const returnTo = ['IT Department','others'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedId || !location || !returnReason) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     const issuedDate = new Date(assetToReturn.issuedDate);
//     const selectedReturnDate = new Date(returnDate);
//     const today = new Date();

//     // 🔒 Validate return date
//     if (selectedReturnDate > today) {
//       return alert("Return date cannot be in the future.");
//     }

//     if (selectedReturnDate < issuedDate) {
//       return alert("Return date cannot be before the issue date.");
//     }

//     try {
//       // Save return record
//       await axios.post('http://localhost:5000/api/returns', {
//         assetId: assetToReturn.assetId,
//         employeeId: assetToReturn.employeeId,
//         departmentId: assetToReturn.departmentId,
//         issuedDate: assetToReturn.issuedDate,
//         returnDate: selectedReturnDate,
//         returned,
//         returnReason
//       });

//       // Remove from issued collection
//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       setReturnDate(new Date().toISOString().split('T')[0]);
//       setReturned('');
//       setReturnReason('');
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.configuration || 'No Configuration'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             max={new Date().toISOString().split('T')[0]} // ❌ Prevent future dates
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return To:
//           <select value={returnTo} onChange={(e) => setReturned(e.target.value)} required>
//             <option value="">Select</option>
//             {returnTo.map((returned , idx) => (
//               <option key={idx} value={returned}>{returned}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
//   const [returnTo, setReturnTo] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const returnToOptions = ['IT Department', 'Others'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedId || !returnTo || !returnReason) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     const issuedDate = new Date(assetToReturn.issuedDate);
//     const selectedReturnDate = new Date(returnDate);
//     const today = new Date();

//     // 🔒 Validate return date
//     if (selectedReturnDate > today) {
//       return alert("Return date cannot be in the future.");
//     }

//     if (selectedReturnDate < issuedDate) {
//       return alert("Return date cannot be before the issue date.");
//     }

//     try {
//       // Save return record
//       await axios.post('http://localhost:5000/api/returns', {
//         assetId: assetToReturn.assetId,
//         employeeId: assetToReturn.employeeId,
//         departmentId: assetToReturn.departmentId,
//         issuedDate: assetToReturn.issuedDate,
//         returnDate: selectedReturnDate,
//         returnTo:assetToReturn.returnTo,
//         returnReason:assetToReturn.returnReason
//       });

//       // Remove from issued collection
//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       setReturnDate(new Date().toISOString().split('T')[0]);
//       setReturnTo('');
//       setReturnReason('');
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.configuration || 'No Configuration'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             max={new Date().toISOString().split('T')[0]}
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return To:
//           <select value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required>
//             <option value="">Select Location</option>
//             {returnToOptions.map((loc, idx) => (
//               <option key={idx} value={loc}>{loc}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
//   const [returnTo, setReturnTo] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const returnToOptions = ['IT Department', 'Others'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedId || !returnTo || !returnReason) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     const issuedDate = new Date(assetToReturn.issuedDate);
//     const selectedReturnDate = new Date(returnDate);
//     const today = new Date();

//     if (selectedReturnDate > today) {
//       return alert("Return date cannot be in the future.");
//     }

//     if (selectedReturnDate < issuedDate) {
//       return alert("Return date cannot be before the issue date.");
//     }

//     try {
//       const payload = {
//         assetId: assetToReturn.assetId,
//         employeeId: assetToReturn.employeeId,
//         departmentId: assetToReturn.departmentId,
//         issuedDate: assetToReturn.issuedDate,
//         returnDate: selectedReturnDate,
//         returnTo: returnTo,
//         returnReason: returnReason
//       };

//       console.log("Submitting return:", payload); // For debugging

//       await axios.post('http://localhost:5000/api/returns', payload);
//       await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

//       alert('Asset returned successfully');
//       setSelectedId('');
//       setReturnDate(new Date().toISOString().split('T')[0]);
//       setReturnTo('');
//       setReturnReason('');
//       fetchIssuedAssets();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.configuration || 'No Configuration'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             max={new Date().toISOString().split('T')[0]}
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return To:
//           <select value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required>
//             <option value="">Select</option>
//             {returnToOptions.map((option, idx) => (
//               <option key={idx} value={option}>{option}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState(new Date().toISOString().split('T')[0]);
//   const [returnTo, setReturnTo] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const returnToOptions = ['IT Department', 'Others'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedId || !returnTo || !returnReason) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     const issuedDate = new Date(assetToReturn.issuedDate);
//     const selectedReturnDate = new Date(returnDate);
//     const today = new Date();

//     if (selectedReturnDate > today) {
//       return alert("Return date cannot be in the future.");
//     }

//     if (selectedReturnDate < issuedDate) {
//       return alert("Return date cannot be before the issue date.");
//     }

//     const payload = {
//       assetId: assetToReturn.assetId,
//       employeeId: assetToReturn.employeeId,
//       departmentId: assetToReturn.departmentId,
//       issuedDate: assetToReturn.issuedDate,
//       returnDate: selectedReturnDate,
//       returnTo,
//       returnReason
//     };

//     try {
//       // 1. Add to return collection
//       await axios.post('http://localhost:5000/api/returns', payload);

//       try {
//         // 2. Delete from issued list
//         await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);
//       } catch (deleteErr) {
//         console.warn('Asset returned but failed to delete from issued list:', deleteErr);
//         alert('Asset returned successfully.');
//         return;
//       }

//       alert('Asset returned successfully');

//       // Reset form
//       setSelectedId('');
//       setReturnDate(new Date().toISOString().split('T')[0]);
//       setReturnTo('');
//       setReturnReason('');
//       fetchIssuedAssets();

//     } catch (err) {
//       console.error('Error returning asset:', err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.configuration || 'No Config'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             max={new Date().toISOString().split('T')[0]}
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return To:
//           <select value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required>
//             <option value="">Select</option>
//             {returnToOptions.map((option, idx) => (
//               <option key={idx} value={option}>{option}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState('');
//   const [returnTo, setReturnTo] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const returnToOptions = ['IT Department', 'Others'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedId || !returnTo || !returnReason || !returnDate) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     const issuedDate = new Date(assetToReturn.issuedDate);
//     const selectedReturnDate = new Date(returnDate);
//     const today = new Date();

//     if (selectedReturnDate > today) {
//       return alert("Return date cannot be in the future.");
//     }

//     if (selectedReturnDate < issuedDate) {
//       return alert("Return date cannot be before the issue date.");
//     }

//     const payload = {
//       assetId: assetToReturn.assetId,
//       employeeId: assetToReturn.employeeId,
//       departmentId: assetToReturn.departmentId,
//       issuedDate: assetToReturn.issuedDate,
//       returnDate: selectedReturnDate,
//       returnTo,
//       returnReason
//     };

//     try {
//       // 1. Add to return collection
//       await axios.post('http://localhost:5000/api/returns', payload);

//       try {
//         // 2. Delete from issued list
//         await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);
//       } catch (deleteErr) {
//         console.warn('Asset returned but failed to delete from issued list:', deleteErr);
//         alert('Asset returned successfully.');
//         return;
//       }

//       alert('Asset returned successfully');

//       // Reset form
//       setSelectedId('');
//       setReturnDate('');
//       setReturnTo('');
//       setReturnReason('');
//       fetchIssuedAssets();

//     } catch (err) {
//       console.error('Error returning asset:', err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} - 
//                 {item.assetId?.serialNumber || 'No Serial'} - 
//                 {item.assetId?.configuration || 'No Config'} - 
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             max={new Date().toISOString().split('T')[0]}
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return To:
//           <select value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required>
//             <option value="">Select</option>
//             {returnToOptions.map((option, idx) => (
//               <option key={idx} value={option}>{option}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;


import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnAsset = () => {
  const [issuedAssets, setIssuedAssets] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnTo, setReturnTo] = useState('');
  const [returnReason, setReturnReason] = useState('');

  const returnToOptions = ['IT Department', 'Others'];
  const returnReasons = ['Not Working ', 'Damaged', 'In Stock', 'Other'];

  useEffect(() => {
    fetchIssuedAssets();
  }, []);

  const fetchIssuedAssets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/issued');
      setIssuedAssets(res.data);
    } catch (err) {
      console.error('Failed to fetch issued assets', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedId || !returnTo || !returnReason || !returnDate) {
      return alert('Please fill all fields');
    }

    const assetToReturn = issuedAssets.find(item => item._id === selectedId);
    if (!assetToReturn) return;

    const issuedDate = new Date(assetToReturn.issuedDate);
    const selectedReturnDate = new Date(returnDate);
    const today = new Date();

    if (selectedReturnDate > today) {
      return alert("Return date cannot be in the future.");
    }

    if (selectedReturnDate < issuedDate) {
      return alert("Return date cannot be before the issue date.");
    }

    try {
      if (returnReason === 'In Stock') {
        // Add back to available assets
        const availableAssetPayload = {
          name: assetToReturn.assetId?.name,
          type: assetToReturn.assetId?.type,
          serialNumber: assetToReturn.assetId?.serialNumber,
          configuration: assetToReturn.assetId?.configuration,
        
          manufacturer: assetToReturn.assetId?.manufacturer,
      
          status: 'In Stock',
          dateAdded: returnDate
        };

        await axios.post('http://localhost:5000/api/assets', availableAssetPayload);

        alert('Asset returned to stock successfully');
      } else {
        // Add to returned asset list
        const returnPayload = {
          assetId: assetToReturn.assetId,
          employeeId: assetToReturn.employeeId,
          departmentId: assetToReturn.departmentId,
          issuedDate: assetToReturn.issuedDate,
          returnDate,
          returnTo,
          returnReason
        };

        await axios.post('http://localhost:5000/api/returns', returnPayload);
        alert('Asset marked as returned successfully');
      }

      // Remove from issued list
      await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);

      // Reset form
      setSelectedId('');
      setReturnDate('');
      setReturnTo('');
      setReturnReason('');
      fetchIssuedAssets();

    } catch (err) {
      console.error('Error processing return:', err);
      // alert('');                         //Failed to process return
    }
  };

  return (
    <div className="form">
      <h3>Return Asset</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Select Issued Asset:
          <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
            <option value="">Select Issued Asset</option>
            {issuedAssets.map(item => (
              <option key={item._id} value={item._id}>
                {item.assetId?.name || 'Unnamed'} -
                {item.assetId?.serialNumber || 'No Serial'} -
                {item.assetId?.configuration || 'No Config'} -
                {item.employeeId?.name || 'Unknown Employee'}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Return Date:
          <input
            type="date"
            value={returnDate}
            max={new Date().toISOString().split('T')[0]}
            onChange={(e) => setReturnDate(e.target.value)}
            required
          />
        </label>
        <br />

        <label>
          Return To:
          <select value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required>
            <option value="">Select</option>
            {returnToOptions.map((option, idx) => (
              <option key={idx} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Return Reason:
          <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
            <option value="">Select Reason</option>
            {returnReasons.map((reason, idx) => (
              <option key={idx} value={reason}>{reason}</option>
            ))}
          </select>
        </label>
        <br />

        <button type="submit">Return</button>
      </form>
    </div>
  );
};

export default ReturnAsset;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ReturnAsset = () => {
//   const [issuedAssets, setIssuedAssets] = useState([]);
//   const [selectedId, setSelectedId] = useState('');
//   const [returnDate, setReturnDate] = useState('');
//   const [returnTo, setReturnTo] = useState('');
//   const [returnReason, setReturnReason] = useState('');

//   const returnToOptions = ['IT Department', 'Others'];
//   const returnReasons = ['Repaired', 'Damaged', 'Upgraded', 'Reassigned', 'In Stock', 'Other'];

//   useEffect(() => {
//     fetchIssuedAssets();
//   }, []);

//   const fetchIssuedAssets = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/api/issued');
//       setIssuedAssets(res.data);
//     } catch (err) {
//       console.error('Failed to fetch issued assets', err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedId || !returnTo || !returnReason || !returnDate) {
//       return alert('Please fill all fields');
//     }

//     const assetToReturn = issuedAssets.find(item => item._id === selectedId);
//     if (!assetToReturn) return;

//     const issuedDate = new Date(assetToReturn.issuedDate);
//     const selectedReturnDate = new Date(returnDate);
//     const today = new Date();

//     if (selectedReturnDate > today) {
//       return alert("Return date cannot be in the future.");
//     }

//     if (selectedReturnDate < issuedDate) {
//       return alert("Return date cannot be before the issue date.");
//     }

//     // const returnPayload = {
//     //   assetId: assetToReturn.assetId,
//     //   employeeId: assetToReturn.employeeId,
//     //   departmentId: assetToReturn.departmentId,
//     //   issuedDate: assetToReturn.issuedDate,
//     //   returnDate: selectedReturnDate,
//     //   returnTo,
//     //   returnReason
//     // };
// const returnPayload = {
//   assetId: assetToReturn.assetId,
//   employeeId: assetToReturn.employeeId,
//   departmentId: assetToReturn.departmentId,
//   issuedDate: assetToReturn.issuedDate,
//   returnDate: selectedReturnDate,
//   returnTo,
//   returnReason,
//   moveToAvailable: returnReason === 'In Stock' // ✅ key logic
// };

//     try {
//       // Save to ReturnAsset collection
//       await axios.post('http://localhost:5000/api/returns', returnPayload);
//       alert('Asset marked as returned successfully');

//       try {
//         // Delete from IssuedAssets
//         await axios.delete(`http://localhost:5000/api/issued/${selectedId}`);
//       } catch (deleteErr) {
//         // console.warn('Asset returned but failed to delete from issued list:', deleteErr);
//         // alert('Warning: Asset was returned, but not removed from issued list.',deleteErr);
//         alert('Asset return successfully',deleteErr);
//       }

//       // Reset form
//       setSelectedId('');
//       setReturnDate('');
//       setReturnTo('');
//       setReturnReason('');
//       fetchIssuedAssets();

//     } catch (err) {
//       console.error('Error returning asset:', err);
//       alert('Failed to return asset');
//     }
//   };

//   return (
//     <div className="form">
//       <h3>Return Asset</h3>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Select Issued Asset:
//           <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)} required>
//             <option value="">Select Issued Asset</option>
//             {issuedAssets.map(item => (
//               <option key={item._id} value={item._id}>
//                 {item.assetId?.name || 'Unnamed'} -
//                 {item.assetId?.serialNumber || 'No Serial'} -
//                 {item.assetId?.configuration || 'No Config'} -
//                 {item.employeeId?.name || 'Unknown Employee'}
//               </option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Date:
//           <input
//             type="date"
//             value={returnDate}
//             max={new Date().toISOString().split('T')[0]}
//             onChange={(e) => setReturnDate(e.target.value)}
//             required
//           />
//         </label>
//         <br />

//         <label>
//           Return To:
//           <select value={returnTo} onChange={(e) => setReturnTo(e.target.value)} required>
//             <option value="">Select</option>
//             {returnToOptions.map((option, idx) => (
//               <option key={idx} value={option}>{option}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <label>
//           Return Reason:
//           <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)} required>
//             <option value="">Select Reason</option>
//             {returnReasons.map((reason, idx) => (
//               <option key={idx} value={reason}>{reason}</option>
//             ))}
//           </select>
//         </label>
//         <br />

//         <button type="submit">Return</button>
//       </form>
//     </div>
//   );
// };

// export default ReturnAsset;



