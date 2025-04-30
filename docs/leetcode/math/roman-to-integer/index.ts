/*
 * @lc app=leetcode.cn id=13 lang=typescript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start
const romanMap: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// 特殊的
const spRomanMap: Record<string, number> = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

function romanToInt(s: string): number {
  // 处理特殊的罗马数字
  if (Object.keys(spRomanMap).indexOf(s) !== -1) {
    return spRomanMap[s];
  }
  let result = 0;
  s.split('').forEach((item) => {
    result += romanMap[item];
  });
  return result;
}

// @lc code=end
