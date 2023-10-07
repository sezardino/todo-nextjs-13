"use client";

import { Icon } from "@/components/base/Icon";
import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  CardProps,
} from "@nextui-org/react";
import { type FC } from "react";

export type TodoCardProps = CardProps & {
  title: string;
  completedChildren: number;
  totalChildren: number;
  hasDescription: boolean;
  isCompleted: boolean;
  onShowMoreClick: () => void;
};

export const TodoCard: FC<TodoCardProps> = (props) => {
  const {
    title,
    completedChildren,
    totalChildren,
    hasDescription,
    isCompleted,
    onShowMoreClick,
    className,
    ...rest
  } = props;

  return (
    <Card {...rest} className="">
      <CardHeader className="justify-between pb-0">
        <h3 className="text-small font-semibold leading-none text-default-600">
          {title}
        </h3>
        {isCompleted && (
          <Icon name="HiCheckCircle" className="text-green-500" />
        )}
      </CardHeader>

      <CardFooter className="gap-3 justify-between">
        <div className="flex gap-1 items-center">
          {hasDescription && (
            <Icon name="HiMenuAlt2" className="text-default-400" />
          )}
          {!!totalChildren && (
            <span className="text-small text-default-400">
              {completedChildren}/{totalChildren} finished tasks
            </span>
          )}
          {!totalChildren && (
            <span className="text-xs text-default-400">has no child tasks</span>
          )}
        </div>
        <Button
          size="sm"
          isIconOnly
          className="text-white"
          onClick={onShowMoreClick}
          aria-label="Show more"
        >
          <Icon name="HiChevronDoubleRight" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};
