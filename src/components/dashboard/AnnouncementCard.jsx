import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const AnnouncementCard = ({ announcement, showActions = true }) => {
  return (
    <Card className="border-0 shadow-sm mb-3">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title mb-0">
            {announcement.title}
            {announcement.important && (
              <Badge bg="danger" className="ms-2">Important</Badge>
            )}
          </h5>
          <small className="text-muted">{announcement.date}</small>
        </div>
        
        <p className="mb-3">{announcement.content}</p>
        
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">
            Posted by: {announcement.author}
          </small>
          
          {showActions && (
            <div>
              <Button variant="link" className="text-decoration-none p-0 me-3">
                <i className="bi bi-chat-left-text me-1"></i> Comment
              </Button>
              <Button variant="link" className="text-decoration-none p-0">
                <i className="bi bi-share me-1"></i> Share
              </Button>
            </div>
          )}
        </div>
        
        {announcement.attachments && announcement.attachments.length > 0 && (
          <div className="mt-3 pt-3 border-top">
            <h6 className="mb-2">Attachments:</h6>
            <div className="d-flex flex-wrap gap-2">
              {announcement.attachments.map((attachment, index) => (
                <a
                  key={index}
                  href={attachment.url}
                  className="text-decoration-none border rounded p-2 d-flex align-items-center"
                  download
                >
                  <i className={`bi ${
                    attachment.type === 'pdf' ? 'bi-file-pdf text-danger' :
                    attachment.type === 'doc' ? 'bi-file-word text-primary' :
                    attachment.type === 'ppt' ? 'bi-file-ppt text-warning' :
                    attachment.type === 'img' ? 'bi-file-image text-success' :
                    'bi-file-earmark text-secondary'
                  } me-2`}></i>
                  <span className="text-truncate" style={{ maxWidth: '120px' }}>
                    {attachment.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

AnnouncementCard.propTypes = {
  announcement: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    important: PropTypes.bool,
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  showActions: PropTypes.bool
};

export default AnnouncementCard;