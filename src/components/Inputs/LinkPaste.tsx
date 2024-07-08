import { IconLink } from "@tabler/icons-react";
import React, { ChangeEventHandler } from "react";

type Props = {
  handleLinkPaste: ChangeEventHandler;
};

const LinkPaste: React.FC<Props> = ({ handleLinkPaste }) => {
  return (
    <label htmlFor="link-input" className="cursor-pointer">
      <IconLink size={21} className="text-gray-400 hover:text-gray-200" />
      <input
        type="text"
        id="link-input"
        className="hidden"
        onChange={handleLinkPaste}
      />
    </label>
  );
};

export default LinkPaste;
