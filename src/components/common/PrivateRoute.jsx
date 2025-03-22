import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Spinner, Container, Alert } from 'react-bootstrap';

const PrivateRoute = ({ children, facultyOnly = false }) => {
  const { currentUser, loading, isFaculty } = useAuth();
  
  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading...</p>
        </div>
      </Container>
    );
  }
  
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  if (facultyOnly && !isFaculty()) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>Access Denied</Alert.Heading>
          <p>
            You do not have permission to access this page. This area is restricted to faculty members only.
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Navigate to="/dashboard" replace />
          </div>
        </Alert>
      </Container>
    );
  }
  
  return children;
};

export default PrivateRoute;