import React from 'react';
import { Card, Badge, ProgressBar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CourseCard = ({ course }) => {
  return (
    <Card className="h-100 shadow-sm course-card">
      <div className="position-relative">
        <Card.Img 
          variant="top" 
          src={course.coverImage || 'https://source.unsplash.com/random/300x150/?education'} 
          height="140" 
          style={{ objectFit: 'cover' }} 
        />
        {course.unreadItems > 0 && (
          <Badge 
            pill 
            bg="danger" 
            className="position-absolute top-0 end-0 m-2"
          >
            {course.unreadItems} new
          </Badge>
        )}
      </div>
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <div>
            <Badge bg="light" text="dark" className="me-2">
              {course.code}
            </Badge>
            <Card.Title className="mb-0 h5">{course.title}</Card.Title>
          </div>
        </div>
        <Card.Text className="text-muted small">
          Instructor: {course.instructor}
        </Card.Text>
        <div className="mt-3">
          <div className="d-flex justify-content-between mb-1">
            <small>Progress</small>
            <small className="text-muted">{course.progress}%</small>
          </div>
          <ProgressBar 
            now={course.progress} 
            variant={
              course.progress >= 75 ? "success" :
              course.progress >= 50 ? "info" :
              course.progress >= 25 ? "warning" : "danger"
            } 
            className="mb-3"
          />
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              <i className="bi bi-clock me-1"></i> 
              Next class: {course.nextClass || 'N/A'}
            </small>
            <Button 
              as={Link}
              to={`/courses/${course.id}`}
              variant="primary" 
              size="sm"
            >
              View
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    code: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    instructor: PropTypes.string.isRequired,
    progress: PropTypes.number.isRequired,
    unreadItems: PropTypes.number,
    nextClass: PropTypes.string,
    coverImage: PropTypes.string
  }).isRequired
};

export default CourseCard;