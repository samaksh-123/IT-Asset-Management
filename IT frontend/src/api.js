import axios from 'axios';

const API = axios.create({ baseURL: 'https://it-asset-management-u60k.onrender.com/api' });

// Assets
export const addAsset = (data) => API.post('/assets/add', data);
export const fetchAvailableAssets = () => API.get('/assets/available');
export const deleteAsset = (id) => API.delete(`/assets/${id}`);
export const updateAsset = (id, data) => API.put(`/assets/${id}`, data);

// Issued Assets
export const issueAsset = (data) => API.post('/issued', data);
export const fetchIssuedAssets = () => API.get('/issued');
export const deleteIssuedAsset = (id) => API.delete(`/issued/${id}`);
export const updateIssuedAsset = (id, updatedData) => API.put(`/issued/${id}`, updatedData);

// Departments
export const addDepartment = (data) => API.post('/departments/add', data);
export const fetchDepartments = () => API.get('/departments');
export const updateDepartment = (id, data) => API.put(`/departments/${id}`, data);
export const deleteDepartment = (id) => API.delete(`/departments/${id}`);

// Employees
export const addEmployee = (data) => API.post('/employees/add', data);
export const fetchEmployees = () => API.get('/employees');
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// Returned Assets
export const returnAsset = (data) => API.post('/returns', data);
export const fetchReturnedAssets = () => API.get('/returns');
export const deleteReturnedAsset = (id) => API.delete(`/assets/${id}`);
