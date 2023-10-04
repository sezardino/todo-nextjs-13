"use client";

import { SettingsTemplate } from "@/components/templates/SettingsTemplate";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SettingsPage = () => {
  const session = useSession();

  console.log(session.data?.user.id);

  useEffect(() => {
    const getSettings = async () => {
      const settings = await fetch("/api/users/settings");
      console.log(await settings.json());
    };

    getSettings();
  }, []);

  return <SettingsTemplate />;
};

export default SettingsPage;
