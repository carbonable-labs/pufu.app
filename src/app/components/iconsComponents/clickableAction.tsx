import React, { FunctionComponent, ReactNode } from "react";


type ClickableActionProps = {
  icon: ReactNode;
  onClick?: () => void;
  title?: string;
  description?: string;
  style?: "primary" | "secondary";
  width?: "fixed" | "auto";
  logoBackgroundColor?: string;
};

const ClickableAction: FunctionComponent<ClickableActionProps> = ({
  icon,
  onClick,
  title,
  description,
  style = "secondary",
  width = "fixed",
  logoBackgroundColor,
}) => {
  return (
    <div
      className={`${
        style === "secondary"
          ? "bg-slate-500"
          : "bg-slate-900 hover:bg-slate-800"
      }
        ${width === "auto" ? "w-full" : ""}`}
      onClick={onClick}
    >
      <div
        className={
          style === "secondary"
            ? "bg-slate-500"
            : "bg-slate-900 hover:bg-slate-800"
        }
        style={{ backgroundColor: logoBackgroundColor }}
      >
        {icon}
      </div>

      <div className="ml-2">
        <h1 className={"bg-slate-500"}>{title}</h1>
        <p className={"bg-slate-900 hover:bg-slate-800"}>{description}</p>
      </div>
    </div>
  );
};

export default ClickableAction;
