import React, { useState } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFont, faTextHeight, faPencilAlt, faUndo, faList, faTextWidth,
  faBroom, faCut, faRandom, faEnvelope, faPhone , faCopy,
  faSort, faFingerprint, faHeading, faAlignLeft // New icons
} from '@fortawesome/free-solid-svg-icons';
import TextInput from './components/TextInput';
import TextOutput from './components/TextOutput';
import OperationButtons from './components/OperationButtons';
import NotificationToast from './components/NotificationToast';

import 'bootstrap/dist/css/bootstrap.min.css';
import './TextMasterPro.css';

const TextMasterPro = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');

  const handleTextChange = (e) => setText(e.target.value);


  const performOperation = (operation) => {
    switch (operation) {
      case "uppercase":
        setResult(text.toUpperCase());
        break;
      case "lowercase":
        setResult(text.toLowerCase());
        break;
      case "capitalize":
        setResult(text.replace(/\b\w/g, (char) => char.toUpperCase()));
        break;
      case "reverse":
        setResult(text.split("").reverse().join(""));
        break;
      case "wordCount":
        setResult(`Word count: ${text.trim().split(/\s+/).length}`);
        break;
      case "charCount":
        setResult(`Character count: ${text.length}`);
        break;
      case "removeSpaces":
        setResult(text.replace(/\s+/g, ""));
        break;
      case "trimLines":
        setResult(
          text
            .split("\n")
            .map((line) => line.trim())
            .join("\n")
        );
        break;
      case "shuffleWords":
        setResult(
          text
            .split(/\s+/)
            .sort(() => Math.random() - 0.5)
            .join(" ")
        );
        break;
      case "extractEmails":
        const emailRegex = /[\w.+-]+@[\w-]+\.[\w.-]+/g;
        const emails = text.match(emailRegex) || [];
        setResult(emails.join("\n") || "No email addresses found.");
        break;
      case "extractPhones":
        const phoneRegex =
          /(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})/g;
        const phones = text.match(phoneRegex) || [];
        setResult(phones.join("\n") || "No phone numbers found.");
        break;
      case "removeDuplicates":
        setResult([...new Set(text.split(/\s+/))].join(" "));
        break;
      case "sortLines":
        setResult(text.split("\n").sort().join("\n"));
        break;
      case "uniqueWords":
        setResult([...new Set(text.toLowerCase().match(/\b\w+\b/g))].join("\n"));
        break;
      case "titleCase":
        setResult(text.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()));
        break;
      default:
        setResult("");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result).then(
      () => {
        setToastMessage("Text copied to clipboard successfully!");
        setShowToast(true);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        setToastMessage("Failed to copy text. Please try again.");
        setShowToast(true);
      }
    );
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const operations = {
    basic: [
      { name: 'uppercase', label: 'Uppercase', icon: faFont },
      { name: 'lowercase', label: 'Lowercase', icon: faTextHeight },
      { name: 'capitalize', label: 'Capitalize', icon: faPencilAlt },
      { name: 'reverse', label: 'Reverse', icon: faUndo },
      { name: 'wordCount', label: 'Word Count', icon: faList },
      { name: 'charCount', label: 'Char Count', icon: faTextWidth },
    ],
    advanced: [
      { name: 'removeSpaces', label: 'Remove Spaces', icon: faBroom },
      { name: 'trimLines', label: 'Trim Lines', icon: faCut },
      { name: 'shuffleWords', label: 'Shuffle Words', icon: faRandom },
      { name: 'extractEmails', label: 'Extract Emails', icon: faEnvelope },
      { name: 'extractPhones', label: 'Extract Phones', icon: faPhone },
      { name: 'removeDuplicates', label: 'Remove Duplicates', icon: faFingerprint },
      { name: 'sortLines', label: 'Sort Lines', icon: faSort },
      { name: 'uniqueWords', label: 'Unique Words', icon: faAlignLeft },
      { name: 'titleCase', label: 'Title Case', icon: faHeading },
    ],
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Container className="py-5">
        <Card className="main-card">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h1 className="text-center flex-grow-1">TextMaster Pro</h1>
            <Form.Check 
              type="switch"
              id="theme-switch"
              label={isDarkMode ? "🌙" : "☀️"}
              checked={isDarkMode}
              onChange={toggleTheme}
              className="ms-3"
            />
          </Card.Header>
          <Card.Body>
            <TextInput text={text} handleTextChange={handleTextChange} />
            
            <div className="tab-buttons mb-3">
              <Button 
                variant={activeTab === 'basic' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('basic')}
                className="me-2"
              >
                Basic Operations
              </Button>
              <Button 
                variant={activeTab === 'advanced' ? 'primary' : 'outline-primary'}
                onClick={() => setActiveTab('advanced')}
              >
                Advanced Operations
              </Button>
            </div>

            <OperationButtons 
              operations={operations[activeTab]} 
              performOperation={performOperation} 
            />

            <TextOutput result={result} />
            <Button variant="secondary" onClick={copyToClipboard} className="mt-3 copy-button">
              <FontAwesomeIcon icon={faCopy} className="me-2" />
              Copy Result
            </Button>
          </Card.Body>
        </Card>

        <NotificationToast showToast={showToast} toastMessage={toastMessage} setShowToast={setShowToast} />
      </Container>
    </div>
  );
};

export default TextMasterPro;