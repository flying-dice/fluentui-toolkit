import React, { CSSProperties } from "react";
import { Label, Stack } from "@fluentui/react";

export const InputGroup: React.FC<{
  label: string;
  horizontal?: boolean;
  style?: CSSProperties;
  styles?: {
    label?: CSSProperties;
    stack?: CSSProperties;
  };
}> = ({ label, horizontal = false, children, style, styles }) => {
  return (
    <div style={style}>
      <Label style={{ fontSize: "16px", paddingTop: "0.5rem", paddingBottom: 0, ...styles?.label }}>
        {label}
      </Label>
      <Stack
        horizontal={horizontal}
        style={{ padding: "0.25rem", ...styles?.stack }}
        tokens={{ childrenGap: horizontal ? "0.5rem" : "0" }}
      >
        {children}
      </Stack>
    </div>
  );
};
