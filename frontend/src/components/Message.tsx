import React from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant: string;
  children: React.ReactNode;
}
const Message: React.FC<Props> = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
