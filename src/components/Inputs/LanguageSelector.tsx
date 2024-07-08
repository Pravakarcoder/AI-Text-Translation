import React from "react";
import { IconLanguage } from "@tabler/icons-react";
type Props = {
  selectedLanguage: any;
  setSelectedLanguage: any;
  languages: any;
};

const LanguageSelector: React.FC<Props> = ({
  selectedLanguage,
  setSelectedLanguage,
  languages,
}) => {
  return (
    <span
      className="cursor-pointer rounded-full space-x-1 pl-2
   bg-[#000000] flex items-center flex-row"
    >
      <IconLanguage size={20} />
      <select
        value={selectedLanguage}
        onChange={(e: any) => setSelectedLanguage(e.target.value)}
        className="bg-[#000000] flex flex-row rounded-full py-1
       text-white"
      >
        {languages.map((language: any) => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </span>
  );
};

export default LanguageSelector;
