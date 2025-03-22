import React from 'react';
import { Spinner, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Loader = ({ 
  fullScreen = false, 
  size = 'md', 
  message = 'Loading...', 
  variant = 'primary' 
}) => {
  const spinnerSizes = {
    sm: '1rem',
    md: '2rem',
    lg: '3rem',
    xl: '4rem'
  };
  
  if (fullScreen) {
    return (
      <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
        <div className="text-center">
          <Spinner
            animation="border"
            variant={variant}
            style={{ width: spinnerSizes[size], height: spinnerSizes[size] }}
          />
          {message && <p className="mt-3">{message}</p>}
        </div>
      </div>
    );
  }
  
  return (
    <Container className="d-flex justify-content-center align-items-center py-5">
      <div className="text-center">
        <Spinner
          animation="border"
          variant={variant}
          style={{ width: spinnerSizes[size], height: spinnerSizes[size] }}
        />
        {message && <p className="mt-3">{message}</p>}
      </div>
    </Container>
  );
};

Loader.propTypes = {
  fullScreen: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  message: PropTypes.string,
  variant: PropTypes.string
};

export default Loader;