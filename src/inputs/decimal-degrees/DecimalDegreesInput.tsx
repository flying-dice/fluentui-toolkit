import {
  DirectionalHint,
  IconButton,
  Label,
  Position,
  Stack,
  Text,
  TooltipHost,
} from "@fluentui/react";
import React from "react";
import { SpinButton } from "../spin-button";
import { LatLong } from "@flying-dice/commons";

const DmsLat: React.FC<{
  disabled?: boolean;
  position?: number;
  onChange?: (newLoc: string) => void;
}> = ({ position, onChange, disabled }) => {
  return (
    <Stack style={{ width: "125px", padding: "4px" }}>
      <SpinButton
        disabled={disabled}
        label="Latitude"
        labelPosition={Position.top}
        value={position?.toFixed(6) || "0"}
        min={-90}
        max={90}
        decimalPlaces={6}
        step={0.0001}
        onChange={onChange}
      />
      <Text variant={"tiny"}>(-90/+90)</Text>
    </Stack>
  );
};

const DmsLng: React.FC<{
  disabled?: boolean;
  position?: number;
  onChange?: (newLoc: string) => void;
}> = ({ position, onChange, disabled }) => {
  return (
    <Stack style={{ width: "125px", padding: "4px" }}>
      <SpinButton
        disabled={disabled}
        label="Longitude"
        labelPosition={Position.top}
        value={position?.toFixed(6) || "0"}
        min={-180}
        max={180}
        decimalPlaces={6}
        step={0.0001}
        onChange={onChange}
      />
      <Text variant={"tiny"}>(-180/+180)</Text>
    </Stack>
  );
};

export type IDecimalDegreesInput = {
  readonly?: boolean;
  label?: string;
  selectable?: boolean;
  position?: LatLong;
  onChange: (location: LatLong) => void;
  onPinClick?: () => void;
};
export const DecimalDegreesInput: React.FC<IDecimalDegreesInput> = ({
  readonly,
  label,
  selectable,
  position,
  onChange,
  onPinClick,
}) => {
  const handleLatUpdate = (newLat: string) => {
    onChange({ lng: position?.lng || 0, lat: parseFloat(newLat) });
  };

  const handleLonUpdate = (newLon: string) => {
    onChange({ lat: position?.lat || 0, lng: parseFloat(newLon) });
  };

  return (
    <>
      {label && <Label styles={{ root: { paddingBottom: 0 } }}>{label}</Label>}
      <Stack horizontal>
        <DmsLat position={position?.lat || 0} onChange={handleLatUpdate} disabled={readonly} />
        <DmsLng position={position?.lng || 0} onChange={handleLonUpdate} disabled={readonly} />
        {selectable && !readonly && (
          <TooltipHost
            styles={{ root: { height: "min-content" } }}
            content={"Select Location"}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <IconButton
              style={{ marginTop: "32px" }}
              iconProps={{ iconName: "MapPin" }}
              onClick={onPinClick}
            />
          </TooltipHost>
        )}
      </Stack>
    </>
  );
};
