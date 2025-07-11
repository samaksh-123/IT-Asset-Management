// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthForm.css'; // ✅ import the CSS

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       alert('Login successful');
//       window.location.href = '/dashboard';
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Invalid email or password');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           placeholder="Enter your email"
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           placeholder="Enter your password"
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthForm.css'; // Updated CSS with animation and bg image
//  // ✅ Background logo

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       alert('Login successful');
//       window.location.href = '/dashboard';
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Invalid email or password');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="background-overlay"></div>

//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>

//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           placeholder="Enter your email"
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           placeholder="Enter your password"
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthForm.css'; // ✅ import CSS

// const Login = () => {
//   const [form, setForm] = useState({ email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', form);
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//       alert('Login successful');
//       window.location.href = '/dashboard';
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Invalid email or password');
//     }
//   };

//   return (
//     <div className="auth-container">
//       {/* Background Image Layer */}
//       <div className="bg-image" />

//       {/* Login Form */}
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <label>Email</label>
//         <input
//           type="email"
//           name="email"
//           value={form.email}
//           onChange={handleChange}
//           required
//           placeholder="Enter your email"
//         />

//         <label>Password</label>
//         <input
//           type="password"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//           required
//           placeholder="Enter your password"
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // CSS includes animated bg

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      alert('Login successful');
      window.location.href = '/dashboard';
    } catch (error) {
      alert(error.response?.data?.msg || 'Invalid email or password');
    }
  };

  return (
    <div className="auth-container">
      {/* ✅ Animated Background Layer */}
      <div className="bg-image" />

      {/* ✅ Glassmorphism Form */}
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
