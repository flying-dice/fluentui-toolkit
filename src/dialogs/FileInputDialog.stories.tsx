import React, { useState } from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Meta, Story } from "@storybook/react/types-6-0";
import { DefaultButton, Text } from "@fluentui/react";
import { values } from "lodash";
import { fuiFileInput, IFileInputDialog } from "./FileInputDialog";

const Container: React.FC<IFileInputDialog> = (args) => {
  const [result, setResult] = useState<FileList>();
  const handleOpen = async () => {
    const result = await fuiFileInput(args);
    console.log(result);
    setResult(result);
  };

  return (
    <div>
      <div>
        <DefaultButton onClick={handleOpen} text="open" />
      </div>
      <Text>Result: ({result?.length}) Files</Text>
      <br />
      {result &&
        values(result).map((f: File, idx) => (
          <div key={idx}>
            <Text>
              {f.name} - {f.size}
            </Text>
            <br />
          </div>
        ))}
    </div>
  );
};

export default {
  title: "Inputs/AsyncDialogs/FileInput",
  component: Container,
} as Meta;

const AwaitTemplate: Story<IFileInputDialog> = (args) => <Container {...args} />;
export const awaitFileInput = AwaitTemplate.bind({});
awaitFileInput.args = { multiple: false, accept: "text/*,.campaign.json" };
