import React, { useState } from 'react';
import { Card, Table, Button, Form, Badge, Modal, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ManageCourses = ({ courses, onCreateCourse, onUpdateCourse, onDeleteCourse }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    department: '',
    status: 'active',
    visibility: 'visible'
  });
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (course.department && course.department.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const openCreateModal = () => {
    setFormData({
      code: '',
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      department: '',
      status: 'active',
      visibility: 'visible'
    });
    setFormError('');
    setShowCreateModal(true);
  };
  
  const openEditModal = (course) => {
    setCurrentCourse(course);
    setFormData({
      code: course.code || '',
      title: course.title || '',
      description: course.description || '',
      startDate: course.startDate || '',
      endDate: course.endDate || '',
      department: course.department || '',
      status: course.status || 'active',
      visibility: course.visibility || 'visible'
    });
    setFormError('');
    setShowEditModal(true);
  };
  
  const openDeleteModal = (course) => {
    setCurrentCourse(course);
    setShowDeleteModal(true);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleCreateCourse = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.code.trim() || !formData.title.trim()) {
      setFormError('Course code and title are required');
      return;
    }
    
    const newCourse = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      enrollment: 0,
      progress: 0,
      modules: []
    };
    
    if (onCreateCourse) {
      onCreateCourse(newCourse);
    }
    
    setFormSuccess('Course created successfully!');
    setTimeout(() => {
      setShowCreateModal(false);
      setFormSuccess('');
    }, 1500);
  };
  
  const handleUpdateCourse = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.code.trim() || !formData.title.trim()) {
      setFormError('Course code and title are required');
      return;
    }
    
    const updatedCourse = {
      ...currentCourse,
      ...formData,
      updatedAt: new Date().toISOString()
    };
    
    if (onUpdateCourse) {
      onUpdateCourse(updatedCourse);
    }
    
    setFormSuccess('Course updated successfully!');
    setTimeout(() => {
      setShowEditModal(false);
      setFormSuccess('');
    }, 1500);
  };
  
  const handleDeleteCourse = () => {
    if (onDeleteCourse && currentCourse) {
      onDeleteCourse(currentCourse.id);
    }
    
    setShowDeleteModal(false);
  };
  
  const getStatusBadge = (status) => {
    switch(status.toLowerCase()) {
      case 'active':
        return <Badge bg="success">Active</Badge>;
      case 'upcoming':
        return <Badge bg="info">Upcoming</Badge>;
      case 'completed':
        return <Badge bg="secondary">Completed</Badge>;
      case 'archived':
        return <Badge bg="dark">Archived</Badge>;
      case 'draft':
        return <Badge bg="warning">Draft</Badge>;
      default:
        return <Badge bg="primary">{status}</Badge>;
    }
  };
  
  const getVisibilityBadge = (visibility) => {
    switch(visibility.toLowerCase()) {
      case 'visible':
        return <Badge bg="success">Visible</Badge>;
      case 'hidden':
        return <Badge bg="secondary">Hidden</Badge>;
      default:
        return <Badge bg="primary">{visibility}</Badge>;
    }
  };
  
  return (
    <>
      <Card className="border-0 shadow-sm">
        <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Manage Courses</h5>
          <Button variant="primary" onClick={openCreateModal}>
            <i className="bi bi-plus-lg me-2"></i>Create Course
          </Button>
        </Card.Header>
        <Card.Body>
          <div className="mb-4">
            <Form.Control
              type="search"
              placeholder="Search courses by code, title, or department"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {filteredCourses.length > 0 ? (
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th>Code</th>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Enrollment</th>
                    <th>Status</th>
                    <th>Visibility</th>
                    <th className="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map(course => (
                    <tr key={course.id}>
                      <td><strong>{course.code}</strong></td>
                      <td>
                        <Link to={`/courses/${course.id}`} className="text-decoration-none">
                          {course.title}
                        </Link>
                      </td>
                      <td>{course.department || '-'}</td>
                      <td>{course.enrollment || 0} students</td>
                      <td>{getStatusBadge(course.status || 'active')}</td>
                      <td>{getVisibilityBadge(course.visibility || 'visible')}</td>
                      <td>
                        <div className="d-flex justify-content-end">
                          <Button 
                            as={Link}
                            to={`/courses/${course.id}`}
                            variant="outline-primary" 
                            size="sm"
                            className="me-2"
                          >
                            <i className="bi bi-eye"></i>
                          </Button>
                          <Button 
                            variant="outline-secondary" 
                            size="sm"
                            className="me-2"
                            onClick={() => openEditModal(course)}
                          >
                            <i className="bi bi-pencil"></i>
                          </Button>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => openDeleteModal(course)}
                          >
                            <i className="bi bi-trash"></i>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="bi bi-journal-x fs-1 text-muted mb-3"></i>
              <h4>No Courses Found</h4>
              <p className="text-muted">
                {courses.length === 0 
                  ? "You haven't created any courses yet." 
                  : "No courses match your search criteria."}
              </p>
              {searchQuery ? (
                <Button 
                  variant="primary" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              ) : (
                <Button 
                  variant="primary" 
                  onClick={openCreateModal}
                >
                  Create Your First Course
                </Button>
              )}
            </div>
          )}
        </Card.Body>
      </Card>
      
      {/* Create Course Modal */}
      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && (
            <Alert variant="danger" onClose={() => setFormError('')} dismissible>
              {formError}
            </Alert>
          )}
          
          {formSuccess && (
            <Alert variant="success">
              {formSuccess}
            </Alert>
          )}
          
          <Form onSubmit={handleCreateCourse}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group controlId="formCode">
                  <Form.Label>Course Code <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="e.g., CS101"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={8}>
                <Form.Group controlId="formTitle">
                  <Form.Label>Course Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="e.g., Introduction to Computer Science"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    placeholder="Enter course description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="formDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="e.g., Computer Science"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="formStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                    <option value="draft">Draft</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="formStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control 
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="formEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control 
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group controlId="formVisibility">
                  <Form.Label>Visibility</Form.Label>
                  <Form.Select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                  >
                    <option value="visible">Visible to Students</option>
                    <option value="hidden">Hidden</option>
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Hidden courses are only visible to instructors and administrators
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleCreateCourse}
            disabled={formSuccess !== ''}
          >
            Create Course
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Edit Course Modal */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {formError && (
            <Alert variant="danger" onClose={() => setFormError('')} dismissible>
              {formError}
            </Alert>
          )}
          
          {formSuccess && (
            <Alert variant="success">
              {formSuccess}
            </Alert>
          )}
          
          <Form onSubmit={handleUpdateCourse}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group controlId="editFormCode">
                  <Form.Label>Course Code <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="e.g., CS101"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={8}>
                <Form.Group controlId="editFormTitle">
                  <Form.Label>Course Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="e.g., Introduction to Computer Science"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group controlId="editFormDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={3}
                    placeholder="Enter course description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="editFormDepartment">
                  <Form.Label>Department</Form.Label>
                  <Form.Control 
                    type="text"
                    placeholder="e.g., Computer Science"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="editFormStatus">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="active">Active</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                    <option value="draft">Draft</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="editFormStartDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control 
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={6}>
                <Form.Group controlId="editFormEndDate">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control 
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              
              <Col md={12}>
                <Form.Group controlId="editFormVisibility">
                  <Form.Label>Visibility</Form.Label>
                  <Form.Select
                    name="visibility"
                    value={formData.visibility}
                    onChange={handleInputChange}
                  >
                    <option value="visible">Visible to Students</option>
                    <option value="hidden">Hidden</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUpdateCourse}
            disabled={formSuccess !== ''}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      
      {/* Delete Course Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete the course <strong>{currentCourse?.title}</strong>?</p>
          <Alert variant="warning">
            <i className="bi bi-exclamation-triangle-fill me-2"></i>
            This action cannot be undone. All course materials, assignments, and grades associated with this course will be permanently deleted.
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteCourse}>
            Delete Course
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

ManageCourses.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      department: PropTypes.string,
      status: PropTypes.string,
      visibility: PropTypes.string,
      enrollment: PropTypes.number,
      startDate: PropTypes.string,
      endDate: PropTypes.string
    })
  ).isRequired,
  onCreateCourse: PropTypes.func,
  onUpdateCourse: PropTypes.func,
  onDeleteCourse: PropTypes.func
};

export default ManageCourses;