import { AppNavbar } from "@/components/layout/AppNavbar";
import { Sidebar, SidebarItem } from "@/components/layout/Sidebar";
import { ProjectPageUrls } from "@/const/url";
import { PropsWithChildren } from "react";

import { twMerge } from "tailwind-merge";
import styles from "./layout.module.css";

const lists: SidebarItem[][] = [
  [
    {
      label: "Dashboard",
      icon: "HiOutlineHome",
      to: ProjectPageUrls.dashboard,
    },
    {
      label: "Settings",
      icon: "HiFingerPrint",
      to: ProjectPageUrls.settings,
    },
  ],
];

const DashboardLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <div
      className={twMerge(
        styles.element,
        "min-h-screen antialiased bg-gray-50 dark:bg-gray-900"
      )}
    >
      <AppNavbar className={styles.navbar} />

      <Sidebar
        lists={lists}
        className={twMerge(
          styles.sidebar,
          "max-md:fixed max-md:top-0 max-md:left-0"
        )}
      />
      <main className={twMerge(styles.content, "p-4 h-auto")}>{children}</main>
    </div>
  );
};

export default DashboardLayout;
