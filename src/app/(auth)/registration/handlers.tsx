import { ProjectApiUrls } from "@/const/url";
import { RegistrationDto } from "@/services/db/modules/auth/types";

export const registrationHandler = async (data: RegistrationDto) => {
  const res = await fetch(ProjectApiUrls.registration, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }
};
