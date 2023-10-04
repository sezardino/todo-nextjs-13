"use client";

import Link from "next/link";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import { twMerge } from "tailwind-merge";
import { Icon, IconNames } from "../base/Icon";

export type SidebarItem = {
  label: string;
  to: string;
  onClick?: () => void;
  icon: IconNames;
};

export type SidebarProps = ComponentPropsWithoutRef<"aside"> & {
  lists: SidebarItem[][];
};

export const Sidebar: FC<SidebarProps> = (props) => {
  const { lists, className, ...rest } = props;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleExpanded = () => setIsExpanded((prev) => !prev);
  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <aside
      {...rest}
      className={twMerge(
        "relative h-screen flex flex-col transition-transform md:translate-x-0 bg-gray-800 z-50",
        isOpen && "translate-x-0",
        !isOpen && "-translate-x-full",
        className
      )}
      aria-label="Sidenav"
    >
      <div className="flex justify-center px-4 pt-6 pb-0 ">
        <Icon name="HiBeaker" size={32} className="text-white" />
      </div>
      <div className="overflow-y-auto py-5 px-3 h-full">
        {lists.map((items, index) => (
          <ul
            key={index}
            className={twMerge(
              index === 0
                ? "space-y-2"
                : "pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700"
            )}
          >
            {items.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.to}
                  className="flex items-center p-2 text-base font-medium text-white rounded-lg hover:bg-gray-500 group"
                  onClick={() => {
                    setIsOpen(false);
                    item.onClick;
                  }}
                >
                  <Icon name={item.icon} />
                  <span
                    className={twMerge(
                      "ml-3",
                      isExpanded && !isOpen && "sr-only"
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <button
        type="button"
        className="absolute bottom-7 right-0 translate-x-1/2 z-10 text-white border rounded-full p-1 bg-gray-800 max-md:hidden"
        onClick={toggleExpanded}
      >
        <Icon
          name={isExpanded ? "HiChevronDoubleRight" : "HiChevronDoubleLeft"}
          size={14}
        />
      </button>

      <button
        type="button"
        className="absolute bottom-7 left-full translate-x-3 z-10 text-white border rounded-full p-2 bg-gray-800 md:hidden"
        onClick={toggleOpen}
      >
        <Icon name={!isOpen ? "HiMenu" : "HiOutlineXCircle"} size={24} />
      </button>
    </aside>
  );
};
