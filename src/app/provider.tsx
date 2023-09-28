"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { FC, PropsWithChildren } from "react";

export type ProvidersProps = PropsWithChildren & {
  session: any;
};

export const Providers: FC<ProvidersProps> = (props) => {
  const { children, session } = props;

  return (
    <SessionProvider session={session}>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  );
};
