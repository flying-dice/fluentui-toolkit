import { IButtonStyles, IconButton, IIconProps } from "@fluentui/react";
import React, { createRef, useEffect } from "react";
import styled from "styled-components";

const ExpanderIcon = styled(IconButton)`
  cursor: initial;
  height: 100%;
  width: auto;

  .rotatable {
    transform-origin: 50% 50%;
    transition: transform 0.1s linear 0s;
    transform: rotate(0deg);
  }

  .rotated {
    transform-origin: 50% 50%;
    transition: transform 0.1s linear 0s;
    transform: rotate(90deg);
  }
`;

export type IListItemExpander = {
  toggle: () => void;
  isExpanded: boolean;
  square?: boolean;
  style?: React.CSSProperties;
  styles?: IButtonStyles;
  iconProps?: IIconProps;
};
export const ListItemExpander: React.FC<IListItemExpander> = ({
  toggle,
  isExpanded,
  square,
  style,
  styles,
  iconProps,
}) => {
  const expander = createRef<HTMLElement>();

  useEffect(() => {
    const currentHeight = expander?.current?.offsetHeight;
    if (square && expander.current && currentHeight) {
      expander.current.style.width = currentHeight + "px";
    }
  }, [expander, square]);

  return (
    <ExpanderIcon
      style={style}
      styles={styles}
      elementRef={expander}
      className="fs-list-item_expander"
      iconProps={{
        iconName: "ChevronRightMed",
        className: isExpanded ? "rotated" : "rotatable",
        ...iconProps,
      }}
      onClick={toggle}
    />
  );
};
