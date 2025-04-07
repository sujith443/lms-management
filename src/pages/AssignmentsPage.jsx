// src/pages/AssignmentsPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, Button, Spinner, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const AssignmentsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Mock assignments data
          const mockAssignments = [
            {
              id: 1,
              title: 'Assignment 1: Data Structures Implementation',
              course: 'Data Structures',
              courseCode: 'CS301',
              dueDate: '2025-04-15T23:59:00',
              status: 'completed',
              submissionDate: '2025-04-12T14:30:00',
              grade: 92,
              totalPoints: 100,
              instructor: 'Dr. Ramesh Kumar'
            },
            {
              id: 2,
              title: 'Assignment 2: Normalization in Database Design',
              course: 'Database Systems',
              courseCode: 'CS302',
              dueDate: '2025-04-20T23:59:00',
              status: 'in_progress',
              submissionDate: null,
              grade: null,
              totalPoints: 100,
              instructor: 'Dr. Priya Singh'
            },
            {
              id: 3,
              title: 'Assignment 3: Network Security Analysis',
              course: 'Computer Network Security',
              courseCode: 'CS401',
              dueDate: '2025-04-25T23:59:00',
              status: 'pending',
              submissionDate: null,
              grade: null,
              totalPoints: 100,
              instructor: 'Dr. Ramesh Kumar'
            },
            {
              id: 4,
              title: 'Assignment 1: Software Engineering Principles',
              course: 'Software Engineering',
              courseCode: 'CS304',
              dueDate: '2025-04-10T23:59:00',
              status: 'overdue',
              submissionDate: null,
              grade: null,
              totalPoints: 100,
              instructor: 'Dr. Lakshmi Rao'
            },
            {
              id: 5,
              title: 'Quiz 1: Computer Networks Fundamentals',
              course: 'Computer Networks',
              courseCode: 'CS303',
              dueDate: '2025-04-05T23:59:00',
              status: 'completed',
              submissionDate: '2025-04-05T13:25:00',
              grade: 85,
              totalPoints: 100,
              instructor: 'Prof. Suresh Reddy'
            }
          ];
          
          setAssignments(mockAssignments);
          setFilteredAssignments(mockAssignments);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching assignments:', error);
        setLoading(false);
      }
    };
    
    fetchAssignments();
  }, []);
  
  // Filter assignments based on search and filter criteria
  useEffect(() => {
    if (assignments.length > 0) {
      let filtered = [...assignments];
      
      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(assignment => 
          assignment.title.toLowerCase().includes(query) || 
          assignment.course.toLowerCase().includes(query) ||
          assignment.courseCode.toLowerCase().includes(query)
        );
      }
      
      // Apply status filter
      if (filterStatus !== 'all') {
        filtered = filtered.filter(assignment => assignment.status === filterStatus);
      }
      
      setFilteredAssignments(filtered);
    }
  }, [assignments, searchQuery, filterStatus]);
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'in_progress':
        return <Badge bg="primary">In Progress</Badge>;
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'overdue':
        return <Badge bg="danger">Overdue</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="assignments-page d-flex">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="content-wrapper flex-grow-1 min-vh-100 d-flex flex-column" style={{ marginLeft: sidebarCollapsed ? '70px' : '260px' }}>
        <Header toggleSidebar={toggleSidebar} />
        
        <Container fluid className="flex-grow-1 py-4">
          <Container>
            <Row className="mb-4">
              <Col>
                <h2 className="mb-1">My Assignments</h2>
                <p className="text-muted">
                  View and manage all your course assignments
                </p>
              </Col>
            </Row>
            
            {/* Search and Filter */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={6}>
                    <InputGroup>
                      <InputGroup.Text className="bg-white">
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control 
                        placeholder="Search assignments by title or course" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">All Assignments</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">Overdue</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <div className="d-grid">
                      <Button variant="outline-primary">
                        <i className="bi bi-funnel me-2"></i>
                        More Filters
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            {/* Assignments List */}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading assignments...</p>
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  {filteredAssignments.length > 0 ? (
                    <div className="table-responsive">
                      <Table hover className="align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th>Assignment</th>
                            <th>Course</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Grade</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredAssignments.map(assignment => (
                            <tr key={assignment.id}>
                              <td>
                                <div>
                                  <p className="mb-0 fw-medium">{assignment.title}</p>
                                  <small className="text-muted">Instructor: {assignment.instructor}</small>
                                </div>
                              </td>
                              <td>
                                <Badge bg="light" text="dark">{assignment.courseCode}</Badge>
                                <div className="mt-1">{assignment.course}</div>
                              </td>
                              <td>{formatDate(assignment.dueDate)}</td>
                              <td>{getStatusBadge(assignment.status)}</td>
                              <td>
                                {assignment.grade !== null ? (
                                  <span className={assignment.grade >= 80 ? 'text-success' : 
                                                  assignment.grade >= 60 ? 'text-warning' : 'text-danger'}>
                                    {assignment.grade}/{assignment.totalPoints}
                                  </span>
                                ) : (
                                  'Not graded'
                                )}
                              </td>
                              <td>
                                <Button 
                                  variant="outline-primary" 
                                  size="sm" 
                                  as={Link} 
                                  to={`/assignments/${assignment.id}`}
                                >
                                  {assignment.status === 'completed' ? 'View Submission' : 'View Details'}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-clipboard-x fs-1 text-muted mb-3"></i>
                      <h4>No assignments found</h4>
                      <p className="text-muted">
                        {searchQuery || filterStatus !== 'all' ? 
                          'Try adjusting your search or filter criteria' : 
                          'You don\'t have any assignments yet'}
                      </p>
                      {(searchQuery || filterStatus !== 'all') && (
                        <Button variant="primary" onClick={() => {
                          setSearchQuery('');
                          setFilterStatus('all');
                        }}>
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  )}
                </Card.Body>
              </Card>
            )}
          </Container>
        </Container>
        
        <Footer />
      </div>
    </div>
  );
};

export default AssignmentsPage;