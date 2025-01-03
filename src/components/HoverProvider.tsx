import HoverGraphic from "react-hover-graphic";
import { ReactNode } from "react";

interface HoverGraphicProviderProps {
  children: ReactNode;
  src?: string;
  height?: string;
  width?: string;
}

export const HoverProvider = ({ children, src, height = "100px", width = "200px" }: HoverGraphicProviderProps) => {
  return (
    <HoverGraphic
      src={src || ""}
      height={height}
      width={width}
      objectFit="contain"
      offsetBottom={40}
      zIndex={9999}
      disabled={false}
      disabledOnMobile={false}
    >
      {children}
    </HoverGraphic>
  );
};