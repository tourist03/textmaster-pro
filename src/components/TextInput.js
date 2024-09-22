import React from 'react';
import { Form } from 'react-bootstrap';

const TextInput = ({ text, handleTextChange }) => (
  <Form.Group className="mb-3">
    <Form.Control
      as="textarea"
      rows={5}
      placeholder="Enter your text here... Let the magic begin! ✨"
      value={text}
      onChange={handleTextChange}
    />
  </Form.Group>
);

export default TextInput;
