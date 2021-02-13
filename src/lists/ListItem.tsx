import React, { useMemo } from "react";
import { FontIcon, IIconProps, Stack } from "@fluentui/react";
import { useTheme } from "@fluentui/react-theme-provider";
import { useBoolean } from "@fluentui/react-hooks";

export type IListItem = {
  iconProps?: IIconProps;
  style?: React.CSSProperties;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
};
export const ListItem: React.FC<IListItem> = ({ children, iconProps, style, onClick }) => {
  const [over, { setTrue: setOver, setFalse: setNotOver }] = useBoolean(false);
  const { palette } = useTheme();

  const liStyle: React.CSSProperties = useMemo(
    () => ({
      userSelect: "none",
      backgroundColor: over ? palette.neutralLighter : palette.white,
      ...style,
    }),
    [style, over, palette]
  );

  return (
    <Stack
      className="fd-list-item"
      horizontal
      verticalAlign={"center"}
      style={liStyle}
      onMouseOver={setOver}
      onMouseLeave={setNotOver}
      onClick={onClick}
    >
      <>
        {iconProps && <FontIcon className="fd-list-item_icon" {...iconProps} />}
        {children}
      </>
    </Stack>
  );
};
