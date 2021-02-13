import React, { useEffect, useMemo, useState } from "react";
import { ISpinButtonProps, SpinButton as FuiSpinButton } from "@fluentui/react";
import { debounce } from "lodash";
import { clampNum, decrement, increment, swallow } from "../../helpers";

export type ISpinButton = {
  onChange?: (newValue: string) => void;
  decimalPlaces?: number;
} & Omit<ISpinButtonProps, "onChange">;

export const SpinButton: React.FC<ISpinButton> = (props) => {
  const [value, setValue] = useState(props.value || props.defaultValue || "0");

  const delayedOnChange = useMemo(
    () => (props.onChange ? debounce(props.onChange, 250) : swallow),
    [props.onChange]
  );

  useEffect(() => {
    props.value && setValue(props.value);
  }, [props.value]);

  const handleIncrement = (value: string) => {
    const newValue = increment(value, props);
    setValue(newValue);
    delayedOnChange(newValue);
  };

  const handleDecrement = (value: string) => {
    const newValue = decrement(value, props);
    setValue(newValue);
    delayedOnChange(newValue);
  };

  const handleValidate = (value: string) => {
    try {
      const newValue = clampNum(value, props);
      setValue(newValue);
      delayedOnChange(newValue);
    } catch (e) {
      console.debug("Failed to Validate Input");
    }
  };

  return (
    // @ts-ignore
    <FuiSpinButton
      {...props}
      value={value}
      onIncrement={handleIncrement}
      onDecrement={handleDecrement}
      onValidate={handleValidate}
      onChange={undefined}
    />
  );
};
