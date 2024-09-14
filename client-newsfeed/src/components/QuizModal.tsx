import React, { useState } from 'react';
import { 
  Button, 
  Modal, 
  Box, 
  Typography, 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel
} from '@mui/material';
import { useQuiz } from '../contexts/QuizContext';

interface Question {
  id: number;
  question: string;
  options: string[];
}

interface Answers {
  [key: number]: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Would you like high contrast to help with visual impairment?",
    options: ["Yes", "No"]
  },
  {
    id: 2,
    question: "Would you like recommended step by step instructions?",
    options: ["Yes", "No"]
  },
  {
    id: 3,
    question: "Would you like audio confirmation with your text input?",
    options: ["Yes", "No"]
  },
  {
    id: 4,
    question: "Would you like a bigger display?",
    options: ["Yes", "No"]
  },
];

const QuizModal: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { answers, setAnswers } = useQuiz();

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => {
    setOpen(false);
    console.log(answers);
  };

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, questionId: number): void => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: event.target.value
    }));
    console.log(answers);
  };

  return (
    <>
      <Button onClick={handleOpen} aria-label="Open quiz modal">Take the quiz</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="quiz-modal-title"
        aria-describedby="quiz-modal-description"
        BackdropProps={{
          style: { backgroundColor: 'white' }
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '80%', sm: '80%', md: '60%', lg: '50%' },
          maxWidth: 600,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          maxHeight: '80vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Typography id="quiz-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
            Quiz
          </Typography>
          <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
            {questions.map((q: Question) => (
              <FormControl key={q.id} component="fieldset" sx={{ mt: 2 }}>
                <FormLabel component="legend">{q.question}</FormLabel>
                <RadioGroup
                  aria-label={`question-${q.id}`}
                  name={`question-${q.id}`}
                  value={answers[q.id] || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleAnswerChange(e, q.id)}
                >
                  {q.options.map((option: string, index: number) => (
                    <FormControlLabel 
                      key={index} 
                      value={option} 
                      control={<Radio aria-label={option} />} 
                      label={option} 
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={handleClose} variant="contained" aria-label="Close quiz modal">Close</Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default QuizModal;