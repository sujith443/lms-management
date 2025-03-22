import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Tab, Nav, Badge } from 'react-bootstrap';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { currentUser, isFaculty } = useAuth();
  
  const [profileData, setProfileData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    department: currentUser?.department || '',
    year: currentUser?.year || '',
    bio: currentUser?.bio || '',
    profilePic: currentUser?.profilePic || '/assets/images/default-avatar.png',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    state: currentUser?.state || '',
    country: currentUser?.country || '',
    postalCode: currentUser?.postalCode || '',
    dateOfBirth: currentUser?.dateOfBirth || '',
    gender: currentUser?.gender || '',
    enrollmentNumber: currentUser?.enrollmentNumber || '',
    rollNumber: currentUser?.rollNumber || '',
    admissionYear: currentUser?.admissionYear || '',
    graduationYear: currentUser?.graduationYear || ''
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    assignmentReminders: true,
    courseAnnouncements: true,
    gradeUpdates: true,
    discussionReplies: true,
    systemAnnouncements: false
  });
  
  const [profileError, setProfileError] = useState('');
  const [profileSuccess, setProfileSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [notificationSuccess, setNotificationSuccess] = useState('');
  
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  const handleNotificationChange = (e) => {
    const { name, checked } = e.target;
    setNotificationSettings({
      ...notificationSettings,
      [name]: checked
    });
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setProfileError('');
    setProfileSuccess('');
    
    // Simulate form validation
    if (!profileData.name.trim()) {
      setProfileError('Name is required');
      return;
    }
    
    if (!profileData.email.trim()) {
      setProfileError('Email is required');
      return;
    }
    
    // Simulate API call to update profile
    setTimeout(() => {
      setProfileSuccess('Profile updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setProfileSuccess('');
      }, 3000);
    }, 1000);
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');
    
    // Simulate form validation
    if (!passwordData.currentPassword) {
      setPasswordError('Current password is required');
      return;
    }
    
    if (!passwordData.newPassword) {
      setPasswordError('New password is required');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long');
      return;
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    
    // Simulate API call to update password
    setTimeout(() => {
      setPasswordSuccess('Password updated successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setPasswordSuccess('');
      }, 3000);
    }, 1000);
  };
  
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API call to update notification settings
    setTimeout(() => {
      setNotificationSuccess('Notification settings updated successfully!');
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setNotificationSuccess('');
      }, 3000);
    }, 1000);
  };
  
  return (
    <div className="profile-page min-vh-100 d-flex flex-column">
      <Header />
      
      <Container fluid className="flex-grow-1 py-4">
        <Container>
          <h2 className="mb-4">My Profile</h2>
          
          <Row>
            <Col lg={3} md={4} className="mb-4">
              <Card className="border-0 shadow-sm text-center">
                <Card.Body>
                  <div className="mb-3">
                    <img 
                      src={profileData.profilePic} 
                      alt={profileData.name}
                      className="rounded-circle img-thumbnail"
                      width="120"
                      height="120"
                    />
                  </div>
                  <h5 className="mb-1">{profileData.name}</h5>
                  <p className="text-muted mb-2">{isFaculty() ? 'Faculty' : 'Student'}</p>
                  <Badge bg="primary" className="mb-3">
                    {profileData.department}
                  </Badge>
                  <div className="d-grid gap-2">
                    <Button variant="outline-primary" size="sm">
                      <i className="bi bi-upload me-2"></i>
                      Change Photo
                    </Button>
                  </div>
                </Card.Body>
              </Card>
              
              <Card className="border-0 shadow-sm mt-4">
                <Card.Body>
                  <h6 className="mb-3">Student Information</h6>
                  <div className="mb-2 d-flex justify-content-between">
                    <span className="text-muted">ID:</span>
                    <span>{currentUser?.id || 'N/A'}</span>
                  </div>
                  <div className="mb-2 d-flex justify-content-between">
                    <span className="text-muted">Role:</span>
                    <span>{isFaculty() ? 'Faculty' : 'Student'}</span>
                  </div>
                  <div className="mb-2 d-flex justify-content-between">
                    <span className="text-muted">Department:</span>
                    <span>{profileData.department || 'N/A'}</span>
                  </div>
                  {!isFaculty() && (
                    <div className="mb-2 d-flex justify-content-between">
                      <span className="text-muted">Year:</span>
                      <span>{profileData.year || 'N/A'}</span>
                    </div>
                  )}
                  <div className="mb-2 d-flex justify-content-between">
                    <span className="text-muted">Joined:</span>
                    <span>{profileData.admissionYear || '2023'}</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            
            <Col lg={9} md={8}>
              <Card className="border-0 shadow-sm">
                <Card.Body className="p-0">
                  <Tab.Container defaultActiveKey="profile">
                    <Nav variant="tabs" className="px-3 pt-2">
                      <Nav.Item>
                        <Nav.Link eventKey="profile">Personal Info</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="academic">Academic Info</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="password">Change Password</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="notifications">Notifications</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    
                    <Tab.Content className="p-4">
                      {/* Profile Tab */}
                      <Tab.Pane eventKey="profile">
                        <h5 className="mb-4">Personal Information</h5>
                        
                        {profileError && (
                          <Alert variant="danger" onClose={() => setProfileError('')} dismissible>
                            {profileError}
                          </Alert>
                        )}
                        
                        {profileSuccess && (
                          <Alert variant="success">
                            {profileSuccess}
                          </Alert>
                        )}
                        
                        <Form onSubmit={handleProfileSubmit}>
                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="formName">
                                <Form.Label>Full Name</Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="name"
                                  placeholder="Enter your full name"
                                  value={profileData.name}
                                  onChange={handleProfileChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control 
                                  type="email"
                                  name="email"
                                  placeholder="Enter your email"
                                  value={profileData.email}
                                  onChange={handleProfileChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formPhone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control 
                                  type="tel"
                                  name="phone"
                                  placeholder="Enter your phone number"
                                  value={profileData.phone}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formDateOfBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control 
                                  type="date"
                                  name="dateOfBirth"
                                  value={profileData.dateOfBirth}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Select
                                  name="gender"
                                  value={profileData.gender}
                                  onChange={handleProfileChange}
                                >
                                  <option value="">Select Gender</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                  <option value="prefer_not_to_say">Prefer not to say</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="address"
                                  placeholder="Enter your address"
                                  value={profileData.address}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="city"
                                  placeholder="Enter your city"
                                  value={profileData.city}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formState">
                                <Form.Label>State/Province</Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="state"
                                  placeholder="Enter your state/province"
                                  value={profileData.state}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="country"
                                  placeholder="Enter your country"
                                  value={profileData.country}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formPostalCode">
                                <Form.Label>Postal Code</Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="postalCode"
                                  placeholder="Enter your postal code"
                                  value={profileData.postalCode}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={12}>
                              <Form.Group controlId="formBio">
                                <Form.Label>Bio</Form.Label>
                                <Form.Control 
                                  as="textarea"
                                  rows={3}
                                  name="bio"
                                  placeholder="Tell us about yourself"
                                  value={profileData.bio}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={12} className="mt-4">
                              <div className="d-flex justify-content-end">
                                <Button variant="secondary" className="me-2">
                                  Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                  Save Changes
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Tab.Pane>
                      
                      {/* Academic Tab */}
                      <Tab.Pane eventKey="academic">
                        <h5 className="mb-4">Academic Information</h5>
                        
                        {profileError && (
                          <Alert variant="danger" onClose={() => setProfileError('')} dismissible>
                            {profileError}
                          </Alert>
                        )}
                        
                        {profileSuccess && (
                          <Alert variant="success">
                            {profileSuccess}
                          </Alert>
                        )}
                        
                        <Form onSubmit={handleProfileSubmit}>
                          <Row className="g-3">
                            <Col md={6}>
                              <Form.Group controlId="formDepartment">
                                <Form.Label>Department</Form.Label>
                                <Form.Select
                                  name="department"
                                  value={profileData.department}
                                  onChange={handleProfileChange}
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
                            </Col>
                            
                            {!isFaculty() && (
                              <Col md={6}>
                                <Form.Group controlId="formYear">
                                  <Form.Label>Year of Study</Form.Label>
                                  <Form.Select
                                    name="year"
                                    value={profileData.year}
                                    onChange={handleProfileChange}
                                  >
                                    <option value="">Select Year</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                  </Form.Select>
                                </Form.Group>
                              </Col>
                            )}
                            
                            {!isFaculty() && (
                              <>
                                <Col md={6}>
                                  <Form.Group controlId="formEnrollmentNumber">
                                    <Form.Label>Enrollment Number</Form.Label>
                                    <Form.Control 
                                      type="text"
                                      name="enrollmentNumber"
                                      placeholder="Enter your enrollment number"
                                      value={profileData.enrollmentNumber}
                                      onChange={handleProfileChange}
                                    />
                                  </Form.Group>
                                </Col>
                                
                                <Col md={6}>
                                  <Form.Group controlId="formRollNumber">
                                    <Form.Label>Roll Number</Form.Label>
                                    <Form.Control 
                                      type="text"
                                      name="rollNumber"
                                      placeholder="Enter your roll number"
                                      value={profileData.rollNumber}
                                      onChange={handleProfileChange}
                                    />
                                  </Form.Group>
                                </Col>
                              </>
                            )}
                            
                            <Col md={6}>
                              <Form.Group controlId="formAdmissionYear">
                                <Form.Label>
                                  {isFaculty() ? 'Joining Year' : 'Admission Year'}
                                </Form.Label>
                                <Form.Control 
                                  type="text"
                                  name="admissionYear"
                                  placeholder="Enter year"
                                  value={profileData.admissionYear}
                                  onChange={handleProfileChange}
                                />
                              </Form.Group>
                            </Col>
                            
                            {!isFaculty() && (
                              <Col md={6}>
                                <Form.Group controlId="formGraduationYear">
                                  <Form.Label>Expected Graduation Year</Form.Label>
                                  <Form.Control 
                                    type="text"
                                    name="graduationYear"
                                    placeholder="Enter graduation year"
                                    value={profileData.graduationYear}
                                    onChange={handleProfileChange}
                                  />
                                </Form.Group>
                              </Col>
                            )}
                            
                            <Col md={12} className="mt-4">
                              <div className="d-flex justify-content-end">
                                <Button variant="secondary" className="me-2">
                                  Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                  Save Changes
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Tab.Pane>
                      
                      {/* Password Tab */}
                      <Tab.Pane eventKey="password">
                        <h5 className="mb-4">Change Password</h5>
                        
                        {passwordError && (
                          <Alert variant="danger" onClose={() => setPasswordError('')} dismissible>
                            {passwordError}
                          </Alert>
                        )}
                        
                        {passwordSuccess && (
                          <Alert variant="success">
                            {passwordSuccess}
                          </Alert>
                        )}
                        
                        <Form onSubmit={handlePasswordSubmit}>
                          <Row className="g-3">
                            <Col md={12}>
                              <Form.Group controlId="formCurrentPassword">
                                <Form.Label>Current Password</Form.Label>
                                <Form.Control 
                                  type="password"
                                  name="currentPassword"
                                  placeholder="Enter your current password"
                                  value={passwordData.currentPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formNewPassword">
                                <Form.Label>New Password</Form.Label>
                                <Form.Control 
                                  type="password"
                                  name="newPassword"
                                  placeholder="Enter new password"
                                  value={passwordData.newPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                                <Form.Text className="text-muted">
                                  Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                                </Form.Text>
                              </Form.Group>
                            </Col>
                            
                            <Col md={6}>
                              <Form.Group controlId="formConfirmPassword">
                                <Form.Label>Confirm New Password</Form.Label>
                                <Form.Control 
                                  type="password"
                                  name="confirmPassword"
                                  placeholder="Confirm new password"
                                  value={passwordData.confirmPassword}
                                  onChange={handlePasswordChange}
                                  required
                                />
                              </Form.Group>
                            </Col>
                            
                            <Col md={12} className="mt-4">
                              <div className="d-flex justify-content-end">
                                <Button variant="secondary" className="me-2">
                                  Cancel
                                </Button>
                                <Button variant="primary" type="submit">
                                  Update Password
                                </Button>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </Tab.Pane>
                      
                      {/* Notifications Tab */}
                      <Tab.Pane eventKey="notifications">
                        <h5 className="mb-4">Notification Settings</h5>
                        
                        {notificationSuccess && (
                          <Alert variant="success">
                            {notificationSuccess}
                          </Alert>
                        )}
                        
                        <Form onSubmit={handleNotificationSubmit}>
                          <h6 className="text-muted mb-3">Email Notifications</h6>
                          
                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id="emailNotifications"
                              name="emailNotifications"
                              label="Enable email notifications"
                              checked={notificationSettings.emailNotifications}
                              onChange={handleNotificationChange}
                            />
                            <Form.Text className="text-muted">
                              Receive notifications via email
                            </Form.Text>
                          </Form.Group>
                          
                          <hr className="my-4" />
                          
                          <h6 className="text-muted mb-3">Course Notifications</h6>
                          
                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id="assignmentReminders"
                              name="assignmentReminders"
                              label="Assignment reminders"
                              checked={notificationSettings.assignmentReminders}
                              onChange={handleNotificationChange}
                            />
                            <Form.Text className="text-muted">
                              Receive reminders about upcoming assignments and deadlines
                            </Form.Text>
                          </Form.Group>
                          
                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id="courseAnnouncements"
                              name="courseAnnouncements"
                              label="Course announcements"
                              checked={notificationSettings.courseAnnouncements}
                              onChange={handleNotificationChange}
                            />
                            <Form.Text className="text-muted">
                              Receive notifications about new announcements in your courses
                            </Form.Text>
                          </Form.Group>
                          
                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id="gradeUpdates"
                              name="gradeUpdates"
                              label="Grade updates"
                              checked={notificationSettings.gradeUpdates}
                              onChange={handleNotificationChange}
                            />
                            <Form.Text className="text-muted">
                              Receive notifications when grades are posted or updated
                            </Form.Text>
                          </Form.Group>
                          
                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id="discussionReplies"
                              name="discussionReplies"
                              label="Discussion replies"
                              checked={notificationSettings.discussionReplies}
                              onChange={handleNotificationChange}
                            />
                            <Form.Text className="text-muted">
                              Receive notifications when someone replies to your discussion posts
                            </Form.Text>
                          </Form.Group>
                          
                          <hr className="my-4" />
                          
                          <h6 className="text-muted mb-3">System Notifications</h6>
                          
                          <Form.Group className="mb-3">
                            <Form.Check 
                              type="switch"
                              id="systemAnnouncements"
                              name="systemAnnouncements"
                              label="System announcements"
                              checked={notificationSettings.systemAnnouncements}
                              onChange={handleNotificationChange}
                            />
                            <Form.Text className="text-muted">
                              Receive notifications about system updates and maintenance
                            </Form.Text>
                          </Form.Group>
                          
                          <div className="d-flex justify-content-end mt-4">
                            <Button variant="secondary" className="me-2">
                              Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                              Save Preferences
                            </Button>
                          </div>
                        </Form>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;