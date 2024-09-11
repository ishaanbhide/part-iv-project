import { TextField as MuiTextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, useState } from "react";

const speak = (text: string) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  }
};

const SpeakingTextField = (props: TextFieldProps) => {
  const [prevValue, setPrevValue] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const currentValue = e.target.value;
    
    if (currentValue.length < prevValue.length) {
      const deletedChar = prevValue[prevValue.length - 1];
      speak(`deleted ${deletedChar}`);
    } else if (currentValue.length > prevValue.length) {
      const newChar = currentValue[currentValue.length - 1];
      speak(newChar);
    }

    setPrevValue(currentValue);
    
    if (props.onChange) {
      props.onChange(e);
    }
  };

  return <MuiTextField {...props} onChange={handleChange} />;
};

export default SpeakingTextField;