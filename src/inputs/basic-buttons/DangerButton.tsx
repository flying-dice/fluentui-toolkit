import React from "react";
import hexToRgba from "hex-to-rgba";
import { DefaultButton, IButtonProps } from "@fluentui/react";
import { useTheme } from "../../theming";

export const DangerButton: React.FC<{ alpha?: number } & IButtonProps> = (props) => {
  const { palette } = useTheme();
  return (
    <DefaultButton
      {...props}
      style={{ backgroundColor: hexToRgba(palette.red, props.alpha || 0.3) }}
    />
  );
};
