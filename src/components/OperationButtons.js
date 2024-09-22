import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OperationButtons = ({ operations, performOperation }) => {
  return (
    <Row>
      {operations.map((op, index) => (
        <Col md={4} className="mb-3" key={index}>
          <Button
            variant={index % 2 === 0 ? 'primary' : 'secondary'}
            className="w-100 d-flex align-items-center justify-content-center operation-button"
            onClick={() => performOperation(op.name)}
          >
            <FontAwesomeIcon icon={op.icon} className="me-2" />
            {op.label}
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default OperationButtons;