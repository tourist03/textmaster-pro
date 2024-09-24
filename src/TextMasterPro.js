import React, { useState } from 'react';
import { Container, Card, Button, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFont, faTextHeight, faPencilAlt, faUndo, faList, faTextWidth,
  faBroom, faCut, faRandom, faEnvelope, faPhone, faCopy,
  faSort, faFingerprint, faAlignLeft, faUnderline, faMinus, faVial, faMusic, faTrashAlt, faFileDownload, faTrash, faLock, faUnlock, faSearch, faExchangeAlt, faChartBar, faLanguage, faCompressArrowsAlt , faMicrophone // New icons
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
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

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
      case "snakeCase":
        setResult(text.replace(/\s+/g, '_').toLowerCase());
        break;
      case "kebabCase":
        setResult(text.replace(/\s+/g, '-').toLowerCase());
        break;
      case "countVowels":
        const vowels = text.match(/[aeiou]/gi);
        setResult(`Vowel count: ${vowels ? vowels.length : 0}`);
        break;
      case "countConsonants":
        const consonants = text.match(/[bcdfghjklmnpqrstvwxyz]/gi);
        setResult(`Consonant count: ${consonants ? consonants.length : 0}`);
        break;
      case "removePunctuation":
        setResult(text.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, ""));
        break;
      case "leetSpeak":
        setResult(text.replace(/[aAeEiIoOsStT]/g, (char) => {
          const leetMap = { 'a': '4', 'A': '4', 'e': '3', 'E': '3', 'i': '1', 'I': '1', 'o': '0', 'O': '0', 's': '5', 'S': '5', 't': '7', 'T': '7' };
          return leetMap[char] || char;
        }));
        break;
      case "pigLatin":
        setResult(text.replace(/\b(\w)(\w*)\b/g, '$2$1ay'));
        break;
      case "morseCode":
        const morseMap = {
          'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 'y': '-.--', 'z': '--..',
          '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
          ' ': '/'
        };
        setResult(text.toLowerCase().split('').map(char => morseMap[char] || char).join(' '));
        break;
      case "rot13":
        setResult(text.replace(/[a-zA-Z]/g, (char) => {
          return String.fromCharCode(
            char <= 'Z'
              ? ((char.charCodeAt(0) - 65 + 13) % 26) + 65
              : ((char.charCodeAt(0) - 97 + 13) % 26) + 97
          );
        }));
        break;
      default:
        setResult(text);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setToastMessage("Copied to clipboard!");
    setShowToast(true);
  };

  const saveToFile = () => {
    const blob = new Blob([result], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'text.txt';
    link.click();
  };

  const clearText = () => {
    setText('');
    setResult('');
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const showModalWithContent = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleFindAndReplace = () => {
    const find = prompt("Enter the text to find:");
    const replace = prompt("Enter the replacement text:");
    if (find !== null && replace !== null) {
      setResult(text.replace(new RegExp(find, 'g'), replace));
    }
  };

  const handleTextStatistics = () => {
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.length;
    const sentenceCount = text.split(/[.!?]/).filter(Boolean).length;
    const avgWordLength = (charCount / wordCount).toFixed(2);
    showModalWithContent(
      <div>
        <p>Word Count: {wordCount}</p>
        <p>Character Count: {charCount}</p>
        <p>Sentence Count: {sentenceCount}</p>
        <p>Average Word Length: {avgWordLength}</p>
      </div>
    );
  };

  const handleTextEncryption = () => {
    const shift = parseInt(prompt("Enter the shift value for Caesar cipher (1-25):"), 10);
    if (!isNaN(shift) && shift >= 1 && shift <= 25) {
      setResult(text.replace(/[a-zA-Z]/g, (char) => {
        return String.fromCharCode(
          char <= 'Z'
            ? ((char.charCodeAt(0) - 65 + shift) % 26) + 65
            : ((char.charCodeAt(0) - 97 + shift) % 26) + 97
        );
      }));
    }
  };

  const handleTextDecryption = () => {
    const shift = parseInt(prompt("Enter the shift value for Caesar cipher (1-25):"), 10);
    if (!isNaN(shift) && shift >= 1 && shift <= 25) {
      setResult(text.replace(/[a-zA-Z]/g, (char) => {
        return String.fromCharCode(
          char <= 'Z'
            ? ((char.charCodeAt(0) - 65 - shift + 26) % 26) + 65
            : ((char.charCodeAt(0) - 97 - shift + 26) % 26) + 97
        );
      }));
    }
  };

  const handleTextFormatting = () => {
    const format = prompt("Enter the format type (title, sentence):");
    if (format === "title") {
      setResult(text.replace(/\b\w/g, (char) => char.toUpperCase()));
    } else if (format === "sentence") {
      setResult(text.replace(/(^\w{1}|\.\s*\w{1})/gi, (char) => char.toUpperCase()));
    }
  };

  const handleTextSummarization = () => {
    // Simple summarization by taking the first 3 sentences
    const sentences = text.split(/[.!?]/).filter(Boolean);
    setResult(sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '...' : ''));
  };

  const handleTextTranslation = async () => {
    const targetLanguage = prompt("Enter the target language code (e.g., 'es' for Spanish):");
    if (targetLanguage) {
      try {
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`);
        const data = await response.json();
        setResult(data.responseData.translatedText);
      } catch (error) {
        setToastMessage("Translation failed!");
        setShowToast(true);
      }
    }
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
      { name: 'snakeCase', label: 'Snake Case', icon: faUnderline },
      { name: 'kebabCase', label: 'Kebab Case', icon: faMinus },
      { name: 'countVowels', label: 'Count Vowels', icon: faVial },
      { name: 'countConsonants', label: 'Count Consonants', icon: faMusic },
      { name: 'removePunctuation', label: 'Remove Punctuation', icon: faTrashAlt },
      { name: 'leetSpeak', label: 'Leet Speak', icon: faMicrophone },
      { name: 'pigLatin', label: 'Pig Latin', icon: faMicrophone },
      { name: 'morseCode', label: 'Morse Code', icon: faMicrophone },
      { name: 'rot13', label: 'ROT13', icon: faMicrophone },
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
            <Button variant="secondary" onClick={saveToFile} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faFileDownload} className="me-2" />
              Save to File
            </Button>
            <Button variant="danger" onClick={clearText} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faTrash} className="me-2" />
              Clear Text
            </Button>
            <Button variant="info" onClick={handleFindAndReplace} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faSearch} className="me-2" />
              Find and Replace
            </Button>
            <Button variant="info" onClick={handleTextStatistics} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faChartBar} className="me-2" />
              Text Statistics
            </Button>
            <Button variant="info" onClick={handleTextEncryption} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faLock} className="me-2" />
              Encrypt Text
            </Button>
            <Button variant="info" onClick={handleTextDecryption} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faUnlock} className="me-2" />
              Decrypt Text
            </Button>
            <Button variant="info" onClick={handleTextFormatting} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faExchangeAlt} className="me-2" />
              Text Formatting
            </Button>
            <Button variant="info" onClick={handleTextSummarization} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faCompressArrowsAlt} className="me-2" />
              Summarize Text
            </Button>
            <Button variant="info" onClick={handleTextTranslation} className="mt-3 ms-2">
              <FontAwesomeIcon icon={faLanguage} className="me-2" />
              Translate Text
            </Button>
          </Card.Body>
        </Card>

        <NotificationToast showToast={showToast} toastMessage={toastMessage} setShowToast={setShowToast} />
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TextMasterPro;