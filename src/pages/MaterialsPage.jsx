import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, InputGroup, Button, Badge, ListGroup, Dropdown, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Sidebar from '../components/common/Sidebar';
import { useAuth } from '../contexts/AuthContext';

const MaterialsPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [materials, setMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCourse, setFilterCourse] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [courses, setCourses] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  // Fetch materials and courses data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, these would be API calls
        // Simulating API calls with setTimeout
        setTimeout(() => {
          // Mock study materials with actual PDF files from assets folder
          const mockMaterials = [
            {
              id: 1,
              title: 'CNS Unit 1',
              description: 'Computer Network Security fundamentals and introduction',
              type: 'pdf',
              course: 'Computer Network Security',
              courseCode: 'CS401',
              instructor: 'Dr. Ramesh Kumar',
              dateUploaded: '2025-03-01T10:30:00',
              size: '4.2 MB',
              downloads: 132,
              starred: false,
              fileUrl: '/assets/pdfs/CNS-UNIT-1.pdf' // Path to PDF in assets folder
            },
            {
              id: 2,
              title: 'CNS Unit 2',
              description: 'Network security protocols and authentication mechanisms',
              type: 'pdf',
              course: 'Computer Network Security',
              courseCode: 'CS401',
              instructor: 'Dr. Ramesh Kumar',
              dateUploaded: '2025-03-08T14:15:00',
              size: '3.8 MB',
              downloads: 118,
              starred: false,
              fileUrl: '/assets/pdfs/CNS-2.pdf' // Path to PDF in assets folder
            },
            {
              id: 3,
              title: 'CNS Unit 4',
              description: 'Advanced cryptography concepts for network security',
              type: 'pdf',
              course: 'Computer Network Security',
              courseCode: 'CS401',
              instructor: 'Dr. Ramesh Kumar',
              dateUploaded: '2025-03-22T09:45:00',
              size: '5.1 MB',
              downloads: 95,
              starred: true,
              fileUrl: '/assets/pdfs/CNS-UNIT4 (1).pdf' // Path to PDF in assets folder
            },
            {
              id: 4,
              title: 'Introduction to Data Structures',
              description: 'Lecture slides covering basic concepts of data structures',
              type: 'pdf',
              course: 'Data Structures',
              courseCode: 'CS301',
              instructor: 'Dr. Ramesh Kumar',
              dateUploaded: '2025-02-15T10:30:00',
              size: '2.4 MB',
              downloads: 156,
              starred: false,
              fileUrl: '/assets/pdfs/Cryptography unit 4.pdf'
            },
            {
              id: 5,
              title: 'Arrays and Linked Lists Implementation',
              description: 'Video lecture demonstrating implementation of arrays and linked lists in Java',
              type: 'video',
              course: 'Data Structures',
              courseCode: 'CS301',
              instructor: 'Dr. Ramesh Kumar',
              dateUploaded: '2025-02-20T14:15:00',
              duration: '45:20',
              size: '120 MB',
              downloads: 132,
              starred: true,
              fileUrl: 'https://example.com/videos/arrays_linked_lists.mp4'
            },
            {
              id: 6,
              title: 'Database Design Fundamentals',
              description: 'Comprehensive notes on database design principles and normalization',
              type: 'pdf',
              course: 'Database Systems',
              courseCode: 'CS302',
              instructor: 'Dr. Priya Singh',
              dateUploaded: '2025-01-28T09:45:00',
              size: '3.8 MB',
              downloads: 98,
              starred: false,
              fileUrl: '/assets/pdfs/database_design.pdf'
            }
          ];
          
          // Extract unique courses from materials
          const uniqueCourses = [...new Set(mockMaterials.map(item => item.course))].map(
            courseName => {
              const course = mockMaterials.find(item => item.course === courseName);
              return {
                name: courseName,
                code: course.courseCode
              };
            }
          );
          
          setMaterials(mockMaterials);
          setFilteredMaterials(mockMaterials);
          setCourses(uniqueCourses);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Apply filters and search whenever the filter options or search query changes
  useEffect(() => {
    if (materials.length > 0) {
      let filtered = [...materials];
      
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(material => 
          material.title.toLowerCase().includes(query) || 
          material.description.toLowerCase().includes(query) ||
          material.courseCode.toLowerCase().includes(query) ||
          material.course.toLowerCase().includes(query)
        );
      }
      
      // Apply file type filter
      if (filterType !== 'all') {
        filtered = filtered.filter(material => material.type === filterType);
      }
      
      // Apply course filter
      if (filterCourse !== 'all') {
        filtered = filtered.filter(material => material.course === filterCourse);
      }
      
      // Apply sorting
      switch (sortBy) {
        case 'newest':
          filtered.sort((a, b) => new Date(b.dateUploaded) - new Date(a.dateUploaded));
          break;
        case 'oldest':
          filtered.sort((a, b) => new Date(a.dateUploaded) - new Date(b.dateUploaded));
          break;
        case 'name_asc':
          filtered.sort((a, b) => a.title.localeCompare(b.title));
          break;
        case 'name_desc':
          filtered.sort((a, b) => b.title.localeCompare(a.title));
          break;
        case 'downloads':
          filtered.sort((a, b) => b.downloads - a.downloads);
          break;
        default:
          break;
      }
      
      setFilteredMaterials(filtered);
    }
  }, [materials, searchQuery, filterType, filterCourse, sortBy]);
  
  // Handle file download
  const handleDownload = (material) => {
    // For PDFs and other downloadable content
    if (material.fileUrl) {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.target = '_blank';
      link.download = material.title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Update download count (in a real app, you would call an API)
      setMaterials(prevMaterials => 
        prevMaterials.map(item => 
          item.id === material.id 
            ? { ...item, downloads: item.downloads + 1 } 
            : item
        )
      );

      // Update filtered materials as well to reflect the change immediately
      setFilteredMaterials(prevMaterials => 
        prevMaterials.map(item => 
          item.id === material.id 
            ? { ...item, downloads: item.downloads + 1 } 
            : item
        )
      );
    }
  };
  
  // Your existing functions
  const getFileIcon = (type) => {
    switch(type) {
      case 'pdf':
        return <i className="bi bi-file-pdf fs-1 text-danger"></i>;
      case 'video':
        return <i className="bi bi-file-play fs-1 text-primary"></i>;
      case 'document':
        return <i className="bi bi-file-word fs-1 text-info"></i>;
      case 'presentation':
        return <i className="bi bi-file-ppt fs-1 text-warning"></i>;
      default:
        return <i className="bi bi-file-earmark fs-1 text-secondary"></i>;
    }
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };
  
  const toggleStar = (id) => {
    setMaterials(prevMaterials => 
      prevMaterials.map(material => 
        material.id === id 
          ? { ...material, starred: !material.starred } 
          : material
      )
    );
    
    // Update filtered materials as well
    setFilteredMaterials(prevMaterials => 
      prevMaterials.map(material => 
        material.id === id 
          ? { ...material, starred: !material.starred } 
          : material
      )
    );
  };
  
  return (
    <div className="materials-page d-flex">
      <Sidebar collapsed={sidebarCollapsed} />
      <div className="content-wrapper flex-grow-1 min-vh-100 d-flex flex-column" style={{ marginLeft: sidebarCollapsed ? '70px' : '260px' }}>
        <Header toggleSidebar={toggleSidebar} />
        
        <Container fluid className="flex-grow-1 py-4">
          <Container>
            <Row className="mb-4">
              <Col>
                <h2 className="mb-1">Study Materials</h2>
                <p className="text-muted">
                  Access and download all your course materials in one place
                </p>
              </Col>
            </Row>
            
            {/* Search and Filter Bar */}
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4">
                <Row className="g-3">
                  <Col md={5}>
                    <InputGroup>
                      <InputGroup.Text className="bg-white">
                        <i className="bi bi-search"></i>
                      </InputGroup.Text>
                      <Form.Control 
                        placeholder="Search materials by title, description, or course code" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </InputGroup>
                  </Col>
                  <Col md={7}>
                    <Row className="g-2">
                      <Col sm={4}>
                        <Form.Group>
                          <Form.Select 
                            value={filterType} 
                            onChange={(e) => setFilterType(e.target.value)}
                          >
                            <option value="all">All Types</option>
                            <option value="pdf">PDF Files</option>
                            <option value="video">Videos</option>
                            <option value="document">Documents</option>
                            <option value="presentation">Presentations</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col sm={4}>
                        <Form.Group>
                          <Form.Select 
                            value={filterCourse} 
                            onChange={(e) => setFilterCourse(e.target.value)}
                          >
                            <option value="all">All Courses</option>
                            {courses.map((course) => (
                              <option key={course.code} value={course.name}>
                                {course.code} - {course.name}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col sm={4}>
                        <Form.Group>
                          <Form.Select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value)}
                          >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="name_asc">Title (A-Z)</option>
                            <option value="name_desc">Title (Z-A)</option>
                            <option value="downloads">Most Downloaded</option>
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            
            {/* Materials List */}
            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading materials...</p>
              </div>
            ) : (
              <>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <p className="mb-0 text-muted">
                    Showing {filteredMaterials.length} of {materials.length} materials
                  </p>
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => setFilteredMaterials(materials.filter(m => m.starred))}
                    disabled={materials.filter(m => m.starred).length === 0}
                  >
                    <i className="bi bi-star-fill me-2"></i>
                    View Starred
                  </Button>
                </div>
                
                {filteredMaterials.length > 0 ? (
                  <Row>
                    {filteredMaterials.map((material) => (
                      <Col md={6} lg={4} key={material.id} className="mb-4">
                        <Card className="h-100 border-0 shadow-sm">
                          <Card.Body>
                            <div className="d-flex mb-3">
                              <div className="me-3">
                                {getFileIcon(material.type)}
                              </div>
                              <div className="flex-grow-1">
                                <div className="d-flex justify-content-between align-items-start">
                                  <div>
                                    <h5 className="mb-1">{material.title}</h5>
                                    <p className="text-muted mb-0 small">
                                      <Badge bg="light" text="dark" className="me-2">
                                        {material.courseCode}
                                      </Badge>
                                      {material.course}
                                    </p>
                                  </div>
                                  <Button 
                                    variant="link" 
                                    className="p-0 text-warning"
                                    onClick={() => toggleStar(material.id)}
                                  >
                                    <i className={`bi ${material.starred ? 'bi-star-fill' : 'bi-star'} fs-5`}></i>
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            <p className="text-muted small mb-3">
                              {material.description}
                            </p>
                            
                            <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                              <span>
                                <i className="bi bi-person me-1"></i>
                                {material.instructor}
                              </span>
                              <span>
                                <i className="bi bi-calendar me-1"></i>
                                {formatDate(material.dateUploaded)}
                              </span>
                            </div>
                            
                            <div className="d-flex justify-content-between align-items-center text-muted small mb-3">
                              <span>
                                <i className="bi bi-download me-1"></i>
                                {material.downloads} downloads
                              </span>
                              <span>
                                {material.type === 'video' ? (
                                  <>
                                    <i className="bi bi-clock me-1"></i>
                                    {material.duration}
                                  </>
                                ) : (
                                  <>
                                    <i className="bi bi-hdd me-1"></i>
                                    {material.size}
                                  </>
                                )}
                              </span>
                            </div>
                            
                            <div className="d-flex mt-auto">
                              <Button 
                                variant="primary" 
                                className="w-100 me-2"
                                onClick={() => handleDownload(material)}
                              >
                                <i className="bi bi-download me-2"></i>
                                Download
                              </Button>
                              
                              <Dropdown>
                                <Dropdown.Toggle variant="light" id={`dropdown-${material.id}`} className="no-arrow">
                                  <i className="bi bi-three-dots-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end">
                                  <Dropdown.Item onClick={() => material.fileUrl && window.open(material.fileUrl, '_blank')}>
                                    <i className="bi bi-eye me-2"></i>
                                    Preview
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <i className="bi bi-share me-2"></i>
                                    Share
                                  </Dropdown.Item>
                                  <Dropdown.Item>
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    Report Issue
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <Card className="border-0 shadow-sm">
                    <Card.Body className="text-center py-5">
                      <i className="bi bi-search fs-1 text-muted mb-3"></i>
                      <h4>No materials found</h4>
                      <p className="text-muted">
                        Try adjusting your search or filter criteria
                      </p>
                      <Button variant="primary" onClick={() => {
                        setSearchQuery('');
                        setFilterType('all');
                        setFilterCourse('all');
                        setSortBy('newest');
                        setFilteredMaterials(materials);
                      }}>
                        Clear Filters
                      </Button>
                    </Card.Body>
                  </Card>
                )}
              </>
            )}
          </Container>
        </Container>
        
        <Footer />
      </div>
    </div>
  );
};

export default MaterialsPage;