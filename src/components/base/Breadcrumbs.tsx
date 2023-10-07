import Link from "next/link";
import { type ComponentPropsWithoutRef, type FC } from "react";
import { Icon } from "./Icon";

export type Breadcrumb = {
  name: string;
  href: string;
};

export type BreadcrumbsProps = ComponentPropsWithoutRef<"nav"> & {
  items: Breadcrumb[];
};

export const Breadcrumbs: FC<BreadcrumbsProps> = (props) => {
  const { items, className, ...rest } = props;

  return (
    <nav {...rest} className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center">
        {items.map((item, index, arr) => (
          <li key={index} className="inline-flex items-center">
            <Link
              href={item.href}
              aria-current={index === arr.length - 1 ? "page" : undefined}
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
            >
              {item.name}
            </Link>
            {index < arr.length - 1 && <Icon name="HiChevronRight" />}
          </li>
        ))}
      </ol>
    </nav>
  );
};
