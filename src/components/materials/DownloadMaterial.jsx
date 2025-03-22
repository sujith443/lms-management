import React, { useState, useEffect } from 'react';
import { Card, Button, ProgressBar, Alert } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DownloadMaterial = ({ material, onDownloadComplete, onCancel }) => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [completed, setCompleted] = useState(false);
  
  // Simulate download process
  useEffect(() => {
    let interval;
    
    if (downloading && !completed && !error) {
      interval = setInterval(() => {
        setProgress(prevProgress => {
          // Simulate random progress increases
          const increment = Math.random() * 15;
          const newProgress = prevProgress + increment;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            setCompleted(true);
            setProgress(100);
            
            if (onDownloadComplete) {
              onDownloadComplete();
            }
            
            return 100;
          }
          
          return newProgress;
        });
      }, 500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [downloading, completed, error, onDownloadComplete]);
  
  const startDownload = () => {
    setDownloading(true);
    setProgress(0);
    setError(null);
    setCompleted(false);
    
    // Implement real download logic here using fetch or axios
    // For demonstration, we're just using the simulated progress above
  };
  
  const cancelDownload = () => {
    setDownloading(false);
    setProgress(0);
    setError(null);
    setCompleted(false);
    
    if (onCancel) {
      onCancel();
    }
  };
  
  const retryDownload = () => {
    setError(null);
    startDownload();
  };
  
  const getFileIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'pdf':
        return <i className="bi bi-file-pdf fs-1 text-danger"></i>;
      case 'video':
        return <i className="bi bi-file-play fs-1 text-primary"></i>;
      case 'document':
        return <i className="bi bi-file-word fs-1 text-info"></i>;
      case 'presentation':
        return <i className="bi bi-file-ppt fs-1 text-warning"></i>;
      case 'audio':
        return <i className="bi bi-file-music fs-1 text-success"></i>;
      case 'html':
        return <i className="bi bi-file-code fs-1 text-secondary"></i>;
      default:
        return <i className="bi bi-file-earmark fs-1 text-secondary"></i>;
    }
  };
  
  const formatFileSize = (size) => {
    if (!size) return '';
    
    if (typeof size === 'string') {
      return size;
    }
    
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let formattedSize = size;
    let unitIndex = 0;
    
    while (formattedSize >= 1024 && unitIndex < units.length - 1) {
      formattedSize /= 1024;
      unitIndex++;
    }
    
    return `${formattedSize.toFixed(2)} ${units[unitIndex]}`;
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Body className="p-4">
        <div className="d-flex align-items-start mb-4">
          <div className="me-3">
            {getFileIcon(material.type)}
          </div>
          <div>
            <h5>{material.title}</h5>
            <p className="text-muted mb-0">{material.description}</p>
          </div>
        </div>
        
        {error && (
          <Alert variant="danger" className="mb-4">
            <Alert.Heading>Download Failed</Alert.Heading>
            <p>{error}</p>
          </Alert>
        )}
        
        <div className="mb-4">
          <div className="d-flex justify-content-between mb-2">
            <span>File Size: {formatFileSize(material.size)}</span>
            {downloading && !completed && (
              <span>Downloaded: {formatFileSize(material.size * (progress / 100))}</span>
            )}
          </div>
          
          {(downloading || completed) && (
            <ProgressBar 
              now={progress} 
              variant={completed ? "success" : "primary"} 
              className="mb-2"
              animated={downloading && !completed}
            />
          )}
          
          {downloading && !completed && (
            <div className="text-center">
              <small className="text-muted">Downloading... {progress.toFixed(0)}%</small>
            </div>
          )}
          
          {completed && (
            <div className="text-center">
              <small className="text-success">Download Complete</small>
            </div>
          )}
        </div>
        
        <div className="d-grid gap-2">
          {!downloading && !completed && (
            <Button 
              variant="primary" 
              onClick={startDownload}
            >
              <i className="bi bi-download me-2"></i>
              Download Material
            </Button>
          )}
          
          {downloading && !completed && (
            <Button 
              variant="outline-danger" 
              onClick={cancelDownload}
            >
              <i className="bi bi-x-circle me-2"></i>
              Cancel Download
            </Button>
          )}
          
          {completed && (
            <>
              <Button 
                variant="success" 
                href={material.url} 
                download
              >
                <i className="bi bi-file-earmark-arrow-down me-2"></i>
                Save File
              </Button>
              
              <Button 
                variant="outline-primary" 
                onClick={startDownload}
              >
                <i className="bi bi-arrow-repeat me-2"></i>
                Download Again
              </Button>
            </>
          )}
          
          {error && (
            <Button 
              variant="outline-primary" 
              onClick={retryDownload}
            >
              <i className="bi bi-arrow-repeat me-2"></i>
              Retry Download
            </Button>
          )}
        </div>
        
        <div className="mt-4 pt-3 border-top">
          <h6>Download Details</h6>
          <table className="table table-sm">
            <tbody>
              <tr>
                <th scope="row">Type</th>
                <td>{material.type}</td>
              </tr>
              <tr>
                <th scope="row">Course</th>
                <td>{material.course}</td>
              </tr>
              <tr>
                <th scope="row">Uploaded By</th>
                <td>{material.instructor}</td>
              </tr>
              <tr>
                <th scope="row">Upload Date</th>
                <td>{new Date(material.dateUploaded).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th scope="row">Download Count</th>
                <td>{material.downloads} downloads</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card.Body>
    </Card>
  );
};

DownloadMaterial.propTypes = {
  material: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    type: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    course: PropTypes.string,
    instructor: PropTypes.string,
    dateUploaded: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    downloads: PropTypes.number
  }).isRequired,
  onDownloadComplete: PropTypes.func,
  onCancel: PropTypes.func
};

export default DownloadMaterial;