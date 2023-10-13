import {
  Select as NextUISelect,
  SelectProps as NextUISelectProps,
  SelectItem,
} from "@nextui-org/react";
import { type FC } from "react";

export type SelectItem = {
  label: string;
  value: string;
};

export interface SelectProps
  extends Omit<NextUISelectProps, "children" | "size" | "variant"> {
  items: SelectItem[];
}

export const Select: FC<SelectProps> = (props) => {
  const { items, ...rest } = props;

  return (
    <NextUISelect {...rest} variant="underlined" size="sm">
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </NextUISelect>
  );
};
