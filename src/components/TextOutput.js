import React from 'react';
import { Form } from 'react-bootstrap';

const TextOutput = ({ result }) => (
  <Form.Group className="mb-3">
    <Form.Control
      as="textarea"
      rows={5}
      placeholder="Your transformed text will appear here... Magic in progress! 🎩✨"
      value={result}
      readOnly
    />
  </Form.Group>
);

export default TextOutput;
