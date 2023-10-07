import { RegistrationBody } from "@/app/api/registration/schema";
import { ProjectApiUrls } from "@/const/url";
import { AbstractApiModule } from "../../helper";

export class AuthApiService extends AbstractApiModule {
  registration(data: RegistrationBody) {
    return this.fetcher(ProjectApiUrls.registration, {
      method: "POST",
      data,
    });
  }
}
