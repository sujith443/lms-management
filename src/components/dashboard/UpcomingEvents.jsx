import React from 'react';
import { Card, ListGroup, Badge, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const UpcomingEvents = ({ events }) => {
  const getEventTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'quiz':
        return <i className="bi bi-question-circle text-info"></i>;
      case 'assignment':
        return <i className="bi bi-file-earmark-text text-warning"></i>;
      case 'exam':
        return <i className="bi bi-journal-check text-danger"></i>;
      case 'event':
        return <i className="bi bi-calendar-event text-success"></i>;
      default:
        return <i className="bi bi-calendar text-primary"></i>;
    }
  };
  
  const getEventTypeBadge = (type) => {
    switch (type.toLowerCase()) {
      case 'quiz':
        return <Badge bg="info">{type}</Badge>;
      case 'assignment':
        return <Badge bg="warning">{type}</Badge>;
      case 'exam':
        return <Badge bg="danger">{type}</Badge>;
      case 'event':
        return <Badge bg="success">{type}</Badge>;
      default:
        return <Badge bg="primary">{type}</Badge>;
    }
  };
  
  const formatDate = (date) => {
    // Extract month and day from date string (e.g., "Mar 25, 2025")
    const parts = date.split(',')[0].split(' ');
    return {
      month: parts[0],
      day: parts[1]
    };
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white py-3 d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Upcoming Events</h5>
        <Button variant="link" className="text-decoration-none p-0">View Calendar</Button>
      </Card.Header>
      <ListGroup variant="flush">
        {events.length > 0 ? (
          events.map((event) => {
            const date = formatDate(event.date);
            return (
              <ListGroup.Item key={event.id} className="py-3 border-bottom">
                <div className="d-flex">
                  <div className="me-3 text-center">
                    <div className="bg-light rounded p-2">
                      <div className="small text-uppercase text-muted">
                        {date.month}
                      </div>
                      <div className="fw-bold fs-4">
                        {date.day}
                      </div>
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-1">
                      {getEventTypeIcon(event.type)} <span className="ms-2">{event.title}</span>
                    </h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="d-flex align-items-center text-muted small mb-1">
                          <i className="bi bi-clock me-1"></i>
                          <span>{event.time}</span>
                        </div>
                        <div className="d-flex align-items-center text-muted small">
                          <i className="bi bi-geo-alt me-1"></i>
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <div>
                        {getEventTypeBadge(event.type)}
                      </div>
                    </div>
                  </div>
                </div>
              </ListGroup.Item>
            );
          })
        ) : (
          <ListGroup.Item className="py-4 text-center text-muted">
            <i className="bi bi-calendar2-check fs-4 mb-2"></i>
            <p className="mb-0">No upcoming events</p>
          </ListGroup.Item>
        )}
      </ListGroup>
      {events.length > 0 && (
        <Card.Footer className="bg-white text-center border-top-0">
          <Button variant="link" className="text-decoration-none">
            View All Events
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

UpcomingEvents.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired
    })
  ).isRequired
};

export default UpcomingEvents;