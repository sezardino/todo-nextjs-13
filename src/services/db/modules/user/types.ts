export type FindOneUserBaseDto = {
  login: string;
};

export type FindOneUserFoundDto = {
  login: string;
  throwIfFound: true;
};

export type FindOneUserNotFoundDto = {
  login: string;
  throwIfNotFound: true;
};

export type FindOneUserDto =
  | FindOneUserBaseDto
  | FindOneUserFoundDto
  | FindOneUserNotFoundDto;

export type CreateUserDto = {
  login: string;
  password: string;
};

export type UpdatePasswordDto = {
  login: string;
  oldPassword: string;
  newPassword: string;
};

export type UpdateUserDataDto = {
  login: string;
  image?: string;
  bio?: string;
  email?: string;
  localization?: string;
  name?: string;
  socials?: string[];
};

export type DeleteUserDto = {
  login: string;
};
