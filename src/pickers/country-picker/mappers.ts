import { Country } from "./types";
import { IPersonaProps } from "@fluentui/react";

type MyIPersonaProps = {
  text: string;
  secondaryText: string;
  imageInitials: string;
  imageUrl: string;
} & IPersonaProps;

export const countryToIPersonaProps = ({
  name,
  alpha3,
  alpha2,
  imageUrl,
}: Country): {
  text: string;
  secondaryText: string;
  imageInitials: string;
  imageUrl: string;
} => ({
  text: alpha3,
  secondaryText: name,
  imageInitials: alpha2,
  imageUrl,
});

export const iPersonaPropsToCountry = ({
  text,
  secondaryText,
  imageInitials,
  imageUrl,
}: MyIPersonaProps): Country => ({
  name: secondaryText,
  alpha3: text,
  alpha2: imageInitials,
  imageUrl,
});
