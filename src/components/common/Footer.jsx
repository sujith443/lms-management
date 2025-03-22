import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <div className="mb-3 d-flex align-items-center">
              <img
                src="/assets/images/logo.png"
                width="40"
                height="40"
                className="d-inline-block align-top me-2"
                alt="SVIT College Logo"
              />
              <h5 className="mb-0">SVIT Learning Management System</h5>
            </div>
            <p className="text-muted mb-0">
              Sri Venkateswara Institute of Technology
              <br />
              Andhra Pradesh, South India
            </p>
          </Col>
          
          <Col md={2}>
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to="/dashboard" className="text-decoration-none text-muted">Dashboard</Link>
              </li>
              <li className="mb-2">
                <Link to="/courses" className="text-decoration-none text-muted">Courses</Link>
              </li>
              <li className="mb-2">
                <Link to="/materials" className="text-decoration-none text-muted">Materials</Link>
              </li>
              <li className="mb-2">
                <Link to="/profile" className="text-decoration-none text-muted">Profile</Link>
              </li>
            </ul>
          </Col>
          
          <Col md={2}>
            <h6 className="mb-3">Support</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">FAQs</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Feedback</a>
              </li>
            </ul>
          </Col>
          
          <Col md={4}>
            <h6 className="mb-3">Connect With Us</h6>
            <div className="d-flex mb-3">
              <a href="#" className="text-decoration-none text-white me-3">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-white me-3">
                <i className="bi bi-twitter fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-white me-3">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-white me-3">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-decoration-none text-white">
                <i className="bi bi-youtube fs-5"></i>
              </a>
            </div>
            <p className="text-muted small mb-2">Subscribe to our newsletter</p>
            <div className="input-group">
              <input 
                type="email" 
                className="form-control form-control-sm" 
                placeholder="Enter your email" 
              />
              <button className="btn btn-primary btn-sm" type="button">
                Subscribe
              </button>
            </div>
          </Col>
        </Row>
        
        <hr className="mt-4 mb-3 border-secondary" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="text-muted small mb-md-0">
            &copy; {currentYear} SVIT College. All rights reserved.
          </p>
          <div className="d-flex">
            <a href="#" className="text-decoration-none text-muted small me-3">
              Privacy Policy
            </a>
            <a href="#" className="text-decoration-none text-muted small me-3">
              Terms of Service
            </a>
            <a href="#" className="text-decoration-none text-muted small">
              Accessibility
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;