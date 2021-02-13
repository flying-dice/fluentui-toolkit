import { Stack, Text } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import { ListItem } from "../ListItem";
import { ListItemExpander } from "../ListItemExpander";
import styled from "styled-components";

const getIconProps = (iconName) => ({
  iconName,
});

const getNestedStyle = (depth) => ({
  paddingLeft: 3 * depth + "rem",
});

const StackContainer = styled(Stack)`
  & > .fd-list-item {
    height: 2.5rem;

    & > .fd-list-item_icon {
      padding: 1rem;
    }
  }
`;

export const CollapsibleListItemExpanderExample = () => {
  const [foldersOpen, { toggle: toggleFolders }] = useBoolean(false);
  const [trashOpen, { toggle: toggleTrash }] = useBoolean(false);

  return (
    <StackContainer>
      <ListItem iconProps={getIconProps("Send")}>Sent</ListItem>
      <ListItem iconProps={getIconProps("Edit")}>Drafts</ListItem>
      <ListItem>
        <ListItemExpander square toggle={toggleFolders} isExpanded={foldersOpen} />
        <Text style={{ paddingLeft: "0.5rem" }}>Folders</Text>
      </ListItem>
      {foldersOpen && (
        <>
          <ListItem style={getNestedStyle(1)}>Household</ListItem>
          <ListItem style={getNestedStyle(1)}>Work</ListItem>
        </>
      )}
      <ListItem>
        <ListItemExpander
          style={{ width: "64px" }}
          iconProps={{ iconName: "CaretRightSolid8" }}
          toggle={toggleTrash}
          isExpanded={trashOpen}
        />
        <Text style={{ paddingLeft: "0.5rem" }}>Trash</Text>
      </ListItem>
      {trashOpen && (
        <>
          <ListItem style={getNestedStyle(1.5)}>Household</ListItem>
          <ListItem style={getNestedStyle(1.5)}>Work</ListItem>
        </>
      )}
    </StackContainer>
  );
};
