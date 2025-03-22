import React from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecentActivity = ({ activities, limit = 0, showViewAll = true }) => {
  // If limit is set, only show that many activities
  const displayedActivities = limit > 0 ? activities.slice(0, limit) : activities;
  
  const getActivityIcon = (activity) => {
    if (activity.activity.includes('assignment') || activity.activity.includes('submitted')) {
      return 'bi-file-earmark-text';
    } else if (activity.activity.includes('lecture') || activity.activity.includes('viewed')) {
      return 'bi-play-circle';
    } else if (activity.activity.includes('downloaded') || activity.activity.includes('material')) {
      return 'bi-download';
    } else if (activity.activity.includes('quiz') || activity.activity.includes('test')) {
      return 'bi-check-circle';
    } else if (activity.activity.includes('comment') || activity.activity.includes('discussed')) {
      return 'bi-chat-left-text';
    } else if (activity.activity.includes('joined') || activity.activity.includes('enrolled')) {
      return 'bi-person-plus';
    } else {
      return 'bi-activity';
    }
  };
  
  const getActivityColor = (activity) => {
    if (activity.activity.includes('assignment') || activity.activity.includes('submitted')) {
      return 'primary';
    } else if (activity.activity.includes('lecture') || activity.activity.includes('viewed')) {
      return 'danger';
    } else if (activity.activity.includes('downloaded') || activity.activity.includes('material')) {
      return 'info';
    } else if (activity.activity.includes('quiz') || activity.activity.includes('test')) {
      return 'success';
    } else if (activity.activity.includes('comment') || activity.activity.includes('discussed')) {
      return 'warning';
    } else if (activity.activity.includes('joined') || activity.activity.includes('enrolled')) {
      return 'secondary';
    } else {
      return 'dark';
    }
  };
  
  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white py-3">
        <h5 className="mb-0">Recent Activity</h5>
      </Card.Header>
      
      {displayedActivities.length > 0 ? (
        <ListGroup variant="flush">
          {displayedActivities.map((activity, index) => (
            <ListGroup.Item key={activity.id || index} className="py-3">
              <div className="d-flex align-items-center">
                <div className={`activity-icon me-3 p-2 rounded-circle bg-${getActivityColor(activity)}-subtle text-center`}>
                  <i className={`bi ${getActivityIcon(activity)} text-${getActivityColor(activity)}`}></i>
                </div>
                <div>
                  <p className="mb-0">
                    <span className="fw-medium">{activity.activity}</span> in 
                    <Link to={`/courses/${activity.courseId || '#'}`} className="fw-medium ms-1 text-decoration-none">
                      {activity.course}
                    </Link>
                  </p>
                  <small className="text-muted">{activity.time}</small>
                </div>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card.Body className="text-center py-4">
          <i className="bi bi-calendar3 fs-1 text-muted mb-3"></i>
          <p className="mb-0">No recent activities</p>
        </Card.Body>
      )}
      
      {showViewAll && activities.length > 0 && (
        <Card.Footer className="bg-white text-center border-top-0">
          <Button as={Link} to="/activities" variant="link" className="text-decoration-none">
            View All Activity
          </Button>
        </Card.Footer>
      )}
    </Card>
  );
};

RecentActivity.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      activity: PropTypes.string.isRequired,
      course: PropTypes.string.isRequired,
      courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      time: PropTypes.string.isRequired
    })
  ).isRequired,
  limit: PropTypes.number,
  showViewAll: PropTypes.bool
};

export default RecentActivity;