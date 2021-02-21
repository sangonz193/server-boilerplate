export const dangerousKeysOf = <T extends {}>(obj: T): Array<keyof T> => Object.keys(obj) as Array<keyof T>;
