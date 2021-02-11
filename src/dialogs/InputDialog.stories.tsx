import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { DefaultButton, Text } from "@fluentui/react";
import { fuiInput, IInputDialog, InputDialog } from "./InputDialog";
import { AwaitableDialogProps } from "./types";

const Container: React.FC = () => {
  const [result, setResult] = useState<string>("");
  const handleOpen = async () => {
    const result = await fuiInput({
      title: "Whats your Name?",
      label: "Name",
      placeholder: "John Doe",
    });
    setResult(result);
  };

  return (
    <div>
      <div>
        <DefaultButton onClick={handleOpen} text="open" />
      </div>
      <Text>Result: {result}</Text>
    </div>
  );
};

export default {
  title: "Inputs/AsyncDialogs/Input",
  component: InputDialog,
} as Meta;

const Template: Story<IInputDialog & AwaitableDialogProps<string>> = (args) => (
  <InputDialog {...args} />
);

const AwaitTemplate: Story = (args) => <Container {...args} />;

export const input = Template.bind({});
input.args = {
  title: "Whats your Name?",
  label: "Name",
  placeholder: "John Doe",
  onSubmit: console.log,
  onDismiss: console.log,
  hidden: true,
};

export const awaitInput = AwaitTemplate.bind({});
awaitInput.args = {};
