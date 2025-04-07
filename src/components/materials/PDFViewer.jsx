import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

const PDFViewer = ({ show, onHide, pdfUrl, title }) => {
  const [loading, setLoading] = useState(true);

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0">
        {loading && (
          <div className="d-flex justify-content-center align-items-center py-5">
            <Spinner animation="border" variant="primary" />
            <span className="ms-2">Loading PDF...</span>
          </div>
        )}
        <iframe
          src={`${pdfUrl}#toolbar=0&navpanes=0`}
          title={title}
          width="100%"
          height="500px"
          style={{ border: 'none', display: loading ? 'none' : 'block' }}
          onLoad={handleLoad}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" href={pdfUrl} download={title} target="_blank">
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

PDFViewer.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  pdfUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default PDFViewer;