import { Icon } from "@/components/base/Icon";
import { Card, CardBody } from "@nextui-org/react";
import { ComponentPropsWithoutRef, type FC } from "react";

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
    <button {...rest} className={className} onClick={onShowMoreClick}>
      <Card className="rounded-md">
        <CardBody className="justify-between p-3">
          <h3 className="text-small font-semibold leading-none text-default-600">
            {title}
          </h3>
          <div>
            {hasDescription && (
              <Icon name="HiMenuAlt2" className="text-default-400" />
            )}
            {isCompleted && (
              <Icon name="HiCheckCircle" className="text-green-500" />
            )}
          </div>
        </CardBody>
      </Card>
    </button>
  );
};
