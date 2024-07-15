import React, { useState, useEffect } from 'react';
import { 
  Container, 
  TextField, 
  Typography, 
  Box,
  Paper
} from '@mui/material';

function App() {
  const [input, setInput] = useState('');
  const [regexInput, setRegexInput] = useState('');
  const [highlightedText, setHighlightedText] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleRegexChange = (event) => {
    setRegexInput(event.target.value);
  };

  useEffect(() => {
    highlightMatches();
  }, [input, regexInput]);

  const highlightMatches = () => {
    if (!input || !regexInput) {
      setHighlightedText(input);
      return;
    }

    try {
      const regex = new RegExp(regexInput, 'g');
      const parts = input.split(regex);
      const matches = input.match(regex);

      if (!matches) {
        setHighlightedText(input);
        return;
      }

      const highlighted = parts.reduce((acc, part, i) => {
        if (i !== parts.length - 1) {
          return acc + part + `<mark>${matches[i]}</mark>`;
        }
        return acc + part;
      }, '');

      setHighlightedText(highlighted);
    } catch (error) {
      console.error('Invalid regex:', error);
      setHighlightedText(input);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(45deg, #0077be 30%, #00008b 90%)',
      padding: '20px'
    }}>
      <Container maxWidth="md">
        <Box my={4}>
          <Paper elevation={3} style={{ padding: '2rem' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Regex Tester
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              label="Enter sample string"
              value={input}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              variant="outlined"
              label="Enter regex"
              value={regexInput}
              onChange={handleRegexChange}
              margin="normal"
            />
            <Typography variant="h6" gutterBottom style={{ marginTop: '20px' }}>
              Matches:
            </Typography>
            <Paper 
              elevation={3} 
              style={{ 
                padding: '16px', 
                whiteSpace: 'pre-wrap', 
                wordBreak: 'break-word' 
              }}
            >
              <div dangerouslySetInnerHTML={{ __html: highlightedText }} />
            </Paper>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}

export default App;