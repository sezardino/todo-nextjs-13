export type DBModuleError = {
  message: string;
  code: number;
};

export const isDBModuleError = (error: any): error is DBModuleError => {
  return typeof error === "object" && error.code && error.message;
};
