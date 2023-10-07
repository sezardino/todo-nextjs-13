"use client";

import { Icon } from "@/components/base/Icon";
import { Card, CardBody, CardProps } from "@nextui-org/react";
import { type FC } from "react";

export type TodoCardProps = CardProps & {
  title: string;
  completedChildren: number;
  totalChildren: number;
  hasDescription: boolean;
  isCompleted: boolean;
  onClick: () => void;
};

export const TodoCard: FC<TodoCardProps> = (props) => {
  const {
    title,
    completedChildren,
    totalChildren,
    hasDescription,
    isCompleted,
    onClick,
    className,
    ...rest
  } = props;

  return (
    <Card {...rest} className="">
      <CardBody className="justify-between pb-0">
        <h3 className="text-small font-semibold leading-none text-default-600">
          {title}
        </h3>
        {isCompleted && (
          <Icon name="HiCheckCircle" className="text-green-500" />
        )}
      </CardBody>
    </Card>
  );
};
