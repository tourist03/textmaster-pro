import React from 'react';
import { Toast } from 'react-bootstrap';

const NotificationToast = ({ showToast, toastMessage, setShowToast }) => (
  <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide
         style={{ position: 'absolute', top: 20, right: 20 }}>
    <Toast.Header>
      <strong className="mr-auto">Notification</strong>
    </Toast.Header>
    <Toast.Body>{toastMessage}</Toast.Body>
  </Toast>
);

export default NotificationToast;
