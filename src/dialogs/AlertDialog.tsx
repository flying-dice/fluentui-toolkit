import React, { useMemo } from "react";

import { Dialog, DialogFooter, DialogType, PrimaryButton } from "@fluentui/react";
import reactModal from "@prezly/react-promise-modal";
import { IAwaitableDialog } from "./IAwaitableDialog";

const dialogStyles = { main: { maxWidth: 450 } };
const modalProps = {
  isBlocking: false,
  styles: dialogStyles,
};

export type IAlertDialog = {
  title: string;
  text: string;
};
export const AlertDialog: React.FC<IAlertDialog & IAwaitableDialog<boolean>> = ({
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
        </DialogFooter>
      </Dialog>
    </>
  );
};

export const fuiAlert = ({ title, text }: IAlertDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <AlertDialog
      title={title}
      text={text}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<true>;
