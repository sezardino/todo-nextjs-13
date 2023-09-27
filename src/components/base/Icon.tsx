import { FC, SVGProps } from "react";
import * as hiIcons from "react-icons/hi";
import { twMerge } from "tailwind-merge";

export type HiIconNames = keyof typeof hiIcons;
export type IconNames = HiIconNames;
export type IconRotate = "45" | "90" | "135" | "180" | "225" | "270" | "315";

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNames;
  size?: number;
  rotate?: IconRotate;
  className?: string;
}

export const Icon: FC<IconProps> = (props) => {
  const { rotate, name, size = 24, className, ...rest } = props;
  const Icon = { ...hiIcons }[name];

  const rotateClasses: Record<IconRotate, string> = {
    "45": "rotate-45",
    "90": "rotate-90",
    "135": "rotate-135",
    "180": "rotate-180",
    "225": "rotate-225",
    "270": "rotate-270",
    "315": "rotate-315",
  };

  return (
    <Icon
      {...rest}
      size={size}
      className={twMerge(rotate && rotateClasses[rotate], className)}
    />
  );
};
