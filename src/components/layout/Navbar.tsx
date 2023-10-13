"use client";

import { type ComponentPropsWithoutRef, type FC } from "react";

import { ProjectPageUrls } from "@/const/url";
import { Disclosure } from "@headlessui/react";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Dropdown } from "../base/Dropdown";
import { Icon } from "../base/Icon";

export type NavbarProps = ComponentPropsWithoutRef<"nav"> & {};

const navigation = [
  { name: "Dashboard", href: ProjectPageUrls.dashboard, current: true },
];

export const Navbar: FC<NavbarProps> = (props) => {
  const { className, ...rest } = props;
  const { data } = useSession();

  const notLoggedUserInnerJSX = (
    <div className="flex gap-2 flex-wrap items-center">
      <Button size="sm" onClick={() => signIn()}>
        Login
      </Button>
      <Button as={Link} href={ProjectPageUrls.registration} size="sm">
        Registration
      </Button>
    </div>
  );

  const loggedUserInnerJSX = (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
      {/* Profile dropdown */}
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
  );

  return (
    <Disclosure
      {...rest}
      as="nav"
      className={twMerge("bg-gray-800", className)}
    >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <Icon
                      name="HiX"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <Icon
                      name="HiChevronDown"
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Icon name="HiBeaker" size={32} className="text-white" />
                </div>
                {!!data?.user && (
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={twMerge(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {!!data?.user ? loggedUserInnerJSX : notLoggedUserInnerJSX}
            </div>
          </div>

          {!!data?.user && (
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={twMerge(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          )}
        </>
      )}
    </Disclosure>
  );
};
