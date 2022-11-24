export const useConvertArrayToObject = (
  arr: Record<string, any>[]
): Record<string, any> => {
  let newObject: Record<string, any> = {};
  Object.keys(arr).forEach((source) => {
    if (!arr[source]) return;
    Object.keys(arr[source]).forEach((prop) => {
      const filledValues = {
        [prop]: arr[source][prop],
      };
      newObject[prop] = filledValues[prop];
    });
  });

  return newObject;
};
