import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, ListGroup, Button, ProgressBar, Spinner, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../contexts/AuthContext';
import CourseCard from '../components/dashboard/CourseCard';
import AnnouncementCard from '../components/dashboard/AnnouncementCard';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import RecentActivity from '../components/dashboard/RecentActivity';

const DashboardPage = () => {
  const { currentUser, isFaculty } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [featuredCourse, setFeaturedCourse] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const [stats, setStats] = useState({
    completedAssignments: 0,
    upcomingAssignments: 0,
    courseProgress: 0,
    totalCourses: 0,
    activeCourses: 0,
    upcomingQuizzes: 0,
    totalGradeAverage: 0
  });
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // In a real application, these would be API calls
        // Simulating API calls with setTimeout
        setTimeout(() => {
          // Mock courses data
          const mockCourses = [
            {
              id: 1,
              code: 'CS301',
              title: 'Data Structures',
              instructor: 'Dr. Ramesh Kumar',
              progress: 65,
              unreadItems: 3,
              nextClass: 'Tomorrow, 10:00 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?programming',
              featured: true,
              description: 'Learn fundamental data structures and algorithms with practical implementations.'
            },
            {
              id: 2,
              code: 'CS302',
              title: 'Database Systems',
              instructor: 'Dr. Priya Singh',
              progress: 78,
              unreadItems: 1,
              nextClass: 'Today, 2:00 PM',
              coverImage: 'https://source.unsplash.com/random/300x200/?database',
              featured: false,
              description: 'Introduction to database management systems, SQL, and relational database design.'
            },
            {
              id: 3,
              code: 'CS303',
              title: 'Computer Networks',
              instructor: 'Prof. Suresh Reddy',
              progress: 42,
              unreadItems: 0,
              nextClass: 'Friday, 11:30 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?network',
              featured: false,
              description: 'Study network protocols, architectures, and the fundamentals of computer communication.'
            },
            {
              id: 4,
              code: 'CS304',
              title: 'Software Engineering',
              instructor: 'Dr. Lakshmi Rao',
              progress: 30,
              unreadItems: 5,
              nextClass: 'Thursday, 9:00 AM',
              coverImage: 'https://source.unsplash.com/random/300x200/?software',
              featured: false,
              description: 'Learn software development methodologies, testing strategies, and project management.'
            }
          ];
          
          // Mock announcements data
          const mockAnnouncements = [
            {
              id: 1,
              title: 'Mid-semester Examination Schedule',
              content: 'The mid-semester examinations will commence from April 10th. The detailed schedule has been uploaded to the portal.',
              date: '2 days ago',
              author: 'Examination Cell',
              important: true,
              courseId: null, // Campus-wide announcement
              attachments: [
                {
                  name: 'exam_schedule.pdf',
                  url: '#',
                  type: 'pdf'
                }
              ]
            },
            {
              id: 2,
              title: 'Technical Symposium - TechVista 2025',
              content: 'Register for TechVista 2025, the annual technical symposium organized by the Dept. of Computer Science.',
              date: '1 week ago',
              author: 'Student Council',
              important: false,
              courseId: null, // Campus-wide announcement
              attachments: [
                {
                  name: 'techvista_brochure.pdf',
                  url: '#',
                  type: 'pdf'
                },
                {
                  name: 'registration_form.docx',
                  url: '#',
                  type: 'doc'
                }
              ]
            },
            {
              id: 3,
              title: 'New Assignment Posted in Database Systems',
              content: 'A new database design assignment has been posted. Please check the course materials section.',
              date: '3 days ago',
              author: 'Dr. Priya Singh',
              important: true,
              courseId: 2,
              attachments: []
            },
            {
              id: 4,
              title: 'Office Hours Change for Data Structures',
              content: 'Office hours for Data Structures class will now be held on Mondays and Wednesdays from 2-4 PM.',
              date: '4 days ago',
              author: 'Dr. Ramesh Kumar',
              important: false,
              courseId: 1,
              attachments: []
            }
          ];
          
          // Mock upcoming events
          const mockEvents = [
            {
              id: 1,
              title: 'Database Systems Quiz',
              date: 'Mar 25, 2025',
              time: '10:00 AM',
              location: 'Online',
              type: 'quiz',
              courseId: 2
            },
            {
              id: 2,
              title: 'Data Structures Lab Submission',
              date: 'Mar 27, 2025',
              time: '11:59 PM',
              location: 'Online Portal',
              type: 'assignment',
              courseId: 1
            },
            {
              id: 3,
              title: 'Guest Lecture on AI & ML',
              date: 'Mar 30, 2025',
              time: '2:00 PM',
              location: 'Seminar Hall B',
              type: 'event',
              courseId: null
            },
            {
              id: 4,
              title: 'Mid-semester Examinations Begin',
              date: 'Apr 10, 2025',
              time: '9:00 AM',
              location: 'Exam Halls',
              type: 'exam',
              courseId: null
            },
            {
              id: 5,
              title: 'Computer Networks Assignment Due',
              date: 'Apr 5, 2025',
              time: '11:59 PM',
              location: 'Online Portal',
              type: 'assignment',
              courseId: 3
            }
          ];
          
          // Mock recent activities
          const mockActivities = [
            {
              id: 1,
              activity: 'Completed assignment',
              course: 'Data Structures',
              courseId: 1,
              time: '2 hours ago'
            },
            {
              id: 2,
              activity: 'Viewed lecture video',
              course: 'Computer Networks',
              courseId: 3,
              time: '1 day ago'
            },
            {
              id: 3,
              activity: 'Downloaded study material',
              course: 'Software Engineering',
              courseId: 4,
              time: '2 days ago'
            },
            {
              id: 4,
              activity: 'Submitted quiz',
              course: 'Database Systems',
              courseId: 2,
              time: '3 days ago'
            },
            {
              id: 5,
              activity: 'Participated in discussion',
              course: 'Data Structures',
              courseId: 1,
              time: '4 days ago'
            }
          ];
          
          // Calculate dashboard statistics
          const totalCourses = mockCourses.length;
          const activeCourses = mockCourses.filter(course => course.progress > 0).length;
          const averageProgress = Math.round(
            mockCourses.reduce((sum, course) => sum + course.progress, 0) / totalCourses
          );
          const completedAssignments = 12; // In a real app, this would be calculated from assignment data
          const upcomingAssignments = mockEvents.filter(event => event.type === 'assignment').length;
          const upcomingQuizzes = mockEvents.filter(event => event.type === 'quiz').length;
          const totalGradeAverage = 78; // In a real app, this would be calculated from grades data
          
          // Get featured course
          const featured = mockCourses.find(course => course.featured) || mockCourses[0];
          
          setCourses(mockCourses);
          setAnnouncements(mockAnnouncements);
          setUpcomingEvents(mockEvents);
          setRecentActivities(mockActivities);
          setFeaturedCourse(featured);
          setStats({
            completedAssignments,
            upcomingAssignments,
            courseProgress: averageProgress,
            totalCourses,
            activeCourses,
            upcomingQuizzes,
            totalGradeAverage
          });
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className="dashboard-page d-flex">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="content-wrapper flex-grow-1 min-vh-100 d-flex flex-column" style={{ marginLeft: sidebarCollapsed ? '70px' : '260px' }}>
        <Header toggleSidebar={toggleSidebar} />
        
        <Container fluid className="flex-grow-1 py-4">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" size="lg" />
              <p className="mt-3 text-muted">Loading your dashboard...</p>
            </div>
          ) : (
            <>
              {/* Welcome Banner */}
              <Container className="mb-4">
                <Row>
                  <Col>
                    <Card className="bg-primary text-white border-0 overflow-hidden">
                      <div className="position-absolute" style={{ right: 0, bottom: 0, opacity: 0.1 }}>
                        <i className="bi bi-mortarboard-fill" style={{ fontSize: '8rem' }}></i>
                      </div>
                      <Card.Body className="d-flex justify-content-between align-items-center p-4">
                        <div>
                          <h2 className="mb-1">Welcome back, {currentUser.name}!</h2>
                          <p className="mb-0">
                            {currentUser.department} | {currentUser.role === 'student' ? currentUser.year : 'Faculty'}
                          </p>
                          <p className="mt-2 mb-0">
                            <Badge bg="light" text="primary" className="me-2">
                              Overall Progress: {stats.courseProgress}%
                            </Badge>
                            <Badge bg="light" text="primary">
                              GPA: {stats.totalGradeAverage / 10}/10
                            </Badge>
                          </p>
                        </div>
                        <div className="text-end">
                          <h5>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</h5>
                          <Badge bg="light" text="primary" pill className="px-3 py-2">
                            {isFaculty() ? 'Faculty Portal' : 'Student Portal'}
                          </Badge>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Container>
              
              {/* Main Dashboard Content */}
              <Container>
                <Row>
                  {/* Left Column - Stats and Courses */}
                  <Col lg={8} className="mb-4 mb-lg-0">
                    {/* Quick Stats */}
                    <Row className="g-3 mb-4">
                      <Col sm={6} lg={3}>
                        <Card className="h-100 border-0 shadow-sm dashboard-stats">
                          <Card.Body className="text-center">
                            <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-journal-check text-primary fs-3"></i>
                            </div>
                            <h3 className="fw-bold mb-0">{stats.completedAssignments}</h3>
                            <p className="text-muted mb-0">Completed Tasks</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} lg={3}>
                        <Card className="h-100 border-0 shadow-sm dashboard-stats" style={{ borderLeft: '4px solid var(--warning-color) !important' }}>
                          <Card.Body className="text-center">
                            <div className="d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-journal-text text-warning fs-3"></i>
                            </div>
                            <h3 className="fw-bold mb-0">{stats.upcomingAssignments}</h3>
                            <p className="text-muted mb-0">Pending Tasks</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} lg={3}>
                        <Card className="h-100 border-0 shadow-sm dashboard-stats" style={{ borderLeft: '4px solid var(--info-color) !important' }}>
                          <Card.Body className="text-center">
                            <div className="d-flex align-items-center justify-content-center bg-info bg-opacity-10 rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-question-circle text-info fs-3"></i>
                            </div>
                            <h3 className="fw-bold mb-0">{stats.upcomingQuizzes}</h3>
                            <p className="text-muted mb-0">Upcoming Quizzes</p>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col sm={6} lg={3}>
                        <Card className="h-100 border-0 shadow-sm dashboard-stats" style={{ borderLeft: '4px solid var(--success-color) !important' }}>
                          <Card.Body className="text-center">
                            <div className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                              <i className="bi bi-book text-success fs-3"></i>
                            </div>
                            <h3 className="fw-bold mb-0">{stats.activeCourses}/{stats.totalCourses}</h3>
                            <p className="text-muted mb-0">Active Courses</p>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    
                    {/* Featured Course */}
                    {featuredCourse && (
                      <Card className="border-0 shadow-sm mb-4 overflow-hidden">
                        <div className="position-relative">
                          <img 
                            src={featuredCourse.coverImage} 
                            alt={featuredCourse.title} 
                            className="w-100 object-fit-cover" 
                            style={{ height: '180px' }}
                          />
                          <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))' }}>
                            <div className="text-white p-4">
                              <Badge bg="light" text="dark" className="mb-2">{featuredCourse.code}</Badge>
                              <h3 className="mb-1">{featuredCourse.title}</h3>
                              <p className="mb-0">Instructor: {featuredCourse.instructor}</p>
                            </div>
                          </div>
                          <Badge bg="primary" className="position-absolute top-0 end-0 m-3">Featured Course</Badge>
                        </div>
                        <Card.Body>
                          <p className="mb-3">{featuredCourse.description}</p>
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <div className="text-muted">
                              <i className="bi bi-clock me-1"></i> Next class: {featuredCourse.nextClass}
                            </div>
                            <div className="text-muted">
                              Progress: <span className="fw-medium">{featuredCourse.progress}%</span>
                            </div>
                          </div>
                          <ProgressBar 
                            now={featuredCourse.progress} 
                            variant={featuredCourse.progress < 50 ? "warning" : "success"} 
                            className="mb-3" 
                            style={{ height: '8px' }}
                          />
                          <div className="d-flex justify-content-between align-items-center">
                            <Button variant="outline-primary" size="sm">
                              <i className="bi bi-play-fill me-1"></i> Continue Learning
                            </Button>
                            <Button 
                              as={Link} 
                              to={`/courses/${featuredCourse.id}`} 
                              variant="primary"
                            >
                              View Course
                            </Button>
                          </div>
                        </Card.Body>
                      </Card>
                    )}
                    
                    {/* Courses and Announcements Tabs */}
                    <Tabs defaultActiveKey="courses" className="mb-3">
                      <Tab eventKey="courses" title="My Courses">
                        <Row className="g-3">
                          {courses.slice(0, 4).map(course => (
                            <Col md={6} key={course.id}>
                              <CourseCard course={course} />
                            </Col>
                          ))}
                        </Row>
                        <div className="text-center mt-3">
                          <Button as={Link} to="/courses" variant="outline-primary">
                            View All Courses
                          </Button>
                        </div>
                      </Tab>
                      <Tab eventKey="announcements" title="Announcements">
                        {announcements.map(announcement => (
                          <AnnouncementCard key={announcement.id} announcement={announcement} />
                        ))}
                        <div className="text-center mt-3">
                          <Button as={Link} to="#" variant="outline-primary">
                            View All Announcements
                          </Button>
                        </div>
                      </Tab>
                    </Tabs>
                  </Col>
                  
                  {/* Right Column - Upcoming Events and Activities */}
                  <Col lg={4}>
                    {/* Upcoming Events */}
                    <UpcomingEvents events={upcomingEvents} />
                    
                    {/* Recent Activity */}
                    <RecentActivity 
                      activities={recentActivities} 
                      limit={5} 
                      showViewAll={true} 
                    />
                    
                    {/* Quick Links */}
                    <Card className="border-0 shadow-sm mb-4">
                      <Card.Header className="bg-white py-3">
                        <h5 className="mb-0">Quick Links</h5>
                      </Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item action as={Link} to="#" className="d-flex align-items-center py-3">
                          <div className="d-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded p-2 me-3">
                            <i className="bi bi-calendar-week text-primary"></i>
                          </div>
                          <span>Academic Calendar</span>
                        </ListGroup.Item>
                        <ListGroup.Item action as={Link} to="#" className="d-flex align-items-center py-3">
                          <div className="d-flex align-items-center justify-content-center bg-info bg-opacity-10 rounded p-2 me-3">
                            <i className="bi bi-book text-info"></i>
                          </div>
                          <span>Library Resources</span>
                        </ListGroup.Item>
                        <ListGroup.Item action as={Link} to="#" className="d-flex align-items-center py-3">
                          <div className="d-flex align-items-center justify-content-center bg-warning bg-opacity-10 rounded p-2 me-3">
                            <i className="bi bi-journal-text text-warning"></i>
                          </div>
                          <span>Examination Schedule</span>
                        </ListGroup.Item>
                        <ListGroup.Item action as={Link} to="#" className="d-flex align-items-center py-3">
                          <div className="d-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded p-2 me-3">
                            <i className="bi bi-people text-success"></i>
                          </div>
                          <span>Student Resources</span>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                    
                    {/* Announcements Section (Compact) */}
                    <Card className="border-0 shadow-sm mb-4">
                      <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Latest Updates</h5>
                        <Badge bg="primary" pill>New</Badge>
                      </Card.Header>
                      <ListGroup variant="flush">
                        <ListGroup.Item action className="border-bottom">
                          <h6 className="mb-1">Mid-term Grades Published</h6>
                          <p className="text-muted small mb-0">Published 3 hours ago</p>
                        </ListGroup.Item>
                        <ListGroup.Item action className="border-bottom">
                          <h6 className="mb-1">Library Hours Extended</h6>
                          <p className="text-muted small mb-0">Published yesterday</p>
                        </ListGroup.Item>
                        <ListGroup.Item action className="border-bottom">
                          <h6 className="mb-1">New Software Available in Labs</h6>
                          <p className="text-muted small mb-0">Published 3 days ago</p>
                        </ListGroup.Item>
                      </ListGroup>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </Container>
        
        <Footer />
      </div>
    </div>
  );
};

export default DashboardPage;