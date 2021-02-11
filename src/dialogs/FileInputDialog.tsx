import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import reactModal from "@prezly/react-promise-modal";
import { debounce } from "lodash";
import { AwaitableDialogProps } from "./types";

export type IFileInputDialog = {
  multiple?: boolean;
  accept?: string;
};
export const FileInputDialog: React.FC<IFileInputDialog & AwaitableDialogProps<FileList>> = ({
  multiple,
  accept,
  onSubmit,
  onDismiss,
}) => {
  const [isFileDialogOpen, setIsFileDialogOpen] = useState<boolean>(true);
  const [uploads, setUploads] = useState<FileList>();
  const uploadInput = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!isFileDialogOpen) {
      (uploads && onSubmit(uploads)) || onDismiss();
    }
  }, [isFileDialogOpen, uploads]);

  useEffect(() => {
    // Debounce to ensure the event handler body fires after the upload change event
    const handleFocusBack = debounce(() => {
      setIsFileDialogOpen(false);
    }, 1000);
    window.addEventListener("focus", handleFocusBack);
    return () => {
      window.removeEventListener("focus", handleFocusBack);
    };
  }, []);

  useEffect(() => {
    uploadInput.current?.click();
  }, []);

  const handleChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    target.files && setUploads(target?.files);
  };

  return (
    <>
      <input
        id="file-input-dialog_input"
        // @ts-ignore
        ref={uploadInput}
        type="file"
        style={{ display: "none" }}
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
      />
    </>
  );
};

export const fuiFileInput = ({ multiple, accept }: IFileInputDialog) =>
  reactModal(({ show, onSubmit, onDismiss }) => (
    <FileInputDialog
      multiple={multiple}
      accept={accept}
      hidden={!show}
      onSubmit={onSubmit}
      onDismiss={onDismiss}
    />
  )) as Promise<FileList>;
