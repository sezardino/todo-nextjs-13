import { type ComponentPropsWithoutRef, type FC } from "react";
import { AuthForm } from "../forms/AuthForm";

export interface AuthTemplateProps extends ComponentPropsWithoutRef<"div"> {}

export const AuthTemplate: FC<AuthTemplateProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <section {...rest} className={className}>
      <AuthForm />
    </section>
  );
};
