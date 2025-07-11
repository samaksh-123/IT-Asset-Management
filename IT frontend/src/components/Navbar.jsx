// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css'; // Link to the CSS styling

// const Navbar = () => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="navbar">
//       <div className="navbar-title">
//         <Link to="/">IT Asset Management</Link>
//       </div>
//       <div className="navbar-links">
//         {token ? (
//           <>
//             {/* <Link to="/dashboard">Dashboard</Link> */}
//             <button onClick={handleLogout}>Logout</button>
//           </>
//         ) : (
//           <>
//             <Link to="/login">Login</Link>
//             <Link to="/register">Register</Link>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <Link to="/">IT Asset Management</Link>
      </div>
      <div className="navbar-links">
        {token ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
