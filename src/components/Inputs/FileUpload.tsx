import React, { ChangeEventHandler } from "react";
import { IconPaperclip } from "@tabler/icons-react";

type Props = {
  handleFileUpload: ChangeEventHandler;
};

const FileUpload: React.FC<Props> = ({ handleFileUpload }) => {
  return (
    <label htmlFor="file-upload" className="cursor-pointer">
      <IconPaperclip size={21} className="text-gray-400 hover:text-gray-200" />
      <input
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
        className="hidden"
      />
    </label>
  );
};

export default FileUpload;
