/*
 * @lc app=leetcode.cn id=9 lang=typescript
 *
 * [9] 回文数
 */

//#region Solution1
var isPalindrome = function (x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let xStr = x.toString();
  let xStrReverse = xStr.split('').reverse().join('');
  return xStr === xStrReverse;
};
//#endregion Solution1

// @lc code=start

//#region Solution2
var isPalindrome = function (x: number): boolean {
  if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
  let revertedNum = 0;
  while (x > revertedNum) {
    revertedNum = revertedNum * 10 + (x % 10);
    x = Math.floor(x / 10);
  }

  return x === revertedNum || x === Math.floor(revertedNum / 10);
};
//#endregion Solution2

// @lc code=end
