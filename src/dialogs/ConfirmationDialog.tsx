import React, { useMemo } from "react";

import { DefaultButton, Dialog, DialogFooter, DialogType, PrimaryButton } from "@fluentui/react";
import reactModal from "@prezly/react-promise-modal";
import { IAwaitableDialog } from "./IAwaitableDialog";

const dialogStyles = { main: { maxWidth: 450 } };
const modalProps = {
  isBlocking: false,
  styles: dialogStyles,
};

export type IConfirmationDialog = {
  title: string;
  text: string;
};
export const ConfirmationDialog: React.FC<IConfirmationDialog & IAwaitableDialog<boolean>> = ({
  title,
  text,
  hidden,
  onSubmit,
  onDismiss,
}) => {
  const dialogContentProps = useMemo(
    () => ({
      type: DialogType.normal,
      title,
      closeButtonAriaLabel: "Close",
      subText: text,
    }),
    [text, title]
  );

  return (
    <>
      <Dialog
        hidden={hidden}
        onDismiss={onDismiss}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => onSubmit(true)} text="Ok" />
          <DefaultButton onClick={onDismiss} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const fuiConfirm = ({ title, text }: IConfirmationDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <ConfirmationDialog
      title={title}
      text={text}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<boolean>;
