import React, { FunctionComponent, useMemo } from "react";
import { map } from "lodash";
import styled from "styled-components";
import {
  IPeoplePickerProps,
  IPersonaProps,
  ListPeoplePicker,
  NormalPeoplePicker,
  Stack,
} from "@fluentui/react";
import { countryToIPersonaProps, iPersonaPropsToCountry } from "./mappers";
import { CountryPickerProps, CountryPickerVariant } from "./types";

const FlagPileContainer = styled(Stack)`
  & > div {
    flex: auto;
  }

  & .ms-PickerPersona-container {
    margin: 0.2rem;
    padding: 0.1rem;
  }
`;

const PeoplePickerVariants: Record<CountryPickerVariant, FunctionComponent<IPeoplePickerProps>> = {
  Normal: NormalPeoplePicker,
  List: ListPeoplePicker,
};

export const CountryPicker: React.FC<CountryPickerProps & IPeoplePickerProps> = (props) => {
  const available = useMemo(() => map(props.availableCountries, countryToIPersonaProps), [
    props.availableCountries,
  ]);

  const selected = useMemo(
    () =>
      (props.selectedCountries && map(props.selectedCountries, countryToIPersonaProps)) ||
      undefined,
    [props.selectedCountries]
  );

  const Picker = useMemo(() => PeoplePickerVariants[props.variant || "Normal"], [props.variant]);

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
    if (items && props.onChange) {
      // @ts-ignore
      const countryItems = items.map(iPersonaPropsToCountry);
      props.onChange(countryItems);
    }
  };

  return (
    <FlagPileContainer horizontal tokens={{ childrenGap: "0.5rem" }}>
      <Picker
        {...props}
        selectedItems={selected}
        onResolveSuggestions={resolveSuggestions}
        onChange={handleChange}
      />
    </FlagPileContainer>
  );
};
