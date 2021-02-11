export type AwaitableDialogProps<R> = {
  hidden: boolean;
  onSubmit: (result: R) => void;
  onDismiss: () => void;
};
