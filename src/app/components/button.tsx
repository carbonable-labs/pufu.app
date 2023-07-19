"use client";
import React, { FunctionComponent, ReactNode } from "react";


type ButtonProps = {
  onClick: () => void;
  children: string | ReactNode;
  disabled?: boolean;
};

const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
   
    >
      {children}
    </button>
  );
};

export default Button;
