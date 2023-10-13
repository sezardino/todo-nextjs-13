import { Menu, MenuProps, Transition } from "@headlessui/react";
import Link from "next/link";
import { Fragment, type FC } from "react";
import { twMerge } from "tailwind-merge";

export type DropdownItem = {
  label: string;
  href?: string;
  to?: string;
  onClick?: () => void;
  hidden?: boolean;
};

export type DropdownProps = Omit<MenuProps<"div">, "className"> & {
  className?: string;
  items: DropdownItem[];
};

export const Dropdown: FC<DropdownProps> = (props) => {
  const { items, className, children, ...rest } = props;

  return (
    <Menu {...rest} as="div" className={twMerge("relative", className)}>
      <Menu.Button className="relative flex rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <>{children}</>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item, index) => (
            <Fragment key={index}>
              {!item.hidden && (
                <Menu.Item>
                  {({ active }) => (
                    <>
                      {!!item.href && !item.to && (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener"
                          className={twMerge(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={item.onClick}
                        >
                          {item.label}
                        </a>
                      )}
                      {!!item.to && !item.href && (
                        <Link
                          href={item.to}
                          className={twMerge(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={item.onClick}
                        >
                          {item.label}
                        </Link>
                      )}
                      {!item.to && !item.href && (
                        <button
                          className={twMerge(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={item.onClick}
                        >
                          {item.label}
                        </button>
                      )}
                    </>
                  )}
                </Menu.Item>
              )}
            </Fragment>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
