import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { DefaultButton, Text } from "@fluentui/react";
import { ConfirmationDialog, fuiConfirm, IConfirmationDialog } from "./ConfirmationDialog";
import { AwaitableDialogProps } from "./types";

const Container: React.FC = () => {
  const [result, setResult] = useState<boolean>(false);
  const handleOpen = async () => {
    const result = await fuiConfirm({
      text: "Are you sure about this, this action is irreversible",
      title: "Are you sure?",
    });
    setResult(result);
  };

  return (
    <div>
      <div>
        <DefaultButton onClick={handleOpen} text="open" />
      </div>
      <Text>Result: {result ? "true" : "false"}</Text>
    </div>
  );
};

export default {
  title: "Inputs/AsyncDialogs/Confirm",
  component: ConfirmationDialog,
} as Meta;

const Template: Story<IConfirmationDialog & AwaitableDialogProps<boolean>> = (args) => (
  <ConfirmationDialog {...args} />
);

const AwaitTemplate: Story = (args) => <Container {...args} />;

export const confirm = Template.bind({});
confirm.args = {
  text: "Are you sure about this, this action is irreversible",
  title: "Are you sure?",
  onSubmit: console.log,
  onDismiss: console.log,
  hidden: true,
};

export const awaitConfirm = AwaitTemplate.bind({});
awaitConfirm.args = {};
