// src/pages/GradesPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Badge, ProgressBar, Spinner, Form } from 'react-bootstrap';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const GradesPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState('current');
  const [cgpa, setCgpa] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          // Mock grades data
          const mockCourses = [
            {
              id: 1,
              code: 'CS301',
              title: 'Data Structures',
              credits: 4,
              term: 'Spring 2025',
              instructor: 'Dr. Ramesh Kumar',
              grade: 'A',
              percentage: 92,
              status: 'completed',
              gradeComponents: [
                { name: 'Assignments', weight: 30, score: 88 },
                { name: 'Quizzes', weight: 20, score: 92 },
                { name: 'Mid-term', weight: 20, score: 95 },
                { name: 'Final Exam', weight: 30, score: 94 }
              ]
            },
            {
              id: 2,
              code: 'CS302',
              title: 'Database Systems',
              credits: 4,
              term: 'Spring 2025',
              instructor: 'Dr. Priya Singh',
              grade: 'B+',
              percentage: 85,
              status: 'in_progress',
              gradeComponents: [
                { name: 'Assignments', weight: 30, score: 82 },
                { name: 'Quizzes', weight: 20, score: 88 },
                { name: 'Mid-term', weight: 20, score: 86 },
                { name: 'Final Exam', weight: 30, score: null }
              ]
            },
            {
              id: 3,
              code: 'CS303',
              title: 'Computer Networks',
              credits: 3,
              term: 'Spring 2025',
              instructor: 'Prof. Suresh Reddy',
              grade: 'A-',
              percentage: 88,
              status: 'in_progress',
              gradeComponents: [
                { name: 'Assignments', weight: 30, score: 90 },
                { name: 'Quizzes', weight: 20, score: 82 },
                { name: 'Mid-term', weight: 20, score: 89 },
                { name: 'Final Exam', weight: 30, score: null }
              ]
            },
            {
              id: 4,
              code: 'CS401',
              title: 'Computer Network Security',
              credits: 4,
              term: 'Spring 2025',
              instructor: 'Dr. Ramesh Kumar',
              grade: null,
              percentage: null,
              status: 'in_progress',
              gradeComponents: [
                { name: 'Assignments', weight: 30, score: 78 },
                { name: 'Quizzes', weight: 20, score: 85 },
                { name: 'Mid-term', weight: 20, score: null },
                { name: 'Final Exam', weight: 30, score: null }
              ]
            },
            {
              id: 5,
              code: 'CS201',
              title: 'Programming Fundamentals',
              credits: 4,
              term: 'Fall 2024',
              instructor: 'Dr. Anil Gupta',
              grade: 'A',
              percentage: 94,
              status: 'completed',
              gradeComponents: [
                { name: 'Assignments', weight: 30, score: 96 },
                { name: 'Quizzes', weight: 20, score: 92 },
                { name: 'Mid-term', weight: 20, score: 91 },
                { name: 'Final Exam', weight: 30, score: 95 }
              ]
            }
          ];
          
          setCourses(mockCourses);
          
          // Calculate CGPA
          const completedCourses = mockCourses.filter(course => course.status === 'completed');
          let totalPoints = 0;
          let totalCredits = 0;
          
          completedCourses.forEach(course => {
            let gradePoints = 0;
            
            switch(course.grade) {
              case 'A+': gradePoints = 10; break;
              case 'A': gradePoints = 9.5; break;
              case 'A-': gradePoints = 9; break;
              case 'B+': gradePoints = 8.5; break;
              case 'B': gradePoints = 8; break;
              case 'B-': gradePoints = 7.5; break;
              case 'C+': gradePoints = 7; break;
              case 'C': gradePoints = 6.5; break;
              case 'C-': gradePoints = 6; break;
              case 'D': gradePoints = 5; break;
              case 'F': gradePoints = 0; break;
              default: gradePoints = 0;
            }
            
            totalPoints += gradePoints * course.credits;
            totalCredits += course.credits;
          });
          
          const calculatedCGPA = totalCredits > 0 ? totalPoints / totalCredits : 0;
          setCgpa(calculatedCGPA);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching grades:', error);
        setLoading(false);
      }
    };
    
    fetchGrades();
  }, []);
  
  const getGradeColor = (grade) => {
    if (!grade) return 'secondary';
    
    switch(grade[0]) {
      case 'A': return 'success';
      case 'B': return 'primary';
      case 'C': return 'warning';
      case 'D': 
      case 'F': return 'danger';
      default: return 'secondary';
    }
  };
  
  const calculateCurrentGrade = (components) => {
    if (!components || components.length === 0) return null;
    
    let totalWeight = 0;
    let weightedScore = 0;
    
    components.forEach(component => {
      if (component.score !== null) {
        weightedScore += component.score * (component.weight / 100);
        totalWeight += component.weight;
      }
    });
    
    return totalWeight > 0 ? weightedScore * (100 / totalWeight) : null;
  };
  
  const filteredCourses = courses.filter(course => {
    if (selectedTerm === 'current') {
      return course.term === 'Spring 2025';
    } else if (selectedTerm === 'previous') {
      return course.term === 'Fall 2024';
    }
    return true;
  });
  
  return (
    <div className="grades-page d-flex">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="content-wrapper flex-grow-1 min-vh-100 d-flex flex-column" style={{ marginLeft: sidebarCollapsed ? '70px' : '260px' }}>
        <Header toggleSidebar={toggleSidebar} />
        
        <Container fluid className="flex-grow-1 py-4">
          <Container>
            <Row className="mb-4">
              <Col>
                <h2 className="mb-1">My Grades</h2>
                <p className="text-muted">
                  View your academic performance and grades
                </p>
              </Col>
            </Row>
            
            {/* GPA Summary Card */}
            <Row className="mb-4">
              <Col lg={8}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <h5 className="mb-4">Academic Summary</h5>
                    <Row>
                      <Col md={4} className="text-center mb-3 mb-md-0">
                        <h6 className="text-muted mb-2">Current CGPA</h6>
                        <div className="display-5 fw-bold text-primary">{cgpa.toFixed(2)}</div>
                        <p className="text-muted small mb-0">Out of 10.0</p>
                      </Col>
                      <Col md={4} className="text-center mb-3 mb-md-0">
                        <h6 className="text-muted mb-2">Credits Completed</h6>
                        <div className="display-5 fw-bold text-success">
                          {courses.filter(c => c.status === 'completed').reduce((sum, course) => sum + course.credits, 0)}
                        </div>
                        <p className="text-muted small mb-0">Total Credits</p>
                      </Col>
                      <Col md={4} className="text-center">
                        <h6 className="text-muted mb-2">Current Term</h6>
                        <div className="display-5 fw-bold text-info">Spring</div>
                        <p className="text-muted small mb-0">2025</p>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="border-0 shadow-sm h-100">
                  <Card.Body className="p-4">
                    <h5 className="mb-3">Grade Distribution</h5>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>A Grades</span>
                        <span>{courses.filter(c => c.grade && c.grade[0] === 'A').length}</span>
                      </div>
                      <ProgressBar variant="success" now={courses.filter(c => c.grade && c.grade[0] === 'A').length * 100 / courses.length} className="mb-2" />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>B Grades</span>
                        <span>{courses.filter(c => c.grade && c.grade[0] === 'B').length}</span>
                      </div>
                      <ProgressBar variant="primary" now={courses.filter(c => c.grade && c.grade[0] === 'B').length * 100 / courses.length} className="mb-2" />
                    </div>
                    <div className="mb-3">
                      <div className="d-flex justify-content-between mb-1">
                        <span>C Grades</span>
                        <span>{courses.filter(c => c.grade && c.grade[0] === 'C').length}</span>
                      </div>
                      <ProgressBar variant="warning" now={courses.filter(c => c.grade && c.grade[0] === 'C').length * 100 / courses.length} className="mb-2" />
                    </div>
                    <div>
                      <div className="d-flex justify-content-between mb-1">
                        <span>D/F Grades</span>
                        <span>{courses.filter(c => c.grade && (c.grade[0] === 'D' || c.grade[0] === 'F')).length}</span>
                      </div>
                      <ProgressBar variant="danger" now={courses.filter(c => c.grade && (c.grade[0] === 'D' || c.grade[0] === 'F')).length * 100 / courses.length} className="mb-2" />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            
            {/* Term Selector */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-3">
                <Form.Group>
                  <Form.Select 
                    value={selectedTerm}
                    onChange={(e) => setSelectedTerm(e.target.value)}
                  >
                    <option value="current">Current Term (Spring 2025)</option>
                    <option value="previous">Previous Term (Fall 2024)</option>
                    <option value="all">All Terms</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
            
            {/* Course Grades */}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading grades...</p>
              </div>
            ) : (
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  {filteredCourses.length > 0 ? (
                    <div className="table-responsive">
                      <Table hover className="align-middle">
                        <thead className="bg-light">
                          <tr>
                            <th>Course</th>
                            <th>Credits</th>
                            <th>Term</th>
                            <th>Progress</th>
                            <th>Current</th>
                            <th>Final Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCourses.map(course => {
                            const currentGrade = calculateCurrentGrade(course.gradeComponents);
                            
                            return (
                              <tr key={course.id}>
                                <td>
                                  <div>
                                    <Badge bg="light" text="dark" className="mb-1">{course.code}</Badge>
                                    <p className="mb-0 fw-medium">{course.title}</p>
                                    <small className="text-muted">Instructor: {course.instructor}</small>
                                  </div>
                                </td>
                                <td>{course.credits}</td>
                                <td>{course.term}</td>
                                <td>
                                  <div style={{ width: '100px' }}>
                                    <ProgressBar 
                                      variant={course.status === 'completed' ? 'success' : 'primary'} 
                                      now={course.status === 'completed' ? 100 : 60} 
                                      className="mb-1"
                                      style={{ height: '10px' }}
                                    />
                                    <small className="text-muted">
                                      {course.status === 'completed' ? 'Completed' : 'In Progress'}
                                    </small>
                                  </div>
                                </td>
                                <td>
                                  {currentGrade !== null ? (
                                    <span className={currentGrade >= 80 ? 'text-success' : 
                                                    currentGrade >= 60 ? 'text-warning' : 'text-danger'}>
                                      {currentGrade.toFixed(1)}%
                                    </span>
                                  ) : (
                                    'N/A'
                                  )}
                                </td>
                                <td>
                                  {course.grade ? (
                                    <Badge 
                                      bg={getGradeColor(course.grade)} 
                                      className="px-3 py-2 fs-6"
                                    >
                                      {course.grade}
                                    </Badge>
                                  ) : (
                                    <Badge bg="secondary" className="px-3 py-2">Pending</Badge>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-mortarboard fs-1 text-muted mb-3"></i>
                      <h4>No grades found</h4>
                      <p className="text-muted">
                        No courses found for the selected term
                      </p>
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

export default GradesPage;