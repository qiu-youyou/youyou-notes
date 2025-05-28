/*
 * @lc app=leetcode.cn id=13 lang=typescript
 *
 * [13] 罗马数字转整数
 */

//#region Solution1
const romanValues: Record<string, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

// 特殊的
const spRomanValues: Record<string, number> = {
  IV: 4,
  IX: 9,
  XL: 40,
  XC: 90,
  CD: 400,
  CM: 900,
};

var romanToInt = function (s: string): number {
  const spRomanKeys = Object.keys(spRomanValues);

  let result = 0;
  const strArr = s.split('');
  for (let i = 0; i < strArr.length; i++) {
    let isSp = strArr[i] + strArr[i + 1];
    // 是否为特殊字符
    if (spRomanKeys.indexOf(isSp) !== -1) {
      result += spRomanValues[isSp];
      i++;
    } else {
      result += romanValues[strArr[i]];
    }
  }
  return result;
};
//#endregion Solution1

// @lc code=start
//#region Solution2
var romanToInt = function (s: string): number {
  const symbolValues: any = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ]);

  let ans = 0;
  const n = s.length;
  for (let i = 0; i < n; ++i) {
    const value = symbolValues.get(s[i]);
    if (value < symbolValues.get(s[i + 1])) {
      ans -= value;
    } else {
      ans += value;
    }
  }
  return ans;
};
//#endregion Solution2
// @lc code=end
