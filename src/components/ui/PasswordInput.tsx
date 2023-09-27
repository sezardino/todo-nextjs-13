import { FC, useState } from "react";
import { Icon } from "../base/Icon";
import { BaseInput, BaseInputProps } from "../base/Input";

export interface PasswordInputProps extends Omit<BaseInputProps, "type"> {}

export const PasswordInput: FC<PasswordInputProps> = (props) => {
  const { ...rest } = props;
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <BaseInput
      {...rest}
      endContent={
        <button
          className="focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <Icon
              name="HiEye"
              className="text-2xl text-default-400 pointer-events-none"
            />
          ) : (
            <Icon
              name="HiEyeOff"
              className="text-2xl text-default-400 pointer-events-none"
            />
          )}
        </button>
      }
      type={isVisible ? "text" : "password"}
    />
  );
};
