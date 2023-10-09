import { Icon } from "@/components/base/Icon";
import { Card, CardBody } from "@nextui-org/react";
import { ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type TodoListItemProps = ComponentPropsWithoutRef<"button"> & {
  title: string;
  isCompleted: boolean;
  hasDescription: boolean;
  onShowMoreClick: () => void;
};

export const TodoListItem: FC<TodoListItemProps> = (props) => {
  const {
    title,
    isCompleted,
    hasDescription,
    onShowMoreClick,
    className,
    ...rest
  } = props;

  return (
    <button
      {...rest}
      className={twMerge("w-full", className)}
      onClick={onShowMoreClick}
    >
      <Card className="rounded-md">
        <CardBody className="flex flex-wrap flex-row gap-3 items-center justify-between p-3">
          <h3 className="text-small font-semibold leading-none text-default-600">
            {title}
          </h3>
          <div className="flex gap-2">
            {hasDescription && (
              <Icon name="HiMenuAlt2" size={16} className="text-default-400" />
            )}
            {isCompleted && (
              <Icon name="HiCheckCircle" size={16} className="text-green-500" />
            )}
          </div>
        </CardBody>
      </Card>
    </button>
  );
};
