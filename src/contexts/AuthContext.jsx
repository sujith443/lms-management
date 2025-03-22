import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);
  
  // Login function
  const login = (email, password) => {
    // In a real app, this would make an API call to authenticate
    return new Promise((resolve, reject) => {
      // Simulating API call for demo purposes
      setTimeout(() => {
        // Check if credentials match (dummy validation)
        if (email === 'student@svit.edu' && password === 'password') {
          const user = {
            id: '1',
            name: 'Demo Student',
            email: email,
            role: 'student',
            department: 'Computer Science',
            year: '3rd Year',
            profilePic: '/assets/images/default-avatar.png'
          };
          
          // Store user in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else if (email === 'faculty@svit.edu' && password === 'password') {
          const user = {
            id: '2',
            name: 'Demo Faculty',
            email: email,
            role: 'faculty',
            department: 'Computer Science',
            courses: ['Data Structures', 'Algorithms', 'Database Systems'],
            profilePic: '/assets/images/default-avatar.png'
          };
          
          // Store user in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          setCurrentUser(user);
          resolve(user);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  };
  
  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
    return Promise.resolve();
  };
  
  // Register function
  const register = (name, email, password, role, department, year) => {
    // In a real app, this would make an API call to register the user
    return new Promise((resolve, reject) => {
      // Simulating API call for demo purposes
      setTimeout(() => {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name,
          email,
          role: role || 'student',
          department,
          year,
          profilePic: '/assets/images/default-avatar.png'
        };
        
        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };
  
  // Check if user is faculty
  const isFaculty = () => {
    return currentUser && currentUser.role === 'faculty';
  };
  
  // Value object to be provided by the context
  const value = {
    currentUser,
    login,
    logout,
    register,
    isFaculty,
    loading
  };
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};