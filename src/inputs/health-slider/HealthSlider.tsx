import { Slider, ISliderProps } from "@fluentui/react";
import { debounce } from "lodash";
import React, { useCallback } from "react";

export const HealthSlider: React.FC<
  ISliderProps & { health: number; onChange: (health: number) => void }
> = (props) => {
  const onChangeD = useCallback(debounce(props.onChange, 250), [props.onChange]);

  return (
    <Slider
      {...props}
      label={props.label || "Health"}
      min={props.min || 0}
      max={props.max || 100}
      defaultValue={props.health * 100}
      onChange={(value) => onChangeD(value / 100)}
      valueFormat={(value) => `${value}%`}
    />
  );
};
