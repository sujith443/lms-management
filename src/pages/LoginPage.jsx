import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Nav } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = ({ register = false }) => {
  const [activeTab, setActiveTab] = useState(register ? 'register' : 'login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register: registerUser, currentUser } = useAuth();
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState('');
  
  // Demo credentials
  const studentCredentials = { email: 'student@svit.edu', password: 'password' };
  const facultyCredentials = { email: 'faculty@svit.edu', password: 'password' };
  
  // Redirect if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  // Handle tab change based on URL
  useEffect(() => {
    if (location.pathname === '/register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [location.pathname]);
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!loginEmail || !loginPassword) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      setLoading(true);
      await login(loginEmail, loginPassword);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to log in: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!name || !email || !password || !confirmPassword || !department) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setLoading(true);
      await registerUser(name, email, password, role, department, year);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to create an account: ' + error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleDemoLogin = async (type) => {
    setLoading(true);
    try {
      const credentials = type === 'student' ? studentCredentials : facultyCredentials;
      await login(credentials.email, credentials.password);
      navigate('/dashboard');
    } catch (error) {
      setError('Failed to log in with demo account');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="login-page bg-light min-vh-100 d-flex align-items-center py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="text-center mb-4">
              <img 
                src="/assets/images/logo.png" 
                alt="SVIT College Logo" 
                width="80" 
                height="80" 
              />
              <h1 className="mt-2 text-primary">SVIT Learning Management System</h1>
              <p className="text-muted">Sri Venkateswara Institute of Technology</p>
            </div>
            
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                  <Nav variant="pills" className="nav-justified mb-4">
                    <Nav.Item>
                      <Nav.Link 
                        eventKey="login" 
                        className="rounded-pill"
                        onClick={() => navigate('/login')}
                      >
                        Login
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link 
                        eventKey="register" 
                        className="rounded-pill"
                        onClick={() => navigate('/register')}
                      >
                        Register
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                  
                  {error && <Alert variant="danger">{error}</Alert>}
                  
                  <Tab.Content>
                    {/* Login Tab */}
                    <Tab.Pane eventKey="login">
                      <Form onSubmit={handleLoginSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control 
                            type="email" 
                            placeholder="Enter your email" 
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-4">
                          <Form.Label>Password</Form.Label>
                          <Form.Control 
                            type="password" 
                            placeholder="Enter your password" 
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                          <div className="d-flex justify-content-end mt-1">
                            <a href="#forgot-password" className="text-decoration-none small">
                              Forgot password?
                            </a>
                          </div>
                        </Form.Group>
                        
                        <Button 
                          variant="primary" 
                          type="submit" 
                          className="w-100 py-2 mb-3"
                          disabled={loading}
                        >
                          {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        
                        <div className="text-center mb-3">
                          <span className="text-muted">Or login with demo account</span>
                        </div>
                        
                        <div className="d-flex gap-2">
                          <Button 
                            variant="outline-primary" 
                            className="w-50"
                            onClick={() => handleDemoLogin('student')}
                            disabled={loading}
                          >
                            Student Demo
                          </Button>
                          <Button 
                            variant="outline-success" 
                            className="w-50"
                            onClick={() => handleDemoLogin('faculty')}
                            disabled={loading}
                          >
                            Faculty Demo
                          </Button>
                        </div>
                      </Form>
                    </Tab.Pane>
                    
                    {/* Register Tab */}
                    <Tab.Pane eventKey="register">
                      <Form onSubmit={handleRegisterSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control 
                            type="text" 
                            placeholder="Enter your full name" 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                          />
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control 
                            type="email" 
                            placeholder="Enter your email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <Form.Text className="text-muted">
                            Use your college email if available
                          </Form.Text>
                        </Form.Group>
                        
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Password</Form.Label>
                              <Form.Control 
                                type="password" 
                                placeholder="Create a password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Confirm Password</Form.Label>
                              <Form.Control 
                                type="password" 
                                placeholder="Confirm your password" 
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Role</Form.Label>
                          <Form.Select 
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                          >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                          </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Select 
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            required
                          >
                            <option value="">Select Department</option>
                            <option value="Computer Science">Computer Science & Engineering</option>
                            <option value="Electrical">Electrical Engineering</option>
                            <option value="Mechanical">Mechanical Engineering</option>
                            <option value="Civil">Civil Engineering</option>
                            <option value="Electronics">Electronics & Communication</option>
                          </Form.Select>
                        </Form.Group>
                        
                        {role === 'student' && (
                          <Form.Group className="mb-4">
                            <Form.Label>Year of Study</Form.Label>
                            <Form.Select 
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                            >
                              <option value="">Select Year</option>
                              <option value="1st Year">1st Year</option>
                              <option value="2nd Year">2nd Year</option>
                              <option value="3rd Year">3rd Year</option>
                              <option value="4th Year">4th Year</option>
                            </Form.Select>
                          </Form.Group>
                        )}
                        
                        <Button 
                          variant="primary" 
                          type="submit" 
                          className="w-100 py-2"
                          disabled={loading}
                        >
                          {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                      </Form>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
            
            <div className="text-center mt-4 text-muted">
              <small>&copy; 2025 SVIT College, Andhra Pradesh. All rights reserved.</small>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;