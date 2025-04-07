import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser, isFaculty } = useAuth();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const sidebarItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: 'bi-speedometer2',
      roles: ['student', 'faculty']
    },
    {
      name: 'My Courses',
      path: '/courses',
      icon: 'bi-book',
      roles: ['student', 'faculty']
    },
    {
      name: 'Study Materials',
      path: '/materials',
      icon: 'bi-file-earmark-text',
      roles: ['student', 'faculty']
    },
    {
      name: 'Assignments',
      path: '/assignments',
      icon: 'bi-clipboard-check',
      roles: ['student', 'faculty']
    },
    {
      name: 'Grades',
      path: '/grades',
      icon: 'bi-graph-up',
      roles: ['student']
    },
    {
      name: 'Faculty Portal',
      path: '/faculty',
      icon: 'bi-person-workspace',
      roles: ['faculty']
    },
  ];
  
  // Filter sidebar items based on user role
  const filteredItems = sidebarItems.filter(item => {
    if (!currentUser || !currentUser.role) return false;
    return item.roles.includes(currentUser.role);
  });
  
  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
        {!collapsed && (
          <div className="d-flex align-items-center">
            <img
              src="https://svitatp.ac.in/public/assets/admin/images/sitesetting/664263736b243_SVIT%20LOGO.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
              alt="SVIT College Logo"
            />
            <span className="fw-bold text-white">SVIT LMS</span>
          </div>
        )}
        <Button 
          variant="link" 
          className="text-white p-0" 
          onClick={toggleSidebar}
        >
          <i className={`bi ${collapsed ? 'bi-arrow-right-square' : 'bi-arrow-left-square'}`}></i>
        </Button>
      </div>
      
      <div className="p-2">
        {filteredItems.map((item, index) => (
          <NavLink 
            key={index} 
            to={item.path} 
            className={({ isActive }) => 
              `sidebar-item ${isActive ? 'active' : ''}`
            }
          >
            <i className={`bi ${item.icon} sidebar-icon`}></i>
            {!collapsed && <span>{item.name}</span>}
          </NavLink>
        ))}
      </div>
      
      {!collapsed && (
        <div className="mt-auto p-3 border-top">
          <div className="d-flex align-items-center">
            <img
              src={currentUser?.profilePic || "https://svitatp.ac.in/public/assets/admin/images/sitesetting/664263736b243_SVIT%20LOGO.png"}
              width="40"
              height="40"
              className="rounded-circle me-2"
              alt="User"
            />
            <div className="text-white">
              <p className="mb-0 fw-medium">{currentUser?.name || 'User'}</p>
              <small className="text-white-50">{currentUser?.role || 'Student'}</small>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;