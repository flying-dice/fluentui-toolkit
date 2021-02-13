import { Stack, Text } from "@fluentui/react";
import { ListItem } from "../ListItem";

export const ListItemExample = () => {
  return (
    <Stack>
      <ListItem
        style={{ padding: "0.5rem" }}
        iconProps={{ iconName: "Send", style: { paddingRight: "0." + "5rem" } }}
        onClick={alert}
      >
        <Text variant={"medium"} style={{ fontWeight: "bold" }}>
          Sent Mail
        </Text>
      </ListItem>
      <ListItem style={{ padding: "0.5rem" }}>
        <Text variant={"medium"}>Drafts</Text>
      </ListItem>
      <ListItem style={{ padding: "0.5rem" }}>
        <Text variant={"medium"}>Inbox</Text>
      </ListItem>
    </Stack>
  );
};
