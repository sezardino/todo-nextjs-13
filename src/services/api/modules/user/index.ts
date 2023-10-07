import { UpdateSettingsBody } from "@/app/api/users/settings/schema";
import { ProjectApiUrls } from "@/const/url";
import { UserSettingsResponse } from "@/services/db/modules/user/types";
import { AbstractApiModule } from "../../helper";

export class UserApiService extends AbstractApiModule {
  getSettings() {
    return this.fetcher<UserSettingsResponse>(ProjectApiUrls.settings);
  }

  updateSettings(data: UpdateSettingsBody) {
    return this.fetcher<void>(ProjectApiUrls.settings, {
      method: "POST",
      data,
    });
  }
}
