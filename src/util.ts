// 获取数组中最小的数字
export const getMin = (arr: Array<number>) => {
  return Math.min.apply(null, arr);
};

// 获取数组中最大的数字
export const getMax = (arr: Array<number>) => {
  return Math.max.apply(null, arr);
};

/**
 * 取交集
 */
export function getIntersection(a: any[], b: any[]) {
  const s = new Set(b);
  return a.filter((i) => s.has(i));
}
