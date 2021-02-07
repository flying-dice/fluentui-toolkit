import { useState } from "react";
import { DecimalDegreesInput } from "../DecimalDegreesInput";
import { Text } from "@fluentui/react";
import { latLongToString } from "@flying-dice/commons";

export const ExampleDDInputContainer = () => {
  const [position, setPosition] = useState({
    lat: -77.508333,
    lng: 164.754167,
  });

  const handleSelectPos = () => {
    alert("Mocking Location Selection by making lat 45 & lng 90");
    setPosition({ lat: 45, lng: 90 });
  };

  const handleChange = (newPos) => {
    setPosition(newPos);
  };

  return (
    <>
      <DecimalDegreesInput
        selectable
        label="Home"
        onChange={handleChange}
        onPinClick={handleSelectPos}
        position={position}
      />
      <Text>{latLongToString(position)}</Text>
    </>
  );
};
