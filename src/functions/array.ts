/**
 * 对象数组去重
 * @param arr 对象数组
 * @param obj 对象属性
 */
export function uniqueArr<T = Record<string, unknown>>(
  arr: T[],
  obj: string
): Array<T> {
  const res = new Map();
  return arr.filter((arr) => !res.has(arr[obj]) && res.set(arr[obj], 1));
}

/*
 * 数组分组
 */
export function arrayGroup<T = Record<string, unknown>>(
  arr: T[],
  key: string
): { [key: string]: Array<T> } {
  if (arr?.length) {
    return arr.reduce((obj: { [str: string]: Array<T> }, item) => {
      if (item?.[key]) {
        if (obj[item[key]]) {
          obj[item[key]].push(item);
        } else {
          obj[item[key]] = [item];
        }
      }
      return obj;
    }, {});
  }
  return {};
}
