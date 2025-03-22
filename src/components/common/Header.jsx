import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout, isFaculty } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New assignment posted in Data Structures', unread: true },
    { id: 2, text: 'Upcoming quiz on Database Systems', unread: true },
    { id: 3, text: 'Grades published for Algorithms mid-term', unread: false }
  ]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const markNotificationAsRead = (id) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, unread: false } 
          : notification
      )
    );
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-4 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/assets/images/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="SVIT College Logo"
          />
          <span className="fw-bold">SVIT LMS</span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {currentUser && (
              <>
                <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/courses">Courses</Nav.Link>
                <Nav.Link as={Link} to="/materials">Materials</Nav.Link>
                {isFaculty() && (
                  <Nav.Link as={Link} to="/faculty">Faculty Portal</Nav.Link>
                )}
              </>
            )}
          </Nav>
          
          {currentUser ? (
            <div className="d-flex align-items-center">
              {/* Notifications Dropdown */}
              <Dropdown align="end" className="me-3">
                <Dropdown.Toggle variant="transparent" id="notification-dropdown" className="position-relative p-0 bg-transparent border-0">
                  <i className="bi bi-bell-fill text-light fs-5"></i>
                  {unreadCount > 0 && (
                    <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                      {unreadCount}
                    </Badge>
                  )}
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow notification-menu" style={{ width: '300px' }}>
                  <div className="p-2 border-bottom">
                    <h6 className="mb-0">Notifications</h6>
                  </div>
                  {notifications.length > 0 ? (
                    <>
                      {notifications.map(notification => (
                        <Dropdown.Item 
                          key={notification.id}
                          className={`border-bottom ${notification.unread ? 'bg-light' : ''}`}
                          onClick={() => markNotificationAsRead(notification.id)}
                        >
                          <div className="d-flex align-items-center">
                            <div>
                              <p className="mb-0 small fw-bold">{notification.text}</p>
                              <p className="mb-0 text-muted x-small">2 hours ago</p>
                            </div>
                            {notification.unread && (
                              <Badge pill bg="primary" className="ms-auto">New</Badge>
                            )}
                          </div>
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Item className="text-center text-primary">
                        View All
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item>No notifications</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              
              {/* User Dropdown */}
              <Dropdown align="end">
                <Dropdown.Toggle variant="transparent" id="user-dropdown" className="d-flex align-items-center bg-transparent border-0">
                  <img
                    src={currentUser.profilePic || "/assets/images/default-avatar.png"}
                    width="32"
                    height="32"
                    className="rounded-circle"
                    alt="User"
                  />
                  <span className="ms-2 text-light d-none d-md-inline">{currentUser.name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu className="shadow">
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person-circle me-2"></i> Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i> Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          ) : (
            <div>
              <Button as={Link} to="/login" variant="outline-light" className="me-2">Login</Button>
              <Button as={Link} to="/register" variant="light">Register</Button>
            </div>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;