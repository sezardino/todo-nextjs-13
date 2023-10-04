import { type ComponentPropsWithoutRef, type FC } from "react";

export interface DashboardProps extends ComponentPropsWithoutRef<"div"> {}

export const DashboardTemplate: FC<DashboardProps> = (props) => {
  const { className, ...rest } = props;

  return <section {...rest} className={className}></section>;
};
