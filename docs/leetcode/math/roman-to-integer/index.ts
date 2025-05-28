/*
 * @lc app=leetcode.cn id=13 lang=typescript
 *
 * [13] 罗马数字转整数
 */

// @lc code=start

//#region Solution1
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
  const spRomanKeys = Object.keys(spRomanMap);

  // 处理特殊的罗马数字
  if (spRomanKeys.indexOf(s) !== -1) {
    return spRomanMap[s];
  }
  let result = 0;
  const romanArr = s.split('');
  for (let i = 0; i < romanArr.length; i++) {
    let isSp = romanArr[i] + romanArr[i + 1];
    // 是否为特殊字符
    if (spRomanKeys.indexOf(isSp) !== -1) {
      result += spRomanMap[isSp];
      i++;
    } else {
      result += romanMap[romanArr[i]];
    }
  }
  return result;
}
//#endregion Solution1
// @lc code=end
