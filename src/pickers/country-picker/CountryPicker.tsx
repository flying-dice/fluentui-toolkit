import React, { useMemo } from "react";
import { map } from "lodash";
import styled from "styled-components";
import { ListPeoplePicker, IPersonaProps, Stack } from "@fluentui/react";
import { countryToIPersonaProps, iPersonaPropsToCountry } from "./mappers";
import { CountryPickerProps } from "./types";

const FlagPileContainer = styled(Stack)`
  & > div {
    flex: auto;
  }

  & .ms-PickerPersona-container {
    margin: 0.2rem;
    padding: 0.1rem;
  }
`;

export const CountryPicker: React.FC<CountryPickerProps> = ({
  selectedCountries,
  availableCountries,
  onChange,
}) => {
  const available = useMemo(
    () => map(availableCountries, countryToIPersonaProps),
    [availableCountries]
  );

  const selected = useMemo(
    () =>
      (selectedCountries && map(selectedCountries, countryToIPersonaProps)) ||
      undefined,
    [selectedCountries]
  );

  const resolveSuggestions = (filter: string) => {
    if (filter === " ") {
      return available;
    }
    return available.filter(
      ({ text, secondaryText }) =>
        text.toLowerCase().includes(filter.toLowerCase()) ||
        secondaryText?.toLowerCase().includes(filter?.toLowerCase() || "")
    );
  };

  const handleChange = (items: IPersonaProps[] | undefined) => {
    if (items && onChange) {
      // @ts-ignore
      const countryItems = items.map(iPersonaPropsToCountry);
      onChange(countryItems);
    }
  };

  return (
    <FlagPileContainer horizontal tokens={{ childrenGap: "0.5rem" }}>
      <ListPeoplePicker
        selectedItems={selected}
        onResolveSuggestions={resolveSuggestions}
        onChange={handleChange}
      />
    </FlagPileContainer>
  );
};
