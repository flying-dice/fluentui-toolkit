import React, { useMemo, useRef } from "react";

import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  IDropdown,
  IDropdownOption,
  PrimaryButton,
} from "@fluentui/react";
import reactModal from "@prezly/react-promise-modal";
import { Key } from "ts-key-enum";
import { IAwaitableDialog } from "./IAwaitableDialog";

const dialogStyles = { main: { maxWidth: 450 } };
const modalProps = {
  isBlocking: false,
  styles: dialogStyles,
};

export type ISelectionInputDialog = {
  title: string;
  label: string;
  options: IDropdownOption[];
  defaultSelectedKey?: string;
};
export const SelectionInputDialog: React.FC<ISelectionInputDialog & IAwaitableDialog<string>> = ({
  title,
  label,
  options,
  defaultSelectedKey,
  hidden,
  onSubmit,
  onDismiss,
}) => {
  const input = useRef<IDropdown>();
  const dialogContentProps = useMemo(
    () => ({
      type: DialogType.normal,
      title,
      closeButtonAriaLabel: "Close",
    }),
    [title]
  );

  const handleSubmit = () => {
    input.current?.selectedOptions[0]
      ? onSubmit(input.current?.selectedOptions[0].key as string)
      : onSubmit("");
  };

  return (
    <>
      <Dialog
        hidden={hidden}
        onDismiss={onDismiss}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <Dropdown
          // @ts-ignore
          componentRef={input}
          label={label}
          options={options}
          defaultSelectedKey={defaultSelectedKey}
          onKeyPress={({ key }) => key === Key.Enter && handleSubmit()}
        />
        <DialogFooter>
          <PrimaryButton onClick={() => handleSubmit()} text="Ok" />
          <DefaultButton onClick={onDismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const fuiSelectionInput = ({
  title,
  label,
  defaultSelectedKey,
  options,
}: ISelectionInputDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <SelectionInputDialog
      title={title}
      label={label}
      options={options}
      defaultSelectedKey={defaultSelectedKey}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<string>;
