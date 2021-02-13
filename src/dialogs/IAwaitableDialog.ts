export interface IAwaitableDialog<R> {
  hidden: boolean;
  onSubmit: (result: R) => void;
  onDismiss: () => void;
}
