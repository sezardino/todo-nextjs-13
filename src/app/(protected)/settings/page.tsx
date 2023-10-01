"use client";

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

  // return <SettingsTemplate />;
  return null;
  // return <>{JSON.stringify(settings)}</>;
};

export default SettingsPage;
