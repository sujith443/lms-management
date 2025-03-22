import React, { useState, useEffect } from 'react';
import { Row, Col, Form, InputGroup, Button, Card, Badge, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CourseCard from '../dashboard/CourseCard';
import Loader from '../common/Loader';
import PropTypes from 'prop-types';

const CourseList = ({ courses = [], loading = false, showFilters = true }) => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name_asc');
  
  useEffect(() => {
    if (courses.length > 0) {
      let result = [...courses];
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        result = result.filter(course => 
          course.title.toLowerCase().includes(query) || 
          course.code.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query)
        );
      }
      
      // Apply status filter
      if (filterStatus !== 'all') {
        result = result.filter(course => {
          switch (filterStatus) {
            case 'inProgress':
              return course.progress > 0 && course.progress < 100;
            case 'completed':
              return course.progress === 100;
            case 'notStarted':
              return course.progress === 0;
            default:
              return true;
          }
        });
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'name_asc':
          result.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name_desc':
          result.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'code_asc':
          result.sort((a, b) => a.code.localeCompare(b.code));
          break;
        case 'progress_asc':
          result.sort((a, b) => a.progress - b.progress);
          break;
        case 'progress_desc':
          result.sort((a, b) => b.progress - a.progress);
          break;
        default:
          break;
      }
      
      setFilteredCourses(result);
    } else {
      setFilteredCourses([]);
    }
  }, [courses, searchQuery, filterStatus, sortBy]);
  
  if (loading) {
    return <Loader message="Loading courses..." />;
  }
  
  return (
    <div className="course-list">
      {showFilters && (
        <Card className="border-0 shadow-sm mb-4">
          <Card.Body className="p-3">
            <Row className="g-3">
              <Col md={5}>
                <InputGroup>
                  <InputGroup.Text className="bg-white">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control 
                    placeholder="Search for courses by title, code, or instructor" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </InputGroup>
              </Col>
              <Col md={7}>
                <Row className="g-2">
                  <Col sm={5}>
                    <Form.Group>
                      <Form.Select 
                        value={filterStatus} 
                        onChange={(e) => setFilterStatus(e.target.value)}
                      >
                        <option value="all">All Courses</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="notStarted">Not Started</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group>
                      <Form.Select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                      >
                        <option value="name_asc">Name (A-Z)</option>
                        <option value="name_desc">Name (Z-A)</option>
                        <option value="code_asc">Code</option>
                        <option value="progress_desc">Progress (High-Low)</option>
                        <option value="progress_asc">Progress (Low-High)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={3}>
                    <Dropdown className="w-100">
                      <Dropdown.Toggle variant="outline-primary" className="w-100">
                        <i className="bi bi-funnel me-2"></i> More Filters
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item>Department</Dropdown.Item>
                        <Dropdown.Item>Semester</Dropdown.Item>
                        <Dropdown.Item>Instructor</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
      
      {filteredCourses.length > 0 ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="mb-0 text-muted">
              Showing {filteredCourses.length} of {courses.length} courses
            </p>
            <Button variant="outline-primary" size="sm">
              <i className="bi bi-grid-3x3 me-2"></i>
              Change View
            </Button>
          </div>
          
          <Row className="g-4">
            {filteredCourses.map(course => (
              <Col md={6} lg={4} key={course.id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Card className="border-0 shadow-sm text-center p-5">
          <Card.Body>
            <i className="bi bi-search fs-1 text-muted mb-3"></i>
            <h4>No courses found</h4>
            <p className="text-muted">
              Try adjusting your search or filter criteria
            </p>
            {searchQuery || filterStatus !== 'all' ? (
              <Button 
                variant="primary" 
                onClick={() => {
                  setSearchQuery('');
                  setFilterStatus('all');
                  setSortBy('name_asc');
                }}
              >
                Clear Filters
              </Button>
            ) : (
              <Button as={Link} to="/dashboard" variant="primary">
                Back to Dashboard
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      instructor: PropTypes.string.isRequired,
      progress: PropTypes.number.isRequired,
      unreadItems: PropTypes.number,
      nextClass: PropTypes.string,
      coverImage: PropTypes.string
    })
  ),
  loading: PropTypes.bool,
  showFilters: PropTypes.bool
};

export default CourseList;