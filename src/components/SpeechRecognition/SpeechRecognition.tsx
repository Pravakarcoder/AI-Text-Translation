"use client";
import React, { useEffect } from "react";

import { IconMicrophone } from "@tabler/icons-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

type Props = {
  setSourceText: any;
};

const SpeechRecognitionComponent: React.FC<Props> = ({ setSourceText }) => {
  const { transcript, listening } = useSpeechRecognition();

  useEffect(() => {
    setSourceText(transcript);
  }, [transcript, setSourceText]);

  const handlingVoiceRecording = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.stopListening();
    }
  };

  return (
    <div>
      <IconMicrophone
        stroke={2}
        className="text-gray-400 hover:text-gray-200"
        onClick={handlingVoiceRecording}
      />
    </div>
  );
};

export default SpeechRecognitionComponent;
