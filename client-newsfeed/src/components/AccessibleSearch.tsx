// import React from 'react';
// import { Box, TextField, Button } from '@mui/material';
// import MapIcon from '@mui/icons-material/Map';
// import TuneIcon from '@mui/icons-material/Tune';
// import QuizModal from './QuizModal';
// import SpeakingTextField from './SpeakingTextField';

// const AccessibleSearchBar = ({ isBiggerFont, isVoiceAssist, handleSearchChange, handleMapOpen }) => {
//   const iconSize = isBiggerFont ? 'large' : 'medium';
//   const fontSize = isBiggerFont ? '1.2rem' : '1rem';
//   const padding = isBiggerFont ? '12px' : '8px';

//   const buttonStyle = {
//     backgroundColor: '#000000',
//     color: '#FFFFFF',
//     '&:hover': {
//       backgroundColor: '#333333',
//     },
//     padding: padding,
//   };

//   const textFieldStyle = {
//     flexGrow: 1,
//     '& .MuiInputBase-input': {
//       fontSize: fontSize,
//     },
//     '& .MuiInputLabel-root': {
//       fontSize: fontSize,
//     },
//   };

//   return (
//     <Box 
//       sx={{ 
//         display: "flex", 
//         alignItems: "center", 
//         gap: isBiggerFont ? "24px" : "16px", 
//         mb: isBiggerFont ? 3 : 2,
//         backgroundColor: '#F5F5F5',
//         padding: isBiggerFont ? '16px' : '8px',
//         borderRadius: '8px',
//       }}
//     >
//       <Button
//         onClick={() => {}} // Add your QuizModal open handler here
//         aria-label="Open quiz modal"
//         sx={buttonStyle}
//       >
//         <TuneIcon fontSize={iconSize} />
//       </Button>

//       {isVoiceAssist === "Yes" ? (
//         <SpeakingTextField
//           id="filled-basic"
//           label="Search"
//           onChange={handleSearchChange}
//           sx={textFieldStyle}
//         />
//       ) : (
//         <TextField
//           id="filled-basic"
//           label="Search"
//           onChange={handleSearchChange}
//           sx={textFieldStyle}
//         />
//       )}

//       <Button
//         onClick={handleMapOpen}
//         aria-label="Open map"
//         sx={buttonStyle}
//       >
//         <MapIcon fontSize={iconSize} />
//       </Button>
//     </Box>
//   );
// };

// export default AccessibleSearchBar;

import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import TuneIcon from '@mui/icons-material/Tune';
import QuizModal from './QuizModal';
import SpeakingTextField from './SpeakingTextField';

interface AccessibleSearchBarProps {
  isBiggerFont: boolean;
  isVoiceAssist: string;
  isHighContrast: boolean;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMapOpen: () => void;
}

const AccessibleSearchBar: React.FC<AccessibleSearchBarProps> = ({ 
  isBiggerFont, 
  isVoiceAssist,
  isHighContrast, 
  handleSearchChange, 
  handleMapOpen 
}) => {
  const [quizModalOpen, setQuizModalOpen] = useState<boolean>(false);

  console.log("inside accessiblesearch " + isBiggerFont)

  const iconSize = isBiggerFont ? 'large' : 'medium';
  const fontSize = isBiggerFont ? '1.2rem' : '1rem';
  const padding = isBiggerFont ? '12px' : '8px';

  const buttonStyle = {
    backgroundColor: '#000000',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#00026E',
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

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: isBiggerFont ? "24px" : "16px", 
        mb: isBiggerFont ? 3 : 2,
        backgroundColor: isHighContrast ? "white" : "#F4F6FC",
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

      <Button
        onClick={handleMapOpen}
        aria-label="Open map"
        sx={buttonStyle}
      >
        <MapIcon fontSize={iconSize} />
      </Button>

      <QuizModal open={quizModalOpen} onClose={handleQuizModalClose} />
    </Box>
  );
};

export default AccessibleSearchBar;