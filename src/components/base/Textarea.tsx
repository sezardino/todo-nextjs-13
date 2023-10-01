import { Textarea, TextAreaProps } from "@nextui-org/input";
import { FC } from "react";

export interface BaseTextareaProps
  extends Omit<
    TextAreaProps,
    "variant" | "labelPlacement" | "radius" | "colors"
  > {}

export const BaseTextarea: FC<BaseTextareaProps> = (props) => (
  <Textarea
    {...props}
    variant="bordered"
    labelPlacement="outside"
    radius="sm"
  />
);
