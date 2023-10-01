import { Input, InputProps } from "@nextui-org/input";
import { FC } from "react";

export interface BaseInputProps
  extends Omit<
    InputProps,
    "variant" | "labelPlacement" | "radius" | "colors"
  > {}

export const BaseInput: FC<InputProps> = (props) => (
  <Input
    {...props}
    placeholder={props.placeholder || " "}
    variant="bordered"
    labelPlacement="outside"
    radius="sm"
  />
);
