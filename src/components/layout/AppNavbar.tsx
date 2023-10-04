"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";

import { signOut } from "next-auth/react";
import { twMerge } from "tailwind-merge";
import { Dropdown } from "../base/Dropdown";
import { Icon } from "../base/Icon";

export type NavbarProps = ComponentPropsWithoutRef<"nav"> & {};

export const AppNavbar: FC<NavbarProps> = (props) => {
  const { className, ...rest } = props;

  return (
    <nav {...rest} className={twMerge("bg-gray-800", className)}>
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-end">
        <button
          type="button"
          className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">View notifications</span>
          <Icon name="HiBell" className="h-6 w-6" aria-hidden="true" />
        </button>

        <Dropdown
          items={[
            { label: "Profile", to: "#" },
            { label: "Logout", onClick: signOut },
          ]}
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Icon name="HiUserCircle" size={32} />
        </Dropdown>
      </div>
    </nav>
  );
};
