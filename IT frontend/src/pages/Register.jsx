// import React, { useState } from 'react';
// import axios from 'axios';

// const Register = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', form);
//       alert('Registration successful');
//           localStorage.setItem('token', response.data.token);
//       // Optional: Redirect to login page after successful registration
//       window.location.href = '/login';
//     } catch (error) {
//       console.error('Registration error:', error.response?.data || error.message);
//       alert(error.response?.data?.msg || 'Registration failed');
//     }
//   };

//   return (
//     <div className="form-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           placeholder="Enter your name"
//         />

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
//           placeholder="Enter a strong password"
//         />

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;


// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthForm.css';

// const Register = () => {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('http://localhost:5000/api/auth/register', form);
//       alert('Registered successfully');
//       window.location.href = '/login';
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Register</h2>
//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           placeholder="Enter your name"
//         />

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

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthForm.css';

// const Register = () => {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (form.password !== form.confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }

//     try {
//       await axios.post('http://localhost:5000/api/auth/register', {
//         name: form.name,
//         email: form.email,
//         password: form.password
//       });
//       alert('Registered successfully');
//       window.location.href = '/login';
//     } catch (error) {
//       alert(error.response?.data?.msg || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="auth-container">
//       <form className="auth-form" onSubmit={handleSubmit}>
//         <h2>Register</h2>

//         <label>Name</label>
//         <input
//           type="text"
//           name="name"
//           value={form.name}
//           onChange={handleChange}
//           required
//           placeholder="Enter your name"
//         />

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
//         <div className="password-input">
//           <input
//             type={showPassword ? 'text' : 'password'}
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             placeholder="Enter password"
//           />
//           {/* <span
//             className="toggle-password"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? '🙈' : '👁️'}
//           </span> */}
//         </div>

//         <label>Confirm Password</label>
//         <div className="password-input">
//           <input
//             type={showConfirm ? 'text' : 'password'}
//             name="confirmPassword"
//             value={form.confirmPassword}
//             onChange={handleChange}
//             required
//             placeholder="Re-enter password"
//           />
//           {/* <span
//             className="toggle-password"
//             onClick={() => setShowConfirm(!showConfirm)}
//           >
//             {showConfirm ? '🙈' : '👁️'}
//           </span> */}
//         </div>

//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;



import React, { useState } from 'react';
import axios from 'axios';
import './AuthForm.css'; // Make sure this contains the animated background

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      alert('Registered successfully');
      window.location.href = '/login';
    } catch (error) {
      alert(error.response?.data?.msg || 'Something went wrong');
    }
  };

  return (
    <div className="auth-container">
      {/* 🔥 Animated Background */}
      <div className="bg-image" />

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />

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
        <div className="password-input">
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </span>
        </div>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <div className="password-input">
          <input
            id="confirmPassword"
            type={showConfirm ? 'text' : 'password'}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Re-enter password"
          />
          <span
            className="toggle-password"
            onClick={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? '🙈' : '👁️'}
          </span>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
