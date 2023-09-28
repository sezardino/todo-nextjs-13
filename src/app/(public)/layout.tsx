import { Navbar } from "@/components/layout/Navbar";
import { PropsWithChildren } from "react";

const PublicLayout = (props: PropsWithChildren) => {
  const { children } = props;

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default PublicLayout;
