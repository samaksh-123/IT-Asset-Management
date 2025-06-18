import axios from 'axios';
import App from './App';

const API = axios.create({ baseURL: 'https://it-asset-management-abb9.onrender.com' });

export const addAsset = (data) => API.post('/assets/add', data);
export const fetchAvailableAssets = () => API.get('/assets/available');


// export const deleteAsset = (id) => axios.delete(`http://localhost:5000/api/assets/${id}`);
// export const updateAsset = (id, data) => axios.put(`http://localhost:5000/api/assets/${id}`, data);

export const issueAsset = (data) => {
  return axios.post('https://it-asset-management-abb9.onrender.com/api/issued', data);
};

;
export const fetchIssuedAssets = () => {
  return axios.get('https://it-asset-management-abb9.onrender.com/api/issued');
};



// export const deleteIssuedAsset = (id) =>
//   axios.delete(`http://localhost:5000/api/issued/${id}`);

// export const updateIssuedAsset = (id, updatedData) =>
//   axios.put(`http://localhost:5000/api/issued/${id}`, updatedData);



export const addDepartment = (data) => API.post('/departments/add', data);
export const fetchDepartments = () => API.get('/departments');

// 🔁 Update a department
export const updateDepartment = async (id, data) => {
  return await axios.put(`${API}/departments/${id}`, data);
};

// ❌ Delete a department
export const deleteDepartment = async (id) => {
  return await axios.delete(`${API}/departments/${id}`);
};

export const addEmployee = (data) => API.post('/employees/add', data);
 export const fetchEmployees = () => API.get('/employees');





export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  return res.data;
};
// export const returnAsset = (data) => axios.post('/api/returns', data);
// export const fetchReturnedAssets = () => axios.get('/api/returns');
// export const deleteReturnedAsset = async (id) => {
//   try {
//     const res = await axios.delete(`http://localhost:5000/api/returns/${id}`);
//     return res.data;
//   } catch (err) {
//     console.error('Error deleting returned asset:', err);
//     throw err;
//   }
// };

// Corrected: use API instance with baseURL
export const returnAsset = (data) => API.post('/returns', data);
export const fetchReturnedAssets = () => API.get('/returns');
export const deleteReturnedAsset = (id) => API.delete(`/assets/${id}`);
