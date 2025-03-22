import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Nav, Tab, Button, Badge } from 'react-bootstrap';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import UploadContent from '../components/faculty/UploadContent';
import ManageCourses from '../components/faculty/ManageCourses';
import StudentProgress from '../components/faculty/StudentProgress';
import Loader from '../components/common/Loader';
import { useAuth } from '../contexts/AuthContext';

const FacultyPortalPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // Simulating API calls with setTimeout
        setTimeout(() => {
          // Mock courses data
          const mockCourses = [
            {
              id: 1,
              code: 'CS301',
              title: 'Data Structures',
              description: 'This course introduces fundamental data structures such as arrays, linked lists, stacks, queues, trees, and graphs.',
              department: 'Computer Science',
              status: 'active',
              visibility: 'visible',
              enrollment: 68,
              startDate: '2025-01-15',
              endDate: '2025-05-10',
              modules: [
                {
                  id: 1,
                  title: 'Introduction to Data Structures',
                  materials: []
                },
                {
                  id: 2,
                  title: 'Arrays and Linked Lists',
                  materials: []
                },
                {
                  id: 3,
                  title: 'Stacks and Queues',
                  materials: []
                },
                {
                  id: 4,
                  title: 'Trees and Graphs',
                  materials: []
                }
              ]
            },
            {
              id: 2,
              code: 'CS302',
              title: 'Database Systems',
              description: 'Introduction to database design, implementation, and management with a focus on relational databases.',
              department: 'Computer Science',
              status: 'active',
              visibility: 'visible',
              enrollment: 72,
              startDate: '2025-01-15',
              endDate: '2025-05-10',
              modules: [
                {
                  id: 5,
                  title: 'Introduction to Databases',
                  materials: []
                },
                {
                  id: 6,
                  title: 'Relational Database Design',
                  materials: []
                },
                {
                  id: 7,
                  title: 'SQL Fundamentals',
                  materials: []
                },
                {
                  id: 8,
                  title: 'Transactions and Concurrency',
                  materials: []
                }
              ]
            },
            {
              id: 3,
              code: 'CS303',
              title: 'Computer Networks',
              description: 'Covers the principles of computer networking, protocols, architecture, and network applications.',
              department: 'Computer Science',
              status: 'active',
              visibility: 'visible',
              enrollment: 65,
              startDate: '2025-01-15',
              endDate: '2025-05-10',
              modules: [
                {
                  id: 9,
                  title: 'Introduction to Networking',
                  materials: []
                },
                {
                  id: 10,
                  title: 'The Physical Layer',
                  materials: []
                },
                {
                  id: 11,
                  title: 'The Network Layer',
                  materials: []
                },
                {
                  id: 12,
                  title: 'The Transport Layer',
                  materials: []
                }
              ]
            }
          ];
          
          // Mock students data
          const mockStudents = Array.from({ length: 30 }, (_, index) => {
            const id = index + 1;
            const courseProgress = {};
            
            // Add random progress for each course
            mockCourses.forEach(course => {
              const progress = Math.floor(Math.random() * 101);
              const lastAccessDays = Math.floor(Math.random() * 14);
              const lastAccess = new Date();
              lastAccess.setDate(lastAccess.getDate() - lastAccessDays);
              
              const completedAssignments = Math.floor(Math.random() * 6);
              const totalAssignments = 5;
              
              const completedQuizzes = Math.floor(Math.random() * 4);
              const totalQuizzes = 3;
              
              // Current grade based on completed work
              const currentGrade = progress > 0 ? Math.floor(Math.random() * 41) + 60 : null;
              
              // Generate module progress
              const modules = {};
              course.modules.forEach(module => {
                modules[module.id] = {
                  progress: Math.min(progress + Math.floor(Math.random() * 30) - 15, 100)
                };
              });
              
              // Recent submissions (if any)
              const recentSubmissions = [];
              if (completedAssignments > 0) {
                for (let i = 0; i < Math.min(completedAssignments, 3); i++) {
                  const submissionDate = new Date();
                  submissionDate.setDate(submissionDate.getDate() - Math.floor(Math.random() * 10));
                  
                  recentSubmissions.push({
                    id: `sub-${id}-${course.id}-${i}`,
                    title: `Assignment ${i + 1}`,
                    submittedAt: submissionDate.toISOString(),
                    grade: Math.floor(Math.random() * 41) + 60
                  });
                }
              }
              
              courseProgress[course.id] = {
                progress,
                lastAccess: lastAccess.toISOString(),
                completedAssignments,
                totalAssignments,
                completedQuizzes,
                totalQuizzes,
                currentGrade,
                timeSpent: `${Math.floor(Math.random() * 20) + 1} hours`,
                materialsViewed: Math.floor(Math.random() * 15),
                modules,
                grades: {
                  assignments: Math.floor(Math.random() * 41) + 60,
                  quizzes: Math.floor(Math.random() * 41) + 60,
                  midterm: progress > 50 ? Math.floor(Math.random() * 41) + 60 : null,
                  final: progress === 100 ? Math.floor(Math.random() * 41) + 60 : null
                },
                recentSubmissions
              };
            });
            
            // Random name generation
            const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Raj', 'Priya', 'Akash', 'Shreya'];
            const lastNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown', 'Sharma', 'Patel', 'Reddy', 'Kumar', 'Singh'];
            const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            
            return {
              id,
              name: `${firstName} ${lastName}`,
              email: `student${id}@svit.edu`,
              profilePic: `https://i.pravatar.cc/150?img=${id % 70}`,
              courseProgress
            };
          });
          
          setCourses(mockCourses);
          setStudents(mockStudents);
          setSelectedCourse(mockCourses[0]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  const handleCreateCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };
  
  const handleUpdateCourse = (updatedCourse) => {
    setCourses(
      courses.map(course => 
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    
    if (selectedCourse && selectedCourse.id === updatedCourse.id) {
      setSelectedCourse(updatedCourse);
    }
  };
  
  const handleDeleteCourse = (courseId) => {
    setCourses(courses.filter(course => course.id !== courseId));
    
    if (selectedCourse && selectedCourse.id === courseId) {
      setSelectedCourse(courses.length > 1 ? courses.find(course => course.id !== courseId) : null);
    }
  };
  
  const handleUploadComplete = (materialData) => {
    // Handle the newly uploaded material
    console.log('Material uploaded:', materialData);
    // In a real app, you would update the state or make an API call
  };
  
  return (
    <div className="faculty-portal-page min-vh-100 d-flex flex-column">
      <Header />
      
      <Container fluid className="flex-grow-1 py-4">
        <Container>
          <Row className="mb-4">
            <Col>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h2 className="mb-1">Faculty Portal</h2>
                  <p className="text-muted">
                    Manage your courses, materials, and student progress
                  </p>
                </div>
                <div>
                  <Badge bg="primary" className="me-2 px-3 py-2">
                    {currentUser?.department || 'Computer Science'}
                  </Badge>
                  <Badge bg="success" className="px-3 py-2">
                    Faculty
                  </Badge>
                </div>
              </div>
            </Col>
          </Row>
          
          {loading ? (
            <Loader message="Loading faculty portal..." />
          ) : (
            <Tab.Container defaultActiveKey="courses">
              <Row>
                <Col lg={3} md={4}>
                  <Card className="border-0 shadow-sm mb-4">
                    <Card.Body className="p-0">
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="courses" className="rounded-0 border-bottom">
                            <i className="bi bi-book me-2"></i>
                            Manage Courses
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="upload" className="rounded-0 border-bottom">
                            <i className="bi bi-cloud-upload me-2"></i>
                            Upload Content
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="progress" className="rounded-0 border-bottom">
                            <i className="bi bi-graph-up me-2"></i>
                            Student Progress
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="assignments" className="rounded-0 border-bottom">
                            <i className="bi bi-clipboard-check me-2"></i>
                            Assignments
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="announcements" className="rounded-0 border-bottom">
                            <i className="bi bi-megaphone me-2"></i>
                            Announcements
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="grades" className="rounded-0 border-bottom">
                            <i className="bi bi-calculator me-2"></i>
                            Grades
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="discussions" className="rounded-0 border-bottom">
                            <i className="bi bi-chat-left-text me-2"></i>
                            Discussions
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="reports" className="rounded-0">
                            <i className="bi bi-file-earmark-bar-graph me-2"></i>
                            Reports
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Body>
                  </Card>
                  
                  {courses.length > 0 && (
                    <Card className="border-0 shadow-sm">
                      <Card.Header className="bg-white py-3">
                        <h5 className="mb-0">My Courses</h5>
                      </Card.Header>
                      <Card.Body className="p-0">
                        <Nav variant="pills" className="flex-column">
                          {courses.map(course => (
                            <Nav.Item key={course.id}>
                              <Nav.Link 
                                eventKey={`course-${course.id}`}
                                className="rounded-0 border-bottom d-flex justify-content-between align-items-center"
                                onClick={() => setSelectedCourse(course)}
                              >
                                <div>
                                  <span className="d-block">{course.title}</span>
                                  <small className="text-muted">{course.code}</small>
                                </div>
                                <Badge bg="primary" pill>
                                  {course.enrollment}
                                </Badge>
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      </Card.Body>
                    </Card>
                  )}
                </Col>
                
                <Col lg={9} md={8}>
                  <Tab.Content>
                    <Tab.Pane eventKey="courses">
                      <ManageCourses 
                        courses={courses}
                        onCreateCourse={handleCreateCourse}
                        onUpdateCourse={handleUpdateCourse}
                        onDeleteCourse={handleDeleteCourse}
                      />
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="upload">
                      <UploadContent 
                        courses={courses}
                        onUploadComplete={handleUploadComplete}
                      />
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="progress">
                      {selectedCourse ? (
                        <StudentProgress 
                          course={selectedCourse}
                          students={students}
                        />
                      ) : (
                        <Card className="border-0 shadow-sm text-center p-5">
                          <Card.Body>
                            <i className="bi bi-people fs-1 text-muted mb-3"></i>
                            <h4>No Course Selected</h4>
                            <p className="text-muted">
                              Please select a course to view student progress.
                            </p>
                          </Card.Body>
                        </Card>
                      )}
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="assignments">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center py-5">
                          <i className="bi bi-clipboard-check fs-1 text-muted mb-3"></i>
                          <h4>Assignments Module</h4>
                          <p className="text-muted">
                            This module is under development and will be available soon.
                          </p>
                          <Button variant="primary">Check Back Later</Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="announcements">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center py-5">
                          <i className="bi bi-megaphone fs-1 text-muted mb-3"></i>
                          <h4>Announcements Module</h4>
                          <p className="text-muted">
                            This module is under development and will be available soon.
                          </p>
                          <Button variant="primary">Check Back Later</Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="grades">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center py-5">
                          <i className="bi bi-calculator fs-1 text-muted mb-3"></i>
                          <h4>Grades Module</h4>
                          <p className="text-muted">
                            This module is under development and will be available soon.
                          </p>
                          <Button variant="primary">Check Back Later</Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="discussions">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center py-5">
                          <i className="bi bi-chat-left-text fs-1 text-muted mb-3"></i>
                          <h4>Discussions Module</h4>
                          <p className="text-muted">
                            This module is under development and will be available soon.
                          </p>
                          <Button variant="primary">Check Back Later</Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    
                    <Tab.Pane eventKey="reports">
                      <Card className="border-0 shadow-sm">
                        <Card.Body className="text-center py-5">
                          <i className="bi bi-file-earmark-bar-graph fs-1 text-muted mb-3"></i>
                          <h4>Reports Module</h4>
                          <p className="text-muted">
                            This module is under development and will be available soon.
                          </p>
                          <Button variant="primary">Check Back Later</Button>
                        </Card.Body>
                      </Card>
                    </Tab.Pane>
                    
                    {/* Dynamic course tabs */}
                    {courses.map(course => (
                      <Tab.Pane key={course.id} eventKey={`course-${course.id}`}>
                        <StudentProgress 
                          course={course}
                          students={students}
                        />
                      </Tab.Pane>
                    ))}
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          )}
        </Container>
      </Container>
      
      <Footer />
    </div>
  );
};

export default FacultyPortalPage;