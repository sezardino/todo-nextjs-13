import { Input, InputProps } from "@nextui-org/input";
import { FC } from "react";

export interface BaseInputProps
  extends Omit<
    InputProps,
    "variant" | "labelPlacement" | "radius" | "colors"
  > {}

export const BaseInput: FC<InputProps> = (props) => {
  const { ...rest } = props;

  return (
    <Input {...rest} variant="bordered" labelPlacement="outside" radius="sm" />
  );
};
