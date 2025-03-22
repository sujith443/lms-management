import React, { useEffect } from 'react';
import { Container, Row, Col, Button, Card, Nav, Navbar, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Footer from '../components/common/Footer';

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);
  
  return (
    <div className="home-page d-flex flex-column min-vh-100">
      {/* Navigation */}
      <Navbar expand="lg" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <img
              src="/assets/images/logo.png"
              width="40"
              height="40"
              className="d-inline-block align-top me-2"
              alt="SVIT College Logo"
            />
            <span className="fw-bold text-primary">SVIT LMS</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#features" className="mx-2">Features</Nav.Link>
              <Nav.Link href="#benefits" className="mx-2">Benefits</Nav.Link>
              <Nav.Link href="#testimonials" className="mx-2">Testimonials</Nav.Link>
              <Nav.Link href="#faq" className="mx-2">FAQ</Nav.Link>
              <Nav.Link as={Link} to="/login" className="mx-2">
                <Button variant="outline-primary">Login</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="mx-2">
                <Button variant="primary">Register</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* Hero Section */}
      <section className="py-5 bg-primary text-white">
        <Container>
          <Row className="align-items-center py-5">
            <Col lg={6} className="mb-5 mb-lg-0">
              <Badge bg="light" text="dark" className="mb-3 px-3 py-2 fs-6">
                Learning Management System
              </Badge>
              <h1 className="display-4 fw-bold mb-4">Empowering Education at SVIT College</h1>
              <p className="lead mb-4">
                A comprehensive platform designed to store and organize important class materials 
                and videos for BTech students of Sri Venkateswara Institute of Technology.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} to="/register" variant="light" size="lg">
                  Get Started
                </Button>
                <Button as={Link} to="/login" variant="outline-light" size="lg">
                  Log In
                </Button>
              </div>
            </Col>
            <Col lg={6}>
              <img 
                src="https://source.unsplash.com/random/700x500/?college,education" 
                alt="Students using LMS" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Feature Section */}
      <section id="features" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-2 px-3 py-2">Features</Badge>
            <h2 className="display-5 fw-bold mb-3">Everything You Need In One Place</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Our learning management system provides a complete set of tools to enhance the 
              educational experience for both students and faculty.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon bg-primary bg-opacity-10 text-primary p-3 rounded-circle mx-auto mb-4">
                    <i className="bi bi-collection-play fs-1"></i>
                  </div>
                  <h4>Course Materials</h4>
                  <p className="text-muted mb-0">
                    Access lecture notes, videos, and supplementary materials in one place.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon bg-success bg-opacity-10 text-success p-3 rounded-circle mx-auto mb-4">
                    <i className="bi bi-calendar-check fs-1"></i>
                  </div>
                  <h4>Assignment Management</h4>
                  <p className="text-muted mb-0">
                    Submit assignments and track deadlines with automatic reminders.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon bg-info bg-opacity-10 text-info p-3 rounded-circle mx-auto mb-4">
                    <i className="bi bi-graph-up fs-1"></i>
                  </div>
                  <h4>Progress Tracking</h4>
                  <p className="text-muted mb-0">
                    Monitor your academic progress and performance in real-time.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={3}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4 text-center">
                  <div className="feature-icon bg-warning bg-opacity-10 text-warning p-3 rounded-circle mx-auto mb-4">
                    <i className="bi bi-chat-dots fs-1"></i>
                  </div>
                  <h4>Communication Tools</h4>
                  <p className="text-muted mb-0">
                    Interact with instructors and peers through discussion forums and messaging.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Benefits Section */}
      <section id="benefits" className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <img 
                src="https://source.unsplash.com/random/600x400/?students,technology" 
                alt="Students benefiting from LMS" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
            <Col lg={6}>
              <Badge bg="primary" className="mb-2 px-3 py-2">Benefits</Badge>
              <h2 className="display-5 fw-bold mb-4">Why Choose Our LMS?</h2>
              
              <div className="d-flex mb-4">
                <div className="me-4 bg-primary bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-lightning-charge text-primary fs-4"></i>
                </div>
                <div>
                  <h4>Enhanced Learning Experience</h4>
                  <p className="text-muted mb-0">
                    Access to organized course materials and interactive content
                    improves comprehension and retention.
                  </p>
                </div>
              </div>
              
              <div className="d-flex mb-4">
                <div className="me-4 bg-primary bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-clock text-primary fs-4"></i>
                </div>
                <div>
                  <h4>Flexibility & Convenience</h4>
                  <p className="text-muted mb-0">
                    Study at your own pace, anytime, anywhere with 24/7 access to course content.
                  </p>
                </div>
              </div>
              
              <div className="d-flex mb-4">
                <div className="me-4 bg-primary bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-people text-primary fs-4"></i>
                </div>
                <div>
                  <h4>Improved Communication</h4>
                  <p className="text-muted mb-0">
                    Direct access to instructors and peers enhances collaboration and support.
                  </p>
                </div>
              </div>
              
              <div className="d-flex">
                <div className="me-4 bg-primary bg-opacity-10 p-3 rounded-circle">
                  <i className="bi bi-graph-up-arrow text-primary fs-4"></i>
                </div>
                <div>
                  <h4>Better Performance Tracking</h4>
                  <p className="text-muted mb-0">
                    Real-time feedback and progress monitoring helps identify areas for improvement.
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-5">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-2 px-3 py-2">Testimonials</Badge>
            <h2 className="display-5 fw-bold mb-3">What Our Users Say</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Hear from students and faculty who have experienced the benefits of our learning management system.
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                      <img 
                        src="https://source.unsplash.com/random/100x100/?student,boy" 
                        alt="Student" 
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                      />
                      <div>
                        <h5 className="mb-0">Rahul Sharma</h5>
                        <p className="text-muted small mb-0">BTech CSE, 3rd Year</p>
                      </div>
                    </div>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <p className="mb-0">
                    "The LMS has transformed how I study. Having all materials in one place and being able
                    to access them anytime has significantly improved my academic performance."
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                      <img 
                        src="https://source.unsplash.com/random/100x100/?student,girl" 
                        alt="Student" 
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                      />
                      <div>
                        <h5 className="mb-0">Priya Patel</h5>
                        <p className="text-muted small mb-0">BTech ECE, 4th Year</p>
                      </div>
                    </div>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-half"></i>
                    </div>
                  </div>
                  <p className="mb-0">
                    "As a final year student, the LMS has been crucial for my project work. The ability to
                    collaborate with faculty and peers online has made remote work so much easier."
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={4}>
              <Card className="h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                      <img 
                        src="https://source.unsplash.com/random/100x100/?professor,man" 
                        alt="Professor" 
                        className="rounded-circle me-3"
                        width="60"
                        height="60"
                      />
                      <div>
                        <h5 className="mb-0">Dr. Venkatesh Rao</h5>
                        <p className="text-muted small mb-0">Professor, Computer Science</p>
                      </div>
                    </div>
                    <div className="text-warning">
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                      <i className="bi bi-star-fill"></i>
                    </div>
                  </div>
                  <p className="mb-0">
                    "From a faculty perspective, the LMS has streamlined course management. Uploading materials,
                    grading assignments, and communicating with students is now more efficient than ever."
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-5 bg-light">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="mb-2 px-3 py-2">FAQ</Badge>
            <h2 className="display-5 fw-bold mb-3">Frequently Asked Questions</h2>
            <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
              Find answers to common questions about our learning management system.
            </p>
          </div>
          
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="accordion" id="faqAccordion">
                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq1"
                    >
                      How do I access the LMS?
                    </button>
                  </h2>
                  <div id="faq1" className="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      You can access the SVIT LMS by visiting the website and logging in with your college-provided credentials. 
                      New students will receive login details during orientation. If you've forgotten your password, 
                      use the "Forgot Password" link on the login page.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq2"
                    >
                      What can I access through the LMS?
                    </button>
                  </h2>
                  <div id="faq2" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      The LMS provides access to course materials, lecture videos, assignments, quizzes, grades, 
                      discussion forums, and announcements. You can also communicate with instructors and peers, 
                      submit assignments, and track your academic progress.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq3"
                    >
                      Can I access the LMS on my mobile device?
                    </button>
                  </h2>
                  <div id="faq3" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Yes, the SVIT LMS is fully responsive and can be accessed from any device with an internet connection, 
                      including smartphones and tablets. This allows you to study on-the-go and stay updated with course activities.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border-0 shadow-sm mb-3">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq4"
                    >
                      Who should I contact for technical issues?
                    </button>
                  </h2>
                  <div id="faq4" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      For technical issues or questions about the LMS, please contact the IT Support Team at 
                      support@svit.edu or visit the IT Help Desk located in the Main Building, Room 105. 
                      Support is available Monday through Friday from 9:00 AM to 5:00 PM.
                    </div>
                  </div>
                </div>
                
                <div className="accordion-item border-0 shadow-sm">
                  <h2 className="accordion-header">
                    <button 
                      className="accordion-button collapsed" 
                      type="button" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#faq5"
                    >
                      How do faculty members upload course materials?
                    </button>
                  </h2>
                  <div id="faq5" className="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                    <div className="accordion-body">
                      Faculty members can upload course materials through the Faculty Portal. After logging in, 
                      navigate to the specific course, select "Upload Materials," choose the file, add relevant details, 
                      and submit. The system supports various file formats including PDFs, videos, and presentations.
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
      {/* CTA Section */}
      <section className="py-5 bg-primary text-white text-center">
        <Container>
          <h2 className="display-5 fw-bold mb-4">Ready to Enhance Your Learning Experience?</h2>
          <p className="lead mb-4 mx-auto" style={{ maxWidth: '700px' }}>
            Join SVIT's Learning Management System today and transform the way you learn and teach.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/register" variant="light" size="lg">
              Create Account
            </Button>
            <Button as={Link} to="/login" variant="outline-light" size="lg">
              Log In
            </Button>
          </div>
        </Container>
      </section>
      
      <Footer />
    </div>
  );
};

export default HomePage;