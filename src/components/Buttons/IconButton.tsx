import React, { MouseEventHandler } from "react";

type Props = {
  Icon: any;
  onClick: MouseEventHandler<HTMLSpanElement>;
};

const IconButton: React.FC<Props> = ({ Icon, onClick }) => {
  return (
    <span
      className="cursor-pointer flex items-center space-x-2"
      onClick={onClick}
    >
      <Icon size={22} />
    </span>
  );
};

export default IconButton;
