import { Stack } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { ListItem } from "../ListItem";
import styled from "styled-components";

const getIconProps = (iconName) => ({
  iconName,
});

const getNestedStyle = (depth) => ({
  paddingLeft: 3 * depth + "rem",
});

const StackContainer = styled(Stack)`
  & > .fd-list-item {
    padding: 1rem;

    & > .fd-list-item_icon {
      padding-right: 1rem;
    }
  }
`;

export const CollapsibleListItemExample = () => {
  const [open, { toggle }] = useBoolean(false);

  return (
    <StackContainer>
      <ListItem iconProps={getIconProps("Send")}>Sent</ListItem>
      <ListItem iconProps={getIconProps("Edit")}>Drafts</ListItem>
      <ListItem iconProps={getIconProps(open ? "ChevronDown" : "ChevronRight")} onClick={toggle}>
        Folders
      </ListItem>
      {open && (
        <>
          <ListItem style={getNestedStyle(1)}>Household</ListItem>
          <ListItem style={getNestedStyle(1)}>Work</ListItem>
        </>
      )}
    </StackContainer>
  );
};
