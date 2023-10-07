import { AppNavbar } from "@/components/layout/AppNavbar";
import { Sidebar, SidebarItem } from "@/components/layout/Sidebar";
import { ProjectPageUrls } from "@/const/url";
import { PropsWithChildren } from "react";

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
    <div className={"min-h-screen antialiased bg-gray-50 dark:bg-gray-900"}>
      <AppNavbar className="fixed left-0 right-0 top-0 z-50" />

      <Sidebar lists={lists} className="fixed top-0 left-0" />
      <main className="p-4 md:ml-64 h-auto pt-20">{children}</main>
    </div>
  );
};

export default DashboardLayout;
