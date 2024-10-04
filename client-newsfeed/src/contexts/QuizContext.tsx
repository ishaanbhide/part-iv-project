import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Answers {
  [key: number]: string;
}

interface QuizContextType {
  answers: Answers;
  setAnswers: React.Dispatch<React.SetStateAction<Answers>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Answers>({});

  return (
    <QuizContext.Provider value={{ answers, setAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};