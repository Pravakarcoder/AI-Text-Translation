"use client";
import OpenAI from "openai";
import React, { useEffect, useState } from "react";

type Props = {
  sourceText: string;
  selectedLanguage: string;
};

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  dangerouslyAllowBrowser: true,
});

// const useTranslate: React.FC<Props> = ({ sourceText, selectedLanguage }) => {
const useTranslate = (sourceText: string, selectedLanguage: string): string => {
  const [targetText, setTargetText] = useState<string>("");
  useEffect(() => {
    const handleTranslate = async (sourceText: any) => {
      try {
        setTimeout(async () => {
          const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-1106",
            messages: [
              {
                role: "user",
                content: `You will be provided with a sentence. This sentence: 
              ${sourceText}. Your tasks are to:
              - Detect what language the sentence is in
              - Translate the sentence into ${selectedLanguage}
              Do not return anything other than the translated sentence.`,
              },
            ],
          });
          console.log(response);
          const data = response.choices[0].message?.content;
          setTargetText(data as string);
        }, 500);
      } catch (error: any) {
        console.log("Error while translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500);

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
