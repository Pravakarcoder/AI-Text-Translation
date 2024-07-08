"use client";
import "regenerator-runtime/runtime";

import TextArea from "@/components/Inputs/TextArea";
import { FlipWords } from "@/components/ui/flip-words";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import SpeechRecognitionComponent from "@/components/SpeechRecognition/SpeechRecognition";
import {
  IconCopy,
  IconFileUpload,
  IconFoldDown,
  IconFoldUp,
  IconPlayerPause,
  IconPlayerPlay,
  IconStar,
  IconThumbDown,
  IconThumbUp,
  IconVolume,
} from "@tabler/icons-react";
import FileUpload from "@/components/Inputs/FileUpload";
import { rtfToText } from "@/utils/rtfToText";
import LinkPaste from "@/components/Inputs/LinkPaste";
import useTranslate from "@/hooks/useTranslate";
import LanguageSelector from "@/components/Inputs/LanguageSelector";
import SvgDecorations from "@/components/SvgDecorations";
import CategoryLinks from "@/components/categoryLinks";
const words = ["Translate", "Speak", "upload", "fast"];

export default function Home() {
  const [sourceText, setSourceText] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [favorite, setFavorite] = useState<boolean>(false);
  const [languages] = useState<string[]>([
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Nepali",
  ]); //state for manage pause and speaking
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [selectedLanguage, setSelectedLanguage] = useState<string>("French");

  const targetText = useTranslate(sourceText, selectedLanguage);

  const handleAudioPlayback = (text: string) => {
    if (!isSpeaking) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onend = () => setIsSpeaking(false);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      setIsPaused(false);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const rtfContent = reader.result as string;
        const text = rtfToText(rtfContent);
        setSourceText(text);
      };
      reader.readAsText(file);
    }
  };

  const handleLike = () => {
    // Implement like logic
  };
  const handleLinkPaste = () => {
    console.log("COPY");
  };

  const handleDislike = () => {
    console.log("Disklike");
  };

  const handleFavorite = () => {
    setFavorite(!favorite);
    if (!favorite) {
      localStorage.setItem("favoriteTranslation", targetText);
    } else {
      localStorage.removeItem("favoriteTranslation");
    }
  };
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(targetText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main>
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="relative overflow-hidden h-screen">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 py-10 sm:py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-neutral-300">
                Multi <span className="text-lime-400">Speak</span>
              </h1>
              <p className="mt-3 text-neutral-300">
                Multispeak: Bridging Voices, Connecting Worlds
              </p>
              <br />
              <span className="text-neutral-300 text-xl">
                {" "}
                Hey, this website help to
                <FlipWords words={words} />
              </span>{" "}
              <div className="mt-7 sm:mt-12 mx-auto max-w-7xl relative">
                <div className="grid gap-4 md:grid-cols-2 grid-cols-1">
                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      placeholder="Source Language"
                      id="source-language"
                      value={sourceText}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                        setSourceText(e.target.value);
                      }}
                    />
                    <div className="flex flex-row justify-between w-full ">
                      <span className="cursor-pointer flex space-x-2 flex-row ">
                        <SpeechRecognitionComponent
                          setSourceText={setSourceText}
                        />

                        {!isSpeaking && !isPaused && (
                          <IconVolume
                            size={22}
                            onClick={() => handleAudioPlayback(sourceText)}
                            className="text-gray-400 hover:text-gray-200"
                          />
                        )}
                        {isSpeaking && isPaused && (
                          <IconPlayerPlay
                            stroke={2}
                            onClick={() => handleAudioPlayback(sourceText)}
                            className="text-gray-400 hover:text-gray-200"
                          />
                        )}
                        {isSpeaking && !isPaused && (
                          <IconPlayerPause
                            stroke={2}
                            onClick={handlePause}
                            className="text-gray-400 hover:text-gray-200"
                          />
                        )}
                        <FileUpload handleFileUpload={handleFileUpload} />
                        <LinkPaste handleLinkPaste={handleLinkPaste} />
                      </span>
                      <span className="text-sm pr-4">
                        {sourceText.length} / 2000
                      </span>
                    </div>
                  </div>
                  <div className="relative z-10 flex flex-col space-x-3 border rounded-lg shadow-lg bg-neutral-900 border-neutral-700 shadow-gray-900/20">
                    <TextArea
                      id="target-language"
                      value={targetText}
                      onChange={() => {}}
                      placeholder="Target Language"
                    />
                    <div className="flex flex-row justify-between w-full">
                      <span className="cursor-pointer flex items-center space-x-2 flex-row">
                        <LanguageSelector
                          selectedLanguage={selectedLanguage}
                          setSelectedLanguage={setSelectedLanguage}
                          languages={languages}
                        />
                        <IconVolume
                          size={22}
                          onClick={() => handleAudioPlayback(targetText)}
                        />
                      </span>
                      <div className="flex flex-row items-center space-x-2 pr-4 cursor-pointer">
                        <IconCopy size={22} onClick={handleCopyToClipboard} />
                        {copied && (
                          <span className="text-xs text-green-500">
                            Copied!
                          </span>
                        )}
                        <IconThumbUp size={22} onClick={handleLike} />
                        <IconThumbDown size={22} onClick={handleDislike} />
                        <IconStar
                          size={22}
                          onClick={handleFavorite}
                          className={favorite ? "text-yellow-500" : ""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <SvgDecorations />
              </div>
              <CategoryLinks />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
