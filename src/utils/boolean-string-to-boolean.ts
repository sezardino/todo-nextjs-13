export const booleanStringToBoolean = (val: unknown) => {
  if (typeof val === "undefined") return undefined;
  if (typeof val === "boolean") return val;
  if (typeof val !== "string") throw new Error("Invalid boolean string");

  if (val === "true") {
    return true;
  }

  if (val === "false") {
    return false;
  }

  throw new Error("Invalid boolean string");
};
