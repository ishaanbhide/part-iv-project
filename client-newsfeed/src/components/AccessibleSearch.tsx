import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import QuizModal from './QuizModal';
import SpeakingTextField from './SpeakingTextField';

interface AccessibleSearchBarProps {
  isBiggerFont: boolean;
  isVoiceAssist: string;
  isHighContrast: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMapOpen: () => void;
  severity: string; // Add severity prop
  setSeverity: React.Dispatch<React.SetStateAction<string>>;
}

const AccessibleSearchBar: React.FC<AccessibleSearchBarProps> = ({
  isBiggerFont,
  isVoiceAssist,
  isHighContrast,
  handleSearchChange,
  handleMapOpen,
  severity,
  setSeverity
}) => {
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);
  // const [severity, setSeverity] = useState<string>('All'); // State for selected severity

  const iconSize = isBiggerFont ? 'large' : 'medium';
  const fontSize = isBiggerFont ? '1.2rem' : '1rem';
  const padding = isBiggerFont ? '12px' : '8px';

  const buttonStyle = {
    backgroundColor: '#00026E',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#333333',
    },
    padding: padding,
  };

  const textFieldStyle = {
    flexGrow: 1,
    '& .MuiInputBase-input': {
      fontSize: fontSize,
    },
    '& .MuiInputLabel-root': {
      fontSize: fontSize,
    },
  };

  const handleQuizModalOpen = () => {
    setQuizModalOpen(true);
  };

  const handleQuizModalClose = () => {
    setQuizModalOpen(false);
  };

  const handleSeverityChange = (event: any) => {
    setSeverity(event.target.value as string);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: isBiggerFont ? "24px" : "16px",
        mb: isBiggerFont ? 3 : 2,
        backgroundColor: isHighContrast ? "white" : "#FFF8E7",
        padding: isBiggerFont ? '16px' : '8px',
        borderRadius: '8px',
      }}
    >
      <Button
        onClick={handleQuizModalOpen}
        aria-label="Open quiz modal"
        sx={buttonStyle}
      >
        <TuneIcon fontSize={iconSize} />
      </Button>

      {isVoiceAssist === "Yes" ? (
        <SpeakingTextField
          id="filled-basic"
          label="Search"
          onChange={handleSearchChange}
          sx={textFieldStyle}
        />
      ) : (
        <TextField
          id="filled-basic"
          label="Search"
          onChange={handleSearchChange}
          sx={textFieldStyle}
        />
      )}

      <FormControl variant="outlined" sx={{ minWidth: 120}}>
        <InputLabel id="severity-label" sx={{ fontSize }}>{'Severity'}</InputLabel>
        <Select
          labelId="severity-label"
          id="severity-select"
          value={severity}
          onChange={handleSeverityChange}
          label="Severity"
          sx={{ fontSize }}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="High">High</MenuItem>
        </Select>
      </FormControl>

      <QuizModal open={quizModalOpen} onClose={handleQuizModalClose} />
    </Box>
  );
};

export default AccessibleSearchBar;
