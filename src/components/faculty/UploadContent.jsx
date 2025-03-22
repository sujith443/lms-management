import React, { useState } from 'react';
import { Card, Form, Button, Alert, ProgressBar, Row, Col, Tabs, Tab } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UploadContent = ({ courses, onUploadComplete }) => {
  const [activeTab, setActiveTab] = useState('file');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseId: '',
    moduleId: '',
    type: '',
    visibility: 'all',
    allowDownload: true,
    notifyStudents: false,
    externalUrl: '',
    embedCode: ''
  });
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Auto-detect type based on file extension
      const extension = file.name.split('.').pop().toLowerCase();
      let fileType = '';
      
      if (['pdf'].includes(extension)) {
        fileType = 'pdf';
      } else if (['doc', 'docx'].includes(extension)) {
        fileType = 'document';
      } else if (['ppt', 'pptx'].includes(extension)) {
        fileType = 'presentation';
      } else if (['mp4', 'webm', 'mov'].includes(extension)) {
        fileType = 'video';
      } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
        fileType = 'audio';
      } else {
        fileType = 'other';
      }
      
      setFormData({
        ...formData,
        title: file.name.split('.')[0],
        type: fileType
      });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.title.trim()) {
      setError('Please enter a title for the material');
      return;
    }
    
    if (!formData.courseId) {
      setError('Please select a course');
      return;
    }
    
    if (activeTab === 'file' && !selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    
    if (activeTab === 'url' && !formData.externalUrl) {
      setError('Please enter a valid URL');
      return;
    }
    
    if (activeTab === 'embed' && !formData.embedCode) {
      setError('Please enter the embed code');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setSuccess('');
    
    // Start the upload process
    setUploading(true);
    setUploadProgress(0);
    
    // Simulate upload with progress updates
    const simulateUpload = () => {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setUploading(false);
            setSuccess('Material uploaded successfully!');
            
            if (onUploadComplete) {
              onUploadComplete({
                ...formData,
                id: Date.now(),
                dateUploaded: new Date().toISOString(),
                fileSize: selectedFile ? selectedFile.size : 0,
                fileName: selectedFile ? selectedFile.name : '',
                url: activeTab === 'file' ? URL.createObjectURL(selectedFile) : 
                     activeTab === 'url' ? formData.externalUrl : ''
              });
            }
            
            // Reset form
            setSelectedFile(null);
            setFormData({
              title: '',
              description: '',
              courseId: '',
              moduleId: '',
              type: '',
              visibility: 'all',
              allowDownload: true,
              notifyStudents: false,
              externalUrl: '',
              embedCode: ''
            });
            
            return 100;
          }
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 100);
        });
      }, 300);
    };
    
    // In a real app, you would use axios or fetch to upload the file
    // For this demo, we'll just simulate the upload
    setTimeout(simulateUpload, 500);
  };
  
  const getModulesForSelectedCourse = () => {
    if (!formData.courseId) return [];
    const selectedCourse = courses.find(course => course.id === formData.courseId);
    return selectedCourse ? selectedCourse.modules || [] : [];
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0">Upload Learning Material</h5>
      </Card.Header>
      <Card.Body>
        {error && (
          <Alert variant="danger" onClose={() => setError('')} dismissible>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" onClose={() => setSuccess('')} dismissible>
            {success}
          </Alert>
        )}
        
        <Form onSubmit={handleSubmit}>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-4"
          >
            <Tab eventKey="file" title="Upload File">
              <div className="p-3 border rounded mb-4">
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Select File</Form.Label>
                  <Form.Control 
                    type="file" 
                    onChange={handleFileChange}
                    disabled={uploading}
                  />
                  <Form.Text className="text-muted">
                    Maximum file size: 200MB. Supported formats: PDF, DOC, DOCX, PPT, PPTX, MP4, MP3
                  </Form.Text>
                </Form.Group>
                
                {selectedFile && (
                  <div className="mb-3">
                    <p className="mb-1">
                      <strong>Selected File:</strong> {selectedFile.name}
                    </p>
                    <p className="mb-0">
                      <strong>Size:</strong> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}
              </div>
            </Tab>
            
            <Tab eventKey="url" title="External URL">
              <div className="p-3 border rounded mb-4">
                <Form.Group controlId="formUrl" className="mb-3">
                  <Form.Label>External URL</Form.Label>
                  <Form.Control 
                    type="url" 
                    placeholder="https://example.com/resource"
                    name="externalUrl"
                    value={formData.externalUrl}
                    onChange={handleInputChange}
                    disabled={uploading}
                  />
                  <Form.Text className="text-muted">
                    Add a link to an external resource such as YouTube video, Google Drive document, etc.
                  </Form.Text>
                </Form.Group>
              </div>
            </Tab>
            
            <Tab eventKey="embed" title="Embed Code">
              <div className="p-3 border rounded mb-4">
                <Form.Group controlId="formEmbed" className="mb-3">
                  <Form.Label>Embed Code</Form.Label>
                  <Form.Control 
                    as="textarea"
                    rows={4}
                    placeholder="<iframe src='...' />"
                    name="embedCode"
                    value={formData.embedCode}
                    onChange={handleInputChange}
                    disabled={uploading}
                  />
                  <Form.Text className="text-muted">
                    Paste embed code from YouTube, Vimeo, Slideshare, or other platforms
                  </Form.Text>
                </Form.Group>
              </div>
            </Tab>
          </Tabs>
          
          <Row className="g-3 mb-4">
            <Col md={6}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                <Form.Control 
                  type="text"
                  placeholder="Enter material title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formType">
                <Form.Label>Material Type <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="pdf">PDF Document</option>
                  <option value="document">Word Document</option>
                  <option value="presentation">Presentation</option>
                  <option value="video">Video</option>
                  <option value="audio">Audio</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={12}>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  as="textarea"
                  rows={3}
                  placeholder="Enter material description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  disabled={uploading}
                />
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formCourse">
                <Form.Label>Course <span className="text-danger">*</span></Form.Label>
                <Form.Select
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleInputChange}
                  disabled={uploading}
                  required
                >
                  <option value="">Select Course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.code} - {course.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formModule">
                <Form.Label>Module</Form.Label>
                <Form.Select
                  name="moduleId"
                  value={formData.moduleId}
                  onChange={handleInputChange}
                  disabled={uploading || !formData.courseId}
                >
                  <option value="">Select Module</option>
                  {getModulesForSelectedCourse().map(module => (
                    <option key={module.id} value={module.id}>
                      {module.title}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formVisibility">
                <Form.Label>Visibility</Form.Label>
                <Form.Select
                  name="visibility"
                  value={formData.visibility}
                  onChange={handleInputChange}
                  disabled={uploading}
                >
                  <option value="all">All Students</option>
                  <option value="specific">Specific Groups</option>
                  <option value="hidden">Hidden (Instructors Only)</option>
                </Form.Select>
              </Form.Group>
            </Col>
            
            <Col md={6} className="d-flex align-items-center mt-4">
              <Form.Check 
                type="switch"
                id="allowDownload"
                name="allowDownload"
                label="Allow students to download"
                checked={formData.allowDownload}
                onChange={handleInputChange}
                disabled={uploading}
                className="me-4"
              />
              
              <Form.Check 
                type="switch"
                id="notifyStudents"
                name="notifyStudents"
                label="Notify students"
                checked={formData.notifyStudents}
                onChange={handleInputChange}
                disabled={uploading}
              />
            </Col>
          </Row>
          
          {uploading && (
            <div className="mb-4">
              <Form.Label>Upload Progress</Form.Label>
              <ProgressBar 
                now={uploadProgress} 
                label={`${Math.round(uploadProgress)}%`} 
                animated 
              />
            </div>
          )}
          
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" disabled={uploading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={uploading}>
              {uploading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Uploading...
                </>
              ) : 'Upload Material'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

UploadContent.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      code: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      modules: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          title: PropTypes.string.isRequired
        })
      )
    })
  ).isRequired,
  onUploadComplete: PropTypes.func
};

export default UploadContent;