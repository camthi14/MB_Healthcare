import _, { Dictionary } from "lodash";

export const filterObj = <T>(object: T) => {
  let objectOld = { ...object };

  Object.keys(objectOld as object).forEach((key) => {
    // @ts-ignore
    if (!objectOld[key]) objectOld[key] = "";
  });

  return objectOld;
};

export const getInfoData = <T>(object: T, filed: Array<keyof T>) => {
  return _.pick(object, filed);
};

export const removeNullObj = <T>(obj: Dictionary<T>) =>
  _.omitBy(obj, ((v) => v === "") || _.isNil || _.isUndefined);
