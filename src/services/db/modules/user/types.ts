export type FindOneUserDto = {
  login: string;
  throwIfNotFound?: boolean;
  throwIfFound?: boolean;
};

export type CreateUserDto = {
  login: string;
  password: string;
};
