import React, { useState } from 'react';
import { Card, Table, ProgressBar, Badge, Button, Form, Dropdown, Row, Col, Tab, Tabs } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const StudentProgress = ({ course, students }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name_asc');
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  // Filter and sort students
  const filteredStudents = students.filter(student => {
    // Apply search filter
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toString().includes(searchQuery) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply status filter
    let matchesStatus = true;
    if (filterStatus !== 'all') {
      const progress = student.courseProgress[course.id]?.progress || 0;
      
      if (filterStatus === 'completed' && progress < 100) {
        matchesStatus = false;
      } else if (filterStatus === 'in_progress' && (progress < 1 || progress >= 100)) {
        matchesStatus = false;
      } else if (filterStatus === 'not_started' && progress > 0) {
        matchesStatus = false;
      } else if (filterStatus === 'at_risk' && (progress >= 60 || progress === 0)) {
        matchesStatus = false;
      }
    }
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort students
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    const progressA = a.courseProgress[course.id]?.progress || 0;
    const progressB = b.courseProgress[course.id]?.progress || 0;
    const lastAccessA = a.courseProgress[course.id]?.lastAccess ? new Date(a.courseProgress[course.id].lastAccess) : new Date(0);
    const lastAccessB = b.courseProgress[course.id]?.lastAccess ? new Date(b.courseProgress[course.id].lastAccess) : new Date(0);
    
    switch (sortBy) {
      case 'name_asc':
        return a.name.localeCompare(b.name);
      case 'name_desc':
        return b.name.localeCompare(a.name);
      case 'progress_asc':
        return progressA - progressB;
      case 'progress_desc':
        return progressB - progressA;
      case 'last_access':
        return lastAccessB - lastAccessA;
      default:
        return 0;
    }
  });
  
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'success';
    if (progress >= 60) return 'info';
    if (progress >= 40) return 'warning';
    if (progress > 0) return 'danger';
    return 'secondary';
  };
  
  const getGradeColor = (grade) => {
    if (!grade) return 'secondary';
    
    if (grade >= 90) return 'success';
    if (grade >= 80) return 'info';
    if (grade >= 70) return 'primary';
    if (grade >= 60) return 'warning';
    return 'danger';
  };
  
  const getLastAccessText = (lastAccess) => {
    if (!lastAccess) return 'Never';
    
    const lastAccessDate = new Date(lastAccess);
    const now = new Date();
    const diffTime = Math.abs(now - lastAccessDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffTime / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return lastAccessDate.toLocaleDateString();
    }
  };
  
  const viewStudentDetails = (student) => {
    setSelectedStudent(student);
  };
  
  return (
    <div className="student-progress">
      <Row>
        <Col lg={selectedStudent ? 8 : 12}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Header className="bg-white py-3">
              <h5 className="mb-0">Student Progress - {course.title} ({course.code})</h5>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4 g-3">
                <Col md={5}>
                  <Form.Control
                    type="search"
                    placeholder="Search by name, ID, or email"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </Col>
                <Col md={7}>
                  <Row className="g-2">
                    <Col sm={6} md={5}>
                      <Form.Group>
                        <Form.Select 
                          value={filterStatus} 
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="all">All Students</option>
                          <option value="completed">Completed</option>
                          <option value="in_progress">In Progress</option>
                          <option value="not_started">Not Started</option>
                          <option value="at_risk">At Risk</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col sm={6} md={4}>
                      <Form.Group>
                        <Form.Select 
                          value={sortBy} 
                          onChange={(e) => setSortBy(e.target.value)}
                        >
                          <option value="name_asc">Name (A-Z)</option>
                          <option value="name_desc">Name (Z-A)</option>
                          <option value="progress_desc">Progress (High-Low)</option>
                          <option value="progress_asc">Progress (Low-High)</option>
                          <option value="last_access">Last Access</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Dropdown className="w-100">
                        <Dropdown.Toggle variant="outline-primary" className="w-100">
                          <i className="bi bi-download me-1"></i> Export
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item>
                            <i className="bi bi-file-excel me-2"></i> Export to Excel
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i className="bi bi-file-pdf me-2"></i> Export to PDF
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <i className="bi bi-file-csv me-2"></i> Export to CSV
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Col>
                  </Row>
                </Col>
              </Row>
              
              {sortedStudents.length > 0 ? (
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead className="bg-light">
                      <tr>
                        <th>Student</th>
                        <th>Progress</th>
                        <th>Last Access</th>
                        <th>Assignments</th>
                        <th>Current Grade</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedStudents.map(student => {
                        const courseData = student.courseProgress[course.id] || {};
                        const progress = courseData.progress || 0;
                        const lastAccess = courseData.lastAccess;
                        const completedAssignments = courseData.completedAssignments || 0;
                        const totalAssignments = courseData.totalAssignments || 0;
                        const currentGrade = courseData.currentGrade;
                        
                        return (
                          <tr key={student.id}>
                            <td>
                              <div className="d-flex align-items-center">
                                <img 
                                  src={student.profilePic || "/assets/images/default-avatar.png"}
                                  alt={student.name}
                                  className="rounded-circle me-2"
                                  width="40"
                                  height="40"
                                />
                                <div>
                                  <h6 className="mb-0">{student.name}</h6>
                                  <small className="text-muted">{student.email}</small>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <ProgressBar 
                                  now={progress} 
                                  variant={getProgressColor(progress)} 
                                  className="flex-grow-1 me-2"
                                  style={{ height: '8px' }}
                                />
                                <span className="text-nowrap">{progress}%</span>
                              </div>
                            </td>
                            <td>
                              {getLastAccessText(lastAccess)}
                            </td>
                            <td>
                              {completedAssignments} / {totalAssignments}
                            </td>
                            <td>
                              {currentGrade ? (
                                <Badge 
                                  bg={getGradeColor(currentGrade)} 
                                  className="px-2 py-1"
                                >
                                  {currentGrade}%
                                </Badge>
                              ) : (
                                <Badge bg="secondary" className="px-2 py-1">N/A</Badge>
                              )}
                            </td>
                            <td className="text-end">
                              <Button 
                                variant="outline-primary" 
                                size="sm"
                                onClick={() => viewStudentDetails(student)}
                              >
                                View Details
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-people fs-1 text-muted mb-3"></i>
                  <h4>No Students Found</h4>
                  <p className="text-muted">
                    {students.length === 0 
                      ? "No students are enrolled in this course." 
                      : "No students match your search criteria."}
                  </p>
                  {searchQuery || filterStatus !== 'all' ? (
                    <Button 
                      variant="primary" 
                      onClick={() => {
                        setSearchQuery('');
                        setFilterStatus('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  ) : null}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        
        {selectedStudent && (
          <Col lg={4}>
            <Card className="border-0 shadow-sm sticky-top" style={{ top: '1rem' }}>
              <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Student Details</h5>
                <Button 
                  variant="link" 
                  className="p-0 text-muted" 
                  onClick={() => setSelectedStudent(null)}
                >
                  <i className="bi bi-x-lg"></i>
                </Button>
              </Card.Header>
              <Card.Body>
                <div className="text-center mb-4">
                  <img 
                    src={selectedStudent.profilePic || "/assets/images/default-avatar.png"}
                    alt={selectedStudent.name}
                    className="rounded-circle mb-3"
                    width="80"
                    height="80"
                  />
                  <h4>{selectedStudent.name}</h4>
                  <p className="text-muted mb-0">{selectedStudent.email}</p>
                  <p className="mb-0">
                    <Badge bg="light" text="dark">ID: {selectedStudent.id}</Badge>
                  </p>
                </div>
                
                <Tabs defaultActiveKey="progress" className="mb-3">
                  <Tab eventKey="progress" title="Progress">
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="mb-0">Course Progress</h6>
                        <span className="text-muted small">
                          {selectedStudent.courseProgress[course.id]?.progress || 0}%
                        </span>
                      </div>
                      <ProgressBar 
                        now={selectedStudent.courseProgress[course.id]?.progress || 0} 
                        variant={getProgressColor(selectedStudent.courseProgress[course.id]?.progress || 0)} 
                        style={{ height: '8px' }}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <h6>Module Completion</h6>
                      {course.modules && course.modules.map((module, index) => {
                        const moduleProgress = selectedStudent.courseProgress[course.id]?.modules?.[module.id]?.progress || 0;
                        
                        return (
                          <div key={module.id} className="mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                              <span className="small">Module {index + 1}: {module.title}</span>
                              <span className="text-muted x-small">{moduleProgress}%</span>
                            </div>
                            <ProgressBar 
                              now={moduleProgress} 
                              variant={getProgressColor(moduleProgress)} 
                              style={{ height: '6px' }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mb-3">
                      <h6>Activity Summary</h6>
                      <table className="table table-sm">
                        <tbody>
                          <tr>
                            <th scope="row">Last Access</th>
                            <td>{getLastAccessText(selectedStudent.courseProgress[course.id]?.lastAccess)}</td>
                          </tr>
                          <tr>
                            <th scope="row">Time Spent</th>
                            <td>{selectedStudent.courseProgress[course.id]?.timeSpent || '0 hours'}</td>
                          </tr>
                          <tr>
                            <th scope="row">Materials Viewed</th>
                            <td>{selectedStudent.courseProgress[course.id]?.materialsViewed || 0}</td>
                          </tr>
                          <tr>
                            <th scope="row">Assignments</th>
                            <td>
                              {selectedStudent.courseProgress[course.id]?.completedAssignments || 0} / 
                              {selectedStudent.courseProgress[course.id]?.totalAssignments || 0}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Quizzes</th>
                            <td>
                              {selectedStudent.courseProgress[course.id]?.completedQuizzes || 0} / 
                              {selectedStudent.courseProgress[course.id]?.totalQuizzes || 0}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="d-grid gap-2">
                      <Button variant="outline-primary">
                        <i className="bi bi-envelope me-2"></i>
                        Send Message
                      </Button>
                      <Button variant="outline-secondary">
                        <i className="bi bi-file-earmark-text me-2"></i>
                        View Full Report
                      </Button>
                    </div>
                  </Tab>
                  
                  <Tab eventKey="grades" title="Grades">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="mb-0">Current Grade</h6>
                        <Badge 
                          bg={getGradeColor(selectedStudent.courseProgress[course.id]?.currentGrade)} 
                          className="px-2 py-1"
                        >
                          {selectedStudent.courseProgress[course.id]?.currentGrade 
                            ? `${selectedStudent.courseProgress[course.id].currentGrade}%` 
                            : 'N/A'}
                        </Badge>
                      </div>
                      
                      <div className="table-responsive">
                        <table className="table table-sm">
                          <thead className="table-light">
                            <tr>
                              <th>Category</th>
                              <th>Weight</th>
                              <th>Grade</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>Assignments</td>
                              <td>30%</td>
                              <td>{selectedStudent.courseProgress[course.id]?.grades?.assignments || 'N/A'}</td>
                            </tr>
                            <tr>
                              <td>Quizzes</td>
                              <td>20%</td>
                              <td>{selectedStudent.courseProgress[course.id]?.grades?.quizzes || 'N/A'}</td>
                            </tr>
                            <tr>
                              <td>Midterm</td>
                              <td>20%</td>
                              <td>{selectedStudent.courseProgress[course.id]?.grades?.midterm || 'N/A'}</td>
                            </tr>
                            <tr>
                              <td>Final</td>
                              <td>30%</td>
                              <td>{selectedStudent.courseProgress[course.id]?.grades?.final || 'N/A'}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <h6>Recent Submissions</h6>
                      {selectedStudent.courseProgress[course.id]?.recentSubmissions?.length > 0 ? (
                        <div className="list-group">
                          {selectedStudent.courseProgress[course.id].recentSubmissions.map(submission => (
                            <div key={submission.id} className="list-group-item list-group-item-action">
                              <div className="d-flex justify-content-between">
                                <h6 className="mb-1">{submission.title}</h6>
                                <span className={`badge bg-${getGradeColor(submission.grade)}`}>
                                  {submission.grade}%
                                </span>
                              </div>
                              <p className="mb-1 small text-muted">
                                Submitted on {new Date(submission.submittedAt).toLocaleDateString()}
                              </p>
                              <div className="d-flex justify-content-end">
                                <Button variant="link" size="sm" className="text-decoration-none p-0">
                                  View Submission
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-muted small">No recent submissions.</p>
                      )}
                    </div>
                    
                    <div className="d-grid">
                      <Button variant="primary">
                        <i className="bi bi-pencil me-2"></i>
                        Edit Grades
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

StudentProgress.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    modules: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        title: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      profilePic: PropTypes.string,
      courseProgress: PropTypes.object
    })
  ).isRequired
};

export default StudentProgress;