import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button, Badge, ListGroup, ProgressBar, Breadcrumb, Spinner } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useAuth } from '../contexts/AuthContext';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  const { currentUser, isFaculty } = useAuth();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [activeTab, setActiveTab] = useState('content');
  
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // In a real app, this would be an API call to fetch course details
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Mock course details
          const mockCourse = {
            id: courseId,
            code: 'CS301',
            title: 'Data Structures',
            description: 'This course introduces fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs. Students will learn to implement these structures and apply them to solve various computational problems.',
            instructor: 'Dr. Ramesh Kumar',
            schedule: 'Mon, Wed, Fri - 10:00 AM to 11:30 AM',
            location: 'Lecture Hall 3, CS Building',
            startDate: 'Jan 15, 2025',
            endDate: 'May 10, 2025',
            progress: 65,
            enrollment: 42,
            coverImage: 'https://source.unsplash.com/random/1200x400/?programming',
            announcements: [
              {
                id: 1,
                title: 'Mid-term Examination',
                content: 'The mid-term examination will be held on April 5th. It will cover all topics discussed up to Week 6.',
                date: 'Mar 15, 2025',
                author: 'Dr. Ramesh Kumar'
              },
              {
                id: 2,
                title: 'Assignment 3 Extended',
                content: 'The deadline for Assignment 3 has been extended to March 28th due to the technical issues with the submission portal.',
                date: 'Mar 22, 2025',
                author: 'Dr. Ramesh Kumar'
              }
            ],
            modules: [
              {
                id: 1,
                title: 'Introduction to Data Structures',
                description: 'Basic concepts and importance of data structures',
                status: 'completed',
                progress: 100,
                materials: [
                  {
                    id: 1,
                    title: 'Lecture 1: Introduction to Data Structures',
                    type: 'video',
                    duration: '45 min',
                    status: 'completed'
                  },
                  {
                    id: 2,
                    title: 'Lecture Notes: Introduction to Data Structures',
                    type: 'pdf',
                    status: 'completed'
                  },
                  {
                    id: 3,
                    title: 'Quiz 1: Basic Concepts',
                    type: 'quiz',
                    status: 'completed',
                    score: '90%'
                  }
                ]
              },
              {
                id: 2,
                title: 'Arrays and Linked Lists',
                description: 'Implementation and applications of arrays and linked lists',
                status: 'in-progress',
                progress: 75,
                materials: [
                  {
                    id: 4,
                    title: 'Lecture 2: Arrays and Their Applications',
                    type: 'video',
                    duration: '50 min',
                    status: 'completed'
                  },
                  {
                    id: 5,
                    title: 'Lecture 3: Linked Lists',
                    type: 'video',
                    duration: '55 min',
                    status: 'completed'
                  },
                  {
                    id: 6,
                    title: 'Programming Assignment 1: Array Manipulations',
                    type: 'assignment',
                    status: 'completed',
                    dueDate: 'Feb 25, 2025',
                    score: '85%'
                  },
                  {
                    id: 7,
                    title: 'Programming Assignment 2: Linked List Implementation',
                    type: 'assignment',
                    status: 'in-progress',
                    dueDate: 'Mar 30, 2025'
                  }
                ]
              },
              {
                id: 3,
                title: 'Stacks and Queues',
                description: 'Implementation and applications of stacks and queues',
                status: 'in-progress',
                progress: 40,
                materials: [
                  {
                    id: 8,
                    title: 'Lecture 4: Stacks and Their Applications',
                    type: 'video',
                    duration: '45 min',
                    status: 'completed'
                  },
                  {
                    id: 9,
                    title: 'Lecture 5: Queues and Their Applications',
                    type: 'video',
                    duration: '48 min',
                    status: 'not-started'
                  },
                  {
                    id: 10,
                    title: 'Lab Exercise: Implementing Stack and Queue',
                    type: 'lab',
                    status: 'not-started',
                    dueDate: 'Apr 5, 2025'
                  }
                ]
              },
              {
                id: 4,
                title: 'Trees and Graphs',
                description: 'Implementation and traversal algorithms for trees and graphs',
                status: 'locked',
                progress: 0,
                materials: [
                  {
                    id: 11,
                    title: 'Lecture 6: Binary Trees',
                    type: 'video',
                    duration: '55 min',
                    status: 'locked'
                  },
                  {
                    id: 12,
                    title: 'Lecture 7: Graph Representation',
                    type: 'video',
                    duration: '50 min',
                    status: 'locked'
                  },
                  {
                    id: 13,
                    title: 'Lecture 8: Graph Traversal Algorithms',
                    type: 'video',
                    duration: '60 min',
                    status: 'locked'
                  },
                  {
                    id: 14,
                    title: 'Programming Assignment 3: Tree Implementation',
                    type: 'assignment',
                    status: 'locked',
                    dueDate: 'Apr 20, 2025'
                  }
                ]
              }
            ],
            assignments: [
              {
                id: 1,
                title: 'Assignment 1: Array Manipulations',
                dueDate: 'Feb 25, 2025',
                status: 'completed',
                score: '85%'
              },
              {
                id: 2,
                title: 'Assignment 2: Linked List Implementation',
                dueDate: 'Mar 30, 2025',
                status: 'in-progress'
              },
              {
                id: 3,
                title: 'Assignment 3: Tree Implementation',
                dueDate: 'Apr 20, 2025',
                status: 'not-started'
              }
            ],
            grades: {
              assignments: {
                weight: 30,
                score: 85
              },
              quizzes: {
                weight: 20,
                score: 90
              },
              midterm: {
                weight: 20,
                score: null
              },
              final: {
                weight: 30,
                score: null
              },
              currentGrade: 'B+'
            }
          };
          
          setCourse(mockCourse);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setLoading(false);
      }
    };
    
    fetchCourseDetails();
  }, [courseId]);
  
  const getStatusBadge = (status) => {
    switch(status) {
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      case 'in-progress':
        return <Badge bg="warning">In Progress</Badge>;
      case 'not-started':
        return <Badge bg="secondary">Not Started</Badge>;
      case 'locked':
        return <Badge bg="light" text="dark">Locked</Badge>;
      default:
        return <Badge bg="primary">{status}</Badge>;
    }
  };
  
  const getMaterialIcon = (type) => {
    switch(type) {
      case 'video':
        return <i className="bi bi-play-circle-fill text-danger me-2"></i>;
      case 'pdf':
        return <i className="bi bi-file-pdf-fill text-danger me-2"></i>;
      case 'quiz':
        return <i className="bi bi-question-circle-fill text-info me-2"></i>;
      case 'assignment':
        return <i className="bi bi-file-earmark-text-fill text-primary me-2"></i>;
      case 'lab':
        return <i className="bi bi-laptop-fill text-success me-2"></i>;
      default:
        return <i className="bi bi-file-earmark-fill text-secondary me-2"></i>;
    }
  };
  
  return (
    <div className="course-detail-page min-vh-100 d-flex flex-column">
      <Header />
      
      <Container fluid className="flex-grow-1 py-4">
        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading course details...</p>
          </div>
        ) : (
          <>
            {/* Course Header/Banner */}
            <div 
              className="course-banner mb-4 rounded position-relative" 
              style={{ 
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${course.coverImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '200px'
              }}
            >
              <Container className="h-100 d-flex flex-column justify-content-center text-white">
                <div className="mb-2">
                  <Breadcrumb className="mb-0 text-white-50">
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }} className="text-white-50">
                      Dashboard
                    </Breadcrumb.Item>
                    <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/courses" }} className="text-white-50">
                      Courses
                    </Breadcrumb.Item>
                    <Breadcrumb.Item active className="text-white">
                      {course.code}
                    </Breadcrumb.Item>
                  </Breadcrumb>
                  
                  <Badge bg="light" text="dark" className="me-2">
                    {course.code}
                  </Badge>
                </div>
                <h2 className="mb-1">{course.title}</h2>
                <p className="mb-0">Instructor: {course.instructor}</p>
              </Container>
            </div>
            
            <Container>
              <Row>
                {/* Course Content and Tabs */}
                <Col lg={8}>
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Header className="bg-white border-bottom-0 pt-3 pb-0">
                      <Nav variant="tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                        <Nav.Item>
                          <Nav.Link eventKey="content">Content</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="announcements">Announcements</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="assignments">Assignments</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="grades">Grades</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Header>
                    <Card.Body>
                      <Tab.Content>
                        {/* Course Content Tab */}
                        <Tab.Pane eventKey="content" active={activeTab === 'content'}>
                          <div className="mb-4">
                            <h5>Course Description</h5>
                            <p>{course.description}</p>
                          </div>
                          
                          <div className="mb-4">
                            <h5>Course Modules</h5>
                            <div className="accordion" id="moduleAccordion">
                              {course.modules.map((module, index) => (
                                <div className="accordion-item border mb-3 rounded shadow-sm" key={module.id}>
                                  <h2 className="accordion-header">
                                    <button 
                                      className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                                      type="button" 
                                      data-bs-toggle="collapse" 
                                      data-bs-target={`#module${module.id}`}
                                      aria-expanded={index === 0 ? 'true' : 'false'} 
                                      aria-controls={`module${module.id}`}
                                    >
                                      <div className="d-flex justify-content-between align-items-center w-100 pe-3">
                                        <div>
                                          <strong>Module {index + 1}: {module.title}</strong>
                                          <div className="small text-muted">{module.description}</div>
                                        </div>
                                        <div className="d-flex align-items-center">
                                          {getStatusBadge(module.status)}
                                          <div className="ms-3" style={{ width: '60px' }}>
                                            <ProgressBar 
                                              now={module.progress} 
                                              variant={
                                                module.progress === 100 ? "success" :
                                                module.progress > 0 ? "primary" : "secondary"
                                              } 
                                              className="mb-0"
                                            />
                                            <div className="text-center small">{module.progress}%</div>
                                          </div>
                                        </div>
                                      </div>
                                    </button>
                                  </h2>
                                  <div 
                                    id={`module${module.id}`} 
                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                    data-bs-parent="#moduleAccordion"
                                  >
                                    <div className="accordion-body">
                                      <ListGroup variant="flush">
                                        {module.materials.map(material => (
                                          <ListGroup.Item key={material.id} className="py-3 d-flex justify-content-between align-items-center">
                                            <div>
                                              <div className="d-flex align-items-center">
                                                {getMaterialIcon(material.type)}
                                                <span>{material.title}</span>
                                              </div>
                                              {material.type === 'video' && (
                                                <small className="text-muted ms-4">Duration: {material.duration}</small>
                                              )}
                                              {material.type === 'assignment' && (
                                                <small className="text-muted ms-4">Due: {material.dueDate}</small>
                                              )}
                                            </div>
                                            <div className="d-flex align-items-center">
                                              {material.score && (
                                                <span className="me-3 text-success">{material.score}</span>
                                              )}
                                              {getStatusBadge(material.status)}
                                              {material.status !== 'locked' && (
                                                <Button 
                                                  variant="outline-primary" 
                                                  size="sm" 
                                                  className="ms-2"
                                                  disabled={material.status === 'locked'}
                                                >
                                                  {material.status === 'completed' ? 'Review' : 'Start'}
                                                </Button>
                                              )}
                                            </div>
                                          </ListGroup.Item>
                                        ))}
                                      </ListGroup>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Tab.Pane>
                        
                        {/* Announcements Tab */}
                        <Tab.Pane eventKey="announcements" active={activeTab === 'announcements'}>
                          {course.announcements.length > 0 ? (
                            <ListGroup variant="flush">
                              {course.announcements.map(announcement => (
                                <ListGroup.Item key={announcement.id} className="py-3 border-bottom">
                                  <div className="d-flex justify-content-between mb-2">
                                    <h5 className="mb-0">{announcement.title}</h5>
                                    <small className="text-muted">{announcement.date}</small>
                                  </div>
                                  <p className="mb-1">{announcement.content}</p>
                                  <small className="text-muted">Posted by: {announcement.author}</small>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-muted">No announcements for this course.</p>
                            </div>
                          )}
                        </Tab.Pane>
                        
                        {/* Assignments Tab */}
                        <Tab.Pane eventKey="assignments" active={activeTab === 'assignments'}>
                          {course.assignments.length > 0 ? (
                            <ListGroup variant="flush">
                              {course.assignments.map(assignment => (
                                <ListGroup.Item key={assignment.id} className="py-3 d-flex justify-content-between align-items-center">
                                  <div>
                                    <h6 className="mb-1">{assignment.title}</h6>
                                    <small className="text-muted">Due: {assignment.dueDate}</small>
                                  </div>
                                  <div className="d-flex align-items-center">
                                    {assignment.score && (
                                      <span className="me-3 text-success">{assignment.score}</span>
                                    )}
                                    {getStatusBadge(assignment.status)}
                                    <Button 
                                      variant="outline-primary" 
                                      size="sm" 
                                      className="ms-2"
                                      disabled={assignment.status === 'locked'}
                                    >
                                      {assignment.status === 'completed' ? 'View Submission' : 'View Details'}
                                    </Button>
                                  </div>
                                </ListGroup.Item>
                              ))}
                            </ListGroup>
                          ) : (
                            <div className="text-center py-4">
                              <p className="text-muted">No assignments for this course.</p>
                            </div>
                          )}
                        </Tab.Pane>
                        
                        {/* Grades Tab */}
                        <Tab.Pane eventKey="grades" active={activeTab === 'grades'}>
                          <Row>
                            <Col md={7}>
                              <h5 className="mb-3">Grade Distribution</h5>
                              <div className="table-responsive">
                                <table className="table">
                                  <thead className="table-light">
                                    <tr>
                                      <th>Category</th>
                                      <th>Weight</th>
                                      <th>Score</th>
                                      <th>Weighted Score</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td>Assignments</td>
                                      <td>{course.grades.assignments.weight}%</td>
                                      <td>{course.grades.assignments.score}%</td>
                                      <td>
                                        {((course.grades.assignments.weight * course.grades.assignments.score) / 100).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Quizzes</td>
                                      <td>{course.grades.quizzes.weight}%</td>
                                      <td>{course.grades.quizzes.score}%</td>
                                      <td>
                                        {((course.grades.quizzes.weight * course.grades.quizzes.score) / 100).toFixed(2)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Mid-term Exam</td>
                                      <td>{course.grades.midterm.weight}%</td>
                                      <td>{course.grades.midterm.score ? `${course.grades.midterm.score}%` : 'Pending'}</td>
                                      <td>
                                        {course.grades.midterm.score 
                                          ? ((course.grades.midterm.weight * course.grades.midterm.score) / 100).toFixed(2)
                                          : 'Pending'
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Final Exam</td>
                                      <td>{course.grades.final.weight}%</td>
                                      <td>{course.grades.final.score ? `${course.grades.final.score}%` : 'Pending'}</td>
                                      <td>
                                        {course.grades.final.score 
                                          ? ((course.grades.final.weight * course.grades.final.score) / 100).toFixed(2)
                                          : 'Pending'
                                        }
                                      </td>
                                    </tr>
                                  </tbody>
                                  <tfoot className="table-light">
                                    <tr>
                                      <th>Total</th>
                                      <th>100%</th>
                                      <th></th>
                                      <th>
                                        {(
                                          (course.grades.assignments.weight * course.grades.assignments.score +
                                          course.grades.quizzes.weight * course.grades.quizzes.score) / 100
                                        ).toFixed(2)} / 100
                                      </th>
                                    </tr>
                                  </tfoot>
                                </table>
                              </div>
                            </Col>
                            <Col md={5}>
                              <Card className="text-center border-0 shadow-sm">
                                <Card.Body>
                                  <h5 className="mb-3">Current Grade</h5>
                                  <div className="display-1 fw-bold text-primary mb-3">
                                    {course.grades.currentGrade}
                                  </div>
                                  <p className="text-muted">
                                    Based on completed assessments
                                  </p>
                                  <div className="d-flex justify-content-between mb-1">
                                    <small>Overall Progress</small>
                                    <small className="text-muted">{course.progress}%</small>
                                  </div>
                                  <ProgressBar 
                                    now={course.progress} 
                                    variant={course.progress < 50 ? "warning" : "success"} 
                                  />
                                </Card.Body>
                              </Card>
                            </Col>
                          </Row>
                        </Tab.Pane>
                      </Tab.Content>
                    </Card.Body>
                  </Card>
                </Col>
                
                {/* Course Sidebar */}
                <Col lg={4}>
                  {/* Course Info Card */}
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-3">Course Information</h5>
                      <ListGroup variant="flush" className="mb-0">
                        <ListGroup.Item className="px-0 py-2 d-flex justify-content-between border-0">
                          <span className="text-muted">Instructor:</span>
                          <span className="fw-medium">{course.instructor}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-2 d-flex justify-content-between border-0">
                          <span className="text-muted">Schedule:</span>
                          <span className="fw-medium">{course.schedule}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-2 d-flex justify-content-between border-0">
                          <span className="text-muted">Location:</span>
                          <span className="fw-medium">{course.location}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-2 d-flex justify-content-between border-0">
                          <span className="text-muted">Start Date:</span>
                          <span className="fw-medium">{course.startDate}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-2 d-flex justify-content-between border-0">
                          <span className="text-muted">End Date:</span>
                          <span className="fw-medium">{course.endDate}</span>
                        </ListGroup.Item>
                        <ListGroup.Item className="px-0 py-2 d-flex justify-content-between border-0">
                          <span className="text-muted">Enrollment:</span>
                          <span className="fw-medium">{course.enrollment} students</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                  
                  {/* Upcoming Deadlines */}
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-3">Upcoming Deadlines</h5>
                      {course.assignments.filter(a => a.status !== 'completed').length > 0 ? (
                        <ListGroup variant="flush">
                          {course.assignments
                            .filter(a => a.status !== 'completed')
                            .map(assignment => (
                              <ListGroup.Item key={assignment.id} className="px-0 py-2 border-0">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <p className="mb-0 fw-medium">{assignment.title}</p>
                                    <small className="text-muted">Due: {assignment.dueDate}</small>
                                  </div>
                                  {getStatusBadge(assignment.status)}
                                </div>
                              </ListGroup.Item>
                            ))}
                        </ListGroup>
                      ) : (
                        <p className="text-muted">No upcoming deadlines.</p>
                      )}
                    </Card.Body>
                  </Card>
                  
                  {/* Course Resources */}
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Body>
                      <h5 className="mb-3">Course Resources</h5>
                      <ListGroup variant="flush" className="mb-0">
                        <ListGroup.Item action className="px-0 py-2 d-flex align-items-center border-0">
                          <i className="bi bi-file-pdf me-2 text-danger"></i>
                          <span>Course Syllabus</span>
                        </ListGroup.Item>
                        <ListGroup.Item action className="px-0 py-2 d-flex align-items-center border-0">
                          <i className="bi bi-book me-2 text-primary"></i>
                          <span>Recommended Textbooks</span>
                        </ListGroup.Item>
                        <ListGroup.Item action className="px-0 py-2 d-flex align-items-center border-0">
                          <i className="bi bi-file-code me-2 text-success"></i>
                          <span>Code Samples & Examples</span>
                        </ListGroup.Item>
                        <ListGroup.Item action className="px-0 py-2 d-flex align-items-center border-0">
                          <i className="bi bi-chat-left-text me-2 text-info"></i>
                          <span>Discussion Forum</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card.Body>
                  </Card>
                  
                  {/* Connect with Instructor */}
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Body className="text-center">
                      <h5 className="mb-3">Connect with Instructor</h5>
                      <div className="mb-3">
                        <img 
                          src="https://source.unsplash.com/random/100x100/?professor" 
                          alt="Dr. Ramesh Kumar" 
                          className="rounded-circle mb-2"
                          width="60"
                          height="60"
                        />
                        <h6 className="mb-0">{course.instructor}</h6>
                        <p className="text-muted small">Professor, Department of Computer Science</p>
                      </div>
                      <div className="d-grid gap-2">
                        <Button variant="outline-primary" size="sm">
                          <i className="bi bi-envelope me-2"></i>
                          Send Message
                        </Button>
                        <Button variant="outline-secondary" size="sm">
                          <i className="bi bi-calendar-check me-2"></i>
                          Schedule Office Hours
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </>
        )}
      </Container>
      
      <Footer />
    </div>
  );
};

export default CourseDetailPage;